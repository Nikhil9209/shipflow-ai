import { prisma } from "../../../../lib/prisma";
import Link from "next/link";

type Props = {
  params: Promise<{
    projectId: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: Props) {
  const { projectId } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      featureRequests: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    return (
      <div className="p-8">
        Project not found.
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        {project.name}
      </h1>

      <p className="mt-2 text-slate-400">
        {project.description}
      </p>

      <Link
        href={`/feature-requests?projectId=${project.id}`}
      >
        <button className="mt-6 rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700">
          New Feature Request
        </button>
      </Link>

      <div className="mt-10">

        <h2 className="mb-4 text-2xl font-bold">
          Feature Requests
        </h2>

        {project.featureRequests.length === 0 ? (
          <div className="rounded-xl bg-slate-900 p-6 text-slate-400">
            No feature requests yet.
          </div>
        ) : (
          <div className="space-y-4">
            {project.featureRequests.map((feature) => (
              <div
                key={feature.id}
                className="rounded-xl bg-slate-900 p-6"
              >
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}