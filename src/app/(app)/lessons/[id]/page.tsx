import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import vocabularyData from '@/lib/vocabulary.json';
import { VocabularyClient } from '../vocabulary-client';

const lessonInfo = {
  '1': {
    title: 'Saludos y Presentaciones',
    description: 'Aprende lo básico para saludar y presentarte en quechua.',
  },
   '2': {
    title: 'Frases Comunes',
    description: 'Frases esenciales para la conversación diaria.',
  },
  '3': {
    title: 'Números y Colores',
    description: 'Domina contar y describir cosas con colores.',
  },
  '4': {
    title: 'Miembros de la Familia',
    description: 'Habla sobre tu familia.',
  }
};

export default function LessonDetailPage({ params: { id } }: { params: { id: string } }) {
  const lessonId = parseInt(id, 10);
  const info = lessonInfo[id as keyof typeof lessonInfo] || { title: 'Lección Desconocida', description: '' };
  
  const vocabulary = vocabularyData.vocabulary
    .filter((v) => v.lessonId === lessonId)
    .map(item => ({
      ...item,
      audioSrc: `/audio/${item.quechua.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '_')}.mp3`
    }));


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
        Lección {id}: {info.title}
      </h1>
      <p className="mb-8 text-muted-foreground">{info.description}</p>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulario</CardTitle>
        </CardHeader>
        <CardContent>
            <VocabularyClient vocabulary={vocabulary} />
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-between">
        {lessonId > 1 ? (
          <Link href={`/lessons/${lessonId - 1}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Lección Anterior
            </Button>
          </Link>
        ) : (
          <div></div>
        )}
        <Link href={`/lessons/${lessonId + 1}`}>
          <Button>
            Siguiente Lección <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
