import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    loanAmount: Number,
    interestRate: Number,
    tenure: Number,
    monthlyIncome: Number,
    monthlyExpenses: Number,
    existingEmi: Number,
    investment: String,
    goal: String,

    riskScore: Number,
    debtRatio: Number,
    interestSaved: Number,
    emi: Number,

    recommendation: String,

    projection: [
      {
        year: String,
        amount: Number,
      },
    ],

    cashflow: [
      {
        month: String,
        value: Number,
      },
    ],

    emiDistribution: [
      {
        name: String,
        value: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);