
'use client';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const lessonCategoriesData = [
  {
    category: 'Módulo Principiante',
    lessons: [
      {
        id: 1,
        title: 'Saludos y Presentaciones',
        progress: 0,
        description: 'Aprende a saludar y presentarte.',
      },
      {
        id: 2,
        title: 'Frases Comunes',
        progress: 0,
        description: 'Frases esenciales para la conversación diaria.',
      },
      {
        id: 3,
        title: 'Números y Colores',
        progress: 0,
        description: 'Domina contar y describir cosas con colores.',
      },
      {
        id: 4,
        title: 'Miembros de la Familia',
        progress: 0,
        description: 'Habla sobre tu familia.',
      },
    ],
  },
  {
    category: 'Módulo Intermedio',
    lessons: [
      {
        id: 5,
        title: 'Pedir Comida',
        progress: 0,
        description: 'Navega por el menú de un restaurante en quechua.',
      },
      {
        id: 6,
        title: 'Pedir Direcciones',
        progress: 0,
        description: 'Encuentra tu camino.',
      },
    ],
  },
];

export default function LessonsPage() {
  const [lessonCategories, setLessonCategories] = useState(lessonCategoriesData);

  useEffect(() => {
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const updatedCategories = lessonCategoriesData.map((category) => ({
        ...category,
        lessons: category.lessons.map((lesson) => ({
          ...lesson,
          progress: progress[lesson.id] || lesson.progress,
        })),
      }));
      setLessonCategories(updatedCategories);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="mb-6 font-headline text-3xl font-bold">Todas las Lecciones</h1>
      <div className="space-y-8">
        {lessonCategories.map((category) => (
          <div key={category.category}>
            <h2 className="mb-4 font-headline text-2xl font-bold">
              {category.category}
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              {category.lessons.map((lesson) => (
                <Card
                  key={lesson.id}
                  className="transform transition-transform hover:-translate-y-1"
                >
                  <Link href={`/lessons/${lesson.id}`} className="block h-full">
                    <CardContent className="flex h-full flex-col justify-between p-4">
                      <div>
                        <h3 className="text-lg font-semibold">{lesson.title}</h3>
                        <p className="mt-1 mb-3 text-sm text-muted-foreground">
                          {lesson.description}
                        </p>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Progress
                            value={lesson.progress}
                            className="h-2 w-32"
                          />
                          <span className="text-xs font-medium text-muted-foreground">
                            {lesson.progress}%
                          </span>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
