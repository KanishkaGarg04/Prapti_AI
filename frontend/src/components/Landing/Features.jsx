import { motion } from "framer-motion";
import {
  Brain,
  TrendingUp,
  ShieldAlert,
  Landmark,
  PiggyBank,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Financial Advisor",
    desc: "Receive contextual financial guidance based on your loan profile, repayment capacity, and risk score.",
  },
  {
    icon: TrendingUp,
    title: "Loan Optimization",
    desc: "Compare multiple repayment tenures and minimize long-term interest expenses.",
  },
  {
    icon: Landmark,
    title: "Opportunity Cost",
    desc: "Visualize how investing your EMI could grow your wealth over time.",
  },
  {
    icon: ShieldAlert,
    title: "Debt Risk Analysis",
    desc: "Measure debt burden using intelligent scoring and financial health indicators.",
  },
  {
    icon: PiggyBank,
    title: "Debt vs Rent",
    desc: "Compare ownership costs against renting using long-term financial projections.",
  },
  {
    icon: Sparkles,
    title: "Scenario Simulation",
    desc: "Test income loss, interest rate hikes and emergency situations before making decisions.",
  },
];

export default function Features() {
  return (
    <section className="bg-white border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <div className="text-center mb-16">

          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            Platform Capabilities
          </p>

          <h2 className="mt-4 text-4xl font-semibold text-gray-900">
            Everything needed to understand your finances.
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Prapti AI combines financial calculations, predictive analytics,
            investment projections and AI assistance into one platform.
          </p>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div

                key={feature.title}

                initial={{ opacity: 0, y: 20 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ delay: index * 0.08 }}

                className="
                border
                border-gray-200
                bg-white
                p-7
                hover:border-blue-300
                hover:shadow-lg
                transition-all
                duration-300
                "

              >

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center bg-blue-50">

                  <Icon size={22} className="text-blue-600"/>

                </div>

                <h3 className="text-lg font-semibold">

                  {feature.title}

                </h3>

                <p className="mt-4 text-sm leading-7 text-gray-600">

                  {feature.desc}

                </p>

              </motion.div>

            );

          })}

        </div>

      </div>
    </section>
  );
}