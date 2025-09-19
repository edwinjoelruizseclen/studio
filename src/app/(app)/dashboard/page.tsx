
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  BookOpen,
  ArrowRight,
  Flame,
  CheckCircle,
  BarChart,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getLocalUserProgress, updateLocalUserProgress } from '@/lib/user-progress';

const initialLessons = [
  { id: 1, title: 'Lección 1: Saludos y Presentaciones', progress: 0 },
  { id: 2, title: 'Lección 2: Frases Comunes', progress: 0 },
  { id: 3, title: 'Lección 3: Números y Colores', progress: 0 },
];

export default function DashboardPage() {
  const [lessons, setLessons] = useState(initialLessons);
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [totalProgress, setTotalProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProgress() {
      setIsLoading(true);

      try {
        const progressData = await getLocalUserProgress();
        
        let completedCount = 0;
        const updatedLessons = initialLessons.map((lesson) => {
          const p = progressData[lesson.id] || lesson.progress;
          if (p === 100) {
            completedCount++;
          }
          return {
            ...lesson,
            progress: p,
          };
        });
        
        setLessons(updatedLessons);
        setLessonsCompleted(completedCount);
        const overallProgress = updatedLessons.reduce((sum, l) => sum + l.progress, 0) / updatedLessons.length;
        setTotalProgress(overallProgress);

      } catch (error) {
        console.error("Error fetching user progress:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProgress();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-headline text-3xl font-bold">Tu Ruta de Aprendizaje</h1>
        <p className="text-muted-foreground">
          Continúa tu viaje para dominar el quechua.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Progreso Total</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(totalProgress)}%</div>
            <p className="text-xs text-muted-foreground">
              Completado de todas las lecciones
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Racha</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Días</div>
            <p className="text-xs text-muted-foreground">
              ¡Sigue así para no perder tu racha!
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Lecciones Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{lessonsCompleted}</div>
            <p className="text-xs text-muted-foreground">
              Has dominado {lessonsCompleted} de {lessons.length} lecciones
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8">
        <div>
          <h2 className="mb-4 font-headline text-2xl font-bold">Lecciones Actuales</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="transform transition-transform hover:-translate-y-1"
              >
                <Link href={`/lessons/${lesson.id}`} className="block">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-4">
                       <div className="rounded-full bg-primary/10 p-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{lesson.title}</h3>
                        <div className="mt-1 flex items-center gap-3">
                          <Progress
                            value={lesson.progress}
                            className="h-2 w-32 md:w-40"
                          />
                          <span className="text-sm font-medium text-muted-foreground">
                            {lesson.progress}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-md p-2 hover:bg-accent/50">
                      <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
             <Link href="/lessons">
              <Button variant="outline" className="mt-4 w-full">
                Ver Todas las Lecciones
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
