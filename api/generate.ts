import { GoogleGenAI } from "@google/genai";

export const config = {
    runtime: 'nodejs',
};

export default async function handler(request, response) {
    // Enable CORS
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    try {
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            throw new Error("Missing API Key in server environment");
        }

        const ai = new GoogleGenAI({ apiKey });

        const geminiResponse = await ai.models.generateContent({
            model: 'gemini-2.0-flash-lite-preview-02-05',
            contents: `Generate 5 simple, child-friendly sentences in Estonian. 
      They should be suitable for a 7-year-old learning to type. 
      Avoid very complex punctuation. 
      Use a mix of home row and extended row letters.
      Theme: Magic, Animals, Space, or Friendship.
      Return ONLY the sentences, separated by newlines, no numbering.`
        });

        const text = geminiResponse.text || "";
        const sentences = text.split('\n').filter(s => s.trim().length > 0);

        response.status(200).json({ sentences });
    } catch (error) {
        console.error("Server API Error:", error);
        response.status(500).json({
            error: "Failed to generate text",
            details: error instanceof Error ? error.message : "Unknown error"
        });
    }
}
