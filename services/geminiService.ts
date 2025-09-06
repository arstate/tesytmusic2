import { GoogleGenAI } from "@google/genai";
import type { YouTubeVideo } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// This function now uses Google Search grounding for higher accuracy.
export async function searchYoutubeVideos(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // Instruct the model to use Google Search and format the output as a clean JSON string.
      contents: `Using Google Search, find up to 10 music videos on YouTube for the query: "${query}". The absolute most important requirement is that the videos MUST be embeddable on external websites. Prioritize videos from official artist channels (like VEVO channels) as they are more likely to be embeddable. Avoid "Art Tracks" or auto-generated videos which are often restricted. For each video, provide its videoId, title, and channelTitle. Your final output MUST be ONLY a single, valid, minified JSON array string. Example format: [{"videoId":"...","title":"...","channelTitle":"..."}]`,
      config: {
        // Enable the Google Search tool.
        tools: [{googleSearch: {}}],
        // A clear instruction for the model's role.
        systemInstruction: "You are an expert music search assistant. Your task is to use Google Search to find YouTube videos that are explicitly embeddable and return the findings as a clean, minified JSON array string, with no other text or formatting."
      },
    });

    // The response text should be our JSON string.
    const jsonText = response.text.trim();
    
    // Defensive check in case the model returns an empty or non-JSON response.
    if (!jsonText || !jsonText.startsWith('[') || !jsonText.endsWith(']')) {
      console.warn("Model did not return a valid JSON array string:", jsonText);
      return [];
    }
    
    // Parse the response which now lacks thumbnailUrl
    const parsedJson: Omit<YouTubeVideo, 'thumbnailUrl'>[] = JSON.parse(jsonText);

    // Manually construct the full YouTubeVideo object with the correct thumbnailUrl
    const videosWithThumbnails: YouTubeVideo[] = parsedJson.map(video => ({
        ...video,
        thumbnailUrl: `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    }));

    return videosWithThumbnails;

  } catch (error) {
    console.error("Error calling Gemini API or parsing its response:", error);
    if (error instanceof SyntaxError) {
      console.error("Failed to parse JSON from model response.");
    }
    throw new Error("Failed to fetch video data from Gemini. The model may have returned an invalid format.");
  }
}