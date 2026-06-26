"use client";
import { useState } from "react";
import { createPRDVersion } from "../actions/prd";
import { useRouter } from "next/navigation";
import { restorePRDVersion } from "../actions/prd";
type Props = {
  prdId: string;
  title: string;
  content: string;
};

export default function EditPRDForm({
  prdId,
  title,
  content,
}: Props) {
    const [prdTitle, setPrdTitle] = useState(title);
const [prdContent, setPrdContent] = useState(content);
const router = useRouter();
  return (
<div className="mt-8 rounded-xl bg-slate-900 p-6">

  <h2 className="mb-4 text-2xl font-bold">
    Edit PRD
  </h2>

  <input
    type="text"
    value={prdTitle}
    onChange={(e) => setPrdTitle(e.target.value)}
    className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
  />

  <textarea
    value={prdContent}
    onChange={(e) => setPrdContent(e.target.value)}
    rows={15}
    className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
  />
  <button
  onClick={async () => {
    try {
      await createPRDVersion(
        prdId,
        prdTitle,
        prdContent
      );

      alert("New PRD version created.");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to create PRD version.");
    }
  }}
  className="mt-4 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
>
  Save New Version
</button>

</div>
  );
}