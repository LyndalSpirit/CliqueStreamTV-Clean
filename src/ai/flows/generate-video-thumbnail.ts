// src/ai/flows/generate-video-thumbnail.ts

import { z } from 'zod';
import { generateText } from '../ai-instance';

// ---------------------------------------
// Zod schemas
// ---------------------------------------

export const GenerateVideoThumbnailInputSchema = z.object({
  // Core details about the video
  title: z.string().min(1, 'Video title is required'),
  description: z.string().optional(),

  // Optional styling controls
  mood: z
    .string()
    .optional()
    .describe('Emotional tone, e.g. "epic", "cozy", "dark", "playful"'),
  style: z
    .string()
    .optional()
    .describe('Art style, e.g. "lo-fi anime", "cinematic", "minimalist"'),
  platform: z
    .string()
    .optional()
    .describe('Platform like YouTube, TikTok, Twitch, etc.'),
  aspectRatio: z
    .string()
    .optional()
    .describe('e.g. "16:9", "9:16", "1:1"'),
  // optional content tags
  tags: z.array(z.string()).optional(),
});

export const GenerateVideoThumbnailOutputSchema = z.object({
  prompt: z.string(),
});

export type GenerateVideoThumbnailInput = z.infer<
  typeof GenerateVideoThumbnailInputSchema
>;

export type GenerateVideoThumbnailOutput = z.infer<
  typeof GenerateVideoThumbnailOutputSchema
>;

// ---------------------------------------
// Internal handler
// ---------------------------------------

async function handleGenerateVideoThumbnail(
  input: GenerateVideoThumbnailInput
): Promise<GenerateVideoThumbnailOutput> {
  const {
    title,
    description,
    mood,
    style,
    platform,
    aspectRatio,
    tags,
  } = input;

  const lines: string[] = [
    'You are an expert prompt engineer for AI image generators.',
    'Create a single, detailed prompt for generating a video thumbnail.',
    '',
    `Video title: ${title}`,
  ];

  if (description) {
    lines.push(`Video description: ${description}`);
  }
  if (mood) {
    lines.push(`Mood / atmosphere: ${mood}`);
  }
  if (style) {
    lines.push(`Visual style: ${style}`);
  }
  if (platform) {
    lines.push(`Platform: ${platform}`);
  }
  if (aspectRatio) {
    lines.push(`Target aspect ratio: ${aspectRatio}`);
  }
  if (tags && tags.length) {
    lines.push(`Keywords / tags: ${tags.join(', ')}`);
  }

  lines.push(
    '',
    'Requirements:',
    '- Focus on a clear central subject.',
    '- Make it bold and easy to read even as a small thumbnail.',
    '- Include lighting, color palette, and composition details.',
    '- Avoid text in the prompt unless it is essential.',
    '',
    'Return ONLY the final prompt string, no extra explanation.'
  );

  const fullPrompt = lines.join('\n');

  const prompt = await generateText(
    fullPrompt,
    'local/video-thumbnail'
  );

  return { prompt };
}

// ---------------------------------------
// Public API
// ---------------------------------------

/**
 * Main function used by the rest of the app:
 *   import { generateVideoThumbnail } from "@/ai/flows/generate-video-thumbnail";
 *   const { prompt } = await generateVideoThumbnail(input);
 */
export async function generateVideoThumbnail(
  input: GenerateVideoThumbnailInput
): Promise<GenerateVideoThumbnailOutput> {
  return handleGenerateVideoThumbnail(input);
}

/**
 * Optional flow-style wrapper for compatibility:
 *   generateVideoThumbnailFlow.run(input)
 */
export const generateVideoThumbnailFlow = {
  run: generateVideoThumbnail,
};

export default generateVideoThumbnail;
