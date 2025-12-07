// src/ai/ai-instance.ts

/**
 * Lightweight local AI stub to keep the frontend build clean.
 * This avoids pulling in Genkit/gRPC/Google-auth and all the Node-only modules
 * that were breaking the Next.js browser build.
 *
 * Later, we can rewire this to call a serverless function or backend API.
 */

export interface GenerateParams {
  model?: string;
  prompt: string;
}

/**
 * Simple placeholder "AI" object with a generate() method that mimics
 * the interface we used before, but without any external dependencies.
 */
export const ai = {
  async generate({ model, prompt }: GenerateParams) {
    const text = () =>
      [
        'AI placeholder response (local stub).',
        '',
        `Model: ${model ?? 'local/placeholder'}`,
        '',
        'Prompt:',
        prompt,
      ].join('\n');

    return { text };
  },
};

/**
 * Helper to generate plain text. This mirrors the previous generateText helper
 * but uses the local stub instead of Genkit/Google AI.
 */
export async function generateText(
  prompt: string,
  model = 'local/placeholder'
): Promise<string> {
  const res: any = await ai.generate({ model, prompt });

  const text = res?.text;

  if (typeof text === 'function') {
    return await text();
  }

  if (typeof text === 'string') {
    return text;
  }

  return String(text ?? '');
}
