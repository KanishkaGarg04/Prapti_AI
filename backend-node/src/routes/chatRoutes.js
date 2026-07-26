import express from "express";

import { chat } from "../controllers/chatController.js";

import { protect } from "../middlewares/protect.js";

const router = express.Router();

router.post("/", protect, chat);

export default router;