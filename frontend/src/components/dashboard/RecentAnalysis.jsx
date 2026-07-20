import {
  Clock3,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAnalysis } from "../../context/AnalysisContext";

export default function RecentAnalysis() {
  const { history = [] } = useAnalysis();

  if (!Array.isArray(history)) {
    return null;
  }

  return (
    <section className="mt-8 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-900">
          Recent Analysis
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Your latest financial analyses
        </p>
      </div>

      {history.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          No analysis available yet.
        </div>
      ) : (
        history.map((item, index) => {
          const score = item.healthScore ?? item.riskScore ?? 0;

          let Icon = CheckCircle2;
          let color = "text-green-600";
          let bg = "bg-green-50";

          if (score < 50) {
            Icon = AlertTriangle;
            color = "text-red-600";
            bg = "bg-red-50";
          } else if (score < 75) {
            Icon = TrendingUp;
            color = "text-blue-600";
            bg = "bg-blue-50";
          }

          return (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              className="flex items-center justify-between border-b border-gray-100 px-6 py-5 hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">
                <div className={`${bg} rounded-lg p-3`}>
                  <Icon className={color} size={20} />
                </div>

                <div>
                  <h3 className="font-semibold">
                    Loan ₹
                    {Number(item.loanAmount || 0).toLocaleString("en-IN")}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.interestRate}% • {item.tenure} Years
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className={`font-semibold ${color}`}>
                  Health {score}/100
                </p>

                <div className="mt-2 flex items-center justify-end gap-2 text-xs text-gray-500">
                  <Clock3 size={13} />
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleString()
                    : "-"}
                </div>
              </div>
            </motion.div>
          );
        })
      )}
    </section>
  );
}