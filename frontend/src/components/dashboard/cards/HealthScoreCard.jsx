import { motion } from "framer-motion";
import { HeartPulse, Activity } from "lucide-react";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function HealthScoreCard() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const score = analysis.healthScore || 0;

  let colorClass = "text-rose-600 bg-rose-50 border-rose-100";
  let textColor = "text-rose-600";
  let barColor = "bg-rose-600";
  let status = "Critical";

  if (score >= 90) {
    colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100";
    textColor = "text-emerald-600";
    barColor = "bg-emerald-600";
    status = "Excellent";
  } else if (score >= 75) {
    colorClass = "text-emerald-600 bg-emerald-50 border-emerald-100";
    textColor = "text-emerald-600";
    barColor = "bg-emerald-600";
    status = "Good";
  } else if (score >= 60) {
    colorClass = "text-amber-600 bg-amber-50 border-amber-100";
    textColor = "text-amber-600";
    barColor = "bg-amber-500";
    status = "Average";
  } else if (score >= 40) {
    colorClass = "text-orange-600 bg-orange-50 border-orange-100";
    textColor = "text-orange-600";
    barColor = "bg-orange-500";
    status = "Needs Improvement";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-slate-200/90 shadow-sm col-span-1 lg:col-span-2 overflow-hidden flex flex-col justify-between"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      {/* Zerodha-style thin brand accent bar (Dynamic based on health score) */}
      <div className={`h-1 w-full ${barColor}`} />

      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Financial Health Score
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border ${colorClass}`}>
                {status} Status
              </span>
            </div>
            <div className={`text-3xl md:text-4xl font-bold tracking-tight mt-1 ${textColor}`}>
              {score} <span className="text-lg font-medium text-slate-400">/ 100</span>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-lg">
            <div className={`p-2 rounded-md ${colorClass}`}>
              <HeartPulse size={20} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Overall Rating</p>
              <p className="text-xs font-bold text-slate-800">System Diagnostic</p>
            </div>
          </div>
        </div>

        {/* Data Grid / Metrics (Zerodha Console Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          {/* Metric 1 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Debt Ratio Impact</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {analysis.debtRatio?.toFixed(1)}%
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Leverage weighting factored</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Savings Rate Impact</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {analysis.savingsRate?.toFixed(1)}%
            </p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Surplus weighting factored</p>
          </div>

          {/* Metric 3 / Progress Bar area */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1">
                <Activity size={14} className={textColor} /> Health Index
              </span>
              <span className="font-bold text-slate-900">{score}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
                style={{ width: `${Math.min(score, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Target benchmark: 80+ score</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}