import mongoose from "mongoose";

const projectionSchema = new mongoose.Schema({
  year: String,
  amount: Number,
});

const recommendationSchema = new mongoose.Schema(
  {
    type: String,
    title: String,
    description: String,
    priority: String,
  },
  { _id: false }
);

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

    emi: Number,
    totalInterest: Number,
    totalPayment: Number,

    debtRatio: Number,
    savingsRate: Number,
    monthlySurplus: Number,

    emergencyFund: Number,

    healthScore: Number,

    projection: [projectionSchema],

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

    optimizedLoan: {
      optimizedEmi: Number,
      optimizedYears: Number,
      optimizedInterest: Number,
      interestSaved: Number,
    },

    investmentPlan: {
      stocks: Number,
      mutualFunds: Number,
      debtFunds: Number,
      fd: Number,
      gold: Number,
      cash: Number,
    },

    recommendations: {
  type: [recommendationSchema],
  default: [],
},
market: {
  nifty: {
    price: Number,
    change: Number,
    changePercent: Number,
  },

  sensex: {
    price: Number,
    change: Number,
    changePercent: Number,
  },

  usdInr: {
    price: Number,
  },

  gold: {
    price: Number,
  },

  fdRate: Number,

  updatedAt: Date,
},

    recommendation: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Analysis", analysisSchema);