'use server';
import { TranslateClient } from '@/components/translate/translate-client';

export default async function TranslatePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="font-headline text-3xl font-bold">
          Traductor Bilingüe
        </h1>
        <p className="mt-2 text-muted-foreground">
          Traduce palabras y frases entre español y quechua. La IA
          detectará automáticamente el idioma que ingreses y te dará la
          traducción correspondiente.
        </p>
      </div>
      <TranslateClient />
    </div>
  );
}
