import Link from 'next/link';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlignHorizontalDistributeCenter,
  MemoryStick,
  Puzzle,
} from 'lucide-react';

const games = [
  {
    title: 'Emparejar Palabras',
    description: 'Une palabras en quechua con sus traducciones.',
    href: '/games/word-matching',
    icon: AlignHorizontalDistributeCenter,
    status: 'Disponible',
  },
  {
    title: 'Rellena los Huecos',
    description: 'Completa oraciones eligiendo la palabra correcta.',
    href: '#',
    icon: Puzzle,
    status: 'Próximamente',
  },
  {
    title: 'Memoria',
    description: 'Encuentra pares de palabras e imágenes.',
    href: '#',
    icon: MemoryStick,
    status: 'Próximamente',
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold">Mini-Juegos</h1>
        <p className="text-muted-foreground">
          ¡Practica tu vocabulario de una forma divertida y atractiva!
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card
            key={game.title}
            className={
              game.status === 'Próximamente'
                ? 'opacity-50'
                : 'transition-all hover:-translate-y-1 hover:shadow-lg'
            }
          >
            <Link
              href={game.href}
              className={
                game.status === 'Próximamente'
                  ? 'pointer-events-none'
                  : 'block h-full'
              }
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle>{game.title}</CardTitle>
                  <game.icon className="h-6 w-6 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {game.description}
                </p>
                {game.status === 'Próximamente' && (
                  <div className="mt-4 text-xs font-semibold text-accent">
                    {game.status}
                  </div>
                )}
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
