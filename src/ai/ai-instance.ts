// src/ai/ai-instance.ts
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      // Reads GEMINI_API_KEY/GOOGLE_API_KEY from env if present.
    }),
  ],
});

// optional helper, safe to keep or remove
export async function generateText(prompt: string, model = 'googleai/gemini-1.5-pro') {
  // @ts-expect-error: API surface varies slightly by version
  const res = await ai.generate({ model, prompt });
  // @ts-expect-error
  return typeof res.text === 'function' ? res.text() : String(res ?? '');
}


