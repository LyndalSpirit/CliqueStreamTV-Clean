'use server';
/**
 * @fileOverview An AI agent that generates video scripts from user prompts.
 *
 * - generateScriptFromPrompt - A function that generates a video script from a prompt.
 * - GenerateScriptFromPromptInput - The input type for the generateScriptFromPrompt function.
 * - GenerateScriptFromPromptOutput - The return type for the generateScriptFromPrompt function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateScriptFromPromptInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired video script.'),
});
export type GenerateScriptFromPromptInput = z.infer<typeof GenerateScriptFromPromptInputSchema>;

const GenerateScriptFromPromptOutputSchema = z.object({
  script: z.string().describe('The generated video script.'),
});
export type GenerateScriptFromPromptOutput = z.infer<typeof GenerateScriptFromPromptOutputSchema>;

export async function generateScriptFromPrompt(input: GenerateScriptFromPromptInput): Promise<GenerateScriptFromPromptOutput> {
  return generateScriptFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScriptFromPromptPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('A prompt describing the desired video script.'),
    }),
  },
  output: {
    schema: z.object({
      script: z.string().describe('The generated video script.'),
    }),
  },
  prompt: `You are a professional script writer. Please create a video script based on the prompt below:
\n\nPrompt: {{{prompt}}}`,
});

const generateScriptFromPromptFlow = ai.defineFlow<
  typeof GenerateScriptFromPromptInputSchema,
  typeof GenerateScriptFromPromptOutputSchema
>({
  name: 'generateScriptFromPromptFlow',
  inputSchema: GenerateScriptFromPromptInputSchema,
  outputSchema: GenerateScriptFromPromptOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
