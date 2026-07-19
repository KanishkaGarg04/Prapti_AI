import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import RecentAnalysis from "../dashboard/RecentAnalysis";

export default function History() {
  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />

      <main className="flex-1">
        <Topbar />

        <div className="p-8">
          <RecentAnalysis />
        </div>
      </main>
    </div>
  );
}