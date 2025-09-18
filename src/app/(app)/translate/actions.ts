'use server';

import {
  quechuaTranslationAssistance,
  QuechuaTranslationAssistanceInput,
  QuechuaTranslationAssistanceOutput,
} from '@/ai/flows/quechua-translation-assistance';
import { z } from 'zod';

const FormSchema = z.object({
  sentence: z.string().min(10, 'Por favor, introduce una frase más larga.'),
  wordOrPhrase: z.string().min(1, 'Por favor, introduce una palabra o frase para definir.'),
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
      message: 'La validación falló. Por favor, revisa tus entradas.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await quechuaTranslationAssistance(
      validatedFields.data as QuechuaTranslationAssistanceInput
    );
    return {
      message: '¡Éxito!',
      data: result,
    };
  } catch (error) {
    console.error(error);
    return {
      message:
        'Ocurrió un error al obtener la traducción. Por favor, inténtalo de nuevo.',
    };
  }
}
