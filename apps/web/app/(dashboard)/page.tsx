
export default function HomePage() {
  return (
    <>
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
    </>
  );
}