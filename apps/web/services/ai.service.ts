import { ai } from "../lib/gemini";

async function generateWithRetry(prompt: string) {
  const MAX_RETRIES = 3;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text ?? "";
    } catch (error) {
      console.log(`Attempt ${attempt} failed`);

      if (attempt === MAX_RETRIES) {
        throw error;
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  return "";
}

export async function generatePRD(
  title: string,
  description: string
) {
  const prompt = `
You are an experienced Senior Product Manager.

Generate a professional Product Requirements Document.

Feature Title:
${title}

Description:
${description}

Return ONLY markdown.

Structure:

# Overview

# Goals

# Functional Requirements

# Non Functional Requirements

# Acceptance Criteria

Do not add introductions or explanations.
`;

  return await generateWithRetry(prompt);
}

export async function generateTasks(prd: string) {
  const prompt = `
You are a Senior Software Architect.

Read this Product Requirements Document.

Generate development tasks.

Rules:

- Return ONLY markdown checklist.
- Between 10 and 20 tasks.
- Tasks must be small.
- Include frontend tasks.
- Include backend tasks.
- Include database tasks.
- Include testing tasks.
- Include deployment task.

PRD:

${prd}
`;

  return await generateWithRetry(prompt);
}