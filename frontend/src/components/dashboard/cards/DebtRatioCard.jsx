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
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-slate-200/90 shadow-sm col-span-1 lg:col-span-2 overflow-hidden flex flex-col justify-between"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      {/* Zerodha-style thin brand accent bar (Dynamic color based on debt risk) */}
      <div className={`h-1 w-full ${ratio < 30 ? 'bg-emerald-600' : ratio < 50 ? 'bg-amber-500' : 'bg-rose-600'}`} />

      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Debt-to-Income Ratio
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border ${colorClass}`}>
                {ratio < 35 ? <TrendingDown size={12} /> : <AlertTriangle size={12} />} 
                {ratio < 35 ? 'Healthy Range' : 'High Leverage'}
              </span>
            </div>
            <div className={`text-3xl md:text-4xl font-bold tracking-tight mt-1 ${textColor}`}>
              {ratio.toFixed(1)}%
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-lg">
            <div className={`p-2 rounded-md ${colorClass}`}>
              <CreditCard size={20} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Target Benchmark</p>
              <p className="text-xs font-bold text-slate-800">Recommended &lt; 35%</p>
            </div>
          </div>
        </div>

        {/* Data Grid / Metrics (Zerodha Console Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          {/* Metric 1 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Ratio</p>
            <p className={`text-xl font-bold mt-1 ${textColor}`}>
              {ratio.toFixed(1)}%
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Total debt relative to income</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Safety Threshold</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              35.0% <span className="text-sm font-normal text-slate-600">Max</span>
            </p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Industry standard limit</p>
          </div>

          {/* Metric 3 / Progress Bar area */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1">
                <CreditCard size={14} className={textColor} /> Leverage Load
              </span>
              <span className="font-bold text-slate-900">{ratio.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${barColor}`} 
                style={{ width: `${Math.min(ratio, 100)}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Lower ratio signifies better liquidity.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}