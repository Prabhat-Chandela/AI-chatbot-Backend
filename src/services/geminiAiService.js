import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseGeminiIdeas} from "../utilities/parseResponseUtility.js";

// Gemini configuration
const genAI = new GoogleGenerativeAI(process.env.GEMINI_AI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Function to generate ideas
const generateIdeas = async (query) => {
    try {
        const result = await model.generateContent(`Suggest three ideas based on this query : "${query}"`);
        const text = result.response.text();
        const ideas = parseGeminiIdeas(text);
        return ideas;

    } catch (error) {
        console.error("Error calling GeminiAI API:", error.result?.data || error.message);
        return null;
    }
}

// Function to get detailed suggestions dynamically
const getDetailedSuggestion = async (idea) => {
    try {
        const result = await model.generateContent(`Provide a detailed suggestion for the following idea: "${idea}"`);
        const text = result.response.text();
        return text;

    } catch (error) {
        console.error("Error generating detailed suggestion:", error.result?.data || error.message);
        return "An error occurred while generating the suggestion. Please try again.";
    }
}


export { generateIdeas, getDetailedSuggestion }