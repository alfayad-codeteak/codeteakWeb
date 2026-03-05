// app/api/chat/route.ts
// Edge runtime chat endpoint using Vercel AI SDK + Groq.

import { NextRequest } from "next/server";
import { streamText } from "ai";
import { defaultGroqModel, fallbackGroqModel, SYSTEM_PROMPT } from "@/lib/ai";

export const runtime = "edge";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { messages } = (await req.json()) as {
      // UI messages coming from the client (useChat + DefaultChatTransport)
      messages: any[];
    };

    // Normalize UI messages into simple { role, content } pairs for the model.
    const normalizedMessages = messages.map((m) => {
      const role = m?.role ?? "user";
      if (typeof m?.content === "string") {
        return { role, content: m.content as string };
      }
      if (Array.isArray(m?.parts)) {
        const content = m.parts
          .map((part: any) =>
            part?.type === "text" && typeof part.text === "string"
              ? part.text
              : "",
          )
          .join("");
        return { role, content };
      }
      return { role, content: "" };
    });

    const call = async (useFallback: boolean) =>
      streamText({
        model: useFallback ? fallbackGroqModel : defaultGroqModel,
        system: SYSTEM_PROMPT,
        messages: normalizedMessages as any,
        maxOutputTokens: 800,
        temperature: 0.3,
      });

    let result;
    try {
      result = await call(false);
    } catch (err: any) {
      const msg = typeof err?.message === "string" ? err.message : "";
      if (msg.includes("rate limit") || msg.includes("Rate limit")) {
        result = await call(true);
      } else {
        throw err;
      }
    }

    // Stream as UI messages over SSE so DefaultChatTransport / useChat
    // can consume and render messages on the client.
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error:
          "Sorry, CodeTeak AI is temporarily busy. Please wait a minute and try again, or send a shorter question.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

