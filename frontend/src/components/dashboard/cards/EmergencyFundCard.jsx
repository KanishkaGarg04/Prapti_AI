import { motion } from "framer-motion";
import { ShieldCheck, TrendingUp, AlertCircle } from "lucide-react";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function EmergencyFundCard() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const fund = analysis.emergencyFund || 0;
  const months = analysis.monthlyExpenses ? fund / analysis.monthlyExpenses : 0;
  const preparedness = Math.min((months / 6) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-xl border border-slate-200/90 shadow-sm col-span-1 lg:col-span-2 overflow-hidden flex flex-col justify-between"
      style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
    >
      {/* Zerodha-style thin brand accent bar (Blue for safety/fund) */}
      <div className="h-1 bg-blue-600 w-full" />

      <div className="p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-500">
                Emergency Fund Reserve
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center gap-1 ${months >= 6 ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                {months.toFixed(1)} Months Covered
              </span>
            </div>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mt-1">
              ₹{fund.toLocaleString("en-IN")}
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 px-4 py-2.5 rounded-lg">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wide">Target Goal</p>
              <p className="text-xs font-bold text-slate-800">6 Months Minimum</p>
            </div>
          </div>
        </div>

        {/* Data Grid / Metrics (Zerodha Console Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 items-center">
          {/* Metric 1 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Current Coverage</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              {months.toFixed(1)} <span className="text-sm font-normal text-slate-600">Months</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">Based on monthly expenses</p>
          </div>

          {/* Metric 2 */}
          <div className="bg-slate-50/70 border border-slate-200/60 rounded-lg p-4">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Recommended Benchmark</p>
            <p className="text-xl font-bold text-slate-900 mt-1">
              6.0 <span className="text-sm font-normal text-slate-600">Months</span>
            </p>
            <p className="text-[11px] text-blue-600 font-medium mt-1">Standard safety buffer</p>
          </div>

          {/* Metric 3 / Progress Bar area */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
              <span className="flex items-center gap-1">
                <TrendingUp size={14} className="text-blue-600" /> Preparedness
              </span>
              <span className="font-bold text-slate-900">{preparedness.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                style={{ width: `${preparedness}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-2">Target completion: 100%</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}