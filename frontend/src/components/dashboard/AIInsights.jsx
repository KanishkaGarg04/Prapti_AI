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
      className="mt-8 rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden"
    >
      {/* Header */}

      <div className="border-b border-slate-200 px-8 py-6 flex items-center gap-4">

        <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center">

          <Brain
            size={30}
            className="text-blue-600"
          />

        </div>

        <div>

          <p className="text-xs uppercase tracking-[0.25em] text-blue-600 font-medium">
            Artificial Intelligence
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            AI Financial Advisor
          </h2>

          <p className="text-slate-500 mt-1">
            Personalized financial insights generated using AI.
          </p>

        </div>

      </div>

      <div className="p-8 space-y-8">

        {/* Executive Summary */}

        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6">

          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Executive Summary
          </h3>

          <p className="text-[15px] leading-8 text-slate-600">
            {ai.summary}
          </p>

        </div>

        {/* Strengths + Risks */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-green-100 bg-green-50 p-6">

            <div className="flex items-center gap-3 mb-5">

              <TrendingUp
                size={22}
                className="text-green-600"
              />

              <h3 className="text-lg font-semibold">
                Financial Strengths
              </h3>

            </div>

            <div className="space-y-3">

              {ai.strengths?.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <CheckCircle2
                    size={18}
                    className="mt-1 text-green-600"
                  />

                  <p className="text-slate-700">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div className="rounded-2xl border border-red-100 bg-red-50 p-6">

            <div className="flex items-center gap-3 mb-5">

              <AlertTriangle
                size={22}
                className="text-red-500"
              />

              <h3 className="text-lg font-semibold">
                Potential Risks
              </h3>

            </div>

            <div className="space-y-3">

              {ai.risks?.map((item, index) => (

                <div
                  key={index}
                  className="flex gap-3"
                >

                  <AlertTriangle
                    size={18}
                    className="mt-1 text-red-500"
                  />

                  <p className="text-slate-700">
                    {item}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Action Plan */}

        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-6">

          <h3 className="text-lg font-semibold mb-5">
            Recommended Action Plan
          </h3>

          <div className="space-y-4">

            {ai.actions?.map((item, index) => (

              <div
                key={index}
                className="flex gap-4"
              >

                <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">

                  {index + 1}

                </div>

                <p className="text-slate-700 leading-7">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Bottom Cards */}

        <div className="grid lg:grid-cols-2 gap-6">

          <div className="rounded-2xl border border-slate-200 p-6">

            <h3 className="text-lg font-semibold mb-3">
              Investment Strategy
            </h3>

            <p className="text-slate-600 leading-7">
              {ai.investmentAdvice}
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-6">

            <div className="flex items-center gap-2 mb-3">

              <Landmark
                size={20}
                className="text-blue-600"
              />

              <h3 className="text-lg font-semibold">
                Loan Optimization
              </h3>

            </div>

            <p className="text-slate-600 leading-7">
              {ai.loanAdvice}
            </p>

          </div>

        </div>

      </div>

    </motion.section>
  );
}