export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold">
        Projects
      </h1>

      <p className="mt-2 text-slate-400">
        Manage your ShipFlow projects.
      </p>

      <button className="mt-6 px-4 py-2 bg-green-600 rounded-lg">
        Create Project
      </button>
    </div>
  );
}