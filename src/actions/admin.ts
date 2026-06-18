"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// Helper to verify admin access
async function verifyAdmin() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
}

// Analytics
export async function getAdminAnalytics() {
  await verifyAdmin();

  try {
    const totalUsers = await prisma.user.count({ where: { deletedAt: null } });
    
    // Active users: users updated in the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const activeUsers = await prisma.user.count({ 
      where: { deletedAt: null, updatedAt: { gte: thirtyDaysAgo } } 
    });

    const totalCompanies = await prisma.company.count({ where: { deletedAt: null } });
    const activeJobs = await prisma.job.count({ where: { isActive: true, deletedAt: null } });
    
    const applicationsSubmitted = await prisma.jobApplication.count();

    // Sum up usage tracking across all users
    const usersUsage = await prisma.user.aggregate({
      _sum: {
        resumeDownloadsCount: true,
        atsChecksCount: true
      }
    });
    
    const resumeDownloads = usersUsage._sum.resumeDownloadsCount || 0;
    const atsChecks = usersUsage._sum.atsChecksCount || 0;

    // Calculate MRR
    const proSubs = await prisma.subscription.count({ where: { tier: "PRO", isActive: true } });
    const premiumSubs = await prisma.subscription.count({ where: { tier: "PREMIUM", isActive: true } });
    const mrr = (proSubs * 29) + (premiumSubs * 99);

    // Mock Chart Data for Revenue & Users
    const chartData = [
      { name: "Jan", revenue: Math.floor(Math.random() * 500) + mrr * 0.5, users: 120 },
      { name: "Feb", revenue: Math.floor(Math.random() * 500) + mrr * 0.6, users: 210 },
      { name: "Mar", revenue: Math.floor(Math.random() * 500) + mrr * 0.7, users: 340 },
      { name: "Apr", revenue: Math.floor(Math.random() * 500) + mrr * 0.8, users: 480 },
      { name: "May", revenue: Math.floor(Math.random() * 500) + mrr * 0.9, users: 690 },
      { name: "Jun", revenue: mrr, users: totalUsers },
    ];

    return { 
      success: true, 
      data: { 
        totalUsers, activeUsers, totalCompanies, activeJobs, 
        applicationsSubmitted, resumeDownloads, atsChecks, 
        mrr, chartData 
      } 
    };
  } catch (error) {
    console.error(error);
    return { error: "Failed to fetch analytics" };
  }
}

// Moderation: Companies
export async function updateCompanyVerificationStatus(companyId: string, status: "PENDING" | "VERIFIED" | "REJECTED") {
  await verifyAdmin();
  try {
    await prisma.company.update({
      where: { id: companyId },
      data: { verificationStatus: status },
    });
    revalidatePath("/admin/companies");
    return { success: true, message: `Company marked as ${status}.` };
  } catch (error) {
    return { error: "Failed to update company status" };
  }
}

import { postToTelegram, postToWhatsApp } from "@/lib/integrations";

// Moderation: Jobs
export async function approveJob(jobId: string) {
  await verifyAdmin();
  try {
    const job = await prisma.job.update({
      where: { id: jobId },
      data: { isApproved: true },
      include: { company: { include: { members: true } } }
    });
    
    const settings = await prisma.platformSettings.findUnique({ where: { id: "global" } });
    if (settings) {
      if (settings.isTelegramEnabled) await postToTelegram(job, settings);
      if (settings.isWhatsappEnabled) await postToWhatsApp(job, settings);
    }

    // Trigger Targeted Job Alerts
    // We fetch users whose alerts match the job description, title, or keywords
    const alerts = await prisma.jobAlert.findMany({ include: { user: true } });
    for (const alert of alerts) {
      const isMatch = job.title.toLowerCase().includes(alert.keyword.toLowerCase()) || 
                      job.description.toLowerCase().includes(alert.keyword.toLowerCase());
      if (isMatch) {
        // Dispatch notifications based on user preferences
        if (alert.notifyEmail) {
          console.log(`[Email Dispatch] Sending Job Alert to ${alert.user.email} for keyword: ${alert.keyword}`);
        }
        if (alert.notifyTelegram && alert.user.telegramChatId) {
          console.log(`[Telegram Dispatch] Sending Job Alert DM to Chat ID: ${alert.user.telegramChatId}`);
          // In production: trigger Telegram Bot sendMessage API here using alert.user.telegramChatId
        }
      }
    }

    // Emit In-App Notification to Company Members
    if (job.company.members && job.company.members.length > 0) {
      await prisma.notification.createMany({
        data: job.company.members.map(member => ({
          userId: member.userId,
          type: "JOB_APPROVAL",
          title: "Job Approved & Published",
          message: `Your job "${job.title}" has been approved and is now live on the platform.`,
          link: `/company/jobs`
        }))
      });
    }

    revalidatePath("/admin/jobs");
    return { success: true, message: "Job approved and cross-posted successfully." };
  } catch (error) {
    return { error: "Failed to approve job" };
  }
}

export async function removeJob(jobId: string) {
  await verifyAdmin();
  try {
    await prisma.job.update({
      where: { id: jobId },
      data: { deletedAt: new Date(), isActive: false },
    });
    revalidatePath("/admin/jobs");
    return { success: true, message: "Job removed from the platform." };
  } catch (error) {
    return { error: "Failed to remove job" };
  }
}

export async function updateUserRole(userId: string, role: "CANDIDATE" | "COMPANY" | "ADMIN") {
  await verifyAdmin();
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });
    revalidatePath("/admin/users");
    return { success: true, message: "User role updated successfully." };
  } catch (error) {
    return { error: "Failed to update user role" };
  }
}
