import { prisma } from "../../../../lib/prisma";
import ProjectForm from "../../../../components/ProjectForm";
import Link from "next/link";

type Props = {
  params: Promise<{
    workspaceId: string;
  }>;
};

export default async function WorkspaceDetailsPage({
  params,
}: Props) {
  const { workspaceId } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    include: {
      projects: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!workspace) {
    return (
      <div className="p-8">
        Workspace not found.
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        {workspace.name}
      </h1>

      <p className="mt-2 text-slate-400">
        Manage projects inside this workspace.
      </p>

      <div className="mt-8 rounded-xl bg-slate-900 p-6">
        <h2 className="mb-4 text-2xl font-bold">
          Create Project
        </h2>

        <ProjectForm workspaceId={workspace.id} />
      </div>

      <div className="mt-10">

        <h2 className="mb-5 text-2xl font-bold">
          Projects
        </h2>

        {workspace.projects.length === 0 ? (
          <div className="rounded-xl bg-slate-900 p-6 text-slate-400">
            No projects yet.
          </div>
        ) : (
          <div className="space-y-4">

            {workspace.projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl bg-slate-900 p-6"
              >
                <h3 className="text-xl font-semibold">
                  {project.name}
                </h3>

                <p className="mt-2 text-slate-400">
                  {project.description}
                </p>
                <Link href={`/projects/${project.id}`}>
  <button className="mt-4 rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700">
    Open Project
  </button>
</Link>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}