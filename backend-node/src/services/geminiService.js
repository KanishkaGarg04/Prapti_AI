import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function getRecommendation(finance) {
  try {
    const prompt = `
You are a Senior Financial Advisor.

Analyze the following financial profile and return ONLY valid JSON.

Financial Data:

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

Return ONLY JSON.

{
  "summary":"",

  "strengths":[
    "",
    "",
    ""
  ],

  "risks":[
    "",
    "",
    ""
  ],

  "actions":[
    "",
    "",
    ""
  ],

  "investmentAdvice":"",

  "loanAdvice":""
}
`;

    const result = await model.generateContent(prompt);

    const response =
      result.response.text();

    const cleaned = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini Error");

    console.error(err);

    return {
      summary:
        "AI recommendation unavailable.",

      strengths: [],

      risks: [],

      actions: [],

      investmentAdvice: "",

      loanAdvice: "",
    };
  }
}