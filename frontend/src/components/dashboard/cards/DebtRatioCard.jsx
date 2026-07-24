import { motion } from "framer-motion";
import { CreditCard, TrendingDown, AlertTriangle } from "lucide-react";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function DebtRatioCard() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const ratio = analysis.debtRatio || 0;

  const colorClass =
    ratio < 30
      ? "text-emerald-600 bg-emerald-50 border-emerald-100"
      : ratio < 50
      ? "text-amber-600 bg-amber-50 border-amber-100"
      : "text-rose-600 bg-rose-50 border-rose-100";

  const textColor =
    ratio < 30
      ? "text-emerald-600"
      : ratio < 50
      ? "text-amber-600"
      : "text-rose-600";

  const barColor =
    ratio < 30
      ? "bg-emerald-600"
      : ratio < 50
      ? "bg-amber-500"
      : "bg-rose-600";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col col-span-1 lg:col-span-2"
      style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}
    >
      {/* Top Accent Bar */}
      <div className={`h-1.5 w-full ${barColor}`} />

      <div className="p-5 md:p-8 flex flex-col h-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-5 pb-6 border-b border-slate-100">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                DEBT-TO-INCOME RATIO
              </span>
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-xl border ${colorClass}`}
              >
                {ratio < 35 ? (
                  <TrendingDown size={13} />
                ) : (
                  <AlertTriangle size={13} />
                )}
                {ratio < 35 ? "Healthy" : "High Leverage"}
              </span>
            </div>

            <div className={`text-4xl md:text-5xl font-bold tracking-tighter mt-2 ${textColor}`}>
              {ratio.toFixed(1)}%
            </div>
          </div>

          {/* Benchmark Card */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 min-w-[180px] flex-shrink-0">
            <div className={`inline-flex p-2 rounded-xl ${colorClass} mb-3`}>
              <CreditCard size={22} />
            </div>
            <p className="text-xs font-medium text-slate-500">TARGET BENCHMARK</p>
            <p className="text-lg font-semibold text-slate-800 mt-1">
              Below <span className="text-emerald-600">35%</span>
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-7 flex-1">
          {/* Current Ratio */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Current Ratio
            </p>
            <p className={`text-3xl font-bold mt-2 ${textColor}`}>
              {ratio.toFixed(1)}%
            </p>
            <p className="text-sm text-slate-500 mt-2 leading-snug">
              Total debt relative to monthly income
            </p>
          </div>

          {/* Safety Threshold */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-slate-500">
              Safety Threshold
            </p>
            <p className="text-3xl font-bold text-slate-900 mt-2">
              35.0%
              <span className="text-sm font-normal text-slate-500 ml-1">max</span>
            </p>
            <p className="text-sm text-blue-600 font-medium mt-2">
              Industry standard limit
            </p>
          </div>

          {/* Progress Bar */}
          <div className="lg:col-span-1 flex flex-col justify-center bg-slate-50 border border-slate-100 rounded-2xl p-5">
            <div className="flex justify-between text-xs mb-2 font-medium text-slate-600">
              <span className="flex items-center gap-1.5">
                <CreditCard size={15} className={textColor} />
                Leverage Load
              </span>
              <span className="font-bold text-slate-900">{ratio.toFixed(1)}%</span>
            </div>

            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${barColor}`}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(ratio, 100)}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Lower ratio = Better financial health
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}