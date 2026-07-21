import { generateProjection } from "../utils/projection.js";

import {
  calculateEMI,
  calculateDebtRatio,
  calculateSavingsRate,
  calculateEmergencyFund,
  calculateHealthScore,
  calculateLoanOptimization,
} from "./calculators.js";

import { generateInvestmentPlan } from "./investmentService.js";
import { getMarketSnapshot } from "./marketService.js";
import { generateRecommendations } from "./reccomendationEngine.js";

export async function calculateFinance(data) {


  const loanAmount = Number(data.loanAmount) || 0;
  const interestRate = Number(data.interestRate) || 0;
  const tenure = Number(data.tenure) || 0;

  const income = Number(data.monthlyIncome) || 0;
  const expenses = Number(data.monthlyExpenses) || 0;
  const existingEmi = Number(data.existingEmi) || 0;

  // ===============================
  // Validation
  // ===============================

  if (
    loanAmount <= 0 ||
    interestRate <= 0 ||
    tenure <= 0 ||
    income <= 0
  ) {
    throw new Error("Invalid financial inputs.");
  }

  // ===============================
  // EMI Calculation
  // ===============================

  const emi = calculateEMI(
    loanAmount,
    interestRate,
    tenure
  );

  const totalPayment = emi * tenure * 12;

  const totalInterest =
    totalPayment - loanAmount;

  // ===============================
  // EMI Distribution
  // ===============================

  const principalPercent = Number(
    ((loanAmount / totalPayment) * 100).toFixed(1)
  );

  const interestPercent = Number(
    ((totalInterest / totalPayment) * 100).toFixed(1)
  );

  // ===============================
  // Financial Metrics
  // ===============================

  const debtRatio = calculateDebtRatio(
    emi + existingEmi,
    income
  );

  const savings = calculateSavingsRate(
    income,
    expenses,
    emi + existingEmi
  );

  const emergencyFund =
    calculateEmergencyFund(expenses);

  const healthScore =
    calculateHealthScore({
      debtRatio,
      savingsRate: savings.savingsRate,
    });

  const optimizedLoan =
    calculateLoanOptimization(
      emi,
      totalInterest
    );

  // ===============================
  // Investment Plan
  // ===============================

  const investmentPlan =
    generateInvestmentPlan({
      monthlySurplus:
        savings.monthlySurplus,
      risk: data.investment,
      goal: data.goal,
    });
    console.log(investmentPlan);

  // ===============================
  // Market Snapshot
  // ===============================

  let market;

  try {
    market = await getMarketSnapshot();
  } catch (err) {
    console.log(
      "Market API unavailable. Using fallback."
    );

    market = {
      nifty: {
        price: 25200,
        changePercent: 0,
      },

      usdInr: {
        price: 86,
      },

      gold: {
        price: 3400,
      },

      bitcoin: {
        price: 115000,
        changePercent: 0,
      },

      fdRate: 6.5,

      updatedAt: new Date(),
    };
  }

  // ===============================
  // Projection
  // ===============================

  const projection =
    generateProjection(
      Math.max(
        5000,
        savings.monthlySurplus * 0.6
      )
    );

  // ===============================
  // Recommendations
  // ===============================

  const recommendations =
    generateRecommendations({
      debtRatio,
      savingsRate: savings.savingsRate,
      monthlySurplus:
        savings.monthlySurplus,
      healthScore,
    });

  // ===============================
  // Risk Score
  // ===============================

  const riskScore = Math.max(
    0,
    Math.min(100, 100 - healthScore)
  );

  // ===============================
  // Return
  // ===============================

  return {
    // User Inputs

    loanAmount,
    interestRate,
    tenure,

    monthlyIncome: income,
    monthlyExpenses: expenses,
    existingEmi,

    // Loan

    emi: Number(emi.toFixed(2)),
    totalPayment: Number(
      totalPayment.toFixed(2)
    ),
    totalInterest: Number(
      totalInterest.toFixed(2)
    ),

    // Scores

    debtRatio: Number(
      debtRatio.toFixed(2)
    ),

    savingsRate: Number(
      savings.savingsRate.toFixed(2)
    ),

    monthlySurplus: Number(
      savings.monthlySurplus.toFixed(2)
    ),

    emergencyFund: Number(
      emergencyFund.toFixed(2)
    ),

    healthScore: Number(
      healthScore.toFixed(0)
    ),

    riskScore,

    // Optimization

    optimizedLoan: {
      optimizedEmi: Number(
        optimizedLoan.optimizedEmi.toFixed(2)
      ),

      optimizedYears:
        optimizedLoan.optimizedYears,

      optimizedInterest: Number(
        optimizedLoan.optimizedInterest.toFixed(
          2
        )
      ),

      interestSaved: Number(
        optimizedLoan.interestSaved.toFixed(
          2
        )
      ),
    },

    // Investment

    investmentPlan,

    // Projection

    projection,

    // Market

    market,

    // Recommendation Cards

    recommendations,

   

    recommendation: recommendations
      .map(
        (r) =>
          `• ${r.title}\n${r.description}`
      )
      .join("\n\n"),

    // Cashflow Chart

    cashflow: [
      {
        month: "Income",
        value: income,
      },

      {
        month: "Expenses",
        value: expenses,
      },

      {
        month: "EMI",
        value: emi,
      },

      {
        month: "Savings",
        value: savings.monthlySurplus,
      },
    ],

    // Pie Chart

    emiDistribution: [
      {
        name: "Principal",
        value: principalPercent,
      },

      {
        name: "Interest",
        value: interestPercent,
      },
    ],
  };
}