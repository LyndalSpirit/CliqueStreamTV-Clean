'use server';
/**
 * @fileOverview A flow to generate video thumbnails based on a text prompt.
 *
 * - generateVideoThumbnail - A function that handles the video thumbnail generation process.
 * - GenerateVideoThumbnailInput - The input type for the generateVideoThumbnail function.
 * - GenerateVideoThumbnailOutput - The return type for the generateVideoThumbnail function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const GenerateVideoThumbnailInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the video thumbnail from.'),
});
export type GenerateVideoThumbnailInput = z.infer<typeof GenerateVideoThumbnailInputSchema>;

const GenerateVideoThumbnailOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated video thumbnail image.'),
});
export type GenerateVideoThumbnailOutput = z.infer<typeof GenerateVideoThumbnailOutputSchema>;

export async function generateVideoThumbnail(input: GenerateVideoThumbnailInput): Promise<GenerateVideoThumbnailOutput> {
  return generateVideoThumbnailFlow(input);
}

const generateVideoThumbnailPrompt = ai.definePrompt({
  name: 'generateVideoThumbnailPrompt',
  input: {
    schema: z.object({
      prompt: z.string().describe('The text prompt to generate the video thumbnail from.'),
    }),
  },
  output: {
    schema: z.object({
      imageUrl: z.string().describe('The URL of the generated video thumbnail image.'),
    }),
  },
  prompt: `You are an AI that generates video thumbnails based on a text prompt.
\n\nGenerate a URL for a thumbnail image based on the following prompt: {{{prompt}}}.\n\nEnsure the image is appropriate for a video thumbnail and is visually appealing.
\n\nReturn just the url of the image.`,
});

const generateVideoThumbnailFlow = ai.defineFlow<
  typeof GenerateVideoThumbnailInputSchema,
  typeof GenerateVideoThumbnailOutputSchema
>({
  name: 'generateVideoThumbnailFlow',
  inputSchema: GenerateVideoThumbnailInputSchema,
  outputSchema: GenerateVideoThumbnailOutputSchema,
}, async input => {
  const {output} = await generateVideoThumbnailPrompt(input);
  return output!;
});

export default {
  name: 'aiThumbnailPlugin',
  version: '1.0.0',
  description: 'Provides AI-powered video thumbnail generation capabilities.',
  generateVideoThumbnail,
  GenerateVideoThumbnailInputSchema,
  GenerateVideoThumbnailOutputSchema,
};
