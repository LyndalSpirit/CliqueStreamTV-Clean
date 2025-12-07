// src/ai/ai-instance.ts

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Main AI instance used by the app.
// We use `as any` to avoid brittle type issues across Genkit versions.
export const ai: any = genkit({
  plugins: [googleAI()],
} as any);

// Optional helper to generate text from a model.
// Keeps things typed at the edges and loose in the middle.
export async function generateText(
  prompt: string,
  model = 'googleai/gemini-1.5-pro'
): Promise<string> {
  // Genkit's return shape can vary slightly, so we treat it as `any`.
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





