import { motion } from "framer-motion";
import { HeartPulse, ShieldCheck, AlertTriangle } from "lucide-react";
import { useAnalysis } from "../../../context/AnalysisContext";

export default function HealthScoreCard() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const score = Number(analysis.healthScore) || 0;

  let color = "text-red-600";
  let bg = "bg-red-500";
  let ring = "stroke-red-500";
  let status = "Critical";
  let advice = "Reduce debt and improve monthly savings.";

  if (score >= 90) {
    color = "text-green-600";
    bg = "bg-green-500";
    ring = "stroke-green-500";
    status = "Excellent";
    advice = "Outstanding financial health. Keep investing consistently.";
  } else if (score >= 75) {
    color = "text-emerald-600";
    bg = "bg-emerald-500";
    ring = "stroke-emerald-500";
    status = "Good";
    advice = "Healthy financial position. Continue building wealth.";
  } else if (score >= 60) {
    color = "text-yellow-600";
    bg = "bg-yellow-500";
    ring = "stroke-yellow-500";
    status = "Average";
    advice = "Increase savings and reduce unnecessary expenses.";
  } else if (score >= 40) {
    color = "text-orange-600";
    bg = "bg-orange-500";
    ring = "stroke-orange-500";
    status = "Needs Improvement";
    advice = "Focus on reducing EMI burden and increasing emergency funds.";
  }

  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        hover:shadow-xl
        transition-all
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Financial Health
          </p>

          <h2 className="mt-2 text-2xl font-bold">
            Health Score
          </h2>

        </div>

        <HeartPulse
          size={34}
          className={color}
        />

      </div>

      <div className="mt-8 flex items-center justify-center">

        <div className="relative h-40 w-40">

          <svg
            className="h-40 w-40 rotate-[-90deg]"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />

            <circle
              cx="60"
              cy="60"
              r={radius}
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={ring}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h1 className={`text-4xl font-bold ${color}`}>
              {score}
            </h1>

            <span className="text-gray-500 text-sm">
              /100
            </span>

          </div>

        </div>

      </div>

      <div className="mt-6 flex items-center justify-center">

        <span
          className={`
            rounded-full
            px-4
            py-2
            text-sm
            font-semibold
            text-white
            ${bg}
          `}
        >
          {status}
        </span>

      </div>

      <div className="mt-6">

        <div className="flex justify-between text-sm">

          <span className="text-gray-500">
            Overall Progress
          </span>

          <span className={color}>
            {score}%
          </span>

        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-gray-200">

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${score}%` }}
            transition={{ duration: 1 }}
            className={`h-full ${bg}`}
          />

        </div>

      </div>

      <div className="mt-6 rounded-xl bg-slate-50 p-4">

        <div className="flex items-start gap-3">

          {score >= 75 ? (
            <ShieldCheck className={color} size={22} />
          ) : (
            <AlertTriangle className={color} size={22} />
          )}

          <div>

            <h3 className="font-semibold">
              AI Insight
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              {advice}
            </p>

          </div>

        </div>

      </div>

    </motion.div>
  );
}