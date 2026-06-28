"use client";

import { useRouter } from "next/navigation";
import { updateTaskStatus } from "../actions/task";

type Props = {
  taskId: string;
  currentStatus: string;
};

export default function TaskStatusSelect({
  taskId,
  currentStatus,
}: Props) {
  const router = useRouter();

  return (
   <select
  key={currentStatus}
  value={currentStatus}
      onChange={async (e) => {
        try {
          await updateTaskStatus(
            taskId,
            e.target.value
          );

          router.refresh();
        } catch (error) {
          console.error(error);
          alert("Failed to update status.");
        }
      }}
      className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2"
    >
      <option value="Todo">Todo</option>
      <option value="In Progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
  );
}