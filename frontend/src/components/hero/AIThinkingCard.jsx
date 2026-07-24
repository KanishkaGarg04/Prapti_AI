import { motion } from "framer-motion";
import { BrainCircuit, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const messages = [
  "Analyzing income and expenses...",
  "Calculating debt burden...",
  "Running loan optimization...",
  "Checking investment opportunities...",
  "Generating AI recommendations...",
];

export default function AIThinkingCard() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 sm:p-7 shadow-2xl w-full max-w-full overflow-hidden"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="rounded-xl bg-blue-600 p-2.5 sm:p-3 shrink-0 shadow-lg shadow-blue-500/30">
          <BrainCircuit
            className="text-white sm:w-6 sm:h-6"
            size={22}
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-white font-bold text-base sm:text-lg tracking-tight truncate">
            Prapti AI
          </h3>

          <p className="text-slate-400 text-xs sm:text-sm truncate">
            Financial Intelligence Engine
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-10">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 sm:gap-3 min-w-0"
        >
          <Sparkles className="text-yellow-400 shrink-0 sm:w-5 sm:h-5" size={18} />

          <p className="text-slate-200 text-sm sm:text-lg font-medium truncate">
            {messages[step]}
          </p>
        </motion.div>

        <div className="mt-6 sm:mt-8 space-y-4">
          <Progress
            title="Debt Risk"
            value={82}
            color="bg-red-500 shadow-lg shadow-red-500/20"
          />

          <Progress
            title="Investment Potential"
            value={64}
            color="bg-green-500 shadow-lg shadow-green-500/20"
          />

          <Progress
            title="Financial Stability"
            value={91}
            color="bg-blue-500 shadow-lg shadow-blue-500/20"
          />
        </div>
      </div>
    </motion.div>
  );
}

function Progress({ title, value, color }) {
  return (
    <div className="w-full">
      <div className="flex justify-between text-xs sm:text-sm mb-1.5 sm:mb-2 gap-2 min-w-0">
        <span className="text-slate-300 truncate">{title}</span>

        <span className="text-white font-semibold shrink-0">
          {value}%
        </span>
      </div>

      <div className="h-2.5 sm:h-3 rounded-full bg-slate-800/80 overflow-hidden w-full p-0.5 border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
}