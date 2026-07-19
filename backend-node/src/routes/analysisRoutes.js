import express from "express";
import {
  analyzeFinance,
  getHistory,
} from "../controllers/analysisController.js";

const router = express.Router();

router.post("/", analyzeFinance);

router.get("/history", getHistory);

export default router;