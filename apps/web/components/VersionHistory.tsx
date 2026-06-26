"use client";

type Version = {
  id: string;
  version: number;
  generatedByAI: boolean;
  createdAt: Date;
};

type Props = {
  featureId: string;
  versions: Version[];
};

export default function VersionHistory({
  featureId,
  versions,
}: Props) {
return (
  <div className="mt-10">

    <h2 className="mb-4 text-2xl font-bold">
      Version History
    </h2>

    <div className="space-y-3">

      {versions.map((prd) => (
        <div
          key={prd.id}
          className="rounded-xl bg-slate-900 p-4"
        >
          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">
                Version {prd.version}
              </h3>

              <p className="text-sm text-slate-400">
                {prd.generatedByAI
                  ? "AI Generated"
                  : "Manual Edit"}
              </p>

            </div>

            <span className="text-sm text-slate-500">
              {new Date(
                prd.createdAt
              ).toLocaleDateString()}
            </span>

          </div>
        </div>
      ))}

    </div>

  </div>
);
}