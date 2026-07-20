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
    <div className="mt-8 space-y-8">

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">
            <h2 className="text-2xl font-bold">
              Investment Growth Projection
            </h2>
          </div>

          <div className="h-96 p-6">

            <ResponsiveContainer>

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

                <XAxis dataKey="year" />

                <YAxis />

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

      <div className="grid gap-8 lg:grid-cols-2">

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              EMI Distribution
            </h2>

          </div>

          <div className="h-80">

            <ResponsiveContainer>

              <PieChart>

                <Pie
                  data={emiData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={110}
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

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Monthly Cashflow
            </h2>

          </div>

          <div className="h-80 p-6">

            <ResponsiveContainer>

              <BarChart data={cashflow}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

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