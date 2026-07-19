import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { useAnalysis } from "../../context/AnalysisContext";
import { motion } from "framer-motion";

const COLORS = ["#2563EB", "#93C5FD"];

export default function ChartsSection() {
  const { analysis } = useAnalysis();

  const growthData =
    analysis?.projection?.length > 0
      ? analysis.projection
      : [
          { year: 1, amount: 100000 },
          { year: 2, amount: 230000 },
          { year: 3, amount: 410000 },
          { year: 4, amount: 620000 },
          { year: 5, amount: 870000 },
        ];

  const cashflow =
    analysis?.cashflow?.length > 0
      ? analysis.cashflow
      : [
          {
            month: "Income",
            value: 80000,
          },
          {
            month: "Expenses",
            value: 26000,
          },
          {
            month: "EMI",
            value: 18000,
          },
        ];

  const emiData =
    analysis?.emiDistribution?.length > 0
      ? analysis.emiDistribution
      : [
          {
            name: "Principal",
            value: 72,
          },
          {
            name: "Interest",
            value: 28,
          },
        ];

  return (
    <div className="mt-8 space-y-8">

      {/* Investment Growth */}
      <motion.div
        initial={{
        opacity:0,
        y:40,
        }}
        animate={{
        opacity:1,
        y:0,
        }}
        transition={{
        duration:.7,
        }}
        ></motion.div>
      <div className="border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-6 py-5">

          <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
            Investment Projection
          </p>

          <h2 className="mt-2 text-xl font-semibold">
            Long-Term Growth
          </h2>

        </div>

        <div className="h-96 p-6">

          <ResponsiveContainer width="100%" height="100%">

            <AreaChart data={growthData}>

              <defs>

                <linearGradient
                  id="growthGradient"
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

              <CartesianGrid
                strokeDasharray="4 4"
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="year"
                tickLine={false}
                axisLine={false}
              />

              <YAxis
                tickFormatter={(value) => `₹${value / 1000}k`}
                tickLine={false}
                axisLine={false}
              />

              <Tooltip
                formatter={(value) => [
                  `₹${Number(value).toLocaleString("en-IN")}`,
                  "Investment",
                ]}
              />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#2563EB"
                strokeWidth={3}
                fill="url(#growthGradient)"
                animationDuration={1500}
                animationEasing="ease"
              />

            </AreaChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Bottom Charts */}

      <div className="grid gap-8 lg:grid-cols-2">

        {/* EMI Distribution */}

        <div className="border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">

            <h3 className="font-semibold">
              EMI Distribution
            </h3>

          </div>

          <div className="h-80">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={emiData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={3}
                >

                  {emiData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}

                </Pie>

                <Tooltip
                  formatter={(value) => [`${value}%`, "Share"]}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        {/* Cash Flow */}

        <div className="border border-gray-200 bg-white shadow-sm">

          <div className="border-b border-gray-200 px-6 py-5">

            <h3 className="font-semibold">
              Monthly Cash Flow
            </h3>

          </div>

          <div className="h-80 p-5">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={cashflow}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#E5E7EB"
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                />

                <YAxis
                  tickFormatter={(value) => `₹${value / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip
                  formatter={(value) => [
                    `₹${Number(value).toLocaleString("en-IN")}`,
                    "",
                  ]}
                />

                <Bar
                  dataKey="value"
                  fill="#2563EB"
                  radius={[6, 6, 0, 0]}
                  animationDuration={1500}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}