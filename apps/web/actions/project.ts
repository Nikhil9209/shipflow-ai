"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";

// ============================
// Create Project
// ============================

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

  revalidatePath(`/workspaces/${workspaceId}`);
}

// ============================
// Get All Projects
// ============================

export async function getProjects() {
  return await prisma.project.findMany({
    include: {
      workspace: true,
      featureRequests: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ============================
// Update Project
// ============================

export async function updateProject(
  projectId: string,
  name: string,
  description: string
) {
  if (!name.trim()) {
    throw new Error("Project name is required.");
  }

  const project = await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      name,
      description,
    },
    include: {
      workspace: true,
    },
  });

  revalidatePath(`/projects/${projectId}`);
  revalidatePath(`/workspaces/${project.workspaceId}`);
}

// ============================
// Delete Project
// ============================

export async function deleteProject(projectId: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
  });

  if (!project) {
    throw new Error("Project not found.");
  }

  await prisma.project.delete({
  where: {
    id: projectId,
  },
});

revalidatePath(`/workspaces/${project.workspaceId}`);

return {
  workspaceId: project.workspaceId,
};
}