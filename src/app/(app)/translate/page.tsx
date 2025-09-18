'use server';
import { TranslateClient } from '@/components/translate/translate-client';

export default async function TranslatePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="font-headline text-3xl font-bold">
          Traductor Contextual
        </h1>
        <p className="mt-2 text-muted-foreground">
          Obtén traducciones detalladas para palabras y frases en quechua. Proporciona una
          oración y el término que quieres entender, y nuestra IA, entrenada en
          lingüística quechua, te dará la definición correcta considerando
          las variaciones dialectales.
        </p>
      </div>
      <TranslateClient />
    </div>
  );
}
