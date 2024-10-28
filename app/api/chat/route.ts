import { weatherTool } from "@/app/ai/tools/weatherTool";
import { createOpenAI as createGroq } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const groq = createGroq({
    baseURL: "https://api.groq.com/openai/v1",
    apiKey: process.env.GROQ_API_KEY,
  });

  const result = await streamText({
    model: groq("llama3-8b-8192"),
    system: "You are a friendly assistant!",
    messages: convertToCoreMessages(messages),
    tools: {
      weatherTool: weatherTool,
    },
    maxSteps: 5,
  });

  return result.toDataStreamResponse({
    getErrorMessage: (error) => {
      console.log("Error in Ai call", error);
      if (error == null) {
        return "unknown error";
      }

      if (typeof error === "string") {
        return error;
      }

      if (error instanceof Error) {
        return error.message;
      }

      return JSON.stringify(error);
    },
  });
}
