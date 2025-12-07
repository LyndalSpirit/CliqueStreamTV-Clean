// src/ai/plugins/ai-scripting-plugin.ts

import { z } from 'zod';
import {
  GenerateScriptFromPromptInputSchema,
  GenerateScriptFromPromptOutputSchema,
  type GenerateScriptFromPromptInput,
  type GenerateScriptFromPromptOutput,
  generateScriptFromPrompt,
} from '../flows/generate-script-from-prompt';

// Re-export schemas so other parts of the app can use them if needed
export const AIScriptingPluginInputSchema = GenerateScriptFromPromptInputSchema;
export const AIScriptingPluginOutputSchema = GenerateScriptFromPromptOutputSchema;

export type AIScriptingPluginInput = GenerateScriptFromPromptInput;
export type AIScriptingPluginOutput = GenerateScriptFromPromptOutput;

/**
 * Core function: given input (prompt, tone, etc.),
 * returns a generated script.
 */
export async function runAIScriptingPlugin(
  input: AIScriptingPluginInput,
): Promise<AIScriptingPluginOutput> {
  // Validate with Zod to keep things strict
  const parsed = AIScriptingPluginInputSchema.parse(input);
  return generateScriptFromPrompt(parsed);
}

/**
 * Optional plugin-style wrapper.
 * This keeps a similar shape to a "plugin" object while staying
 * completely independent of Genkit / ai.definePrompt.
 */
const AIScriptingPlugin = {
  name: 'ai-scripting-plugin',
  inputSchema: AIScriptingPluginInputSchema,
  outputSchema: AIScriptingPluginOutputSchema,
  run: runAIScriptingPlugin,
};

export default AIScriptingPlugin;
