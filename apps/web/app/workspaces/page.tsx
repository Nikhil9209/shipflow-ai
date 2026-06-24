export default function WorkspacesPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold">
        Workspaces
      </h1>

      <p className="mt-2 text-slate-400">
        Manage your organization workspaces.
      </p>

      <button className="mt-6 px-4 py-2 bg-blue-600 rounded-lg">
        Create Workspace
      </button>
    </div>
  );
}