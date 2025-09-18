
'use client';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  Gamepad2,
  Mic,
  MessageSquareQuote,
  ArrowRight,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const mainFeatures = [
  {
    title: 'Lecciones',
    description: 'Gramática y vocabulario paso a paso.',
    href: '/lessons',
    icon: BookOpen,
  },
  {
    title: 'Juegos',
    description: 'Practica con juegos divertidos.',
    href: '/games',
    icon: Gamepad2,
  },
  {
    title: 'Práctica',
    description: 'Mejora tu pronunciación.',
    href: '/pronunciation',
    icon: Mic,
  },
  {
    title: 'Traductor IA',
    description: 'Traducciones según el dialecto.',
    href: '/translate',
    icon: MessageSquareQuote,
  },
];

const initialLessons = [
  { id: 1, title: 'Lección 1: Saludos y Presentaciones', progress: 0 },
  { id: 2, title: 'Lección 2: Frases Comunes', progress: 0 },
  { id: 3, title: 'Lección 3: Números y Colores', progress: 0 },
];

export default function DashboardPage() {
  const [lessons, setLessons] = useState(initialLessons);

  useEffect(() => {
    const savedProgress = localStorage.getItem('lessonProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      const updatedLessons = initialLessons.map((lesson) => ({
        ...lesson,
        progress: progress[lesson.id] || lesson.progress,
      }));
      setLessons(updatedLessons);
    } else {
       // On first load, set some default progress for demonstration
      const defaultProgress = { 1: 100, 2: 60 };
      localStorage.setItem('lessonProgress', JSON.stringify(defaultProgress));
      const updatedLessons = initialLessons.map((lesson) => ({
        ...lesson,
        progress: defaultProgress[lesson.id] || lesson.progress,
      }));
      setLessons(updatedLessons);
    }
  }, []);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Tu Ruta de Aprendizaje</h1>
        <p className="text-muted-foreground">
          Continúa tu viaje para dominar el quechua.
        </p>
      </div>

      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mainFeatures.map((feature) => (
          <Link key={feature.title} href={feature.href} className="block">
            <Card className="h-full transition-all hover:shadow-lg hover:bg-card/90">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-semibold">
                  {feature.title}
                </CardTitle>
                <feature.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <h2 className="mb-4 font-headline text-2xl font-bold">Lecciones Actuales</h2>
      <div className="space-y-4">
        {lessons.slice(0, 3).map((lesson) => (
          <Card
            key={lesson.id}
            className="transform transition-transform hover:-translate-y-1"
          >
            <Link href={`/lessons/${lesson.id}`} className="block">
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h3 className="font-semibold">{lesson.title}</h3>
                  <div className="mt-2 flex items-center gap-3">
                    <Progress
                      value={lesson.progress}
                      className="h-2 w-40 md:w-56"
                    />
                    <span className="text-sm font-medium text-muted-foreground">
                      {lesson.progress}%
                    </span>
                  </div>
                </div>
                <div className="rounded-md p-2 hover:bg-accent/50">
                  <ArrowRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
