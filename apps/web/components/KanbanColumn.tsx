"use client";

import { useDroppable } from "@dnd-kit/core";
import KanbanTaskCard from "./KanbanTaskCard";

type Task = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  title: string;
  tasks: Task[];
};

export default function KanbanColumn({
  title,
  tasks,
}: Props) {
    const { setNodeRef } = useDroppable({
  id: title,
});
  return (
<div
  ref={setNodeRef}
  className="min-h-[350px] rounded-xl bg-slate-900 p-4"
>

      <h2 className="mb-4 flex items-center justify-between text-xl font-bold">
  <span>{title}</span>

  <span className="rounded-full bg-slate-800 px-3 py-1 text-sm">
    {tasks.length}
  </span>
</h2>

<div className="space-y-3">
  {tasks.length === 0 ? (
    <div className="rounded-lg border border-dashed border-slate-700 p-6 text-center text-sm text-slate-500">
      No tasks
    </div>
  ) : (
    tasks.map((task) => (
      <KanbanTaskCard
        key={task.id}
        id={task.id}
        title={task.title}
      />
    ))
  )}
</div>

    </div>
  );
}