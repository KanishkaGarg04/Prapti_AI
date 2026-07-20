import { useState } from "react";
import api from "../../services/api";
import { useAnalysis } from "../../context/AnalysisContext";
import toast from "react-hot-toast";

export default function AnalysisForm() {
  const {
    setAnalysis,
    loading,
    setLoading,
    setHistory,
  } = useAnalysis();

  const [formData, setFormData] = useState({
    loanAmount: "",
    interestRate: "",
    tenure: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    existingEmi: "",
    investment: "",
    goal: "",
  });

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/analysis", formData);

      console.log("Analysis Response");
      console.log(res.data);

      setAnalysis(res.data);

      toast.success("Financial Analysis Completed!");

      const historyRes =  api.get("/analysis/history");

      setHistory(historyRes.data);

      setTimeout(() => {
        document
          .getElementById("dashboard-results")
          ?.scrollIntoView({
            behavior: "smooth",
          });
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-xl">
      <div className="border-b border-gray-200 px-8 py-6">
        <p className="text-xs uppercase tracking-[0.3em] text-blue-600">
          Financial Analysis
        </p>

        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          Analyze Your Financial Profile
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter your financial information to receive AI-powered recommendations.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid gap-6 p-8 md:grid-cols-2"
      >
        <Input
          label="Loan Amount"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleChange}
          placeholder="₹ 5,00,000"
          disabled={loading}
        />

        <Input
          label="Interest Rate (%)"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleChange}
          placeholder="8.5"
          disabled={loading}
        />

        <Input
          label="Loan Tenure (Years)"
          name="tenure"
          value={formData.tenure}
          onChange={handleChange}
          placeholder="20"
          disabled={loading}
        />

        <Input
          label="Monthly Income"
          name="monthlyIncome"
          value={formData.monthlyIncome}
          onChange={handleChange}
          placeholder="₹ 80,000"
          disabled={loading}
        />

        <Input
          label="Monthly Expenses"
          name="monthlyExpenses"
          value={formData.monthlyExpenses}
          onChange={handleChange}
          placeholder="₹ 25,000"
          disabled={loading}
        />

        <Input
          label="Existing EMI"
          name="existingEmi"
          value={formData.existingEmi}
          onChange={handleChange}
          placeholder="₹ 10,000"
          disabled={loading}
        />

        <div>
          <label className="text-sm font-medium">
            Investment Preference
          </label>

          <select
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            disabled={loading}
            className="mt-2 w-full border px-4 py-3 rounded-lg"
          >
            <option value="">Select</option>
            <option>Low Risk</option>
            <option>Moderate</option>
            <option>High Growth</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium">
            Financial Goal
          </label>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            disabled={loading}
            className="mt-2 w-full border px-4 py-3 rounded-lg"
          >
            <option value="">Select</option>
            <option>Debt Reduction</option>
            <option>Investment Planning</option>
            <option>Retirement</option>
            <option>Emergency Fund</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Financial Profile"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled,
}) {
  return (
    <div>
      <label className="text-sm font-medium">
        {label}
      </label>

      <input
        disabled={disabled}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="mt-2 w-full border rounded-lg px-4 py-3 disabled:bg-gray-100"
      />
    </div>
  );
}