import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-800 p-6">
      <h1 className="text-2xl font-bold mb-10">
        🚀 ShipFlow AI
      </h1>

      <nav className="space-y-4">
        <Link href="/">Dashboard</Link>
        <br />
        <Link href="/workspaces">Workspaces</Link>
        <br />
        <Link href="/projects">Projects</Link>
        <br />
        <Link href="/feature-requests">Feature Requests</Link>
        <br />
        <Link href="/reviews">Reviews</Link>
      </nav>
    </aside>
  );
}