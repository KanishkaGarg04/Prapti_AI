export function generateRecommendations(data) {
  const recommendations = [];

  if (data.debtRatio > 50) {
    recommendations.push({
      type: "danger",
      title: "High Debt Ratio",
      description: "Reduce unnecessary spending before taking another loan.",
      priority: "High",
    });
  }

  if (data.savingsRate < 20) {
    recommendations.push({
      type: "warning",
      title: "Low Savings",
      description: "Try saving at least 20% of your monthly income.",
      priority: "Medium",
    });
  }

  if (data.monthlySurplus > 5000) {
    recommendations.push({
      type: "success",
      title: "Invest Monthly Surplus",
      description: "Start a SIP using your monthly surplus for long-term wealth.",
      priority: "High",
    });
  }

  if (data.healthScore > 80) {
    recommendations.push({
      type: "success",
      title: "Excellent Financial Health",
      description: "Maintain your financial discipline and continue investing.",
      priority: "Low",
    });
  }

  if (recommendations.length === 0) {
    recommendations.push({
      type: "info",
      title: "Healthy Financial Profile",
      description: "Keep following your current financial plan.",
      priority: "Low",
    });
  }

  return recommendations;
}