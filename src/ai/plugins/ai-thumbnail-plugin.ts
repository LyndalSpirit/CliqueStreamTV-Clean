// src/ai/plugins/ai-thumbnail-plugin.ts

import {
  GenerateVideoThumbnailInputSchema,
  GenerateVideoThumbnailOutputSchema,
  type GenerateVideoThumbnailInput,
  type GenerateVideoThumbnailOutput,
  generateVideoThumbnail,
} from '../flows/generate-video-thumbnail';

// Re-export schemas so other parts of the app can use them if needed
export const AIThumbnailPluginInputSchema = GenerateVideoThumbnailInputSchema;
export const AIThumbnailPluginOutputSchema = GenerateVideoThumbnailOutputSchema;

export type AIThumbnailPluginInput = GenerateVideoThumbnailInput;
export type AIThumbnailPluginOutput = GenerateVideoThumbnailOutput;

/**
 * Core function: given input (title, mood, style, etc.),
 * returns a generated thumbnail prompt.
 */
export async function runAIThumbnailPlugin(
  input: AIThumbnailPluginInput,
): Promise<AIThumbnailPluginOutput> {
  const parsed = AIThumbnailPluginInputSchema.parse(input);
  return generateVideoThumbnail(parsed);
}

/**
 * Optional plugin-style wrapper.
 * Keeps a “plugin object” shape without any Genkit / ai.definePrompt usage.
 */
const AIThumbnailPlugin = {
  name: 'ai-thumbnail-plugin',
  inputSchema: AIThumbnailPluginInputSchema,
  outputSchema: AIThumbnailPluginOutputSchema,
  run: runAIThumbnailPlugin,
};

export default AIThumbnailPlugin;
