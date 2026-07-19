export async function getRecommendation(result) {
  if (result.debtRatio > 50)
    return "Your debt-to-income ratio is high. Consider increasing your monthly repayment or refinancing your loan to reduce long-term interest costs.";

  if (result.debtRatio > 35)
    return "Your financial profile is stable, but increasing your EMI slightly could reduce the overall interest paid and shorten the loan tenure.";

  return "Your financial health appears strong. Continue investing consistently while maintaining an emergency fund to maximize long-term financial stability.";
}