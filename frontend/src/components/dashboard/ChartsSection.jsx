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

import { motion } from "framer-motion";
import { useAnalysis } from "../../context/AnalysisContext";

const COLORS = ["#2563EB", "#60A5FA"];

export default function ChartsSection() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const growthData =
    analysis.projection || [];

  const cashflow =
    analysis.cashflow || [
      {
        month: "Income",
        value: analysis.monthlyIncome || 0,
      },
      {
        month: "Expenses",
        value: analysis.monthlyExpenses || 0,
      },
      {
        month: "EMI",
        value: analysis.emi || 0,
      },
      {
        month: "Savings",
        value: analysis.monthlySurplus || 0,
      },
    ];

  const emiData =
    analysis.emiDistribution || [
      {
        name: "Principal",
        value: 70,
      },
      {
        name: "Interest",
        value: 30,
      },
    ];

  return (
    <div className="mt-8 space-y-6 sm:space-y-8 w-full max-w-full overflow-hidden">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >

        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden w-full">

          <div className="border-b p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold truncate">
              Investment Growth Projection
            </h2>
          </div>

          <div className="h-72 sm:h-96 p-2 sm:p-6 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <AreaChart data={growthData}>

                <defs>

                  <linearGradient
                    id="growth"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stopColor="#2563EB"
                      stopOpacity={0.4}
                    />

                    <stop
                      offset="100%"
                      stopColor="#2563EB"
                      stopOpacity={0}
                    />

                  </linearGradient>

                </defs>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="year" tick={{ fontSize: 12 }} />

                <YAxis tick={{ fontSize: 12 }} width={60} />

                <Tooltip />

                <Area
                  dataKey="amount"
                  stroke="#2563EB"
                  fill="url(#growth)"
                  strokeWidth={3}
                />

              </AreaChart>

            </ResponsiveContainer>

          </div>

        </div>

      </motion.div>

      <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 w-full">

        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden w-full">

          <div className="border-b p-4 sm:p-6">

            <h2 className="text-lg sm:text-xl font-bold truncate">
              EMI Distribution
            </h2>

          </div>

          <div className="h-72 sm:h-80 p-2 sm:p-4 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={emiData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={95}
                >

                  {emiData.map((item, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="rounded-2xl border bg-white shadow-sm overflow-hidden w-full">

          <div className="border-b p-4 sm:p-6">

            <h2 className="text-lg sm:text-xl font-bold truncate">
              Monthly Cashflow
            </h2>

          </div>

          <div className="h-72 sm:h-80 p-2 sm:p-6 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={cashflow}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" tick={{ fontSize: 12 }} />

                <YAxis tick={{ fontSize: 12 }} width={60} />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#2563EB"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>
  );
}