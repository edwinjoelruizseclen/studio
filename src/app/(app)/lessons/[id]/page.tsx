import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import vocabularyData from '@/lib/vocabulary.json';

const lessonInfo = {
  '1': {
    title: 'Saludos y Presentaciones',
    description: 'Aprende lo básico para saludar y presentarte en quechua.',
  },
};

export default function LessonDetailPage({ params }: { params: { id: string } }) {
  const lessonId = parseInt(params.id, 10);
  const info = lessonInfo[params.id as keyof typeof lessonInfo] || { title: 'Lección Desconocida', description: '' };
  const vocabulary = vocabularyData.vocabulary.filter(
    (v) => v.lessonId === lessonId
  );

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
        Lección {params.id}: {info.title}
      </h1>
      <p className="mb-8 text-muted-foreground">{info.description}</p>

      <Card>
        <CardHeader>
          <CardTitle>Vocabulario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vocabulary.map((item) => (
              <div
                key={item.quechua}
                className="flex items-center justify-between rounded-md bg-background p-3 hover:bg-accent/10"
              >
                <div>
                  <p className="text-lg font-semibold">{item.quechua}</p>
                  <p className="text-muted-foreground">{item.spanish}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <Volume2 className="h-6 w-6" />
                </Button>
              </div>
            ))}
          </div>
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
