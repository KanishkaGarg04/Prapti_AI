import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="border-b border-gray-200 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2">
        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-blue-600">
            Financial Intelligence Platform
          </p>

          <h1 className="mt-6 text-5xl font-semibold leading-tight text-gray-900">
            Understand every financial decision

            <span className="mt-2 block text-blue-600">
              before it becomes debt.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-8 text-gray-600">
            Prapti AI helps you analyze loan affordability,
            identify financial risks, optimize repayments,
            compare investment opportunities, and receive
            intelligent AI-powered financial recommendations.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={() => navigate("/dashboard")}
              className="
                rounded-md
                bg-blue-600
                px-7
                py-3.5
                text-sm
                font-medium
                text-white
                shadow-md
                transition-all
                hover:bg-blue-700
                hover:shadow-xl
              "
            >
              Start Free Analysis
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="
                rounded-md
                border
                border-gray-300
                bg-white
                px-7
                py-3.5
                text-sm
                font-medium
                text-gray-700
                transition-all
                hover:border-blue-600
                hover:text-blue-600
                hover:shadow-lg
              "
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.7,
          }}
        >
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="border-b border-gray-200 px-6 py-5">
              <p className="text-sm font-semibold text-gray-700">
                Live Financial Snapshot
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              <Metric
                title="Monthly EMI"
                value="₹18,420"
                color="text-gray-900"
                delay={0}
              />

              <Metric
                title="Risk Score"
                value="41 / 100"
                color="text-blue-600"
                delay={0.1}
              />

              <Metric
                title="Debt Burden"
                value="32%"
                color="text-orange-500"
                delay={0.2}
              />

              <Metric
                title="Interest Saved"
                value="₹4.82 L"
                color="text-green-600"
                delay={0.3}
              />

              <Metric
                title="Investment Value"
                value="₹13.8 L"
                color="text-indigo-600"
                delay={0.4}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Metric({ title, value, color, delay }) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 20,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay,
        duration: 0.45,
      }}
      whileHover={{
        backgroundColor: "#F8FAFC",
      }}
      className="flex items-center justify-between px-6 py-5 transition-colors"
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className={`text-lg font-semibold ${color}`}>
        {value}
      </h3>
    </motion.div>
  );
}