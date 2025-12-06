import { GoogleGenAI, GenerateContentResponse, Content } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize client
const ai = new GoogleGenAI({ apiKey });

/**
 * Solves a math problem based on text and optional image.
 */
export const solveMathProblem = async (
  prompt: string,
  imageBase64?: string
): Promise<string> => {
  try {
    const modelId = 'gemini-2.5-flash';
    
    // Explicitly type the contents to match the SDK expectation
    let contents: Content;

    if (imageBase64) {
      // Clean base64 string if it contains data URL prefix
      const cleanBase64 = imageBase64.split(',')[1] || imageBase64;
      
      contents = {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg', // Assuming jpeg/png for simplicity
              data: cleanBase64
            }
          },
          {
            text: `Please solve this math problem. Show step-by-step reasoning. 
                   If the image contains a formula, transcribe it first.
                   User question: ${prompt}`
          }
        ]
      };
    } else {
        contents = {
            parts: [{ text: `You are an expert math tutor. Solve the following problem step-by-step: ${prompt}` }]
        };
    }

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: modelId,
      contents: contents,
      config: {
        systemInstruction: "You are a helpful and encouraging math tutor for students. Use clear formatting, LaTeX for math formulas if possible (wrapped in $), and bold text for final answers.",
      }
    });

    return response.text || "I couldn't generate a solution. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to the AI Math Tutor. Please check your connection.";
  }
};

/**
 * Finds information about scientists.
 */
export const findScientistInfo = async (query: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: {
        parts: [{ text: `Tell me about the scientist or mathematician matching this query: "${query}". Include their key contributions, era, and a fun fact.` }]
      },
      config: {
        systemInstruction: "You are a history of science expert. Keep descriptions engaging for students."
      }
    });
    return response.text || "No information found.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error retrieving scientist data.";
  }
};

/**
 * Analyzes errors in a user's math logic.
 */
export const analyzeError = async (studentWork: string): Promise<string> => {
    try {
        const response: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: {
            parts: [{ text: `Here is a student's attempt at a math problem. Identify the mistake and explain the correct concept without just giving the answer if possible. Work: "${studentWork}"` }]
          },
        });
        return response.text || "Analysis complete.";
      } catch (error) {
        console.error("Gemini API Error:", error);
        return "Error analyzing input.";
      }
}