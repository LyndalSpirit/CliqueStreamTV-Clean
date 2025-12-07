// src/ai/flows/create-channel.ts

import { z } from 'zod';
import { generateText } from '../ai-instance';

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
// Internal handler
// -----------------------------

async function handleCreateChannel(
  input: CreateChannelInput
): Promise<CreateChannelOutput> {
  const { name, description, category, visibility, tags } = input;

  let finalDescription = description?.trim() ?? '';

  // If description is missing, let our local AI stub suggest one.
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

      finalDescription = await generateText(
        prompt,
        'local/channel-description'
      );
    } catch {
      // If even the stub fails, just fall back to empty / provided description.
      finalDescription = description ?? '';
    }
  }

  // In a real backend, you would:
  // - Save this to a database
  // - Generate a real channelId
  // For now we just return a structured object.
  return {
    name,
    description: finalDescription,
    category,
    visibility,
    tags: tags ?? [],
    channelId: '',
  };
}

// -----------------------------
// Flow-like export
// -----------------------------

/**
 * We mimic the original "flow" object so existing code can:
 *   - call createChannelFlow(input)
 *   - or call createChannelFlow.run(input)
 */
export const createChannelFlow = Object.assign(
  async (input: CreateChannelInput): Promise<CreateChannelOutput> =>
    handleCreateChannel(input),
  {
    run: async (
      input: CreateChannelInput
    ): Promise<CreateChannelOutput> => handleCreateChannel(input),
  }
);

export default createChannelFlow;
