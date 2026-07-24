import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import RecentAnalysis from "../dashboard/RecentAnalysis";

export default function History() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row w-full">
      <Sidebar />

      <main className="flex-1 min-w-0 flex flex-col">
        <Topbar />

        <div className="p-4 sm:p-6 lg:p-8 flex-1 w-full max-w-7xl mx-auto">
          <RecentAnalysis />
        </div>
      </main>
    </div>
  );
}