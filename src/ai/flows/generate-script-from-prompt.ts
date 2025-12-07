// src/ai/flows/generate-script-from-prompt.ts

import { z } from 'zod';
import { generateText } from '../ai-instance';

// ---------------------------------------
// Zod schemas
// ---------------------------------------

export const GenerateScriptFromPromptInputSchema = z.object({
  // Core idea / prompt for the script
  prompt: z.string().min(1, 'Prompt is required'),

  // Optional metadata to shape the output
  title: z.string().optional(),
  tone: z
    .string()
    .optional()
    .describe('Tone or style, e.g. "hype", "calm", "educational"'),
  platform: z
    .string()
    .optional()
    .describe('Platform like YouTube, TikTok, Twitch, etc.'),
  durationMinutes: z
    .number()
    .optional()
    .describe('Approximate target runtime in minutes'),
  language: z
    .string()
    .optional()
    .describe('Language to write the script in, default English'),
});

export const GenerateScriptFromPromptOutputSchema = z.object({
  script: z.string(),
});

export type GenerateScriptFromPromptInput = z.infer<
  typeof GenerateScriptFromPromptInputSchema
>;

export type GenerateScriptFromPromptOutput = z.infer<
  typeof GenerateScriptFromPromptOutputSchema
>;

// ---------------------------------------
// Internal handler
// ---------------------------------------

async function handleGenerateScriptFromPrompt(
  input: GenerateScriptFromPromptInput
): Promise<GenerateScriptFromPromptOutput> {
  const {
    prompt,
    title,
    tone,
    platform,
    durationMinutes,
    language,
  } = input;

  const lines: string[] = [
    'You are an expert scriptwriter for online video content.',
    'Write a complete script based on the following information.',
    '',
    `Core prompt: ${prompt}`,
  ];

  if (title) {
    lines.push(`Requested title (optional): ${title}`);
  }
  if (tone) {
    lines.push(`Tone / style: ${tone}`);
  }
  if (platform) {
    lines.push(`Platform: ${platform}`);
  }
  if (typeof durationMinutes === 'number') {
    lines.push(`Target duration: ~${durationMinutes} minutes of content.`);
  }
  if (language) {
    lines.push(`Language: ${language}`);
  } else {
    lines.push('Language: English (default).');
  }

  lines.push(
    '',
    'Structure:',
    '- Include an opening hook.',
    '- Brief intro / context.',
    '- Main body in clear segments.',
    '- A strong call-to-action or closing thought.',
    '',
    'Return ONLY the script text, no extra commentary.'
  );

  const fullPrompt = lines.join('\n');

  const script = await generateText(
    fullPrompt,
    'local/script-from-prompt'
  );

  return {
    script,
  };
}

// ---------------------------------------
// Public API
// ---------------------------------------

/**
 * Main function used by the rest of the app:
 *   import { generateScriptFromPrompt } from "@/ai/flows/generate-script-from-prompt";
 *   const result = await generateScriptFromPrompt(input);
 */
export async function generateScriptFromPrompt(
  input: GenerateScriptFromPromptInput
): Promise<GenerateScriptFromPromptOutput> {
  return handleGenerateScriptFromPrompt(input);
}

/**
 * Optional flow-style wrapper for compatibility:
 *   generateScriptFromPromptFlow.run(input)
 */
export const generateScriptFromPromptFlow = {
  run: generateScriptFromPrompt,
};

export default generateScriptFromPrompt;
