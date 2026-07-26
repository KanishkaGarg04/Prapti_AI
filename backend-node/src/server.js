import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://prapti-ai-nu.vercel.app/",
];


connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    message: "Prapti AI Backend Running 🚀",
  });
});
app.use("/api/auth", authRoutes);

app.use("/api/analysis", analysisRoutes);

app.use("/api/market", marketRoutes);

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});