export function calculateEMI(loanAmount, interestRate, tenure) {

  loanAmount = Number(loanAmount);
  interestRate = Number(interestRate);
  tenure = Number(tenure);

  if (
    isNaN(loanAmount) ||
    isNaN(interestRate) ||
    isNaN(tenure)
  ) {
    return 0;
  }

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;

  if (monthlyRate === 0)
    return Math.round(loanAmount / months);

  const emi =
    (loanAmount *
      monthlyRate *
      Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1);

  return Math.round(emi);
}

export function calculateDebtRatio(emi, income) {

  emi = Number(emi);
  income = Number(income);

  if (!income) return 0;

  return Number(((emi / income) * 100).toFixed(1));

}

export function calculateSavingsRate(
  income,
  expenses,
  emi
) {

  income = Number(income);
  expenses = Number(expenses);
  emi = Number(emi);

  const savings = income - expenses - emi;

  return {

    monthlySurplus: isNaN(savings)
      ? 0
      : Math.round(savings),

    savingsRate:
      !income
        ? 0
        : Number(((savings / income) * 100).toFixed(1)),

  };

}

export function calculateEmergencyFund(expenses) {
  return expenses * 6;
}

export function calculateHealthScore({
  debtRatio,
  savingsRate,
}) {
  let score = 100;

  if (debtRatio > 60) score -= 35;
  else if (debtRatio > 45) score -= 20;
  else if (debtRatio > 30) score -= 10;

  if (savingsRate < 10) score -= 30;
  else if (savingsRate < 20) score -= 15;

  return Math.max(0, Math.round(score));
}

export function calculateLoanOptimization(
  emi,
  totalInterest
) {

  emi = Number(emi);
  totalInterest = Number(totalInterest);

  if (isNaN(emi) || isNaN(totalInterest)) {

    return {

      optimizedEmi: 0,
      optimizedYears: 0,
      optimizedInterest: 0,
      interestSaved: 0,

    };

  }

  return {

    optimizedEmi: Math.round(emi + 3000),

    optimizedYears: 17,

    optimizedInterest: Math.round(totalInterest * 0.75),

    interestSaved: Math.round(totalInterest * 0.25),

  };

}

export function investmentAllocation(type) {

  switch (type) {

    case "Low Risk":
      return {
        fd:30,
        debtFunds:40,
        gold:20,
        cash:10
      };

    case "Moderate":
      return {
        mutualFunds:45,
        debtFunds:25,
        gold:15,
        cash:15
      };

    default:
      return {
        stocks:60,
        mutualFunds:20,
        gold:10,
        cash:10
      };
  }

}