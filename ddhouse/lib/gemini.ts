import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY is not set in environment variables. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateDescription = async (keywords: string): Promise<string> => {
  if (!API_KEY) {
    return "AI feature is disabled. Please configure your API key on the server.";
  }
  try {
    const prompt = `Generate a compelling and attractive real estate description for a home with the following features: "${keywords}". The description should be a single paragraph, around 3-4 sentences long. Highlight the key features in an appealing way for potential buyers. Do not use bullet points or lists.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const resultText = response.text;
    if (resultText) {
      return resultText.trim();
    }
    
    // This can happen if the response is blocked or empty.
    throw new Error("The AI model did not return any text content. It might have been blocked due to safety settings.");

  } catch (error) {
    console.error("Error generating description with Gemini:", error);
    // Provide a more specific error message if possible
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return `Failed to generate description. Please try again. Error: ${errorMessage}`;
  }
};