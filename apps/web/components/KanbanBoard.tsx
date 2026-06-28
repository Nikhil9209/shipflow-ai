"use client";
import {
  DndContext,
  DragEndEvent,
} from "@dnd-kit/core";

import { useRouter } from "next/navigation";
import { updateTaskStatus } from "../actions/task";
import KanbanColumn from "./KanbanColumn";
type Task = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  tasks: Task[];
};

export default function KanbanBoard({
    
  tasks,
}: Props) {
    const router = useRouter();
    async function handleDragEnd(
  event: DragEndEvent
) {
  const { active, over } = event;

  if (!over) return;

  const taskId = String(active.id);
  const newStatus = String(over.id);

  await updateTaskStatus(
    taskId,
    newStatus
  );

  router.refresh();
}
  const todo = tasks.filter(
    (task) => task.status === "Todo"
  );

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  );

  const done = tasks.filter(
    (task) => task.status === "Done"
  );

  return (
     <DndContext onDragEnd={handleDragEnd}>
<div className="mt-10 grid grid-cols-3 gap-6">


      <KanbanColumn
  title="Todo"
  tasks={todo}
/>

<KanbanColumn
  title="In Progress"
  tasks={inProgress}
/>

<KanbanColumn
  title="Done"
  tasks={done}
/>

    </div>
</DndContext>
  );
  
}