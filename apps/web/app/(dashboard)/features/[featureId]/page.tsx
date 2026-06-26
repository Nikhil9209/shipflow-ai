import { prisma } from "../../../../lib/prisma";
import EditFeatureForm from "../../../../components/EditFeatureForm";
import DeleteFeatureButton from "../../../../components/DeleteFeatureButton";
import EditPRDForm from "../../../../components/EditPRDForm";
import Link from "next/link";
import VersionHistory from "../../../../components/VersionHistory";
import { restorePRDAction } from "../../../../actions/prd";
import EditTaskForm from "../../../../components/EditTaskForm";
type Props = {
  params: Promise<{
    featureId: string;
  }>;
  searchParams: Promise<{
    version?: string;
  }>;
};

export default async function FeatureDetailsPage({
  params,
  searchParams,
}: Props) {
  const { featureId } = await params;
const { version } = await searchParams;
  const feature = await prisma.featureRequest.findUnique({
    where: {
      id: featureId,
    },
include: {
prds: {
  orderBy: {
    version: "desc",
  },
  include: {
    tasks: true,
  },
},
},
  });

  if (!feature) {
    return (
      <div className="p-8">
        Feature not found.
      </div>
    );
  }
const selectedPrd = version
  ? feature.prds.find(
      (prd) => prd.version === Number(version)
    )
  : feature.prds.at(0);

const latestPrd = selectedPrd ?? feature.prds.at(0);
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold">
        {feature.title}
      </h1>

      <p className="mt-4 text-slate-400">
        {feature.description}
      </p>

      <div className="mt-6 flex gap-4">
        <EditFeatureForm
          featureId={feature.id}
          initialTitle={feature.title}
          initialDescription={feature.description}
        />

        <DeleteFeatureButton
          featureId={feature.id}
          projectId={feature.projectId}
        />
      </div>

      {feature.prds.length > 0 && (
        <div className="mt-10">

          <h2 className="mb-4 text-2xl font-bold">
            Generated PRD
          </h2>

          <div className="rounded-xl bg-slate-900 p-6">
            <pre className="whitespace-pre-wrap text-slate-300">
              {latestPrd?.content}
            </pre>
<form action={restorePRDAction}>
  <input
    type="hidden"
    name="prdId"
    value={latestPrd!.id}
  />

  <input
    type="hidden"
    name="featureId"
    value={feature.id}
  />

  <button
    type="submit"
    className="mt-4 rounded-lg bg-emerald-600 px-5 py-3 hover:bg-emerald-700"
  >
    Restore This Version
  </button>
</form>
          </div>

        </div>
      )}
      {latestPrd && (
  <EditPRDForm
    prdId={latestPrd.id}
    title={latestPrd.title}
    content={latestPrd.content}
  />
)}
   {latestPrd && latestPrd.tasks.length > 0 && (
    <div className="mt-10">

      <h2 className="mb-4 text-2xl font-bold">
        Generated Tasks
      </h2>

      <div className="space-y-3">
        {latestPrd.tasks.map((task) => (
  <div
    key={task.id}
    className="rounded-xl bg-slate-900 p-4"
  >
    <h3 className="font-semibold">
      {task.title}
    </h3>

    <p className="mb-4 text-sm text-slate-400">
      Status: {task.status}
    </p>

    <EditTaskForm
      taskId={task.id}
      initialTitle={task.title}
      initialDescription={task.description}
    />
  </div>
))}

      </div>

    </div>
)}
{feature.prds.length > 1 && (
  <div className="mt-10">

    <h2 className="mb-4 text-2xl font-bold">
      Version History
    </h2>

    <div className="space-y-3">

      {feature.prds.map((prd) => (
<Link
  key={prd.id}
  href={`/features/${feature.id}?version=${prd.version}`}
  className="block w-full rounded-xl bg-slate-900 p-4 text-left hover:bg-slate-800 transition"
>
          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold">
                Version {prd.version}
              </h3>

              <p className="text-sm text-slate-400">
                {prd.generatedByAI ? "AI Generated" : "Manual Edit"}
              </p>

            </div>

            <span className="text-sm text-slate-500">
              {prd.createdAt.toLocaleDateString()}
            </span>

          </div>
    </Link>
      ))}

    </div>

  </div>
)}

    </div>
  );
}