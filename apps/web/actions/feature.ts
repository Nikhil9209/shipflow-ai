"use server";

import { generatePRD } from "../services/ai.service";

export async function generatePRDAction(
  title: string,
  description: string
) {
  return await generatePRD(title, description);
}