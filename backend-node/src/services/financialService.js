import { generateProjection } from "../utils/projection.js";

export function calculateFinance(data) {
  const loanAmount = Number(data.loanAmount);
  const interestRate = Number(data.interestRate);
  const tenure = Number(data.tenure);
  const monthlyIncome = Number(data.monthlyIncome);
  const monthlyExpenses = Number(data.monthlyExpenses);
  const existingEmi = Number(data.existingEmi);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;

  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  // Total monthly debt burden
  const totalMonthlyDebt = emi + existingEmi;

  const debtRatio = (totalMonthlyDebt / monthlyIncome) * 100;

  let riskScore;

  if (debtRatio >= 60) {
    riskScore = 90;
  } else if (debtRatio >= 45) {
    riskScore = 70;
  } else if (debtRatio >= 35) {
    riskScore = 50;
  } else {
    riskScore = 25;
  }

  const interestSaved = totalInterest * 0.18;

  const projection = generateProjection(
    Math.max(5000, monthlyIncome * 0.15)
  );

  return {
    emi: Math.round(emi),

    totalInterest: Math.round(totalInterest),

    totalPayment: Math.round(totalPayment),

    debtRatio: Math.round(debtRatio),

    riskScore,

    interestSaved: Math.round(interestSaved),

    recommendation:
      debtRatio > 50
        ? "Your debt burden is relatively high. Consider increasing your EMI or reducing discretionary expenses."
        : "Your financial profile is healthy. Continue investing consistently while maintaining your current repayment strategy.",

    projection,

    cashflow: [
      {
        month: "Income",
        value: monthlyIncome,
      },
      {
        month: "Expenses",
        value: monthlyExpenses,
      },
      {
        month: "EMI",
        value: Math.round(emi),
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