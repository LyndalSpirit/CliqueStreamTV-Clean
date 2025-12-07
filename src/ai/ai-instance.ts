// src/ai/ai-instance.ts

import { createAI } from '@genkit-ai/next';
import { googleAI } from '@genkit-ai/google-genai';

// Main AI instance used by the app
export const ai = createAI({
  plugins: [googleAI()],
  // You can add config here later if needed
});

// Optional helper to generate text from a model.
// Uses `any` in a controlled way instead of @ts-expect-error.
export async function generateText(
  prompt: string,
  model = 'googleai/gemini-1.5-pro'
): Promise<string> {
  // Genkit's types can vary a bit by version, so we cast lightly here
  const res: any = await ai.generate({ model, prompt } as any);

  const text = res?.text;

  if (typeof text === 'function') {
    // Some versions expose text() as a function
    return text();
  }

  if (typeof text === 'string') {
    return text;
  }

  // Fallback: stringify whatever came back
  return String(text ?? '');
}



