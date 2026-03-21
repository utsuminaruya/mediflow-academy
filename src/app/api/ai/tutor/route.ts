import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { buildTutorSystemPrompt } from "@/lib/ai/tutor-system-prompt";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  try {
    const { messages, userProfile } = await request.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request", { status: 400 });
    }

    const client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const systemPrompt = buildTutorSystemPrompt({
      nativeLanguage: userProfile?.nativeLanguage || "vi",
      japaneseLevel: userProfile?.japaneseLevel || "N5",
      currentCourse: userProfile?.currentCourse,
      currentLesson: userProfile?.currentLesson,
    });

    const stream = client.messages.stream({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages.filter((m: { role: string; content: string }) =>
        m.role === "user" || m.role === "assistant"
      ),
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            const data = `data: ${JSON.stringify(event)}\n\n`;
            controller.enqueue(encoder.encode(data));
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI Tutor API error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
