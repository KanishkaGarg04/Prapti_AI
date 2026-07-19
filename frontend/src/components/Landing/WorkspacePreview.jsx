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
    <section className="bg-slate-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-24">

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            Financial Workspace
          </p>

          <h2 className="mt-4 text-4xl font-semibold">
            Understand every financial decision visually.
          </h2>

          <p className="mt-5 max-w-2xl text-gray-600">
            Interactive investment projections with AI financial insights.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mt-14">

          {/* Chart */}

          <div className="lg:col-span-2 border border-gray-200 bg-white p-7 shadow-sm">

            <h3 className="font-semibold text-lg">
              Investment Growth
            </h3>

            <div className="h-80 mt-8">

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

          {/* Cards */}

          <div className="space-y-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="border border-gray-200 bg-white p-6 shadow-sm"
              >

                <p className="text-xs uppercase tracking-widest text-gray-500">

                  {card.title}

                </p>

                <h2 className={`mt-4 text-3xl font-semibold ${card.color}`}>

                  {card.value}

                </h2>

                <div className="mt-4 inline-block bg-green-50 text-green-700 text-xs px-3 py-1">

                  {card.status}

                </div>

              </div>

            ))}

            <div className="border border-blue-200 bg-blue-50 p-6">

              <p className="text-xs uppercase tracking-widest text-blue-700">

                AI Recommendation

              </p>

              <p className="mt-4 text-sm text-gray-700 leading-7">

                Shortening your loan tenure by 5 years could reduce total
                interest significantly while maintaining a comfortable EMI.

              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}