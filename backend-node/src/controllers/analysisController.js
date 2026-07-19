import Analysis from "../models/Analysis.js";
import { calculateFinance } from "../services/financialService.js";
import { getRecommendation } from "../services/geminiService.js";

export const analyzeFinance = async (req, res) => {
  try {
    console.log("=========== REQUEST BODY ===========");
    console.log(req.body);

    const finance = calculateFinance(req.body);

    console.log("=========== FINANCE RESULT ===========");
    console.log(finance);

    // Stop immediately if calculations failed
    if (
      Number.isNaN(finance.emi) ||
      Number.isNaN(finance.totalInterest) ||
      Number.isNaN(finance.totalPayment)
    ) {
      return res.status(400).json({
        message: "Finance calculation failed.",
        finance,
      });
    }

    let aiRecommendation = finance.recommendation;

    try {
      aiRecommendation = await getRecommendation(finance);
    } catch (err) {
      console.log("Gemini Error:", err.message);
    }

    const analysisData = {
      ...req.body,

      ...finance,

      recommendation: aiRecommendation,

      recommendations: finance.recommendations || [],
    };

    console.log("=========== SAVING ===========");
    console.log(JSON.stringify(analysisData, null, 2));
    console.log("Saving to Mongo:");
    console.log(JSON.stringify({
      ...req.body,
      ...finance,
      recommendation: aiRecommendation || finance.recommendation,
    }, null, 2));

    const analysis = await Analysis.create(analysisData);
      console.log("===== TYPE CHECK =====");
console.log(typeof finance.recommendations);
console.log(Array.isArray(finance.recommendations));
console.log(finance.recommendations);
console.log("First item:", finance.recommendations?.[0]);
    return res.status(201).json(analysis);
  } catch (err) {
    console.log("=========== MONGOOSE ERROR ===========");
    console.error(err);

    return res.status(500).json({
      message: "Analysis Failed",
      error: err.message,
    });
  }
};

export const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find().sort({
      createdAt: -1,
    });

    return res.json(history);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis Not Found",
      });
    }

    return res.json(analysis);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};