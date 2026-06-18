"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

// 1. Profile Management
export async function upsertCompanyProfile(data: any) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "COMPANY") return { error: "Unauthorized" };

  try {
    const existing = await prisma.company.findFirst({ where: { members: { some: { userId: session.user.id } } } });
    
    if (existing) {
      await prisma.company.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.company.create({
        data: { ...data, members: { create: { userId: session.user.id, role: "OWNER" } } },
      });
    }
    revalidatePath("/company/settings");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { error: "Failed to update company profile" };
  }
}

export async function submitCompanyVerification(data: { officialEmail: string, linkedinProfile: string, website: string, gstNumber?: string }) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "COMPANY") return { error: "Unauthorized" };

  try {
    const existing = await prisma.company.findFirst({ where: { members: { some: { userId: session.user.id } } } });
    if (!existing) return { error: "Please complete your basic profile first." };

    await prisma.company.update({
      where: { id: existing.id },
      data: {
        officialEmail: data.officialEmail,
        linkedinProfile: data.linkedinProfile,
        website: data.website,
        gstNumber: data.gstNumber,
        verificationStatus: "PENDING"
      }
    });

    revalidatePath("/company/settings");
    return { success: true, message: "Verification documents submitted successfully." };
  } catch (error) {
    return { error: "Failed to submit verification" };
  }
}

// 2. Job Management
export async function createCompanyJob(data: any) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "COMPANY") return { error: "Unauthorized" };

  try {
    const company = await prisma.company.findFirst({ where: { members: { some: { userId: session.user.id } } } });
    if (!company) return { error: "Please create a company profile first." };

    // Strict Job Publishing Rule
    const isActive = company.verificationStatus === "VERIFIED" ? !!data.publishNow : false;

    let expiresAt = null;
    if (data.expiresAt) {
      expiresAt = new Date(data.expiresAt);
    } else {
      const d = new Date();
      d.setDate(d.getDate() + 30);
      expiresAt = d;
    }

    await prisma.job.create({
      data: {
        title: data.title,
        description: data.description,
        requirements: data.requirements,
        location: data.location,
        salaryRange: data.salary,
        type: data.type,
        expiresAt,
        isActive, // If not verified, defaults to Draft
        companyId: company.id,
        slug: `${data.title.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      },
    });
    revalidatePath("/company/jobs");
    return { success: true, message: "Job posted successfully!" };
  } catch (error) {
    return { error: "Failed to create job" };
  }
}

export async function closeJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "COMPANY") return { error: "Unauthorized" };

  try {
    const company = await prisma.company.findFirst({ where: { members: { some: { userId: session.user.id } } } });
    if (!company) return { error: "Company not found" };

    // Verify ownership
    const job = await prisma.job.findFirst({ where: { id: jobId, companyId: company.id } });
    if (!job) return { error: "Job not found" };

    // Instead of deleting, soft close it. Assuming we have a status or we use soft delete.
    // For MVP we just use deletedAt
    await prisma.job.update({
      where: { id: jobId },
      data: { deletedAt: new Date() },
    });
    
    revalidatePath("/company/jobs");
    return { success: true, message: "Job closed successfully" };
  } catch (error) {
    return { error: "Failed to close job" };
  }
}

// 3. Applicant Tracking
export async function updateApplicationStatus(applicationId: string, status: "APPLIED" | "REVIEWING" | "INTERVIEWING" | "OFFERED" | "REJECTED" | "WITHDRAWN") {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "COMPANY") return { error: "Unauthorized" };

  try {
    await prisma.jobApplication.update({
      where: { id: applicationId },
      data: { status },
    });
    
    // Revalidate paths that might show this data
    revalidatePath(`/company/jobs`);
    return { success: true, message: `Application marked as ${status}` };
  } catch (error) {
    return { error: "Failed to update application status" };
  }
}
