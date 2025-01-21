// Helper function to parse the Gemini AI response text into structured array.
const parseGeminiIdeas = (responseText) => {
    const ideas = responseText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '')
    .slice(0, 3)
    .map(line => {
      const parts = line.split(':'); 
      return {
        title: parts[0].trim().replace(/\*\*/g, ''),
          description: parts[1].trim().replace(/\*\*/g, '')
      };
    });

    return ideas;
};

export { parseGeminiIdeas }