import StatCard from "../common/StatCard";

export default function SummaryPanel({ result }) {
  if (!result) {
    return (
      <div className="border border-gray-200 bg-white p-10">
        <h2 className="text-base font-semibold text-gray-900">
          Financial Summary
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Run an analysis to generate your financial report.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Financial Summary
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Key financial indicators calculated from your loan profile.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">

        <StatCard
          title="Monthly EMI"
          value={`₹ ${result.risk.emi_monthly}`}
          subtitle="Monthly payment"
        />

        <StatCard
          title="Risk Score"
          value={`${result.risk.risk.risk_score}/100`}
          subtitle={result.risk.risk.category}
          positive={result.risk.risk.risk_score < 60}
        />

        <StatCard
          title="Debt Burden"
          value={`${result.risk.risk.burden_ratio_percent}%`}
          subtitle="Debt to Income Ratio"
        />

        <StatCard
          title="Interest Saved"
          value={`₹ ${result.optimize.interest_saved}`}
          subtitle="Optimized Loan"
        />

      </div>

    </div>
  );
}