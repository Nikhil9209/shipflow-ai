"use client";

import { useState } from "react";

export default function FeatureRequestsPage() {
  const [prd, setPrd] = useState("");
  const [tasks, setTasks] = useState<string[]>([]);

  return (
    <div className="max-w-6xl">
      <h1 className="text-4xl font-bold">
        Feature Requests
      </h1>

      <p className="mt-2 text-slate-400">
        Convert feature ideas into PRDs and tasks.
      </p>

      <div className="mt-8 bg-slate-900 p-6 rounded-xl">
        <div className="space-y-6">

          <div>
            <label className="block mb-2 font-medium">
              Feature Title
            </label>

            <input
              type="text"
              placeholder="Enter feature title"
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              placeholder="Describe your feature..."
              rows={6}
              className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
            />
          </div>

          <button
            onClick={() => {
              setPrd(`
# Product Requirements Document

## Overview
This feature will allow users to enable dark mode across the application.

## Goals
- Improve user experience
- Reduce eye strain
- Support modern UI preferences

## Acceptance Criteria
- User can toggle dark mode
- Preference is saved
- UI updates instantly
`);
            }}
            className="px-5 py-3 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Generate PRD
          </button>
        </div>
      </div>

      {prd && (
        <div className="mt-6 bg-slate-900 p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">
            Generated PRD
          </h2>

          <pre className="whitespace-pre-wrap text-slate-300">
            {prd}
          </pre>

          <button
            onClick={() => {
              setTasks([
                "Design dark mode UI",
                "Create theme context",
                "Implement toggle button",
                "Store user preference",
                "Write tests",
              ]);
            }}
            className="mt-4 px-5 py-3 bg-green-600 rounded-lg hover:bg-green-700"
          >
            Generate Tasks
          </button>
        </div>
      )}

      {tasks.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">
            Generated Tasks
          </h2>

          <div className="grid grid-cols-3 gap-6">
            <div className="bg-slate-900 p-4 rounded-xl">
              <h3 className="font-bold mb-4">
                Todo
              </h3>

              {tasks.map((task, index) => (
                <div
                  key={index}
                  className="bg-slate-800 p-3 rounded-lg mb-3"
                >
                  {task}
                </div>
              ))}
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <h3 className="font-bold mb-4">
                In Progress
              </h3>
            </div>

            <div className="bg-slate-900 p-4 rounded-xl">
              <h3 className="font-bold mb-4">
                Done
              </h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}