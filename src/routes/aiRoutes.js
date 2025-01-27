import { Router } from "express";
import {generatedIdeas, suggestedSteps, generatedImage} from "../controllers/aiController.js"

const aiRouter = Router();

aiRouter.route("/generate-ideas").post(generatedIdeas);
aiRouter.route("/suggestion").post(suggestedSteps);
aiRouter.route("/generate-image").post(generatedImage);


export default aiRouter;