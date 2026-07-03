import { GoogleGenerativeAI } from "@google/generative-ai";
import { resumePrompt } from "./prompts";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});

export async function analyzeResume(resumeText: string) {
  const result = await model.generateContent(
    `${resumePrompt}

Resume:

${resumeText}`
  );

  return result.response.text();
}