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

import AIInsights from "./AIInsights";
import InvestmentPlanner from "./InvestmentPlanner";

export default function Dashboard() {
  const { loading, setHistory } = useAnalysis();

  useEffect(() => {
    async function loadHistory() {
      try {
        const res = await api.get("/analysis/history");
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

        {/* Sidebar */}

        <Sidebar />

        {/* Main */}

        <main className="flex-1 min-w-0 lg:ml-72">

          <Topbar />

          <div className="w-full px-4 pt-24 pb-10 sm:px-6 lg:px-10 lg:pt-8">

            {/* Heading */}

            <div className="mb-8">

              <p className="text-[11px] uppercase tracking-[0.35em] text-blue-600">
                Dashboard
              </p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Financial Analysis Workspace
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                Analyze loans, estimate savings, visualize long-term
                financial projections and receive AI-powered
                recommendations for better financial planning.
              </p>

            </div>

            {/* Market */}

            <MarketOverview />

            {/* Analysis */}

            <section
              id="analysis"
              className="mt-8 space-y-8"
            >

              <AnalysisForm />

              {/* Cards */}

              <div
                className="
                grid
                grid-cols-1
                gap-5
                sm:grid-cols-2
                xl:grid-cols-4
              "
              >

                <HealthScoreCard />

                <SavingsCard />

                <DebtRatioCard />

                <EmergencyFundCard />

              </div>

            </section>

            {/* AI Advisor */}

            <section
              id="advisor"
              className="mt-10"
            >

              <AIInsights />

            </section>

            {/* Charts */}

            <section
              id="charts"
              className="mt-10"
            >

              <ChartsSection />

            </section>

            {/* Planner */}

            <section
              id="planner"
              className="mt-10"
            >

              <InvestmentPlanner />

            </section>

            {/* History */}

            <section
              id="history"
              className="mt-10"
            >

              <RecentAnalysis />

            </section>

          </div>

        </main>

      </div>

    </div>
  );
}