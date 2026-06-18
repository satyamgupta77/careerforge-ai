"use server";

import { GoogleGenAI } from "@google/genai";
import { auth } from "@/auth";

// Initialize the SDK. It automatically picks up GEMINI_API_KEY from environment variables.
const ai = new GoogleGenAI({});

type EnhanceType = "experience" | "summary" | "skills" | "achievements";

export async function enhanceWithAI(text: string, type: EnhanceType) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  if (!text || text.trim().length < 5) {
    return { error: "Text is too short to enhance." };
  }

  let prompt = "";

  switch (type) {
    case "experience":
      prompt = `You are an expert technical recruiter. Rewrite the following professional experience description to be ATS-optimized. Use strong action verbs, quantify achievements where applicable, and maintain a professional tone. Return ONLY the rewritten text, without formatting.\n\nOriginal: ${text}`;
      break;
    case "summary":
      prompt = `You are an expert technical recruiter. Rewrite the following professional summary to be highly impactful, concise, and ATS-optimized. Return ONLY the rewritten text, without formatting.\n\nOriginal: ${text}`;
      break;
    case "skills":
      prompt = `You are an expert technical recruiter. Reformat and optimize the following skills list to be highly readable for ATS parsers. Group them logically if possible. Return ONLY the rewritten text, without formatting.\n\nOriginal: ${text}`;
      break;
    case "achievements":
      prompt = `You are an expert technical recruiter. Rewrite the following achievements to sound more impressive and data-driven. Return ONLY the rewritten text, without formatting.\n\nOriginal: ${text}`;
      break;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    
    if (response.text) {
      return { success: true, text: response.text.trim() };
    } else {
      return { error: "Failed to generate content." };
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    return { error: "An error occurred while enhancing your text. Check your API key." };
  }
}

export async function generateCareerRoadmap(role: string) {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const prompt = `You are an expert tech career coach. Generate a detailed, highly practical learning roadmap for becoming a ${role}. 
  Return ONLY a raw JSON object (without markdown wrapping) with exactly this structure:
  {
    "months": [
      { "month": "Month 1-2", "focus": "Core Basics", "topics": ["HTML", "CSS"] }, ...
    ],
    "skills": ["Skill 1", "Skill 2"],
    "resources": [
      { "name": "Resource Name", "type": "Course/Book" }
    ],
    "projects": [
      { "title": "Project Idea", "description": "What to build" }
    ]
  }`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    if (response.text) {
      return { success: true, data: JSON.parse(response.text) };
    }
    return { error: "Failed to generate roadmap." };
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    return { error: "Failed to generate roadmap. Check API configuration." };
  }
}
