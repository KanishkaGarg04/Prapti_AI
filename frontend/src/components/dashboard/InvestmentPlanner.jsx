import { useAnalysis } from "../../context/AnalysisContext";

export default function InvestmentPlanner() {
  const { analysis } = useAnalysis();

  if (!analysis) return null;

  const allocation = analysis.investmentPlan || {};

  const monthlyInvestment = Math.round(
    (analysis.monthlySurplus || 0) * 0.6
  );

  const yearlyInvestment = monthlyInvestment * 12;

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <h2 className="text-2xl font-bold">
        AI Investment Plan
      </h2>

      <p className="mt-1 text-gray-500">
        Personalized monthly allocation
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">

        <Card
          title="Recommended Monthly Investment"
          value={`₹${monthlyInvestment.toLocaleString("en-IN")}`}
        />

        <Card
          title="Recommended Yearly Investment"
          value={`₹${yearlyInvestment.toLocaleString("en-IN")}`}
        />

        <Card
          title="Stocks"
          value={`${allocation.stocks ?? 0}%`}
        />

        <Card
          title="Mutual Funds"
          value={`${allocation.mutualFunds ?? 0}%`}
        />

        <Card
          title="Gold"
          value={`${allocation.gold ?? 0}%`}
        />

        <Card
          title="Cash Reserve"
          value={`${allocation.cash ?? 0}%`}
        />

      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-5">
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-bold">
        {value}
      </h2>
    </div>
  );
}