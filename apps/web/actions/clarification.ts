"use server";

import { generateClarificationQuestions } from "../services/clarification.service";

export async function clarificationAction(
  title: string,
  description: string
) {
  return await generateClarificationQuestions(
    title,
    description
  );
}