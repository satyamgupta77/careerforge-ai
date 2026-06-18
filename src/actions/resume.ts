"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createResume(title: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const resume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        content: {}, // Will be populated with default ResumeData later
      },
    });
    revalidatePath("/dashboard/resumes");
    return { success: true, resume };
  } catch (error) {
    return { error: "Failed to create resume" };
  }
}

export async function updateResumeContent(id: string, content: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.resume.update({
      where: { id, userId: session.user.id },
      data: { content },
    });
    return { success: true };
  } catch (error) {
    return { error: "Failed to update resume" };
  }
}

export async function updateResumeTheme(id: string, templateId: string, themeColor: string, fontFamily: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    await prisma.resume.update({
      where: { id, userId: session.user.id },
      data: { templateId, themeColor, fontFamily }
    });
    revalidatePath("/candidate/resumes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update theme" };
  }
}

export async function duplicateResume(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const existingResume = await prisma.resume.findUnique({
      where: { id, userId: session.user.id },
    });

    if (!existingResume) return { error: "Resume not found" };

    const newResume = await prisma.resume.create({
      data: {
        userId: session.user.id,
        title: `${existingResume.title} (Copy)`,
        content: existingResume.content || {},
      },
    });
    
    revalidatePath("/dashboard/resumes");
    return { success: true, resume: newResume };
  } catch (error) {
    return { error: "Failed to duplicate resume" };
  }
}

export async function deleteResume(id: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    // Soft delete if the schema supports it, or hard delete
    await prisma.resume.update({
      where: { id, userId: session.user.id },
      data: { deletedAt: new Date() },
    });
    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete resume" };
  }
}
