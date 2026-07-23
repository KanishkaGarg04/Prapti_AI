import express from "express";
import {
  analyzeFinance,
  getHistory,
  sendEmailReport,
  getAnalysis,
} from "../controllers/analysisController.js";

import { protect } from "../middlewares/protect.js";

const router = express.Router();

// Protected Routes
router.post("/", protect, analyzeFinance);

router.get("/history", protect, getHistory);

router.post("/email", protect, sendEmailReport);

router.get("/:id", protect, getAnalysis);

export default router;