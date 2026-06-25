import Link from "next/link";
import WorkspaceForm from "../../../components/WorkspaceForm";
import { prisma } from "../../../lib/prisma";

export default async function WorkspacesPage() {
  const workspaces = await prisma.workspace.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold">
        Workspaces
      </h1>

      <p className="mt-2 text-slate-400">
        Manage your organization workspaces.
      </p>

      <WorkspaceForm />

      <div className="mt-10 space-y-4">
        {workspaces.length === 0 ? (
          <div className="rounded-xl bg-slate-900 p-6 text-slate-400">
            No workspaces yet.
          </div>
        ) : (
          workspaces.map((workspace) => (
            <div
              key={workspace.id}
              className="rounded-xl bg-slate-900 p-6"
            >
              <h2 className="text-xl font-semibold">
                {workspace.name}
              </h2>
              <Link href={`/workspaces/${workspace.id}`}>
  <button className="mt-4 rounded-lg bg-blue-600 px-4 py-2 hover:bg-blue-700">
    Open Workspace
  </button>
</Link>

              <p className="mt-2 text-sm text-slate-400">
                Created {new Date(workspace.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}