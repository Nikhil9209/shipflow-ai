"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
export async function updateClarification(
  featureId: string,
  questions: string,
  answers: string
) {
  return await prisma.featureRequest.update({
    where: {
      id: featureId,
    },
    data: {
      clarificationQuestions: questions,
      clarificationAnswers: answers,
    },
  });
}
export async function updateFeature(
  featureId: string,
  title: string,
  description: string
) {
  const feature = await prisma.featureRequest.update({
    where: {
      id: featureId,
    },
    data: {
      title,
      description,
    },
  });

  revalidatePath(`/features/${featureId}`);

  return feature;
}