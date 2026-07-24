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
    <section
      id="features"
      className="border-t border-gray-200 bg-white"
    >
      <div
        className="
          mx-auto
          max-w-7xl
          px-5
          py-14

          sm:px-6
          sm:py-16

          lg:px-8
          lg:py-24
        "
      >
        {/* Heading */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <p
            className="
              text-[11px]
              uppercase
              tracking-[0.3em]
              text-blue-600
            "
          >
            Platform Capabilities
          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              leading-tight
              text-gray-900

              sm:text-4xl

              lg:text-5xl
            "
          >
            Everything needed to understand your finances.
          </h2>

          <p
            className="
              mt-6
              text-base
              leading-8
              text-gray-600

              lg:text-lg
            "
          >
            Prapti AI combines financial calculations,
            predictive analytics, investment projections,
            and AI-powered guidance into one intelligent
            financial platform.
          </p>

        </div>

        {/* Cards */}

        <div
          className="
            grid
            grid-cols-1
            gap-6

            sm:grid-cols-2

            xl:grid-cols-3
          "
        >
          {features.map((feature, index) => {

            const Icon = feature.icon;

            return (

              <motion.div
                key={feature.title}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                className="
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-sm
                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-blue-300
                  hover:shadow-xl

                  sm:p-7
                "
              >

                <div
                  className="
                    mb-6
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    border
                    border-blue-100
                    bg-blue-50
                  "
                >

                  <Icon
                    size={24}
                    className="text-blue-600"
                  />

                </div>

                <h3
                  className="
                    text-xl
                    font-semibold
                    text-gray-900
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-4
                    text-sm
                    leading-7
                    text-gray-600

                    sm:text-base
                  "
                >
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