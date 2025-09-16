'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing Quechua translation assistance by identifying the appropriate definition of a word or phrase in a given sentence, considering dialectal nuances.
 *
 * - quechuaTranslationAssistance - A function that processes the Quechua text and provides dialect-specific definitions.
 * - QuechuaTranslationAssistanceInput - The input type for the quechuaTranslationAssistance function.
 * - QuechuaTranslationAssistanceOutput - The return type for the quechuaTranslationAssistance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const QuechuaTranslationAssistanceInputSchema = z.object({
  sentence: z.string().describe('The Quechua sentence to analyze.'),
  wordOrPhrase: z.string().describe('The specific word or phrase to define within the sentence.'),
});
export type QuechuaTranslationAssistanceInput = z.infer<typeof QuechuaTranslationAssistanceInputSchema>;

const QuechuaTranslationAssistanceOutputSchema = z.object({
  definition: z.string().describe('The most appropriate definition of the word or phrase in the context of the sentence, considering potential dialectal variations.'),
  dialectConsiderations: z.string().describe('Explanation of any dialectal nuances affecting the interpretation of the word or phrase.'),
});
export type QuechuaTranslationAssistanceOutput = z.infer<typeof QuechuaTranslationAssistanceOutputSchema>;

export async function quechuaTranslationAssistance(input: QuechuaTranslationAssistanceInput): Promise<QuechuaTranslationAssistanceOutput> {
  return quechuaTranslationAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quechuaTranslationAssistancePrompt',
  input: {schema: QuechuaTranslationAssistanceInputSchema},
  output: {schema: QuechuaTranslationAssistanceOutputSchema},
  prompt: `You are an expert in Quechua linguistics, familiar with various dialects.
  Given the following Quechua sentence and a specific word or phrase within it, identify the most appropriate definition, considering potential dialectal variations.

  Sentence: {{{sentence}}}
  Word/Phrase: {{{wordOrPhrase}}}

  Provide a clear definition and explain any dialectal nuances that affect the interpretation of the word or phrase.
  Respond in the following format:
  Definition: <definition>
  DialectConsiderations: <dialect considerations>`,
});

const quechuaTranslationAssistanceFlow = ai.defineFlow(
  {
    name: 'quechuaTranslationAssistanceFlow',
    inputSchema: QuechuaTranslationAssistanceInputSchema,
    outputSchema: QuechuaTranslationAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
