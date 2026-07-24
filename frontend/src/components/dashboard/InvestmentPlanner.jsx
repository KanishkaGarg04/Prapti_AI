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
      className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm w-full max-w-full"
      style={{
        fontFamily:
          "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div className="border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 truncate">
          AI Investment Strategy
        </h2>

        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Personalized investment allocation generated from your financial profile.
        </p>
      </div>

      <div className="grid gap-4 sm:gap-6 border-b border-slate-200 p-4 sm:p-6 lg:p-8 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="grid gap-4 sm:gap-6 border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:grid-cols-2 lg:grid-cols-3">
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

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 truncate">
          Portfolio Allocation
        </h3>

        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          AI recommended monthly allocation.
        </p>

        <div className="mt-5 space-y-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5 transition-all duration-300 hover:border-blue-200 hover:shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className={`rounded-xl p-2.5 sm:p-3 ${item.bg} shrink-0`}>
                      <Icon
                        size={20}
                        className={`${item.color} sm:w-[22px] sm:h-[22px]`}
                      />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900 truncate">
                        {item.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-500 truncate">
                        ₹{item.amount.toLocaleString("en-IN")} / month
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start">
                    <div className="text-lg sm:text-xl font-bold text-slate-900">
                      {item.value}%
                    </div>

                    <ArrowUpRight
                      size={16}
                      className="hidden sm:block mt-1 text-slate-400"
                    />
                  </div>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100 w-full">
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

      <div className="border-t border-slate-200 bg-slate-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="rounded-xl bg-blue-50 p-3 shrink-0">
            <ShieldCheck
              size={22}
              className="text-blue-600 sm:w-[24px] sm:h-[24px]"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900">
              AI Recommendation
            </h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-[15px] leading-6 sm:leading-7 text-slate-600 break-words">
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
    <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-sm w-full">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500 truncate">
            {title}
          </p>

          <h3 className="mt-2 sm:mt-3 text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 truncate">
            {value}
          </h3>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 truncate">
            {subtitle}
          </p>
        </div>

        <div className="rounded-xl bg-slate-100 p-2.5 sm:p-3 shrink-0">
          <Icon
            size={20}
            className={`${color} sm:w-[22px] sm:h-[22px]`}
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-6 transition-all duration-300 hover:border-slate-300 w-full">
      <p className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-slate-500 truncate">
        {title}
      </p>

      <h3 className="mt-2 sm:mt-3 text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 truncate">
        {value}
      </h3>

      <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-slate-500 truncate">
        {subtitle}
      </p>
    </div>
  );
}