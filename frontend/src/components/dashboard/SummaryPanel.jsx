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
    <div className="space-y-6">
      {/* Summary */}
      <div className="border border-gray-200 bg-white shadow-sm rounded-xl">
        <div className="border-b border-gray-200 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            AI Financial Summary
          </p>

          <h2 className="mt-2 text-xl font-semibold text-gray-900">
            Analysis Overview
          </h2>
        </div>

        <div className="divide-y divide-gray-200">
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
                className="flex items-center justify-between px-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg border border-gray-200 p-3">
                    <Icon
                      size={20}
                      className="text-blue-600"
                    />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500">
                      {item.title}
                    </p>

                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-1 text-2xl font-bold ${item.color}`}
                    >
                      {item.value}
                    </motion.h3>
                  </div>
                </div>

                <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs text-green-700">
                  {item.status}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-5">
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            AI Recommendation
          </p>
        </div>

        <div className="px-6 py-6">
          <p className="leading-7 text-gray-600">
            {analysis?.aiRecommendation ||
              "Complete the financial analysis to receive personalized AI recommendations."}
          </p>
        </div>
      </div>

      {/* Report */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center gap-4 px-6 py-5">
          <div className="rounded-lg border border-gray-200 p-3">
            <FileText
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h3 className="font-semibold">
              Financial Report
            </h3>

            <p className="text-sm text-gray-500">
              Export your AI analysis as PDF
            </p>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            className="
              w-full
              rounded-lg
              bg-blue-600
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
            "
          >
            Download Report
          </button>
        </div>
      </div>
    </div>
  );
}