export function generateProjection(monthlyInvestment) {
  const data = [];

  let total = 0;

  for (let year = 1; year <= 6; year++) {
    total += monthlyInvestment * 12 * 1.12;

    data.push({
      year: String(2024 + year),
      amount: Math.round(total),
    });
  }

  return data;
}