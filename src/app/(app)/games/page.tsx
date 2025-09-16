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
    title: 'Word Matching',
    description: 'Match Quechua words to their English translations.',
    href: '/games/word-matching',
    icon: AlignHorizontalDistributeCenter,
    status: 'Available',
  },
  {
    title: 'Fill in the Blanks',
    description: 'Complete sentences by choosing the correct word.',
    href: '#',
    icon: Puzzle,
    status: 'Coming Soon',
  },
  {
    title: 'Memory',
    description: 'Find matching pairs of words and images.',
    href: '#',
    icon: MemoryStick,
    status: 'Coming Soon',
  },
];

export default function GamesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold">Mini-Games</h1>
        <p className="text-muted-foreground">
          Practice your vocabulary in a fun and engaging way!
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card
            key={game.title}
            className={
              game.status === 'Coming Soon'
                ? 'opacity-50'
                : 'transition-all hover:-translate-y-1 hover:shadow-lg'
            }
          >
            <Link
              href={game.href}
              className={
                game.status === 'Coming Soon'
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
                {game.status === 'Coming Soon' && (
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
