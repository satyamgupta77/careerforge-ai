import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Tier 1: Keyword Extraction
export async function extractKeywords(text: string): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
    Extract exactly 10 key technical and domain skills from the following text.
    Return ONLY a raw JSON array of strings, in lowercase. Do not include markdown formatting.
    Example: ["react", "typescript", "frontend", "aws", "node"]
    
    Text: ${text.substring(0, 3000)}
    `;
    
    const result = await model.generateContent(prompt);
    const textResult = result.response.text().trim();
    // Clean markdown if present
    const cleanJson = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to extract keywords:", error);
    return [];
  }
}

// Tier 2: AI Scoring
export async function scoreJobMatch(resumeContent: any, job: any): Promise<{ matchScore: number, reasoning: string, recommendedSkills: string[] }> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
    Act as an expert technical recruiter. Analyze the Candidate Resume and the Job Description.
    Output a JSON object with the following schema:
    {
      "matchScore": number (0-100 indicating how well the candidate fits the role),
      "reasoning": string (1-2 sentences explaining why they are or aren't a fit),
      "recommendedSkills": string[] (up to 3 skills the job requires that the candidate is missing)
    }
    
    DO NOT include markdown block markers, only raw JSON.

    Resume:
    ${JSON.stringify(resumeContent).substring(0, 3000)}

    Job Title: ${job.title}
    Job Requirements: ${job.requirements}
    `;

    const result = await model.generateContent(prompt);
    const textResult = result.response.text().trim();
    const cleanJson = textResult.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to score job match:", error);
    return { matchScore: 0, reasoning: "AI Error evaluating match.", recommendedSkills: [] };
  }
}
