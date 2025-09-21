import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import vocabularyData from '@/lib/vocabulary.json';
import { VocabularyClient } from '../vocabulary-client';

const vocabulary = vocabularyData.vocabulary.filter(v => v.lessonId === 4);

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <Link
        href="/lessons"
        className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Volver a Lecciones
      </Link>
      <h1 className="mb-2 font-headline text-3xl font-bold">
        Lección 4: Miembros de la Familia
      </h1>
      <p className="mb-8 text-muted-foreground">
        Aprende cómo referirte a los miembros de tu familia.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulario</CardTitle>
        </CardHeader>
        <CardContent>
          <VocabularyClient vocabulary={vocabulary} />
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
         <Link href="/lessons/3">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Lección Anterior
          </Button>
        </Link>
        <Link href="/lessons/5">
          <Button>
            Siguiente Lección <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
