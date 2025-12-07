// src/ai/flows/generate-scalability-suggestions.ts

import { z } from 'zod';
import { generateText } from '../ai-instance';

// -----------------------------
// Zod schemas
// -----------------------------

export const GenerateScalabilitySuggestionsInputSchema = z.object({
  currentStack: z.string().optional(),
  currentTraffic: z.string().optional(),
  bottlenecks: z.string().optional(),
  goals: z.string().optional(),
  constraints: z.string().optional(),
});

export const GenerateScalabilitySuggestionsOutputSchema = z.object({
  overview: z.string(),
  steps: z.array(z.string()),
});

export type GenerateScalabilitySuggestionsInput = z.infer<
  typeof GenerateScalabilitySuggestionsInputSchema
>;
export type GenerateScalabilitySuggestionsOutput = z.infer<
  typeof GenerateScalabilitySuggestionsOutputSchema
>;

// -----------------------------
// Internal handler
// -----------------------------

async function handleGenerateScalabilitySuggestions(
  input: GenerateScalabilitySuggestionsInput
): Promise<GenerateScalabilitySuggestionsOutput> {
  const { currentStack, currentTraffic, bottlenecks, goals, constraints } =
    input;

  const prompt = [
    'You are an expert cloud architect and streaming-platform engineer.',
    'Generate concise, actionable scalability recommendations for a video streaming platform.',
    '',
    currentStack ? `Current stack: ${currentStack}` : '',
    currentTraffic ? `Current traffic: ${currentTraffic}` : '',
    bottlenecks ? `Known bottlenecks: ${bottlenecks}` : '',
    goals ? `Scaling goals: ${goals}` : '',
    constraints ? `Constraints (budget, tools, etc.): ${constraints}` : '',
    '',
    'Return a short overview and then a numbered list of concrete steps.',
  ]
    .filter(Boolean)
    .join('\n');

  const raw = await generateText(
    prompt,
    'local/scalability-suggestions'
  );

  const [firstLine, ...rest] = raw.split('\n').map((l) => l.trim());
  const overview =
    firstLine && firstLine.length > 0
      ? firstLine
      : 'Scalability recommendations for the current platform.';
  const steps = rest.filter((line) => line.length > 0);

  return {
    overview,
    steps: steps.length ? steps : ['Review current architecture and traffic patterns.'],
  };
}

// -----------------------------
// Public API
// -----------------------------

/**
 * Main function used by the rest of the app.
 * Keeps a single exported symbol with this name (no duplicates).
 */
export async function generateScalabilitySuggestions(
  input: GenerateScalabilitySuggestionsInput
): Promise<GenerateScalabilitySuggestionsOutput> {
  return handleGenerateScalabilitySuggestions(input);
}

/**
 * Optional flow-style wrapper, in case anything expects `.run()`.
 * Note: different name -> no export collision.
 */
export const generateScalabilitySuggestionsFlow = {
  run: generateScalabilitySuggestions,
};

export default generateScalabilitySuggestions;
