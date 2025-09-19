'use server';

import {
  simpleTranslator,
  SimpleTranslatorInput,
  SimpleTranslatorOutput,
} from '@/ai/flows/simple-translator';
import { z } from 'zod';

const FormSchema = z.object({
  text: z.string().min(1, 'Por favor, introduce texto para traducir.'),
});

export type FormState = {
  message: string;
  data?: SimpleTranslatorOutput;
  errors?: {
    text?: string[];
  };
};

export async function getTranslation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    text: formData.get('text'),
  });

  if (!validatedFields.success) {
    return {
      message: 'La validación falló.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await simpleTranslator(
      validatedFields.data as SimpleTranslatorInput
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
