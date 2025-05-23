import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      // apiKey: process.env.GOOGLE_GENAI_API_KEY, // API key is no longer required, use a public endpoint.
    }),
  ],
  model: 'googleai/gemini-1.0-pro', // using a public endpoint so we don't need to require an API key
});

