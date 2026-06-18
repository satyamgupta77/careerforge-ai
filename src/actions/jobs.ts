"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function saveJob(jobId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const existing = await prisma.savedJob.findFirst({
      where: { userId: session.user.id, jobId },
    });

    if (existing) {
      // Unsave if already saved
      await prisma.savedJob.delete({ where: { id: existing.id } });
      revalidatePath("/jobs");
      return { success: true, message: "Job removed from saved list" };
    }

    await prisma.savedJob.create({
      data: {
        userId: session.user.id,
        jobId,
      },
    });
    revalidatePath("/jobs");
    return { success: true, message: "Job saved successfully" };
  } catch (error) {
    return { error: "Failed to save job" };
  }
}

export async function applyJob(jobId: string, resumeId: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const existing = await prisma.jobApplication.findFirst({
      where: { userId: session.user.id, jobId },
    });

    if (existing) {
      return { error: "You have already applied to this job." };
    }

    await prisma.jobApplication.create({
      data: {
        userId: session.user.id,
        jobId,
        resumeId,
        status: "APPLIED",
      },
    });
    revalidatePath("/jobs");
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    return { error: "Failed to apply to job" };
  }
}

export async function reportJob(jobId: string, reason: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // In a real app, save to a Report table. For now, we simulate success.
    console.log(`Job ${jobId} reported by ${session.user.id} for: ${reason}`);
    return { success: true, message: "Job reported successfully. Our team will review it." };
  } catch (error) {
    return { error: "Failed to report job" };
  }
}
