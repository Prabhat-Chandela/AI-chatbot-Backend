import express from "express";

// Basic Express setup.
const app = express();
app.use(express.json({limit:"16kb"}))

// Routes setup.
import aiRouter from "./routes/ai.routes.js";

app.use("/api/v1", aiRouter);


export {app}