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

      console.log("Analysis Response:", res.data);
      setAnalysis(res.data);

      toast.success("Financial Analysis Completed!");

      const historyRes = await api.get("/analysis/history");
      setHistory(historyRes.data);

      // Smooth scroll to results
      setTimeout(() => {
        document
          .getElementById("dashboard-results")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } catch (err) {
      console.error(err);
      toast.error("Analysis Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border border-gray-200 bg-white shadow-sm rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-6 md:px-8 md:py-6">
        <p className="text-xs uppercase tracking-widest text-blue-600 font-medium">
          Financial Analysis
        </p>

        <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
          Analyze Your Financial Profile
        </h2>

        <p className="mt-2 text-sm md:text-base text-gray-500">
          Enter your financial information to receive AI-powered recommendations.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="p-5 md:p-8 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
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

          {/* Select Fields */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Investment Preference
            </label>
            <select
              name="investment"
              value={formData.investment}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-700"
            >
              <option value="">Select Preference</option>
              <option value="Low Risk">Low Risk</option>
              <option value="Moderate">Moderate</option>
              <option value="High Growth">High Growth</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 block">
              Financial Goal
            </label>
            <select
              name="goal"
              value={formData.goal}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-700"
            >
              <option value="">Select Goal</option>
              <option value="Debt Reduction">Debt Reduction</option>
              <option value="Investment Planning">Investment Planning</option>
              <option value="Retirement">Retirement</option>
              <option value="Emergency Fund">Emergency Fund</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            disabled={loading}
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-4 px-6 font-semibold text-white hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg shadow-sm hover:shadow-md"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full"></span>
                Analyzing...
              </span>
            ) : (
              "Analyze Financial Profile"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, disabled }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 block">
        {label}
      </label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full border border-gray-300 rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-gray-700 placeholder:text-gray-400"
      />
    </div>
  );
}