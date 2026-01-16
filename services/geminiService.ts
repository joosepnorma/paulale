import { GoogleGenAI } from "@google/genai";

// We no longer use GoogleGenAI directly in the browser to avoid exposing the key.
// Instead, we fetch from our own Vercel API route.

export const generateEstonianText = async (): Promise<string[]> => {
  try {
    // Call our serverless function
    const response = await fetch('/api/generate');

    if (!response.ok) {
      throw new Error(`Server responded with ${response.status}`);
    }

    const data = await response.json();

    if (data.sentences && Array.isArray(data.sentences)) {
      return data.sentences;
    }

    return [
      "Vabandust, maagia ots sai hetkel otsa.",
      "Aga proovime varsti uuesti."
    ];

  } catch (error) {
    console.error("Error generating text:", error);
    // Fallback content if API fails (e.g. locally without Vercel dev)
    return [
      "Tere tulemast Tähemaale! Siin on tore.",
      "Rebane jookseb metsas kiiresti.",
      "Karu magab talveunes ja näeb und.",
      "Jänes hüppab kõrgele ja kaugele.",
      "Minu sõber on väga tark ja osav."
    ];
  }
};