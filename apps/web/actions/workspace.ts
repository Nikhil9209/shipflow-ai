"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

export async function createWorkspace(name: string) {
  if (!name.trim()) {
    throw new Error("Workspace name is required.");
  }

  await prisma.workspace.create({
    data: {
      name,
    },
  });

  revalidatePath("/workspaces");
}