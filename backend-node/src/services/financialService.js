import { generateProjection } from "../utils/projection.js";

import {
  calculateEMI,
  calculateDebtRatio,
  calculateSavingsRate,
  calculateEmergencyFund,
  calculateHealthScore,
  calculateLoanOptimization,
  investmentAllocation,
} from "./calculators.js";

import { generateRecommendations } from "./reccomendationEngine.js";

export function calculateFinance(data) {
  // Convert safely
  const loanAmount = Number(data.loanAmount) || 0;
  const interestRate = Number(data.interestRate) || 0;
  const tenure = Number(data.tenure) || 0;
  const income = Number(data.monthlyIncome) || 0;
  const expenses = Number(data.monthlyExpenses) || 0;
  const existingEmi = Number(data.existingEmi) || 0;

  // Validation
  if (
    loanAmount <= 0 ||
    interestRate <= 0 ||
    tenure <= 0 ||
    income <= 0
  ) {
    throw new Error("Invalid financial inputs.");
  }

  // EMI
  const emi = calculateEMI(
    loanAmount,
    interestRate,
    tenure
  );
  console.log("EMI =", emi);

  const totalPayment = emi * tenure * 12;
  const totalInterest = totalPayment - loanAmount;
console.log({
  totalPayment,
  totalInterest
});

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

  const healthScore = calculateHealthScore({
    debtRatio,
    savingsRate: savings.savingsRate,
  });

  const optimizedLoan =
    calculateLoanOptimization(
      emi,
      totalInterest
    );

  const investmentPlan =
    investmentAllocation(data.investment);

  const projection = generateProjection(
    Math.max(
      5000,
      savings.monthlySurplus * 0.6
    )
  );

  const recommendations =
    generateRecommendations({
      debtRatio,
      savingsRate: savings.savingsRate,
      monthlySurplus: savings.monthlySurplus,
      healthScore,
    });

  console.log("===== FINANCIAL RESULT =====");
  console.log({
    loanAmount,
    interestRate,
    tenure,
    income,
    expenses,
    existingEmi,
    emi,
    totalPayment,
    totalInterest,
    debtRatio,
    savings,
    emergencyFund,
    healthScore,
    optimizedLoan,
    investmentPlan,
    projection,
    recommendations,
  });

  return {
    emi: Number(emi),

    totalInterest: Number(totalInterest),

    totalPayment: Number(totalPayment),

    debtRatio: Number(debtRatio),

    savingsRate: Number(savings.savingsRate),

    monthlySurplus: Number(
      savings.monthlySurplus
    ),

    emergencyFund: Number(
      emergencyFund
    ),

    healthScore: Number(
      healthScore
    ),

    optimizedLoan: {
      optimizedEmi: Number(
        optimizedLoan.optimizedEmi
      ),

      optimizedYears: Number(
        optimizedLoan.optimizedYears
      ),

      optimizedInterest: Number(
        optimizedLoan.optimizedInterest
      ),

      interestSaved: Number(
        optimizedLoan.interestSaved
      ),
    },

    investmentPlan,

    projection,

    recommendations,

    recommendation:
      recommendations
        .map(
          (r) =>
            `• ${r.title}\n${r.description}`
        )
        .join("\n\n"),

    cashflow: [
      {
        month: "Income",
        value: Number(income),
      },
      {
        month: "Expenses",
        value: Number(expenses),
      },
      {
        month: "EMI",
        value: Number(emi),
      },
    ],

    emiDistribution: [
      {
        name: "Principal",
        value: 72,
      },
      {
        name: "Interest",
        value: 28,
      },
    ],
  };
}