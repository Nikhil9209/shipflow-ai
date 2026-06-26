"use client";

import { useState } from "react";
import { updateFeature } from "../actions/update-feature";

type Props = {
  featureId: string;
  initialTitle: string;
  initialDescription: string;
};

export default function EditFeatureForm({
  featureId,
  initialTitle,
  initialDescription,
}: Props) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    try {
      setLoading(true);

      await updateFeature(
        featureId,
        title,
        description
      );

      setEditing(false);
      alert("Feature updated successfully.");
    } catch (error) {
      console.error(error);
      alert("Failed to update feature.");
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
        Edit Feature
      </button>
    );
  }

  return (
    <div className="mt-6 space-y-4">

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={5}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="rounded-lg bg-green-600 px-5 py-3 hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>

    </div>
  );
}