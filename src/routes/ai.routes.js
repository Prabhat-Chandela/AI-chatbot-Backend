import { Router } from "express";
import {generatedIdeas, suggestedSteps} from "../controllers/ai.controller.js"

const aiRouter = Router();

aiRouter.route("/generate-ideas").post(generatedIdeas);
aiRouter.route("/suggestions").post(suggestedSteps);


export default aiRouter;