import {
  ShieldCheck,
  TrendingUp,
  PiggyBank,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAnalysis } from "../../context/AnalysisContext";

export default function SummaryPanel() {
  const { analysis } = useAnalysis();

  const summary = [
    {
      icon: ShieldCheck,
      title: "Risk Score",
      value: analysis ? `${analysis.riskScore}/100` : "--",
      status: "Risk Analysis",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Projected Savings",
      value: analysis
        ? `₹${Number(analysis.interestSaved).toLocaleString("en-IN")}`
        : "--",
      status: "Interest Saved",
      color: "text-blue-600",
    },
    {
      icon: PiggyBank,
      title: "Debt Ratio",
      value: analysis ? `${analysis.debtRatio}%` : "--",
      status: "Financial Health",
      color: "text-orange-500",
    },
  ];

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Summary */}
      <div className="border border-slate-200 bg-white shadow-sm rounded-2xl sm:rounded-3xl overflow-hidden w-full">
        <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-600 font-medium">
            AI Financial Summary
          </p>

          <h2 className="mt-1 sm:mt-2 text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Analysis Overview
          </h2>
        </div>

        <div className="divide-y divide-slate-100">
          {summary.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.4,
                }}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-4 sm:py-5"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className="rounded-xl border border-slate-200 p-2.5 sm:p-3 shrink-0 bg-slate-50">
                    <Icon
                      size={20}
                      className="text-blue-600 sm:w-[22px] sm:h-[22px]"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-500 font-medium truncate">
                      {item.title}
                    </p>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-0.5 sm:mt-1 text-xl sm:text-2xl font-bold truncate ${item.color}`}
                    >
                      {item.value}
                    </motion.h3>
                  </div>
                </div>

                <span className="self-start sm:self-center rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-medium text-green-700 shrink-0">
                  {item.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full">
        <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-600 font-medium">
            AI Recommendation
          </p>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <p className="text-xs sm:text-sm leading-relaxed sm:leading-7 text-slate-600">
            {analysis?.aiRecommendation ||
              "Complete the financial analysis to receive personalized AI recommendations."}
          </p>
        </div>
      </div>

      {/* Report */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full">
        <div className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
          <div className="rounded-xl border border-slate-200 p-2.5 sm:p-3 shrink-0 bg-slate-50">
            <FileText
              size={20}
              className="text-blue-600 sm:w-[22px] sm:h-[22px]"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 truncate">
              Financial Report
            </h3>

            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Export your AI analysis as PDF
            </p>
          </div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 pb-5 sm:pb-6">
          <button
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-3
              text-xs sm:text-sm
              font-semibold
              text-white
              shadow-sm
              transition-all
              hover:bg-blue-700
              active:scale-[0.99]
            "
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}