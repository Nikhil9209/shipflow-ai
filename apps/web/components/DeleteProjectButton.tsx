"use client";

import { deleteProject } from "../actions/project";
import { useRouter } from "next/navigation";
type Props = {
  projectId: string;
};

export default function DeleteProjectButton({
  projectId,
}: Props) {
    const router = useRouter();
  async function handleDelete() {

    const ok = confirm(
      "Are you sure you want to delete this project?"
    );

    if (!ok) return;

    try {

        const result = await deleteProject(projectId);

router.push(`/workspaces/${result.workspaceId}`);
router.refresh();

    } catch (error) {

      console.error(error);

      alert("Failed to delete project.");

    }
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700"
    >
      Delete Project
    </button>
  );
}