'use server';

export async function getAudio(text: string) {
    // This function is no longer used for real-time generation,
    // but is kept for potential future use or can be removed.
    // For now, it returns a path to a pre-generated audio file.
    const fileName = text.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.mp3';
    return `/audio/${fileName}`;
}
