"use client";

import { useRouter } from "next/navigation";
import { deleteFeature } from "../actions/delete-feature";
import { useState } from "react";

type Props = {
  featureId: string;
  projectId: string;
};

export default function DeleteFeatureButton({
  featureId,
  projectId,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this feature?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await deleteFeature(
        featureId,
        projectId
      );

      router.push(`/projects/${projectId}`);
      router.refresh();

    } catch (error) {
      console.error(error);
      alert("Failed to delete feature.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 disabled:opacity-50"
    >
      {loading ? "Deleting..." : "Delete Feature"}
    </button>
  );
}