import { useState } from "react";
import InputField from "../common/InputField";
import PrimaryButton from "../common/PrimaryButton";

export default function AnalysisForm({ onAnalyze }) {
  const [formData, setFormData] = useState({
    loan_amount: "",
    interest_rate: "",
    tenure_years: "",
    monthly_income: "",
    existing_emis: "",
    monthly_rent: "",
    current_age: "",
    job_type: "private",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    onAnalyze({
      ...formData,
      loan_amount: Number(formData.loan_amount),
      interest_rate: Number(formData.interest_rate),
      tenure_years: Number(formData.tenure_years),
      monthly_income: Number(formData.monthly_income),
      existing_emis: Number(formData.existing_emis),
      monthly_rent: Number(formData.monthly_rent),
      current_age: Number(formData.current_age),
    });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-5 rounded-md border border-gray-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Loan Analysis
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter your financial details.
        </p>
      </div>

      <InputField
        label="Monthly Income"
        name="monthly_income"
        value={formData.monthly_income}
        onChange={handleChange}
        placeholder="80000"
      />

      <InputField
        label="Existing EMI"
        name="existing_emis"
        value={formData.existing_emis}
        onChange={handleChange}
        placeholder="15000"
      />

      <InputField
        label="Loan Amount"
        name="loan_amount"
        value={formData.loan_amount}
        onChange={handleChange}
        placeholder="2000000"
      />

      <InputField
        label="Interest Rate (%)"
        name="interest_rate"
        value={formData.interest_rate}
        onChange={handleChange}
        placeholder="8.5"
      />

      <InputField
        label="Tenure (Years)"
        name="tenure_years"
        value={formData.tenure_years}
        onChange={handleChange}
        placeholder="20"
      />

      <InputField
        label="Current Age"
        name="current_age"
        value={formData.current_age}
        onChange={handleChange}
        placeholder="25"
      />

      <InputField
        label="Monthly Rent"
        name="monthly_rent"
        value={formData.monthly_rent}
        onChange={handleChange}
        placeholder="12000"
      />

      <div>
        <label className="mb-2 block text-[13px] font-medium text-gray-700">
          Employment Type
        </label>

        <select
          name="job_type"
          value={formData.job_type}
          onChange={handleChange}
          className="w-full rounded-md border border-gray-300 px-3 py-2.5 text-sm focus:border-gray-900 outline-none"
        >
          <option value="private">Private</option>
          <option value="government">Government</option>
          <option value="business">Business</option>
          <option value="self-employed">Self Employed</option>
        </select>
      </div>

      <PrimaryButton type="submit">
        Analyze Financial Health
      </PrimaryButton>
    </form>
  );
}