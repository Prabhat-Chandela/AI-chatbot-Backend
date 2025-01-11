import { generateIdeas, getDetailedSuggestion } from "../utilities/aiUtility.js";


const generatedIdeas = async (req, res) => {
    try {
        const userQuery = req.body.query || "What new app should I build?";
        const ideas = await generateIdeas(userQuery);

        if (!ideas || ideas.length < 3) {
            return res.status(500).json({ error: "Failed to generate ideas." });
        }

        res.json({ ideas });

    } catch (error) {
        res.status(500).json({ error: "An error occurred while generating ideas." });
    }
}

const suggestedSteps =  async (req, res) => {
    const { selectedIdeas, allIdeas } = req.body;

    if (!selectedIdeas || selectedIdeas.length !== 2) {
        return res.status(400).json({ error: "Please select exactly 2 ideas." });
    }

    try {
        const detailedSuggestions = await Promise.all(
            selectedIdeas.map(async (index) => {
                const idea = allIdeas[index - 1];
                const suggestion = await getDetailedSuggestion(idea);
                return { idea, suggestion };
            })
        );

        res.json({ suggestions: detailedSuggestions });
        
    } catch (error) {
        res.status(500).json({ error: "An error occurred while generating detailed suggestions." });
    }
}


export{generatedIdeas, suggestedSteps}