'use server';
/**
 * @fileOverview An AI agent that generates scalability suggestions for the app.
 *
 * - generateScalabilitySuggestions - A function that handles the generation of scalability suggestions.
 * - GenerateScalabilitySuggestionsInput - The input type for the generateScalabilitySuggestions function.
 * - GenerateScalabilitySuggestionsOutput - The return type for the generateScalabilitySuggestions function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateScalabilitySuggestionsInputSchema = z.object({
  appDescription: z.string().describe('A description of the app\'s architecture and backend structure.'),
});
export type GenerateScalabilitySuggestionsInput = z.infer<typeof GenerateScalabilitySuggestionsInputSchema>;

const GenerateScalabilitySuggestionsOutputSchema = z.object({
  suggestions: z.string().describe('A list of suggestions for improving the app\'s scalability to handle 50+ million users.'),
});
export type GenerateScalabilitySuggestionsOutput = z.infer<typeof GenerateScalabilitySuggestionsOutputSchema>;

export async function generateScalabilitySuggestions(input: GenerateScalabilitySuggestionsInput): Promise<GenerateScalabilitySuggestionsOutput> {
  return generateScalabilitySuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateScalabilitySuggestionsPrompt',
  input: {
    schema: z.object({
      appDescription: z.string().describe('A description of the app\'s architecture and backend structure.'),
    }),
  },
  output: {
    schema: z.object({
      suggestions: z.string().describe('A list of suggestions for improving the app\'s scalability to handle 50+ million users.'),
    }),
  },
  prompt: `You are an expert in designing scalable web applications. Given the following description of an application's architecture, generate a list of concrete suggestions for improving its scalability to handle 50+ million users.

App Description: {{{appDescription}}}

Consider suggesting improvements to the following areas:

- Database architecture (e.g., sharding, replication)
- Caching strategies (e.g., CDN, in-memory caching)
- Load balancing
- Microservices architecture
- Asynchronous task processing
- Code optimization

The app supports users creating up to 7 channels each.
`,
});

const generateScalabilitySuggestionsFlow = ai.defineFlow<
  typeof GenerateScalabilitySuggestionsInputSchema,
  typeof GenerateScalabilitySuggestionsOutputSchema
>({
  name: 'generateScalabilitySuggestionsFlow',
  inputSchema: GenerateScalabilitySuggestionsInputSchema,
  outputSchema: GenerateScalabilitySuggestionsOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});

export {generateScalabilitySuggestions};
