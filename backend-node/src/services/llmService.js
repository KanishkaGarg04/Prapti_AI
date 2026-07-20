import axios from "axios";

export async function getRecommendation(finance) {
  try {
    const prompt = `
You are a certified financial advisor.

Analyze the following profile.

Loan Amount: ₹${finance.loanAmount}
Interest Rate: ${finance.interestRate}%
Loan Tenure: ${finance.tenure} years

Monthly Income: ₹${finance.monthlyIncome}
Monthly Expenses: ₹${finance.monthlyExpenses}
Monthly EMI: ₹${finance.emi}

Debt Ratio: ${finance.debtRatio}%
Savings Rate: ${finance.savingsRate}%
Emergency Fund: ₹${finance.emergencyFund}

Health Score: ${finance.healthScore}/100

Investment Goal:
${finance.goal}

Risk Preference:
${finance.investment}

Return ONLY JSON in this format:

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
        model: "deepseek/deepseek-chat-v3-0324",

        messages: [
          {
            role: "system",
            content:
              "You are an expert financial advisor. Always return valid JSON only.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content =
      response.data.choices[0].message.content;

    content = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(content);
  } catch (err) {
    console.error("OpenRouter Error");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    return {
      summary: "AI recommendation unavailable.",
      strengths: [],
      risks: [],
      actions: [],
      investmentAdvice: "",
      loanAdvice: "",
    };
  }
}