"use client";

import { useState } from "react";
import { createWorkspace } from "../actions/workspace";

export default function WorkspaceForm() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name.trim()) return;

    try {
      setLoading(true);

      await createWorkspace(name);

      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create workspace.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex gap-3 mt-6">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Workspace name"
        className="flex-1 rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Creating..." : "Create"}
      </button>
    </div>
  );
}