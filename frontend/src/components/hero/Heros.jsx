import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, TrendingUp } from "lucide-react";

export default function Heros() {
  return (
    <section className="relative overflow-hidden pt-28 sm:pt-36 pb-16 sm:pb-24 bg-gradient-to-br from-blue-50 via-white to-indigo-50 w-full">
      {/* Background Blur */}
      <div className="absolute top-10 left-10 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-blue-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 h-60 w-60 sm:h-72 sm:w-72 rounded-full bg-indigo-200/30 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-blue-700 mb-5 sm:mb-6">
              <TrendingUp size={16} className="shrink-0" />
              <span>AI Powered Financial Intelligence</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.15] text-slate-900 tracking-tight">
              Make
              <span className="text-blue-600"> Smarter </span>
              Financial Decisions.
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Analyze loans, calculate debt risk, optimize repayments,
              compare investment opportunities, and receive AI-powered
              financial guidance—all in one platform.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6.5 py-3.5 sm:px-7 sm:py-4 text-white font-semibold shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] hover:bg-blue-700 active:scale-[0.98]">
                <span>Start Analysis</span>
                <ArrowRight size={18} className="shrink-0" />
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-6.5 py-3.5 sm:px-7 sm:py-4 font-semibold text-slate-700 transition-all hover:bg-slate-50 active:scale-[0.98]">
                <PlayCircle size={20} className="shrink-0 text-slate-500" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-lg mx-auto lg:max-w-none"
          >
            <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200/80 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Financial Health
                  </p>

                  <h2 className="text-4xl sm:text-5xl font-black text-emerald-600 mt-1 sm:mt-2 tracking-tight">
                    82
                  </h2>

                  <p className="font-semibold text-emerald-600 text-sm mt-1">
                    Excellent
                  </p>
                </div>

                <div className="self-start sm:self-center h-20 w-20 sm:h-24 sm:w-24 rounded-full border-[8px] sm:border-[10px] border-emerald-500 flex items-center justify-center text-lg sm:text-xl font-bold text-slate-900 shrink-0 bg-emerald-50/50">
                  82%
                </div>
              </div>

              <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 transition hover:border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">Monthly EMI</p>

                  <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    ₹18,420
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 transition hover:border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Risk Score
                  </p>

                  <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-emerald-600 tracking-tight">
                    Low
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 transition hover:border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Savings
                  </p>

                  <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    ₹26,000
                  </h3>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 sm:p-5 transition hover:border-slate-200">
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Interest Saved
                  </p>

                  <h3 className="mt-1.5 sm:mt-2 text-xl sm:text-2xl font-bold text-blue-600 tracking-tight">
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