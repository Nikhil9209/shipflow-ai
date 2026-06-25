"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProject(
  name: string,
  description: string,
  workspaceId: string
) {
  if (!name.trim()) {
    throw new Error("Project name is required.");
  }

  await prisma.project.create({
    data: {
      name,
      description,
      workspaceId,
    },
  });

  revalidatePath("/projects");
}