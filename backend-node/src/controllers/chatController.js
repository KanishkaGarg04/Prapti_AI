import Analysis from "../models/Analysis.js";
import { chatWithAI } from "../services/chatService.js";

export async function chat(req, res) {
  try {
    const { messages, analysisId } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        message: "Messages required",
      });
    }

    let finance = {};

    if (analysisId) {
      const analysis = await Analysis.findOne({
        _id: analysisId,
        user: req.user._id,
      });

      if (analysis) finance = analysis;
    }

    const reply = await chatWithAI(
      messages,
      finance
    );

    return res.json({
      reply,
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      message: err.message,
    });
  }
}