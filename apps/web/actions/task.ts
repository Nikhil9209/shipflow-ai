"use server";

import { prisma } from "../lib/prisma";

export async function createTasks(
  prdId: string,
  tasks: string[]
) {
  await prisma.task.createMany({
    data: tasks.map((task) => ({
      title: task,
      description: "",
      prdId,
    })),
  });
}
export async function updateTask(
  taskId: string,
  title: string,
  description: string
) {
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      title,
      description,
    },
  });
}
export async function deleteTask(
  taskId: string
) {
  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
}
export async function updateTaskStatus(
  taskId: string,
  status: string
) {
  return await prisma.task.update({
    where: {
      id: taskId,
    },
    data: {
      status,
    },
  });
}