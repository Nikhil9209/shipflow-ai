"use client";

import { useState } from "react";
import { updateProject } from "../actions/project";
import { useRouter } from "next/navigation";
type Props = {
  projectId: string;
  initialName: string;
  initialDescription: string;
};

export default function EditProjectForm({
  projectId,
  initialName,
  initialDescription,
}: Props) {
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(
    initialDescription
  );

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSave() {
    if (!name.trim()) {
      alert("Project name is required.");
      return;
    }

    try {
      setLoading(true);
await updateProject(
  projectId,
  name,
  description
);

setEditing(false);

router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to update project.");
    } finally {
      setLoading(false);
    }
  }

  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="rounded-lg bg-yellow-600 px-4 py-2 hover:bg-yellow-700"
      >
        Edit Project
      </button>
    );
  }

  return (
    <div className="mt-6 rounded-xl bg-slate-900 p-6 space-y-4">

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Project Name"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
        placeholder="Project Description"
      />

      <div className="flex gap-3">

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-lg bg-green-600 px-5 py-2 hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          onClick={() => {
            setEditing(false);
            setName(initialName);
            setDescription(initialDescription);
          }}
          className="rounded-lg bg-slate-700 px-5 py-2 hover:bg-slate-600"
        >
          Cancel
        </button>

      </div>

    </div>
  );
}