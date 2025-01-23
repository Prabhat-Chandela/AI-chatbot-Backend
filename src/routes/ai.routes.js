import { Router } from "express";
import {generatedIdeas, suggestedSteps, generatedImage} from "../controllers/ai.controller.js"

const aiRouter = Router();

aiRouter.route("/generate-ideas").post(generatedIdeas);
aiRouter.route("/suggestions").post(suggestedSteps);
aiRouter.route("/generate-image").post(generatedImage);


export default aiRouter;