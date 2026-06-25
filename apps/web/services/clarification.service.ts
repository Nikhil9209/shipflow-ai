import { ai } from "../lib/gemini";

export async function generateClarificationQuestions(
  title: string,
  description: string
) {
  const prompt = `
You are an experienced Senior Product Manager.

Your job is NOT to generate a PRD.

First determine whether enough information exists.

If information is incomplete:

Return ONLY a numbered list of up to 5 clarification questions.

If information is already complete:

Return ONLY:

READY_FOR_PRD

Feature Title:
${title}

Feature Description:
${description}
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}