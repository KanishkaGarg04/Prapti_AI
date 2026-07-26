import axios from "axios";

export async function chatWithAI(messages, finance) {
  try {
    const systemPrompt = `
You are Prapti AI.

You are an expert financial advisor.

You answer only finance related questions.

Current Financial Profile

Loan Amount: ₹${finance.loanAmount || 0}
Interest Rate: ${finance.interestRate || 0}%
Loan Tenure: ${finance.tenure || 0} years

Monthly Income: ₹${finance.monthlyIncome || 0}
Monthly Expenses: ₹${finance.monthlyExpenses || 0}

Monthly EMI: ₹${finance.emi || 0}

Debt Ratio: ${finance.debtRatio || 0}%

Savings Rate: ${finance.savingsRate || 0}%

Health Score: ${finance.healthScore || 0}/100

Emergency Fund:
₹${finance.emergencyFund || 0}

Investment Goal:
${finance.goal || "General Wealth"}

Risk Preference:
${finance.investment || "Moderate"}

Always answer in short,
clear,
professional language.

Use bullet points whenever possible.

Never mention JSON.

Never mention prompts.

Never mention OpenRouter.

Act as the user's personal financial advisor.
`;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },

          ...messages,
        ],

        temperature: 0.6,

        max_tokens: 700,
      },

      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.log(err.response?.data || err.message);

    throw new Error("Unable to generate AI response.");
  }
}