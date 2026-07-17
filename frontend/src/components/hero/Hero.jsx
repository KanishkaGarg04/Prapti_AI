import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, TrendingUp } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-indigo-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
              <TrendingUp size={16} />
              AI Powered Financial Intelligence
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-slate-900">
              Make
              <span className="text-blue-600"> Smarter </span>
              Financial Decisions.
            </h1>

            <p className="mt-6 text-lg text-slate-600 leading-8 max-w-xl">
              Analyze loans, calculate debt risk, optimize repayments,
              compare investment opportunities, and receive AI-powered
              financial guidance—all in one platform.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-4 text-white font-semibold shadow-lg transition hover:scale-105 hover:bg-blue-700">
                Start Analysis
                <ArrowRight size={18} />
              </button>

              <button className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-100">
                <PlayCircle size={20} />
                Watch Demo
              </button>

            </div>

          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >

            <div className="rounded-3xl bg-white p-8 shadow-2xl border border-slate-200">

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-slate-500 text-sm">
                    Financial Health
                  </p>

                  <h2 className="text-5xl font-black text-green-500 mt-2">
                    82
                  </h2>

                  <p className="font-medium text-green-600 mt-2">
                    Excellent
                  </p>
                </div>

                <div className="h-24 w-24 rounded-full border-[10px] border-green-500 flex items-center justify-center text-xl font-bold">
                  82%
                </div>

              </div>

              <div className="mt-10 grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Monthly EMI</p>

                  <h3 className="mt-2 text-2xl font-bold">
                    ₹18,420
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Risk Score
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-green-600">
                    Low
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Savings
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    ₹26,000
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">
                    Interest Saved
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-blue-600">
                    ₹5.8L
                  </h3>
                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}