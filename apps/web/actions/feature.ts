"use server";

import {
  generatePRD,
  generateTasks,
} from "../services/ai.service";

export async function generatePRDAction(
  title: string,
  description: string
) {
  return await generatePRD(title, description);
}

export async function generateTasksAction(
  prd: string
) {
  return await generateTasks(prd);
}