'use server';

import {
  quechuaTranslationAssistance,
  QuechuaTranslationAssistanceInput,
  QuechuaTranslationAssistanceOutput,
} from '@/ai/flows/quechua-translation-assistance';
import { z } from 'zod';

const FormSchema = z.object({
  sentence: z.string().min(10, 'Please enter a longer sentence.'),
  wordOrPhrase: z.string().min(1, 'Please enter a word or phrase to define.'),
});

export type FormState = {
  message: string;
  data?: QuechuaTranslationAssistanceOutput;
  errors?: {
    sentence?: string[];
    wordOrPhrase?: string[];
  };
};

export async function getTranslationAssistance(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    sentence: formData.get('sentence'),
    wordOrPhrase: formData.get('wordOrPhrase'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your inputs.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await quechuaTranslationAssistance(
      validatedFields.data as QuechuaTranslationAssistanceInput
    );
    return {
      message: 'Success!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'An error occurred while fetching the translation. Please try again.',
    };
  }
}
