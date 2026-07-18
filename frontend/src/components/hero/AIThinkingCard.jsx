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
      className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-7 shadow-2xl"
    >
      <div className="flex items-center gap-3">

        <div className="rounded-xl bg-blue-600 p-3">

          <BrainCircuit
            className="text-white"
            size={24}
          />

        </div>

        <div>

          <h3 className="text-white font-bold">
            Prapti AI
          </h3>

          <p className="text-slate-400 text-sm">
            Financial Intelligence Engine
          </p>

        </div>

      </div>

      <div className="mt-10">

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <Sparkles className="text-yellow-400" />

          <p className="text-slate-200 text-lg">
            {messages[step]}
          </p>

        </motion.div>

        <div className="mt-8 space-y-4">

          <Progress
            title="Debt Risk"
            value={82}
            color="bg-red-500"
          />

          <Progress
            title="Investment Potential"
            value={64}
            color="bg-green-500"
          />

          <Progress
            title="Financial Stability"
            value={91}
            color="bg-blue-500"
          />

        </div>

      </div>

    </motion.div>
  );
}

function Progress({ title, value, color }) {
  return (
    <div>

      <div className="flex justify-between text-sm mb-2">

        <span className="text-slate-300">{title}</span>

        <span className="text-white font-semibold">
          {value}%
        </span>

      </div>

      <div className="h-3 rounded-full bg-slate-800">

        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-full rounded-full ${color}`}
        />

      </div>

    </div>
  );
}