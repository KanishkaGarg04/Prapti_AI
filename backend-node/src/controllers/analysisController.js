import Analysis from "../models/Analysis.js";
import { calculateFinance } from "../services/financialService.js";
import { getRecommendation } from "../services/geminiService.js";

export const analyzeFinance = async (req, res) => {
  try {
    console.log(req.body);

    const finance = calculateFinance(req.body);

    const recommendation = await getRecommendation(finance);

    const analysis = await Analysis.create({
      ...req.body,
      ...finance,
      recommendation,
    });

    return res.status(201).json(analysis);

  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Analysis Failed",
      error: err.message,
    });
  }
};



export const getHistory = async (req, res) => {
  try {

    const history = await Analysis.find()
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
};

export const getAnalysis = async (req, res) => {

  try {

    const analysis = await Analysis.findById(req.params.id);

    if (!analysis)
      return res.status(404).json({
        message: "Analysis Not Found",
      });

    res.json(analysis);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};