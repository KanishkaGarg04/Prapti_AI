import express from "express";
import { getMarket } from "../controllers/marketController.js";

const router = express.Router();

router.get("/", getMarket);

export default router;