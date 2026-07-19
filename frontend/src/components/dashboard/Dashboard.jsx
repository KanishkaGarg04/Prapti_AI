import { useEffect } from "react";
import api from "../../services/api";
import { useAnalysis } from "../../context/AnalysisContext";
import LoadingOverlay from "./LoadingOverlay";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AnalysisForm from "./AnalysisForm";
import SummaryPanel from "./SummaryPanel";
import ChartsSection from "./ChartsSection";
import RecentAnalysis from "./RecentAnalysis";
import HealthScoreCard from "./cards/HealthScoreCard";
import DebtRatioCard from "./cards/DebtRatioCard";
import SavingsCard from "./cards/SavingsCard";
import EmergencyFundCard from "./cards/EmergencyFundCard";

export default function Dashboard() {
  const { setHistory } = useAnalysis();
  const { loading } = useAnalysis();
useEffect(() => {

  async function loadHistory() {

    const res = await api.get("/analysis/history");

    setHistory(res.data);

  }

  loadHistory();

}, []);
  return (
    <div className="min-h-screen bg-slate-100">
      <LoadingOverlay loading={loading} />
      <div className="flex">

        <Sidebar />

        <main className="flex-1">

          <Topbar />

          <div className="p-8">

            {/* Top Section */}

            <div className="mb-6">

              <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
                Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-semibold text-gray-900">
                Financial Analysis Workspace
              </h1>

              <p className="mt-2 text-gray-600">
                Analyze loans, estimate savings, visualize financial projections,
                and receive AI-powered recommendations.
              </p>

            </div>

            {/* Analysis + Summary */}

              <div className="grid gap-8 xl:grid-cols-3">

              <div className="xl:col-span-2">
                <AnalysisForm />
              </div>

              <div className="space-y-6">
                <HealthScoreCard />
                <SavingsCard />
                <DebtRatioCard />
                <EmergencyFundCard />
              </div>

            </div>
            {/* Charts */}

            <div
              id="dashboard-results"
              className="space-y-8"
            >

              <ChartsSection />

              <RecentAnalysis />

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}