// app/api/chat-widget/route.ts
// Simple JSON chat endpoint for the floating widget, using Groq (multi-key rotation).

import { NextRequest } from "next/server";
import { SYSTEM_PROMPT } from "@/lib/ai";
import { getGroqCompletion } from "@/lib/groq-client";

export const runtime = "edge";

type SimpleMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const { messages = [], input } = (await req.json()) as {
      messages?: SimpleMessage[];
      input: string;
    };

    const trimmed = (input ?? "").trim();
    if (!trimmed) {
      return Response.json(
        { reply: "" },
        { status: 400, headers: { "Content-Type": "application/json" } },
      );
    }

    const history = Array.isArray(messages) ? messages : [];

    const completion = await getGroqCompletion(
      [
        { role: "system", content: SYSTEM_PROMPT },
        ...history.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: trimmed },
      ],
      "llama-3.3-70b-versatile",
      { temperature: 0.3, max_tokens: 800 },
    );

    const reply = completion.choices?.[0]?.message?.content ?? "";

    return Response.json(
      { reply },
      { status: 200, headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Chat-widget API error:", error);
    const msg = typeof (error as any)?.message === "string" ? (error as any).message : "";
    const status = (error as any)?.status ?? (error as any)?.response?.status;

    if (msg.startsWith("All ") && msg.includes("Groq keys exhausted")) {
      return Response.json(
        {
          reply:
            "CodeTeak AI is temporarily busy (rate limited). Please wait a bit and try again.",
        },
        { status: 429, headers: { "Content-Type": "application/json" } },
      );
    }

    if (status === 401) {
      return Response.json(
        { reply: "CodeTeak AI is not configured correctly right now." },
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return Response.json(
      { reply: "Sorry, something went wrong. Please try again in a moment." },
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}

