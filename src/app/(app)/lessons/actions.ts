'use server';

import { textToSpeech } from "@/ai/flows/text-to-speech";

export async function getAudio(text: string) {
    try {
        const result = await textToSpeech({ text });
        return result.audio;
    } catch(e) {
        console.error("Error getting audio:", e);
        return null;
    }
}
