import { GoogleGenerativeAI } from "@google/generative-ai";
import { parseGeminiIdeas, parseGeminiSuggestion} from "../utilities/parseResponseUtility.js";

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
        return "An error occurred while generating the ideas. Please try again.";
    }
}

// Function to get detailed suggestion dynamically
const getDetailedSuggestion = async (idea) => {
    try {
        const result = await model.generateContent(`Provide a detailed suggestion for the following idea: "${idea}"`);
        const text = result.response.text();
        const suggestion = parseGeminiSuggestion(text)
        return suggestion;

    } catch (error) {
        console.error("Error generating detailed suggestion:", error.result?.data || error.message);
        return "An error occurred while generating the suggestion. Please try again.";
    }
}


export { generateIdeas, getDetailedSuggestion }