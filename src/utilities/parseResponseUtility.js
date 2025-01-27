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



// Helper function to parse the Gemini AI response text into structured suggestion format.
const parseGeminiSuggestion = (responseText) => {

  const structuredResponse = {
    title: "",
    sections: []
  };

  const suggestion = responseText
    .split("\n").map(line => line.trim()).filter(line => line);

  let currentSection = null;

  for (const line of suggestion) {

    if (line.startsWith("Detailed Suggestion")) {
      structuredResponse.title = line.replace("Detailed Suggestion:", "").trim();
    }

    else if (/^[IVXLCDM]+\.\s|^\d+\.\s|^\*\*\w+/g.test(line)) {
      if (currentSection) {
        structuredResponse.sections.push(currentSection);
      }
      currentSection = {
        heading: line.replace(/^[IVXLCDM]+\.\s|^\d+\.\s|\*\*/, "").trim(),
        points: []
      };
    }

    else if (line.startsWith("*")) {
      if (currentSection) {
        const subPoints = line
          .split("*")
          .map(p => p.trim())
          .filter(p => p);
        currentSection.points.push(...subPoints);
      }
    }
  }

  if (currentSection) {
    structuredResponse.sections.push(currentSection);
  }

  return structuredResponse;
}

export { parseGeminiIdeas, parseGeminiSuggestion }