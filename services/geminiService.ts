import { GoogleGenAI, Type } from "@google/genai";
import type { YouTubeVideo } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Simplified schema: We will construct the thumbnailUrl ourselves.
const videoSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      videoId: {
        type: Type.STRING,
        description: 'The unique YouTube video ID.'
      },
      title: {
        type: Type.STRING,
        description: 'The title of the video.'
      },
      channelTitle: {
        type: Type.STRING,
        description: 'The name of the YouTube channel that published the video.'
      }
    },
    required: ['videoId', 'title', 'channelTitle']
  }
};

export async function searchYoutubeVideos(query: string): Promise<YouTubeVideo[]> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find 10 popular music videos on YouTube for the query: "${query}". Prioritize official music videos, art tracks, or high-quality lyric videos that are publicly available and explicitly allow embedding on external websites. Exclude playlists, interviews, or full album streams. Only return the videoId, title, and channelTitle.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: videoSchema,
        systemInstruction: "You are an expert YouTube music search assistant. Your primary task is to find relevant music videos. It is crucial that you only return videos that allow embedding on external websites. Verify this for each result. Return the data in a clean JSON format."
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
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
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch video data from Gemini.");
  }
}