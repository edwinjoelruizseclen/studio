'use server';
/**
 * @fileOverview This file defines a Genkit flow for converting text to speech.
 *
 * - textToSpeech - A function that takes text and returns an audio data URI.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import wav from 'wav';

// Define the input schema for the flow
const TextToSpeechInputSchema = z.object({
  text: z.string().describe('The text to convert to speech.'),
});
export type TextToSpeechInput = z.infer<typeof TextToSpeechInputSchema>;

// Define the output schema for the flow
const TextToSpeechOutputSchema = z.object({
  audio: z.string().describe('The generated audio as a data URI.'),
});
export type TextToSpeechOutput = z.infer<typeof TextToSpeechOutputSchema>;


// Exported wrapper function
export async function textToSpeech(input: TextToSpeechInput): Promise<TextToSpeechOutput> {
  return textToSpeechFlow(input);
}


async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    let bufs = [] as any[];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}


const textToSpeechFlow = ai.defineFlow(
  {
    name: 'textToSpeechFlow',
    inputSchema: TextToSpeechInputSchema,
    outputSchema: TextToSpeechOutputSchema,
  },
  async ({ text }) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.5-flash-preview-tts',
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Algenib' }, // A good voice for Spanish/Quechua
          },
        },
      },
      prompt: text,
    });
    if (!media || !media.url) {
      throw new Error('No audio was generated.');
    }
    const audioBuffer = Buffer.from(
      media.url.substring(media.url.indexOf(',') + 1),
      'base64'
    );
    const wavBase64 = await toWav(audioBuffer);

    return {
      audio: 'data:audio/wav;base64,' + wavBase64,
    };
  }
);
