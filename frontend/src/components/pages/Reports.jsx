import { useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Landmark,
  ShieldCheck,
  Wallet,
  TrendingUp,
  PiggyBank,
  BadgeIndianRupee,
  Brain,
  Download,
} from "lucide-react";

import Sidebar from "../dashboard/Sidebar";
import Topbar from "../dashboard/Topbar";
import { useAnalysis } from "../../context/AnalysisContext";

export default function Reports() {
  const navigate = useNavigate();

  const { history } = useAnalysis();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  const report = useMemo(() => {
    if (!id) return null;

    return history.find((item) => item._id === id);
  }, [history, id]);

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-100 flex">
        <Sidebar />

        <main className="flex-1">
          <Topbar />

          <div className="p-10">

            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-12 text-center">

              <h2 className="text-3xl font-bold text-slate-900">
                No Report Selected
              </h2>

              <p className="mt-3 text-slate-500">
                Please open a report from Recent Analysis.
              </p>

              <button
                onClick={() => navigate("/dashboard")}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 transition"
              >
                Go to Dashboard
              </button>

            </div>

          </div>

        </main>
      </div>
    );
  }

  const ai =
    report.aiRecommendation ||
    report.recommendations?.[0] ||
    {};

  const investment = report.investmentPlan || {};

  return (
    <div className="min-h-screen bg-slate-100 flex">

      <Sidebar />

      <main className="flex-1">

        <Topbar />

        <div className="max-w-7xl mx-auto p-8 space-y-8">

          <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">

            <div className="border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 px-10 py-8 text-white">

              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                <div>

                  <p className="uppercase tracking-[0.35em] text-xs text-blue-100">
                    Prapti AI
                  </p>

                  <h1 className="mt-2 text-4xl font-bold">
                    Financial Report
                  </h1>

                  <p className="mt-3 text-blue-100">
                    AI Generated Personalized Financial Analysis
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => navigate("/dashboard")}
                    className="flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3 backdrop-blur hover:bg-white/25 transition"
                  >
                    <ArrowLeft size={18} />
                    Dashboard
                  </button>

                  <button
                    className="flex items-center gap-2 rounded-xl bg-white text-blue-700 px-5 py-3 font-semibold hover:bg-slate-100 transition"
                  >
                    <Download size={18} />
                    Download PDF
                  </button>

                </div>

              </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6 p-8">

              <ReportCard
                icon={Landmark}
                title="Loan Amount"
                value={`₹${Number(report.loanAmount).toLocaleString("en-IN")}`}
              />

              <ReportCard
                icon={BadgeIndianRupee}
                title="Monthly EMI"
                value={`₹${Number(report.emi).toLocaleString("en-IN")}`}
              />

              <ReportCard
                icon={Calendar}
                title="Loan Tenure"
                value={`${report.tenure} Years`}
              />

              <ReportCard
                icon={TrendingUp}
                title="Interest Rate"
                value={`${report.interestRate}%`}
              />

              <ReportCard
                icon={Wallet}
                title="Health Score"
                value={`${report.healthScore}/100`}
              />

              <ReportCard
                icon={PiggyBank}
                title="Savings Rate"
                value={`${report.savingsRate}%`}
              />

            </div>

            <div className="border-t border-slate-200 p-8">

              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Investment Allocation
              </h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">

                <AllocationCard
                  title="Stocks"
                  value={investment.stocks}
                />

                <AllocationCard
                  title="Mutual Funds"
                  value={investment.mutualFunds}
                />

                <AllocationCard
                  title="Debt Funds"
                  value={investment.debtFunds}
                />

                <AllocationCard
                  title="Gold"
                  value={investment.gold}
                />

                <AllocationCard
                  title="Cash"
                  value={investment.cash}
                />

              </div>

            </div>
                        <div className="border-t border-slate-200 p-8">

              <div className="flex items-center gap-3 mb-6">

                <Brain
                  size={28}
                  className="text-blue-600"
                />

                <div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    AI Financial Advisor
                  </h2>

                  <p className="text-slate-500">
                    Personalized insights generated using AI.
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">

                  <h3 className="font-semibold text-lg mb-3">
                    Executive Summary
                  </h3>

                  <p className="leading-8 text-slate-700">
                    {ai.summary || report.recommendation}
                  </p>

                </div>

                <div className="grid lg:grid-cols-2 gap-6">

                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

                    <h3 className="font-semibold text-lg mb-4 text-emerald-700">
                      Financial Strengths
                    </h3>

                    <ul className="space-y-3">

                      {(ai.strengths || []).length > 0 ? (

                        ai.strengths.map((item, index) => (

                          <li
                            key={index}
                            className="text-slate-700"
                          >

                            • {item}

                          </li>

                        ))

                      ) : (

                        <li className="text-slate-500">
                          No strengths available.
                        </li>

                      )}

                    </ul>

                  </div>

                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">

                    <h3 className="font-semibold text-lg mb-4 text-rose-700">
                      Potential Risks
                    </h3>

                    <ul className="space-y-3">

                      {(ai.risks || []).length > 0 ? (

                        ai.risks.map((item, index) => (

                          <li
                            key={index}
                            className="text-slate-700"
                          >

                            • {item}

                          </li>

                        ))

                      ) : (

                        <li className="text-slate-500">
                          No risks available.
                        </li>

                      )}

                    </ul>

                  </div>

                </div>

                <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">

                  <h3 className="font-semibold text-lg mb-4">
                    Recommended Action Plan
                  </h3>

                  <div className="space-y-4">

                    {(ai.actions || []).length > 0 ? (

                      ai.actions.map((item, index) => (

                        <div
                          key={index}
                          className="flex gap-4"
                        >

                          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">

                            {index + 1}

                          </div>

                          <p className="leading-7 text-slate-700">
                            {item}
                          </p>

                        </div>

                      ))

                    ) : (

                      <p className="text-slate-500">
                        No action plan available.
                      </p>

                    )}

                  </div>

                </div>

                <div className="grid lg:grid-cols-2 gap-6">

                  <div className="rounded-2xl border border-slate-200 p-6">

                    <h3 className="text-lg font-semibold mb-3">
                      Investment Advice
                    </h3>

                    <p className="leading-8 text-slate-700">

                      {ai.investmentAdvice ||
                        "No investment recommendation available."}

                    </p>

                  </div>

                  <div className="rounded-2xl border border-slate-200 p-6">

                    <h3 className="text-lg font-semibold mb-3">
                      Loan Advice
                    </h3>

                    <p className="leading-8 text-slate-700">

                      {ai.loanAdvice ||
                        "No loan recommendation available."}

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>

  );
}

function ReportCard({
  icon: Icon,
  title,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">

      <div className="flex items-center gap-3 mb-3">

        <div className="rounded-xl bg-blue-50 p-3">

          <Icon
            size={20}
            className="text-blue-600"
          />

        </div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

      </div>

      <h3 className="text-2xl font-bold text-slate-900">
        {value}
      </h3>

    </div>
  );
}

function AllocationCard({
  title,
  value,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-center">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-3xl font-bold text-blue-600">

        {value ?? 0}%

      </h3>

    </div>
  );
}