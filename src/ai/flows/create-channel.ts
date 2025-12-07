// src/ai/flows/create-channel.ts

import { z } from 'zod';
import { ai } from '../ai-instance';

// -----------------------------
// Zod schemas
// -----------------------------

export const CreateChannelInputSchema = z.object({
  name: z.string().min(1, 'Channel name is required'),
  description: z.string().optional(),
  category: z.string().optional(),
  visibility: z
    .enum(['public', 'private', 'unlisted'])
    .default('public'),
  tags: z.array(z.string()).optional(),
});

export const CreateChannelOutputSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  category: z.string().optional(),
  visibility: z.string(),
  tags: z.array(z.string()).optional(),
  channelId: z.string().optional(), // placeholder for future real IDs
});

export type CreateChannelInput = z.infer<typeof CreateChannelInputSchema>;
export type CreateChannelOutput = z.infer<typeof CreateChannelOutputSchema>;

// -----------------------------
// Flow definition
// -----------------------------

// NOTE:
// We intentionally treat ai as `any` here so TypeScript
// doesn’t fight us about Genkit’s changing types.
// That’s why there are no `<Type, Type>` generics on defineFlow.
export const createChannelFlow = (ai as any).defineFlow({
  name: 'createChannel',
  inputSchema: CreateChannelInputSchema,
  outputSchema: CreateChannelOutputSchema,

  // This is the function that runs when the flow is invoked.
  async run(input: CreateChannelInput): Promise<CreateChannelOutput> {
    const {
      name,
      description,
      category,
      visibility,
      tags,
    } = input;

    // If description is missing, we’ll have the AI draft one.
    let finalDescription = description?.trim() ?? '';

    if (!finalDescription) {
      try {
        const prompt = [
          'You are helping a creator set up a new channel on a streaming platform called CLIQUE Stream TV.',
          'Write a short, polished channel description in 2–3 sentences.',
          `Channel name: ${name}`,
          category ? `Category: ${category}` : '',
          tags && tags.length ? `Tags: ${tags.join(', ')}` : '',
        ]
          .filter(Boolean)
          .join('\n');

        const res: any = await (ai as any).generate({
          model: 'googleai/gemini-1.5-pro',
          prompt,
        } as any);

        const text = res?.text;
        if (typeof text === 'function') {
          finalDescription = await text();
        } else if (typeof text === 'string') {
          finalDescription = text;
        } else {
          finalDescription = String(text ?? '');
        }
      } catch {
        // Fallback if AI call fails — keep it simple.
        finalDescription = description ?? '';
      }
    }

    // In a real app this is where you'd:
    // - write to Firestore / database
    // - generate a real channelId
    // For now we just echo back structured data.
    return {
      name,
      description: finalDescription,
      category,
      visibility,
      tags: tags ?? [],
      channelId: '',
    };
  },
});

// Export default as well, in case other code imports it that way.
export default createChannelFlow;

