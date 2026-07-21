import {
  TrendingUp,
  Landmark,
  ShieldCheck,
  Coins,
  ArrowUpRight,
  PieChart,
  Wallet,
  BarChart3,
} from "lucide-react";
import { useAnalysis } from "../../context/AnalysisContext";

export default function InvestmentPlanner() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const allocation = analysis.investmentPlan || {};

  const monthlyInvestment = Math.max(
    Math.round((analysis.monthlySurplus || 0) * 0.6),
    0
  );

  const yearlyInvestment = monthlyInvestment * 12;

  const r = 0.12 / 12;
  const n = 10 * 12;

  const projectedValue = Math.round(
    monthlyInvestment *
      (((Math.pow(1 + r, n) - 1) / r) * (1 + r))
  );

  const cards = [
    {
      title: "Stocks",
      value: allocation.stocks || 0,
      amount: Math.round(
        (monthlyInvestment * (allocation.stocks || 0)) / 100
      ),
      icon: TrendingUp,
      color: "text-blue-600",
      bg: "bg-blue-50",
      bar: "bg-blue-600",
    },
    {
      title: "Mutual Funds",
      value: allocation.mutualFunds || 0,
      amount: Math.round(
        (monthlyInvestment * (allocation.mutualFunds || 0)) / 100
      ),
      icon: PieChart,
      color: "text-sky-600",
      bg: "bg-sky-50",
      bar: "bg-sky-600",
    },
    {
      title: "Debt Funds",
      value: allocation.debtFunds || 0,
      amount: Math.round(
        (monthlyInvestment * (allocation.debtFunds || 0)) / 100
      ),
      icon: Landmark,
      color: "text-slate-700",
      bg: "bg-slate-100",
      bar: "bg-slate-600",
    },
    {
      title: "Gold",
      value: allocation.gold || 0,
      amount: Math.round(
        (monthlyInvestment * (allocation.gold || 0)) / 100
      ),
      icon: Coins,
      color: "text-amber-600",
      bg: "bg-amber-50",
      bar: "bg-amber-500",
    },
    {
      title: "Cash Reserve",
      value: allocation.cash || 0,
      amount: Math.round(
        (monthlyInvestment * (allocation.cash || 0)) / 100
      ),
      icon: Wallet,
      color: "text-gray-700",
      bg: "bg-gray-100",
      bar: "bg-gray-600",
    },
  ];

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="border-b border-slate-200 px-6 py-5">
        <h2 className="text-2xl font-semibold text-slate-900">
          AI Investment Strategy
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Personalized investment allocation generated from your financial profile.
        </p>
      </div>

      <div className="grid gap-4 border-b border-slate-200 p-6 lg:grid-cols-3">
        <InfoCard
          title="Monthly SIP"
          value={`₹${monthlyInvestment.toLocaleString("en-IN")}`}
          subtitle="Recommended monthly investment"
          icon={TrendingUp}
          color="text-blue-600"
        />

        <InfoCard
          title="Annual SIP"
          value={`₹${yearlyInvestment.toLocaleString("en-IN")}`}
          subtitle="Expected yearly contribution"
          icon={BarChart3}
          color="text-emerald-600"
        />

        <InfoCard
          title="Projected Wealth"
          value={`₹${projectedValue.toLocaleString("en-IN")}`}
          subtitle="Estimated value after 10 years"
          icon={ShieldCheck}
          color="text-violet-600"
        />
      </div>

      <div className="grid gap-4 border-b border-slate-200 px-6 py-5 lg:grid-cols-3">
        <MetricCard
          title="Risk Profile"
          value={analysis.investment}
          subtitle="Investor category"
        />

        <MetricCard
          title="Expected CAGR"
          value="11–13%"
          subtitle="Historical market average"
        />

        <MetricCard
          title="Portfolio Review"
          value="Every 6 Months"
          subtitle="Recommended review cycle"
        />
      </div>

      <div className="px-6 py-6">
        <h3 className="text-xl font-semibold text-slate-900">
          Portfolio Allocation
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          AI recommended monthly allocation.
        </p>

        <div className="mt-5 space-y-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-lg border border-slate-200 bg-white p-4 transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`rounded-lg p-2 ${item.bg}`}>
                      <Icon
                        size={18}
                        className={item.color}
                      />
                    </div>

                    <div>
                      <h4 className="text-base font-semibold text-slate-900">
                        {item.title}
                      </h4>

                      <p className="text-sm text-slate-500">
                        ₹{item.amount.toLocaleString("en-IN")} / month
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xl font-bold text-slate-900">
                      {item.value}%
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="ml-auto mt-1 text-slate-400"
                    />
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`${item.bar} h-full rounded-full transition-all`}
                    style={{
                      width: `${item.value}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-6">

        <div className="flex items-start gap-4">

          <div className="rounded-lg bg-blue-50 p-3">

            <ShieldCheck
              size={20}
              className="text-blue-600"
            />

          </div>

          <div className="flex-1">

            <h3 className="text-lg font-semibold text-slate-900">
              AI Recommendation
            </h3>

            <p className="mt-3 text-[15px] leading-7 text-slate-600">

              {analysis.aiRecommendation?.investmentAdvice ||
                "Maintain disciplined monthly SIP investments while keeping at least six months of emergency savings. Diversify your investments across equity, mutual funds, debt funds and gold. Rebalance your portfolio every six months to align with your financial goals and changing market conditions."}

            </p>

          </div>

        </div>

      </div>

    </div>

  );
}

function InfoCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) {
  return (

    <div className="rounded-lg border border-slate-200 bg-white p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
            {value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>

        </div>

        <div className="rounded-lg bg-slate-100 p-3">

          <Icon
            size={20}
            className={color}
          />

        </div>

      </div>

    </div>

  );
}

function MetricCard({
  title,
  value,
  subtitle,
}) {
  return (

    <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:border-slate-300">

      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
        {title}
      </p>

      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900">
        {value}
      </h3>

      <p className="mt-2 text-sm text-slate-500">
        {subtitle}
      </p>

    </div>

  );
}