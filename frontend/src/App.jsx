import { useState } from "react";
import Navbar from "./components/Navbar";
import RiskGauge from "./components/RiskGauge";
import MetricCard from "./components/MetricCard";

export default function App() {
  const [form, setForm] = useState({
    income: "",
    expenses: "",
    debt: "",
    interest_rate: "",
    savings: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function startAssessment() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/risk-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          income: Number(form.income),
          expenses: Number(form.expenses),
          debt: Number(form.debt),
          interest_rate: Number(form.interest_rate),
          savings: Number(form.savings)
        })
      });

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Backend unreachable");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Future Resilience Assessment
          </h1>
          <p className="text-gray-500 mt-2">
            Understand your debt risk and discover safer financial paths
          </p>
        </div>

        {/* INPUT CARD */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Enter your financial details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              ["income", "Monthly Income"],
              ["expenses", "Monthly Expenses"],
              ["debt", "Total Debt"],
              ["interest_rate", "Interest Rate (%)"],
              ["savings", "Current Savings"]
            ].map(([key, label]) => (
              <div key={key}>
                <label className="text-sm text-gray-600">{label}</label>
                <input
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                  placeholder={`Enter ${label}`}
                />
              </div>
            ))}
          </div>

          <button
            onClick={startAssessment}
            disabled={loading}
            className="mt-6 bg-purple-600 hover:bg-purple-700 transition text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? "Analyzing..." : "Start Assessment"}
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>

        {/* RESULTS */}
        {result && (
          <>
            {/* METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              <div className="bg-gradient-to-br from-purple-600 to-purple-400 text-white rounded-xl p-6 text-center shadow-lg">
                <p className="text-sm opacity-80">Future Resilience Score</p>
                <p className="text-5xl font-bold mt-2">
                  {result.risk_score}
                </p>
              </div>

              <MetricCard
                title="Resilience Level"
                value={result.resilience}
              />

              <MetricCard
                title="Best Strategy"
                value={result.best_match}
                subtitle="AI recommended"
              />
            </div>

            {/* OPTIONS */}
            <h2 className="text-2xl font-semibold mt-12 mb-6">
              Options matched to your resilience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {result.options.map((opt) => {
                const isBest = opt.name === result.best_match;

                return (
                  <div
                    key={opt.name}
                    className={`rounded-xl p-6 shadow-md transition transform hover:-translate-y-1 ${
                      isBest
                        ? "border-2 border-purple-600 bg-purple-50"
                        : "bg-white"
                    }`}
                  >
                    {isBest && (
                      <span className="inline-block mb-2 text-xs font-semibold text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
                        Best Match
                      </span>
                    )}

                    <h3 className="text-lg font-bold">{opt.name}</h3>
                    <p className="text-gray-600 mt-2">Rate: {opt.rate}</p>
                    <p className="text-gray-600">EMI: ₹{opt.emi}</p>
                    <p className="text-green-600 font-medium mt-2">
                      Stress Reduction: {opt.stress_reduction}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}