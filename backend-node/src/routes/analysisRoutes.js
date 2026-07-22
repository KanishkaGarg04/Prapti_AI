import express from "express";

import {
  analyzeFinance,
  getHistory,
  sendEmailReport,
} from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", analyzeFinance);

router.get("/history", getHistory);

router.post("/email", sendEmailReport);

export default router;