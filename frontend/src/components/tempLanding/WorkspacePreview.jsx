import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { year: "2025", value: 120000 },
  { year: "2026", value: 245000 },
  { year: "2027", value: 430000 },
  { year: "2028", value: 670000 },
  { year: "2029", value: 980000 },
  { year: "2030", value: 1380000 },
];

const cards = [
  {
    title: "Risk Score",
    value: "41 / 100",
    status: "Low Risk",
    color: "text-green-600",
  },
  {
    title: "Monthly EMI",
    value: "₹18,420",
    status: "Affordable",
    color: "text-blue-600",
  },
  {
    title: "Interest Saved",
    value: "₹4.82 L",
    status: "Optimized",
    color: "text-green-600",
  },
];

export default function WorkspacePreview() {
  return (
    <section className="border-y border-gray-200 bg-slate-50">

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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >

          <p className="text-[11px] uppercase tracking-[0.3em] text-blue-600">

            Financial Workspace

          </p>

          <h2
            className="
              mt-4
              text-3xl
              font-semibold
              leading-tight

              sm:text-4xl

              lg:text-5xl
            "
          >

            Understand every financial decision visually.

          </h2>

          <p
            className="
              mt-5
              max-w-2xl
              text-base
              leading-8
              text-gray-600
            "
          >

            Interactive investment projections with AI-powered
            financial insights that help you make better,
            faster and smarter financial decisions.

          </p>

        </motion.div>

        <div
          className="
            mt-12
            grid
            gap-8

            lg:grid-cols-3
          "
        >

          {/* Chart */}

          <div
            className="
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm

              sm:p-6

              lg:col-span-2
              lg:p-8
            "
          >

            <h3 className="text-lg font-semibold">

              Investment Growth

            </h3>

            <div
              className="
                mt-8
                h-64

                sm:h-72

                lg:h-80
              "
            >

              <ResponsiveContainer width="100%" height="100%">

                <AreaChart data={data}>

                  <defs>

                    <linearGradient
                      id="blue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="0%"
                        stopColor="#2563EB"
                        stopOpacity={0.35}
                      />

                      <stop
                        offset="100%"
                        stopColor="#2563EB"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>

                  <CartesianGrid strokeDasharray="4 4" />

                  <XAxis dataKey="year" />

                  <YAxis />

                  <Tooltip />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563EB"
                    strokeWidth={3}
                    fill="url(#blue)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* Right Side */}

          <div className="space-y-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="
                  border
                  border-gray-200
                  bg-white
                  p-6
                  shadow-sm
                "
              >

                <p
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.25em]
                    text-gray-500
                  "
                >

                  {card.title}

                </p>

                <h2
                  className={`
                    mt-4
                    text-3xl
                    font-semibold

                    sm:text-4xl

                    ${card.color}
                  `}
                >

                  {card.value}

                </h2>

                <div
                  className="
                    mt-5
                    inline-block
                    border
                    border-green-200
                    bg-green-50
                    px-3
                    py-2
                    text-xs
                    text-green-700
                  "
                >

                  {card.status}

                </div>

              </div>

            ))}

            <div
              className="
                border
                border-blue-200
                bg-blue-50
                p-6
              "
            >

              <p
                className="
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  text-blue-700
                "
              >

                AI Recommendation

              </p>

              <p
                className="
                  mt-5
                  text-sm
                  leading-7
                  text-gray-700
                "
              >

                Shortening your loan tenure by five years
                could reduce your total interest burden
                significantly while keeping your monthly
                EMI comfortable and improving your long-term
                financial health.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}