"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteFeature(
  featureId: string,
  projectId: string
) {
  await prisma.featureRequest.delete({
    where: {
      id: featureId,
    },
  });

  revalidatePath(`/projects/${projectId}`);
}