
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateTask } from "../actions/task";

type Props = {
  taskId: string;
  initialTitle: string;
  initialDescription: string;
};

export default function EditTaskForm({
  taskId,
  initialTitle,
  initialDescription,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const router = useRouter();

return (
  <div className="rounded-xl bg-slate-900 p-6">

    <h2 className="mb-4 text-2xl font-bold">
      Edit Task
    </h2>

    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
    />

    <textarea
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows={6}
      className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
    />
    <button
  onClick={async () => {
    try {
const updatedTask = await updateTask(
  taskId,
  title,
  description
);

console.log("Updated Task:", updatedTask);

alert("Task updated successfully.");

router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update task.");
    }
  }}
  className="mt-4 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
>
  Save Changes
</button>

  </div>
);
}