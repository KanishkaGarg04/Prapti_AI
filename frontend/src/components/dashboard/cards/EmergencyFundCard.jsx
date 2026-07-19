import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function EmergencyFundCard() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white
rounded-2xl
border
border-slate-200
p-6
shadow-sm
hover:shadow-xl
transition-all
duration-300
min-h-[180px]
flex
flex-col
justify-between"
    >
      <p className="text-sm uppercase tracking-widest text-gray-400">
        Emergency Fund Goal
      </p>

      <h2 className="mt-4 text-5xl  tracking-tight font-bold text-indigo-600">
        ₹ {analysis.emergencyFund.toLocaleString("en-IN")}
      </h2>

      <div className="mt-5 flex items-center gap-3 text-gray-600">
        <ShieldCheck
          size={22}
          className="text-indigo-600"
        />

        <span>6 Months of Expenses</span>
      </div>
    </motion.div>
  );
}