"use client";

import { useState } from "react";
import { clarificationAction } from "../actions/clarification";

import {
  generatePRDAction,
  generateTasksAction,
} from "../actions/feature";

import { createFeatureRequest } from "../actions/feature-request";
import { createPRD } from "../actions/prd";
type Props = {
  projectId: string;
};
import { createTasks } from "../actions/task";
import { updateClarification } from "../actions/update-feature";
export default function FeatureRequestForm({
  projectId,
}: Props) {
      const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [prd, setPrd] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState("");
const [answers, setAnswers] = useState("");
const [prdId, setPrdId] = useState("");
async function handleSaveFeature() {
  if (!title.trim()) {
    alert("Feature title is required.");
    return;
  }

  try {
    setLoading(true);

    const feature = await createFeatureRequest(
      title,
      description,
      projectId
    );

    setFeatureId(feature.id);

    alert("Feature Request saved successfully.");

  } catch (error) {
    console.error(error);
    alert("Failed to save Feature Request.");
  } finally {
    setLoading(false);
  }
}
  function parseTasks(markdown: string): string[] {
  return markdown
    .split("\n")
    .filter((line) => line.trim().startsWith("-"))
    .map((line) =>
      line
        .replace("- [ ]", "")
        .replace("- ", "")
        .trim()
    );
}
const [featureId, setFeatureId] = useState("");


    return (
  <div className="space-y-8">

    <div>

      <label className="mb-2 block font-medium">
        Feature Title
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter feature title"
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

    </div>

    <div>

      <label className="mb-2 block font-medium">
        Description
      </label>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe your feature..."
        rows={6}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />

    </div>

    <div className="flex gap-4">

      <button
        onClick={handleSaveFeature}
        disabled={loading}
        className="rounded-lg bg-emerald-600 px-5 py-3 hover:bg-emerald-700 disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Feature"}
      </button>
<button
  onClick={async () => {
    setLoading(true);

    try {
      const result = await clarificationAction(
        title,
        description
      );

      setQuestions(result ?? "");
      if (featureId && result) {
  await updateClarification(
    featureId,
    result,
    ""
  );
}
    } catch (error) {
      console.error(error);
      alert("Failed to get AI clarification.");
    } finally {
      setLoading(false);
    }
  }}
  disabled={loading}
  className="rounded-lg bg-purple-600 px-5 py-3 hover:bg-purple-700 disabled:opacity-50"
>
  {loading ? "Thinking..." : "Ask AI"}
</button>


<button
  onClick={async () => {
    setLoading(true);

    try {
      const finalDescription =
        questions && questions !== "READY_FOR_PRD"
          ? `${description}

AI Questions:
${questions}

User Answers:
${answers}`
          : description;
          if (featureId && questions) {
  await updateClarification(
    featureId,
    questions,
    answers
  );
}

      const result = await generatePRDAction(
        title,
        finalDescription
      );
      console.log("PRD Result:", result);

      setPrd(result ?? "");
      if (featureId && result) {
  const prd = await createPRD(
    featureId,
    title,
    result
  );

  setPrdId(prd.id);
}
    } 
    
    catch (error) {
  console.error("PRD Error:", error);
  alert(String(error));
}finally {
      setLoading(false);
    }
  }}
  disabled={loading}
  className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700 disabled:opacity-50"
>
  {loading ? "Generating..." : "Generate PRD"}
</button>

    </div>
    {questions && (
  <div className="rounded-xl bg-slate-900 p-6">

    <h2 className="mb-4 text-2xl font-bold">
      AI Clarification
    </h2>

    <pre className="whitespace-pre-wrap text-slate-300">
      {questions}
    </pre>

    {questions !== "READY_FOR_PRD" && (
      <textarea
        value={answers}
        onChange={(e) => setAnswers(e.target.value)}
        placeholder="Answer the questions here..."
        rows={6}
        className="mt-4 w-full rounded-lg border border-slate-700 bg-slate-800 p-3"
      />
    )}
 
  </div>
)}
   {prd && (
  <div className="mt-6 rounded-xl bg-slate-900 p-6">
    <h2 className="mb-4 text-2xl font-bold">
      Generated PRD
    </h2>

    <pre className="whitespace-pre-wrap text-slate-300">
      {prd}
    </pre>

    <button
      onClick={async () => {
        try {
          setLoading(true);

          const markdown = await generateTasksAction(prd);

          const parsedTasks = parseTasks(markdown ?? "");

          setTasks(parsedTasks);
          if (prdId && parsedTasks.length > 0) {
  await createTasks(
    prdId,
    parsedTasks
  );
}
        }
        
         catch (error) {
          console.error(error);
          alert("Failed to generate tasks.");
        } finally {
          setLoading(false);
        }
      }}
      disabled={loading}
      className="mt-4 rounded-lg bg-green-600 px-5 py-3 hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? "Generating..." : "Generate Tasks"}
    </button>
  </div>
)}
{tasks.length > 0 && (
  <div className="mt-6">
    <h2 className="mb-4 text-2xl font-bold">
      Generated Tasks
    </h2>

    <div className="grid grid-cols-3 gap-6">

      <div className="rounded-xl bg-slate-900 p-4">
        <h3 className="mb-4 font-bold">
          Todo
        </h3>

        {tasks.map((task, index) => (
          <div
            key={index}
            className="mb-3 rounded-lg bg-slate-800 p-3"
          >
            {task}
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-slate-900 p-4">
        <h3 className="mb-4 font-bold">
          In Progress
        </h3>
      </div>

      <div className="rounded-xl bg-slate-900 p-4">
        <h3 className="mb-4 font-bold">
          Done
        </h3>
      </div>

    </div>
  </div>
)}

  </div>
);

}