import axios from "axios";

export async function getRecommendation(finance) {
  try {
    const prompt = `
You are a certified financial advisor.

Analyze this financial profile and return ONLY valid JSON.

Financial Profile:

Loan Amount: ₹${finance.loanAmount}
Interest Rate: ${finance.interestRate}%
Loan Tenure: ${finance.tenure} years

Monthly Income: ₹${finance.monthlyIncome}
Monthly Expenses: ₹${finance.monthlyExpenses}
Monthly EMI: ₹${finance.emi}

Debt Ratio: ${finance.debtRatio}%
Savings Rate: ${finance.savingsRate}%
Emergency Fund: ₹${finance.emergencyFund}

Financial Health Score: ${finance.healthScore}/100

Investment Goal: ${finance.goal}

Risk Preference: ${finance.investment}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- Never omit any field.
- strengths must contain exactly 3 items.
- risks must contain exactly 3 items.
- actions must contain exactly 3 items.

Return this exact format:

{
  "summary":"",
  "strengths":["","",""],
  "risks":["","",""],
  "actions":["","",""],
  "investmentAdvice":"",
  "loanAdvice":""
}
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",

        messages: [
          {
            role: "system",
            content:
              "You are an expert financial advisor. Always respond with valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.5,
        max_tokens: 700
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content = response.data.choices[0].message.content;

    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const ai = JSON.parse(content);

    return {
      summary:
        ai.summary ||
        "Your financial profile has been successfully analyzed. Focus on improving your debt ratio while maintaining disciplined investing.",

      strengths:
        Array.isArray(ai.strengths) && ai.strengths.length
          ? ai.strengths
          : [
              "Income profile analyzed successfully.",
              "Investment profile identified.",
              "Financial metrics evaluated.",
            ],

      risks:
        Array.isArray(ai.risks) && ai.risks.length
          ? ai.risks
          : [
              "Debt ratio requires monitoring.",
              "Savings rate needs improvement.",
              "Emergency reserves should be maintained.",
            ],

      actions:
        Array.isArray(ai.actions) && ai.actions.length
          ? ai.actions
          : [
              "Increase monthly savings.",
              "Reduce unnecessary expenses.",
              "Review your investment portfolio every six months.",
            ],

      investmentAdvice:
        ai.investmentAdvice ||
        "Invest consistently through diversified mutual funds and equity according to your risk profile while maintaining asset diversification.",

      loanAdvice:
        ai.loanAdvice ||
        "Prioritize repayment of high-interest loans, maintain timely EMI payments, and avoid taking additional debt until your debt ratio improves.",
    };
  } catch (err) {
    console.error("========== OPENROUTER ERROR ==========");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    return {
      summary:
        "AI recommendation is temporarily unavailable. Basic financial recommendations have been generated.",

      strengths: [
        "Income successfully analyzed.",
        "Financial profile generated.",
        "Investment profile evaluated.",
      ],

      risks: [
        "Debt ratio requires attention.",
        "Improve savings habits.",
        "Monitor monthly expenses.",
      ],

      actions: [
        "Save at least 20% of monthly income.",
        "Review your finances every month.",
        "Increase investments gradually.",
      ],

      investmentAdvice:
        "Continue investing in diversified mutual funds and maintain proper asset allocation.",

      loanAdvice:
        "Pay EMIs on time and prioritize reducing high-interest debt.",
    };
  }
}