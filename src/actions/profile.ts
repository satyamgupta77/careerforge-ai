"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function upsertCandidateProfile(data: any) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const existing = await prisma.portfolio.findFirst({ where: { userId: session.user.id } });
    
    if (existing) {
      await prisma.portfolio.update({
        where: { id: existing.id },
        data: {
          bio: data.bio,
          linkedin: data.linkedin,
          github: data.github,
          website: data.website,
        },
      });
    } else {
      await prisma.portfolio.create({
        data: {
          userId: session.user.id,
          bio: data.bio,
          linkedin: data.linkedin,
          github: data.github,
          website: data.website,
        },
      });
    }
    
    revalidatePath("/dashboard/profile");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    return { error: "Failed to update profile" };
  }
}

export async function addSkill(name: string, level?: number) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const portfolio = await prisma.portfolio.findFirst({ where: { userId: session.user.id } });
    if (!portfolio) return { error: "Please save your basic profile first." };

    await prisma.skill.create({
      data: {
        name,
        level,
        portfolioId: portfolio.id,
      }
    });

    revalidatePath("/dashboard/profile");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add skill" };
  }
}

export async function getApplicationHistory() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const applications = await prisma.jobApplication.findMany({
      where: { userId: session.user.id },
      include: {
        job: {
          include: { company: true }
        }
      },
      orderBy: { createdAt: "desc" }
    });
    
    return { success: true, data: applications };
  } catch (error) {
    return { error: "Failed to fetch applications" };
  }
}

export async function upsertPortfolioSettings(data: { username?: string; customDomain?: string; template?: string }) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  try {
    const portfolio = await prisma.portfolio.findFirst({ where: { userId: session.user.id } });
    
    if (portfolio) {
      await prisma.portfolio.update({
        where: { id: portfolio.id },
        data,
      });
    } else {
      await prisma.portfolio.create({
        data: {
          userId: session.user.id,
          ...data,
        },
      });
    }

    revalidatePath("/dashboard/portfolio-builder");
    revalidatePath(`/p/${data.username}`);
    return { success: true, message: "Portfolio settings updated!" };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "That username or domain is already taken." };
    }
    return { error: "Failed to update portfolio settings" };
  }
}
