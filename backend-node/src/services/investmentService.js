export function generateInvestmentPlan({
  monthlySurplus = 0,
  risk = "",
  goal = "",
}) {
  console.log("========== INVESTMENT SERVICE ==========");
  console.log("Monthly Surplus:", monthlySurplus);
  console.log("Risk Received:", risk);
  console.log("Goal Received:", goal);

  const investmentAmount = Math.max(
    Math.round(Number(monthlySurplus) * 0.6),
    0
  );

  const normalizedRisk = String(risk)
    .trim()
    .toLowerCase();

  const normalizedGoal = String(goal)
    .trim()
    .toLowerCase();

  let allocation;

  if (
    normalizedRisk === "low" ||
    normalizedRisk === "conservative"
  ) {
    allocation = {
      stocks: 20,
      mutualFunds: 40,
      debtFunds: 20,
      gold: 10,
      cash: 10,
    };
  } else if (
    normalizedRisk === "moderate"
  ) {
    allocation = {
      stocks: 40,
      mutualFunds: 30,
      debtFunds: 15,
      gold: 10,
      cash: 5,
    };
  } else {
    allocation = {
      stocks: 60,
      mutualFunds: 20,
      debtFunds: 10,
      gold: 5,
      cash: 5,
    };
  }

  if (
    normalizedGoal.includes("emergency")
  ) {
    allocation.cash += 10;
    allocation.stocks -= 5;
    allocation.gold -= 5;
  }

  if (
    normalizedGoal.includes("retirement")
  ) {
    allocation.mutualFunds += 10;
    allocation.cash -= 5;
    allocation.gold -= 5;
  }

  if (
    normalizedGoal.includes("wealth") ||
    normalizedGoal.includes("investment")
  ) {
    allocation.stocks += 5;
    allocation.cash -= 5;
  }

  const total =
    allocation.stocks +
    allocation.mutualFunds +
    allocation.debtFunds +
    allocation.gold +
    allocation.cash;

  if (total !== 100) {
    allocation.cash += 100 - total;
  }

  console.log("Final Allocation:");
  console.table(allocation);

  const result = {
    monthlyInvestment: investmentAmount,

    yearlyInvestment:
      investmentAmount * 12,

    projectedWealth: Math.round(
      investmentAmount *
        (((Math.pow(1 + 0.12 / 12, 120) - 1) /
          (0.12 / 12)) *
          (1 + 0.12 / 12))
    ),

    expectedReturn: "11-13%",

    reviewPeriod: "Every 6 Months",

    riskProfile: normalizedRisk,

    ...allocation,
  };

  console.log("Investment Plan:");
  console.log(result);

  console.log("=======================================");

  return result;
}