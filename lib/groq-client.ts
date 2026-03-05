import Groq from "groq-sdk";
import type {
  ChatCompletion,
  ChatCompletionCreateParams,
  ChatCompletionMessageParam,
} from "groq-sdk/resources/chat/completions";

const apiKeys = (process.env.GROQ_API_KEYS || "")
  .split(",")
  .map((k) => k.trim())
  .filter(Boolean);

if (apiKeys.length === 0) {
  throw new Error("No Groq API keys configured");
}

const clients = apiKeys.map((key) => new Groq({ apiKey: key }));

let currentKeyIndex = 0;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export async function getGroqCompletion(
  messages: ChatCompletionMessageParam[],
  model = "llama-3.3-70b-versatile",
  options?: {
    temperature?: number;
    max_tokens?: number;
    [key: string]: unknown;
  },
): Promise<ChatCompletion> {
  const params: ChatCompletionCreateParams = {
    model,
    messages,
    temperature: options?.temperature ?? 0.7,
    max_tokens: options?.max_tokens ?? 1024,
    ...options,
  };

  for (let attempt = 0; attempt < apiKeys.length; attempt++) {
    const idx = (currentKeyIndex + attempt) % apiKeys.length;

    try {
      const completion = await clients[idx].chat.completions.create(params);
      currentKeyIndex = idx;
      return completion;
    } catch (err: any) {
      const status = err?.status ?? err?.response?.status;

      if (status === 429) {
        console.warn(`429 on key #${idx + 1}`);
        currentKeyIndex = (idx + 1) % apiKeys.length;
        await delay(800);
        continue;
      }

      throw err;
    }
  }

  throw new Error(`All ${apiKeys.length} Groq keys exhausted (rate limited)`);
}

