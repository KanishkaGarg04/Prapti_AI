import { motion } from "framer-motion";
import { Brain, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Reading Financial Profile",
  "Calculating EMI & Debt Ratio",
  "Predicting Wealth Growth",
  "Generating AI Recommendation",
];

export default function LoadingOverlay({ loading }) {
  if (!loading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white/90 backdrop-blur-md flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl p-10"
      >
        <div className="flex flex-col items-center">

          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
            className="mb-6"
          >
            <Brain size={60} className="text-blue-600" />
          </motion.div>

          <h2 className="text-3xl font-bold text-gray-900">
            Prapti AI
          </h2>

          <p className="mt-3 text-gray-500">
            Analyzing your financial profile...
          </p>

          <div className="w-full mt-10 space-y-5">

            {steps.map((step, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.6,
                }}
                className="flex items-center gap-4"
              >
                {i === 0 ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <Loader2 className="animate-spin text-blue-600" />
                )}

                <span className="text-gray-700">
                  {step}
                </span>
              </motion.div>
            ))}

          </div>

          <motion.div
            className="mt-10 h-2 w-full overflow-hidden rounded-full bg-gray-200"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{
                duration: 4,
              }}
              className="h-full bg-blue-600"
            />
          </motion.div>

        </div>
      </motion.div>
    </motion.div>
  );
}