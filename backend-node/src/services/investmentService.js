export function generateInvestmentPlan({
  age = 22,
  monthlySurplus,
  risk,
  goal,
}) {
  let allocation = {};

  switch (risk) {
    case "High Growth":
      allocation = {
        stocks: 60,
        mutualFunds: 20,
        gold: 10,
        cash: 10,
      };
      break;

    case "Balanced":
      allocation = {
        stocks: 40,
        mutualFunds: 35,
        gold: 15,
        cash: 10,
      };
      break;

    default:
      allocation = {
        stocks: 20,
        mutualFunds: 30,
        gold: 30,
        cash: 20,
      };
  }

  const monthlyInvestment = Math.max(
    Math.round(monthlySurplus * 0.8),
    0
  );

  return {
    monthlyInvestment,
    allocation,
    yearlyInvestment: monthlyInvestment * 12,
    goal,
  };
}