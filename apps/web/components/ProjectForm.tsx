"use client";

import { useState } from "react";
import { createProject } from "../actions/project";

type Props = {
  workspaceId: string;
};

export default function ProjectForm({ workspaceId }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await createProject(
        name,
        description,
        workspaceId
      );

      setName("");
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Failed to create project.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Project name"
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={4}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

      <button
        onClick={handleCreate}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create Project"}
      </button>

    </div>
  );
}