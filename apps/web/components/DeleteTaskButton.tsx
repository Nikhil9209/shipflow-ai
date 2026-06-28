"use client";

import { useRouter } from "next/navigation";
import { deleteTask } from "../actions/task";

type Props = {
  taskId: string;
};

export default function DeleteTaskButton({
  taskId,
}: Props) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const confirmed = confirm(
          "Are you sure you want to delete this task?"
        );

        if (!confirmed) return;

        try {
          await deleteTask(taskId);

          alert("Task deleted successfully.");

          router.refresh();
        } catch (error) {
          console.error(error);
          alert("Failed to delete task.");
        }
      }}
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
    >
      Delete Task
    </button>
  );
}