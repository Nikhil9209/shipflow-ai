import { ai } from "../lib/gemini";

export async function generatePRD(
  title: string,
  description: string
) {
  const prompt = `
You are an expert Senior Product Manager.

Generate a professional Product Requirements Document.

Feature Title:
${title}

Description:
${description}

Return the PRD with these sections:

# Overview

# Goals

# Functional Requirements

# Non Functional Requirements

# Acceptance Criteria

Return only markdown.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  return response.text;
}