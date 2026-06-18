"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { checkFeatureAccess } from "@/lib/billing";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateResumeWithAI(rawData: {
  fullName: string;
  email: string;
  phone: string;
  targetRole: string;
  skills: string;
  experience: string;
  education: string;
  projects: string;
}) {
  const session = await auth();
  if (!session?.user?.id || session.user.role !== "CANDIDATE") {
    return { error: "Unauthorized" };
  }

  // Check Billing Limits
  const access = await checkFeatureAccess("RESUME_DOWNLOAD"); // Proxy limit
  if (!access.allowed) {
    return { error: access.reason || "You have reached your limit. Please upgrade to Pro." };
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
    Act as an Executive Career Coach and Resume Writer. 
    I will provide raw, unformatted notes about a candidate.
    I need you to generate a highly professional, ATS-optimized JSON resume structure.
    
    Instructions:
    1. Write a compelling, action-oriented Professional Summary tailored to their Target Role.
    2. Group their Skills logically (e.g., Frontend, Backend, Tools) based on their raw input.
    3. Rewrite their Experience and Projects into strong, impactful bullet points using the XYZ formula (Accomplished [X] as measured by [Y], by doing [Z]). Fix any grammar or spelling issues.
    4. Format the output EXACTLY according to this JSON schema. DO NOT include markdown blocks (\`\`\`json). Return ONLY the raw JSON string.

    JSON SCHEMA TO FOLLOW:
    {
      "personalInfo": {
        "fullName": "string",
        "email": "string",
        "phone": "string",
        "title": "string (Target Role)",
        "summary": "string"
      },
      "experience": [
        {
          "id": "string (generate random uuid)",
          "company": "string (infer from text, or 'Unknown Company')",
          "role": "string",
          "date": "string",
          "description": "string (HTML formatting with <ul><li>...</li></ul> for bullet points)"
        }
      ],
      "education": [
        {
          "id": "string",
          "school": "string",
          "degree": "string",
          "date": "string"
        }
      ],
      "projects": [
        {
          "id": "string",
          "name": "string",
          "description": "string (HTML formatting with <ul><li>...</li></ul>)"
        }
      ],
      "skills": "string (Comma separated, ATS grouped, e.g. 'Frontend: React, Vue | Backend: Node, Python')"
    }

    --- RAW INPUT DATA ---
    Full Name: ${rawData.fullName}
    Email: ${rawData.email}
    Phone: ${rawData.phone}
    Target Role: ${rawData.targetRole}
    Raw Skills: ${rawData.skills}
    Raw Experience: ${rawData.experience}
    Raw Projects: ${rawData.projects}
    Raw Education: ${rawData.education}
    `;

    const result = await model.generateContent(prompt);
    let textResult = result.response.text().trim();
    // Clean up markdown markers if AI ignores instructions
    textResult = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const resumeData = JSON.parse(textResult);

    // Save directly to the database
    const newResume = await prisma.resume.create({
      data: {
        title: `${rawData.targetRole} Resume (AI Generated)`,
        content: resumeData,
        userId: session.user.id,
      }
    });

    // Emit In-App Notification to Candidate
    await prisma.notification.create({
      data: {
        userId: session.user.id,
        type: "RESUME_GENERATED",
        title: "AI Resume Ready",
        message: `Your customized resume for "${rawData.targetRole}" has been generated successfully.`,
        link: `/candidate/resumes/${newResume.id}`
      }
    });

    return { success: true, resumeId: newResume.id };

  } catch (error: any) {
    console.error("AI Generation Error:", error.message);
    return { error: "Failed to generate resume. Please check your inputs and try again." };
  }
}
