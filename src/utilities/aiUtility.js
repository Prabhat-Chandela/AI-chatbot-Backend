import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
});

// Function to generate ideas
const generateIdeas = async (query) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: `Generate 3 unique app ideas based on this query: "${query}"` },
            ],
            max_tokens: 100,
        });

        const text = response.data.choices[0].message.content.trim();
        return text.split('\n').filter((idea) => idea.trim() !== '');
    } catch (error) {
        console.error("Error calling OpenAI API:", error.response?.data || error.message);
        return null;
    }
}

// Function to get detailed suggestions dynamically
const getDetailedSuggestion = async (idea) => {
    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant who provides detailed suggestions for app ideas.' },
                { role: 'user', content: `Provide a detailed suggestion for the following app idea: "${idea}"` },
            ],
            max_tokens: 150,
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Error generating detailed suggestion:", error.response?.data || error.message);
        return "An error occurred while generating the suggestion. Please try again.";
    }
}


export {generateIdeas, getDetailedSuggestion}