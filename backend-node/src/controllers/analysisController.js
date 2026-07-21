import Analysis from "../models/Analysis.js";
import { calculateFinance } from "../services/financialService.js";
import { getRecommendation } from "../services/llmService.js";

export const analyzeFinance = async (req, res) => {
  try {
    console.log("Incoming Request:");
    console.log(req.body);

    const finance = await calculateFinance(req.body);

    console.log("Finance Calculated");

   const aiRecommendation =
  await getRecommendation(finance);

const analysis = await Analysis.create({
  ...req.body,
  ...finance,

  aiRecommendation,
});
    console.log("Analysis Saved Successfully");

    return res.status(201).json(analysis);

  } catch (err) {

    console.error("========== ERROR ==========");
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });

  }
};

export const getHistory = async (req, res) => {

  try {

    const history = await Analysis.find().sort({
      createdAt:-1,
    });

    return res.json(history);

  }

  catch(err){

    return res.status(500).json({
      message:err.message,
    });

  }

};

export const getAnalysis = async (req,res)=>{

  try{

    const analysis =
      await Analysis.findById(req.params.id);

    if(!analysis){

      return res.status(404).json({
        message:"Analysis Not Found",
      });

    }

    return res.json(analysis);

  }

  catch(err){

    return res.status(500).json({
      message:err.message,
    });

  }

};