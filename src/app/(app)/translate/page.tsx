'use server';
import { TranslateClient } from '@/components/translate/translate-client';

export default async function TranslatePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <h1 className="font-headline text-3xl font-bold">
          Contextual Translator
        </h1>
        <p className="mt-2 text-muted-foreground">
          Get nuanced translations for Quechua words and phrases. Provide a
          sentence and the term you want to understand, and our AI, trained in
          Quechua linguistics, will give you the right definition considering
          dialectal variations.
        </p>
      </div>
      <TranslateClient />
    </div>
  );
}
