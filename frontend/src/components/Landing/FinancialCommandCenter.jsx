import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wallet,
  TrendingUp,
  Landmark,
  BrainCircuit,
  BadgeIndianRupee,
} from "lucide-react";

const cards = [
  {
    title: "Financial Health",
    value: "82 / 100",
    icon: ShieldCheck,
    color: "text-green-600",
    bg: "bg-green-100",
    description: "Excellent financial stability",
  },
  {
    title: "Monthly EMI",
    value: "₹18,420",
    icon: Wallet,
    color: "text-blue-600",
    bg: "bg-blue-100",
    description: "32% of monthly income",
  },
  {
    title: "Investment Growth",
    value: "+18%",
    icon: TrendingUp,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    description: "Projected annual return",
  },
  {
    title: "Interest Saved",
    value: "₹5.8L",
    icon: BadgeIndianRupee,
    color: "text-orange-600",
    bg: "bg-orange-100",
    description: "Using optimized tenure",
  },
  {
    title: "Loan Optimizer",
    value: "15 Years",
    icon: Landmark,
    color: "text-purple-600",
    bg: "bg-purple-100",
    description: "Best repayment strategy",
  },
  {
    title: "AI Recommendation",
    value: "Increase SIP",
    icon: BrainCircuit,
    color: "text-pink-600",
    bg: "bg-pink-100",
    description: "₹5,000/month suggested",
  },
];

export default function FinancialCommandCenter() {
  return (
    <section className="py-28 bg-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-blue-600 font-semibold tracking-widest uppercase">
            Financial Dashboard
          </p>

          <h2 className="mt-4 text-5xl font-black text-slate-900">
            Your Financial Command Center
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-slate-600 text-lg leading-8">
            Monitor your financial health, debt burden, investment
            opportunities, AI insights, and repayment strategy from one
            intelligent dashboard.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {cards.map((card, index) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.4,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                }}
                className="rounded-3xl bg-white shadow-xl border border-slate-200 p-8"
              >
                <div
                  className={`h-16 w-16 rounded-2xl ${card.bg} flex items-center justify-center`}
                >
                  <Icon
                    size={30}
                    className={card.color}
                  />
                </div>

                <h3 className="mt-8 text-lg font-semibold text-slate-500">
                  {card.title}
                </h3>

                <h2 className="mt-2 text-3xl font-black text-slate-900">
                  {card.value}
                </h2>

                <p className="mt-4 text-slate-600">
                  {card.description}
                </p>
              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}