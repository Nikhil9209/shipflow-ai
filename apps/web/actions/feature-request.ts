"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createFeatureRequest(
  title: string,
  description: string,
  projectId: string
) {
  if (!title.trim()) {
    throw new Error("Feature title is required.");
  }

  const feature = await prisma.featureRequest.create({
    data: {
      title,
      description,
      projectId,
    },
  });

  revalidatePath(`/projects/${projectId}`);

  return feature;
}