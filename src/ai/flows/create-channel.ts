'use server';

/**
 * @fileOverview An AI agent that helps users create a new channel.
 *
 * - createChannel - A function that handles the creation of a new channel.
 * - CreateChannelInput - The input type for the createChannel function.
 * - CreateChannelOutput - The return type for the createChannel function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const CreateChannelInputSchema = z.object({
  userId: z.string().describe('The ID of the user creating the channel.'),
  channelName: z.string().describe('The desired name of the new channel.'),
  channelDescription: z.string().describe('A brief description of the channel\'s content.'),
});
export type CreateChannelInput = z.infer<typeof CreateChannelInputSchema>;

const CreateChannelOutputSchema = z.object({
  channelId: z.string().describe('The ID of the newly created channel.'),
  success: z.boolean().describe('Indicates whether the channel creation was successful.'),
  message: z.string().describe('A message providing feedback on the channel creation attempt.'),
});
export type CreateChannelOutput = z.infer<typeof CreateChannelOutputSchema>;

export async function createChannel(input: CreateChannelInput): Promise<CreateChannelOutput> {
  return createChannelFlow(input);
}

const prompt = ai.definePrompt({
  name: 'createChannelPrompt',
  input: {
    schema: z.object({
      userId: z.string().describe('The ID of the user creating the channel.'),
      channelName: z.string().describe('The desired name of the new channel.'),
      channelDescription: z.string().describe('A brief description of the channel\'s content.'),
    }),
  },
  output: {
    schema: z.object({
      channelId: z.string().describe('The ID of the newly created channel.'),
      success: z.boolean().describe('Indicates whether the channel creation was successful.'),
      message: z.string().describe('A message providing feedback on the channel creation attempt.'),
    }),
  },
  prompt: `You are a helpful assistant that helps users create new channels.
Given a user ID, a channel name, and a channel description, create a new channel.
The app only allows a user to have 7 channels max.
\n\n
User ID: {{{userId}}}
Channel Name: {{{channelName}}}
Channel Description: {{{channelDescription}}}
`,
});

const createChannelFlow = ai.defineFlow<
  typeof CreateChannelInputSchema,
  typeof CreateChannelOutputSchema
>({
  name: 'createChannelFlow',
  inputSchema: CreateChannelInputSchema,
  outputSchema: CreateChannelOutputSchema,
},
async input => {
  const {output} = await prompt(input);
  return output!;
});
