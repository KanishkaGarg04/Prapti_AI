import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Landmark,
} from "lucide-react";

import { useAnalysis } from "../../context/AnalysisContext";

export default function AIInsights() {
  const { analysis } = useAnalysis();

  const ai = analysis?.aiRecommendation;

  if (!ai) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .6 }}
      className="mt-8 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden w-full max-w-full"
    >
      {/* Header */}
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
          <Brain
            size={26}
            className="text-blue-600 sm:w-[30px] sm:h-[30px]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-blue-600 font-medium truncate">
            Artificial Intelligence
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 truncate">
            AI Financial Advisor
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Personalized financial insights generated using AI.
          </p>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Executive Summary */}
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2 sm:mb-3">
            Executive Summary
          </h3>

          <p className="text-sm sm:text-[15px] leading-6 sm:leading-8 text-slate-600 break-words">
            {ai.summary}
          </p>
        </div>

        {/* Strengths + Risks */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-green-100 bg-green-50 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <TrendingUp
                size={22}
                className="text-green-600 shrink-0"
              />

              <h3 className="text-base sm:text-lg font-semibold">
                Financial Strengths
              </h3>
            </div>

            <div className="space-y-3">
              {ai.strengths?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start"
                >
                  <CheckCircle2
                    size={18}
                    className="mt-1 text-green-600 shrink-0"
                  />

                  <p className="text-xs sm:text-sm text-slate-700 break-words">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <AlertTriangle
                size={22}
                className="text-red-500 shrink-0"
              />

              <h3 className="text-base sm:text-lg font-semibold">
                Potential Risks
              </h3>
            </div>

            <div className="space-y-3">
              {ai.risks?.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start"
                >
                  <AlertTriangle
                    size={18}
                    className="mt-1 text-red-500 shrink-0"
                  />

                  <p className="text-xs sm:text-sm text-slate-700 break-words">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-5">
            Recommended Action Plan
          </h3>

          <div className="space-y-4">
            {ai.actions?.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 sm:gap-4 items-start"
              >
                <div className="h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs sm:text-sm font-semibold shrink-0">
                  {index + 1}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-6 sm:leading-7 break-words pt-0.5">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3">
              Investment Strategy
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-6 sm:leading-7 break-words">
              {ai.investmentAdvice}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <Landmark
                size={20}
                className="text-blue-600 shrink-0"
              />

              <h3 className="text-base sm:text-lg font-semibold">
                Loan Optimization
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-6 sm:leading-7 break-words">
              {ai.loanAdvice}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}