'use server';
/**
 * @fileOverview This file defines a Genkit flow for simple translation between Spanish and Quechua.
 *
 * - simpleTranslator - A function that translates text between Spanish and Quechua.
 * - SimpleTranslatorInput - The input type for the simpleTranslator function.
 * - SimpleTranslatorOutput - The return type for the simpleTranslator function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const SimpleTranslatorInputSchema = z.object({
  text: z.string().describe('The text to be translated, can be in Spanish or Quechua.'),
});
export type SimpleTranslatorInput = z.infer<typeof SimpleTranslatorInputSchema>;

const SimpleTranslatorOutputSchema = z.object({
  translation: z.string().describe('The translated text.'),
});
export type SimpleTranslatorOutput = z.infer<typeof SimpleTranslatorOutputSchema>;

export async function simpleTranslator(input: SimpleTranslatorInput): Promise<SimpleTranslatorOutput> {
  return simpleTranslatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'simpleTranslatorPrompt',
  input: { schema: SimpleTranslatorInputSchema },
  output: { schema: SimpleTranslatorOutputSchema },
  prompt: `You are an expert translator specializing in Spanish and Quechua.
  You will be given a text. Your task is to detect the language of the text and translate it to the other language (if it's Spanish, translate to Quechua; if it's Quechua, translate to Spanish).
  Provide only the translated text as the output.

  Text to translate: {{{text}}}
  `,
});

const simpleTranslatorFlow = ai.defineFlow(
  {
    name: 'simpleTranslatorFlow',
    inputSchema: SimpleTranslatorInputSchema,
    outputSchema: SimpleTranslatorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
