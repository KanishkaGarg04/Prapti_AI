import { useEffect } from "react";
import api from "../../services/api";
import { useAnalysis } from "../../context/AnalysisContext";

import LoadingOverlay from "./LoadingOverlay";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import AnalysisForm from "./AnalysisForm";
import ChartsSection from "./ChartsSection";
import RecentAnalysis from "./RecentAnalysis";
import MarketOverview from "./MarketOverview";

import HealthScoreCard from "./cards/HealthScoreCard";
import SavingsCard from "./cards/SavingsCard";
import DebtRatioCard from "./cards/DebtRatioCard";
import EmergencyFundCard from "./cards/EmergencyFundCard";

// (Create this component next)
import InvestmentPlanner from "./InvestmentPlanner";

export default function Dashboard() {
  const { loading, setHistory } = useAnalysis();

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = api.get("/analysis/history");
        setHistory(res.data);
      } catch (err) {
        console.error(err);
      }
    }

    loadHistory();
  }, [setHistory]);

  return (
    <div className="min-h-screen bg-slate-100">
      <LoadingOverlay loading={loading} />

      <div className="flex">

        <Sidebar />

        <main className="flex-1">

          <Topbar />

          <div className="p-8">

            <MarketOverview />

            {/* Header */}

            <div className="mb-8">

              <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
                Dashboard
              </p>

              <h1 className="mt-2 text-3xl font-bold text-gray-900">
                Financial Analysis Workspace
              </h1>

              <p className="mt-2 text-gray-600">
                Analyze loans, estimate savings, visualize financial
                projections, and receive AI-powered recommendations.
              </p>

            </div>

            {/* Form + KPI Cards */}

            <div className="grid gap-8 xl:grid-cols-3">

              <div className="xl:col-span-2">
                <AnalysisForm />
              </div>

              <div className="space-y-5">

                <HealthScoreCard />

                <SavingsCard />

                <DebtRatioCard />

                <EmergencyFundCard />

              </div>

            </div>

            {/* Charts */}

            <div className="mt-8 space-y-8">

              <ChartsSection />

              <InvestmentPlanner />

              <RecentAnalysis />

            </div>

          </div>

        </main>

      </div>
    </div>
  );
}