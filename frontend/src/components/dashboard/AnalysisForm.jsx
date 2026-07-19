import { useState } from "react";
import api from "../../services/api";
import { useAnalysis } from "../../context/AnalysisContext";
import toast from "react-hot-toast";

export default function AnalysisForm() {
 const {
  setAnalysis,
  loading,
  setLoading,
  history,
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

    setAnalysis(res.data);
    toast.success("Financial Analysis Completed!");
    setTimeout(() => {
  document
    .getElementById("dashboard-results")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
}, 300);
    const history = await api.get("/analysis/history");
    setHistory(history.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
}

  return (
    <div className="border border-gray-200 bg-white shadow-sm">

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
          placeholder="₹ 5,00,000"
          value={formData.loanAmount}
          onChange={handleChange}
        />

        <Input
          label="Interest Rate (%)"
          name="interestRate"
          placeholder="8.5"
          value={formData.interestRate}
          onChange={handleChange}
        />

        <Input
          label="Loan Tenure (Years)"
          name="tenure"
          placeholder="20"
          value={formData.tenure}
          onChange={handleChange}
        />

        <Input
          label="Monthly Income"
          name="monthlyIncome"
          placeholder="₹ 80,000"
          value={formData.monthlyIncome}
          onChange={handleChange}
        />

        <Input
          label="Monthly Expenses"
          name="monthlyExpenses"
          placeholder="₹ 28,000"
          value={formData.monthlyExpenses}
          onChange={handleChange}
        />

        <Input
          label="Existing EMI"
          name="existingEmi"
          placeholder="₹ 12,000"
          value={formData.existingEmi}
          onChange={handleChange}
        />

        <div>

          <label className="text-sm font-medium text-gray-700">
            Investment Preference
          </label>

          <select
            name="investment"
            value={formData.investment}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option>Low Risk</option>
            <option>Moderate</option>
            <option>High Growth</option>
          </select>

        </div>

        <div>

          <label className="text-sm font-medium text-gray-700">
            Financial Goal
          </label>

          <select
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            className="mt-2 w-full border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
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
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-blue-600
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-blue-700
              disabled:cursor-not-allowed
              disabled:opacity-70
            "
          >
            {loading ? "Analyzing with AI..." : "Analyze Financial Profile"}
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
  placeholder,
  onChange,
  disabled
}) {
  <input
    disabled={disabled}
    disabled:bg-gray-100
disabled:cursor-not-allowed/>
  
  return (
    <div>

      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="
          mt-2
          w-full
          border
          border-gray-300
          bg-white
          px-4
          py-3
          outline-none
          transition
          focus:border-blue-600
        "
      />

    </div>
  );
}