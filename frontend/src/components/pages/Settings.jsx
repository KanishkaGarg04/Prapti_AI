import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";

export default function Settings() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="p-8">

          <div className="rounded-xl border bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-semibold">
              Settings
            </h2>

            <p className="mt-3 text-gray-500">
              Theme, account preferences and notifications.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}