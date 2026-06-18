"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { scoreJobMatch } from "@/lib/recommendations";

export async function generateJobRecommendations() {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CANDIDATE") {
    return { error: "Unauthorized" };
  }

  try {
    const userId = session.user.id;
    
    // 1. Get Candidate's Resume Profile (Keywords)
    const resume = await prisma.resume.findFirst({
      where: { userId, isPrimary: true },
    });

    if (!resume) {
      return { error: "Please upload and set a primary resume to get recommendations." };
    }

    // 2. Fetch Active Jobs (In production: pre-filter using Postgres Array Intersection on extractedKeywords)
    // For MVP, we fetch top 10 recent active jobs
    const jobs = await prisma.job.findMany({
      where: { isActive: true, isApproved: true, deletedAt: null },
      orderBy: { publishedAt: 'desc' },
      take: 10,
      include: { company: true }
    });

    // 3. Score Jobs via Gemini (Tier 2 AI Scoring)
    const scoredJobs = [];
    for (const job of jobs) {
      // Check cache first
      let recommendation = await prisma.jobRecommendation.findUnique({
        where: { userId_jobId: { userId, jobId: job.id } }
      });

      if (!recommendation) {
        // Run AI match
        const aiScore = await scoreJobMatch(resume.content, job);
        
        // Save to cache
        recommendation = await prisma.jobRecommendation.create({
          data: {
            userId,
            jobId: job.id,
            matchScore: aiScore.matchScore,
            reasoning: aiScore.reasoning,
            recommendedSkills: aiScore.recommendedSkills
          }
        });
      }

      scoredJobs.push({
        ...job,
        recommendation
      });
    }

    // Sort by match score descending
    scoredJobs.sort((a, b) => b.recommendation.matchScore - a.recommendation.matchScore);

    return { success: true, data: scoredJobs };
  } catch (error) {
    console.error(error);
    return { error: "Failed to generate recommendations." };
  }
}
