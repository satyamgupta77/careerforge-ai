"use server";

import * as pdfParseModule from "pdf-parse";
const pdfParse = (pdfParseModule as any).default || pdfParseModule;
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

// A simple heuristic function to extract potential keywords
function extractKeywords(text: string): string[] {
  const words = text.toLowerCase().replace(/[^a-z0-9\s]/g, "").split(/\s+/);
  // Filter out common stop words, keep words > 3 chars
  const stopWords = new Set(["this", "that", "with", "from", "your", "have", "more", "will", "about", "which", "their", "they", "there", "what", "when", "where", "who", "why", "how", "and", "the", "for"]);
  const keywords = words.filter(w => w.length > 3 && !stopWords.has(w));
  return Array.from(new Set(keywords));
}

export async function generateATSReport(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const file = formData.get("resume") as File;
  const jobDescription = formData.get("jobDescription") as string;
  const resumeId = formData.get("resumeId") as string | null; // Optional if linked to a saved resume

  if (!file || !jobDescription) {
    return { error: "Missing resume or job description" };
  }

  try {
    // 1. Parse PDF
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const pdfData = await pdfParse(buffer);
    const resumeText = pdfData.text;

    // 2. Extract Keywords
    const jdKeywords = extractKeywords(jobDescription);
    const resumeKeywordsSet = new Set(extractKeywords(resumeText));

    const keywordsFound: string[] = [];
    const keywordsMissing: string[] = [];

    jdKeywords.forEach(kw => {
      if (resumeKeywordsSet.has(kw)) {
        keywordsFound.push(kw);
      } else {
        keywordsMissing.push(kw);
      }
    });

    // 3. Scoring
    const totalKeywords = jdKeywords.length;
    const score = totalKeywords > 0 ? Math.round((keywordsFound.length / totalKeywords) * 100) : 0;

    // Generate basic suggestions based on score
    const suggestions = [];
    if (score < 50) {
      suggestions.push("Your resume is missing many key terms from the job description. Try to organically include the missing keywords.");
    }
    if (keywordsMissing.length > 0) {
      suggestions.push(`Consider adding skills like: ${keywordsMissing.slice(0, 3).join(", ")}`);
    }

    // 4. Save Report (Optional if resumeId is provided, else just return data)
    let reportId = null;
    if (resumeId) {
      const report = await prisma.aTSReport.create({
        data: {
          resumeId,
          score,
          feedback: suggestions,
          keywordsFound,
          keywordsMissing,
          targetJobDesc: jobDescription,
        }
      });
      reportId = report.id;
    }

    return {
      success: true,
      data: {
        score,
        keywordsFound,
        keywordsMissing,
        suggestions,
        reportId
      }
    };

  } catch (error) {
    console.error("ATS Generation Error:", error);
    return { error: "Failed to process resume" };
  }
}
