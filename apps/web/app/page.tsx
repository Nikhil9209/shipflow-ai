export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 p-6">
        <h1 className="text-2xl font-bold mb-10">
          🚀 ShipFlow AI
        </h1>

        <nav className="space-y-4">
          <div>Dashboard</div>
          <div>Workspaces</div>
          <div>Projects</div>
          <div>Feature Requests</div>
          <div>PRDs</div>
          <div>Tasks</div>
          <div>Reviews</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold">
          Dashboard
        </h2>

        <p className="mt-2 text-slate-400">
          Welcome to ShipFlow AI
        </p>

        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-slate-900 p-6 rounded-xl">
            <h3>Projects</h3>
            <p className="text-3xl mt-2">0</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3>Feature Requests</h3>
            <p className="text-3xl mt-2">0</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3>PRDs</h3>
            <p className="text-3xl mt-2">0</p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl">
            <h3>Reviews</h3>
            <p className="text-3xl mt-2">0</p>
          </div>
        </div>
      </main>
    </div>
  );
}