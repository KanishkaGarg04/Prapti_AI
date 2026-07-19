import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function Reports() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="p-8">

          <div className="rounded-xl border bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold">
              Financial Reports
            </h2>

            <p className="mt-3 text-gray-500">
              Download PDF reports and compare previous analyses.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}