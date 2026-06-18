import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export const LIMITS = {
  FREE: {
    resumeDownloads: 3,
    atsChecks: 2,
    hasPortfolio: false,
    hasAIRoadmap: false,
    hasAIEnhancer: false,
  },
  PRO: {
    resumeDownloads: Infinity,
    atsChecks: Infinity,
    hasPortfolio: false,
    hasAIRoadmap: false,
    hasAIEnhancer: true,
  },
  PREMIUM: {
    resumeDownloads: Infinity,
    atsChecks: Infinity,
    hasPortfolio: true,
    hasAIRoadmap: true,
    hasAIEnhancer: true,
  }
};

export async function checkFeatureAccess(feature: "ATS_CHECK" | "RESUME_DOWNLOAD" | "PORTFOLIO" | "AI_ROADMAP" | "AI_ENHANCER") {
  const session = await auth();
  if (!session?.user?.id) return { allowed: false, reason: "Unauthorized" };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true }
  });

  if (!user) return { allowed: false, reason: "User not found" };

  const tier = user.subscription?.isActive ? user.subscription.tier : "FREE";
  const limits = LIMITS[tier as keyof typeof LIMITS];

  switch (feature) {
    case "ATS_CHECK":
      if (user.atsChecksCount >= limits.atsChecks) {
        return { allowed: false, reason: "ATS Check limit reached. Please upgrade to Pro." };
      }
      return { allowed: true };

    case "RESUME_DOWNLOAD":
      if (user.resumeDownloadsCount >= limits.resumeDownloads) {
        return { allowed: false, reason: "Resume download limit reached. Please upgrade to Pro." };
      }
      return { allowed: true };

    case "PORTFOLIO":
      if (!limits.hasPortfolio) {
        return { allowed: false, reason: "Portfolio Builder requires Premium." };
      }
      return { allowed: true };

    case "AI_ROADMAP":
      if (!limits.hasAIRoadmap) {
        return { allowed: false, reason: "AI Roadmaps require Premium." };
      }
      return { allowed: true };

    case "AI_ENHANCER":
      if (!limits.hasAIEnhancer) {
        return { allowed: false, reason: "AI Enhancer requires Pro." };
      }
      return { allowed: true };

    default:
      return { allowed: false, reason: "Unknown feature" };
  }
}

export async function incrementUsage(feature: "ATS_CHECK" | "RESUME_DOWNLOAD") {
  const session = await auth();
  if (!session?.user?.id) return;

  if (feature === "ATS_CHECK") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { atsChecksCount: { increment: 1 } }
    });
  } else if (feature === "RESUME_DOWNLOAD") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { resumeDownloadsCount: { increment: 1 } }
    });
  }
}
