import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";

import analysisRoutes from "./routes/analysisRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(helmet());

app.use(compression());

app.use(morgan("dev"));

app.get("/", (req, res) => {

  res.json({
    success: true,
    project: "Prapti AI Backend",
  });

});

app.use("/api/analysis", analysisRoutes);

export default app;