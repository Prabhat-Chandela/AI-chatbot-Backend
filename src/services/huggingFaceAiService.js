// Function to generate image form text prompt
const generateImage = async (query) => {
    try {
        const response = await fetch(
            `${process.env.HUGGING_FACE_API_URL}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.HUGGING_FACE_AI_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({"inputs": `Generate an image based on this query : ${query}`}),
            }
        );
 
        const result = await response.blob();
        const imageUrl = URL.createObjectURL(result);
        return imageUrl;

    } catch (error) {
        console.error("Error calling HuggingFace API:", error);
        return null;
    }

}


export {generateImage}
