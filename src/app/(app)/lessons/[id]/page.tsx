
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import vocabularyData from '@/lib/vocabulary.json';
import { VocabularyClient } from '../vocabulary-client';
import { notFound } from 'next/navigation';

/**
 * Información estática sobre cada lección (título y descripción).
 * La clave es el ID de la lección.
 */
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
  },
  '5': {
    title: 'Pedir Comida',
    description: 'Navega por el menú de un restaurante en quechua.',
  },
  '6': {
    title: 'Pedir Direcciones',
    description: 'Encuentra tu camino.',
  },
  '7': {
    title: 'Animales de la Granja',
    description: 'Conoce los nombres de los animales comunes.',
  },
  '8': {
    title: 'Prendas de Vestir',
    description: 'Aprende a nombrar la ropa que usas.',
  }
};

/**
 * Página de detalle de una lección específica.
 * Muestra el título, descripción y vocabulario de la lección.
 * @param {object} props
 * @param {object} props.params - Parámetros de la URL.
 * @param {string} props.params.id - El ID de la lección.
 */
export default function LessonDetailPage({ params }: { params: { id: string } }) {
  const lessonId = parseInt(params.id, 10);
  const infoKey = params.id as keyof typeof lessonInfo;
  
  // Si la información de la lección no existe, muestra la página 404.
  if (!lessonInfo[infoKey]) {
    notFound();
  }
  const info = lessonInfo[infoKey];
  
  // Filtra el vocabulario correspondiente a esta lección.
  const vocabulary = vocabularyData.vocabulary.filter((v) => v.lessonId === lessonId);


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
            {/* Componente de cliente para manejar la interactividad del vocabulario */}
            <VocabularyClient vocabulary={vocabulary} />
        </CardContent>
      </Card>

      {/* Navegación a la lección anterior y siguiente */}
      <div className="mt-8 flex justify-between">
        {lessonId > 1 ? (
          <Link href={`/lessons/${lessonId - 1}`}>
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" /> Lección Anterior
            </Button>
          </Link>
        ) : (
          <div></div> // Espaciador para mantener el botón de siguiente a la derecha
        )}
        {lessonId < 8 ? (
          <Link href={`/lessons/${lessonId + 1}`}>
            <Button>
              Siguiente Lección <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : <div></div>}
      </div>
    </div>
  );
}
