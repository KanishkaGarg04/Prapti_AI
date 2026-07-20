export function generateProjection(monthlyInvestment) {

  const annualReturn = 0.12;

  const data = [];

  let amount = 0;

  for (let year = 1; year <= 10; year++) {

    amount =
      (amount + monthlyInvestment * 12) *
      (1 + annualReturn);

    data.push({
      year,
      amount: Math.round(amount),
    });

  }

  return data;

}