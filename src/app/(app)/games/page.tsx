
'use client';
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
  Shuffle,
} from 'lucide-react';
import vocabularyData from '@/lib/vocabulary.json';

/**
 * @typedef {object} Game
 * @property {string} slug - Identificador único del juego para la URL.
 * @property {string} title - Título del juego.
 * @property {string} description - Descripción breve del juego.
 * @property {React.ElementType} icon - Componente de ícono para el juego.
 * @property {number} minLesson - La lección mínima a partir de la cual este juego está disponible.
 */

/**
 * Array que define los juegos disponibles en la aplicación.
 * @type {Game[]}
 */
const games = [
  {
    slug: 'word-matching',
    title: 'Emparejar Palabras',
    description: 'Une palabras en quechua con sus traducciones.',
    icon: AlignHorizontalDistributeCenter,
    minLesson: 1,
  },
  {
    slug: 'fill-in-the-blanks',
    title: 'Rellena los Huecos',
    description: 'Completa oraciones eligiendo la palabra correcta.',
    icon: Puzzle,
    minLesson: 3,
  },
  {
    slug: 'memory',
    title: 'Memoria',
    description: 'Encuentra pares de palabras.',
    icon: MemoryStick,
    minLesson: 4,
  },
  {
    slug: 'scramble',
    title: 'Palabra Revuelta',
    description: 'Ordena las letras para formar la palabra correcta.',
    icon: Shuffle,
    minLesson: 1,
  },
];

/**
 * Obtiene las lecciones únicas que tienen vocabulario asociado.
 * Esto se usa para generar la lista de juegos por lección.
 */
const lessonsWithVocabulary = Array.from(new Set(vocabularyData.vocabulary.map(v => v.lessonId).filter(id => id !== null)))
  .map(id => {
      // Solución temporal para obtener los títulos de las lecciones.
      // Idealmente, esto vendría de un archivo de lecciones dedicado.
      if (id === 1) return {id, title: 'Lección 1: Saludos y Presentaciones'};
      if (id === 2) return {id, title: 'Lección 2: Frases Comunes'};
      if (id === 3) return {id, title: 'Lección 3: Números y Colores'};
      if (id === 4) return {id, title: 'Lección 4: Miembros de la Familia'};
      if (id === 5) return {id, title: 'Lección 5: Pedir Comida'};
      if (id === 6) return {id, title: 'Lección 6: Pedir Direcciones'};
      if (id === 7) return {id, title: 'Lección 7: Animales de la Granja'};
      if (id === 8) return {id, title: 'Lección 8: Prendas de Vestir'};
      return {id, title: `Lección ${id}`};
  })
  .sort((a,b) => a.id - b.id);


/**
 * Página que muestra una lista de todos los mini-juegos disponibles,
 * agrupados por lección.
 */
export default function GamesPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="font-headline text-3xl font-bold">Mini-Juegos</h1>
        <p className="text-muted-foreground">
          ¡Practica tu vocabulario de una forma divertida y atractiva!
        </p>
      </div>
      <div className="mx-auto grid max-w-4xl gap-8">
        {/* Itera sobre cada lección que tiene vocabulario */}
        {lessonsWithVocabulary.map((lesson) => (
          <div key={lesson.id}>
            <h2 className="mb-4 font-headline text-2xl font-bold">{lesson.title}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Filtra y muestra los juegos disponibles para el nivel de la lección */}
              {games.filter(g => lesson.id >= g.minLesson).map((game) => (
                <Card
                  key={game.slug}
                  className="transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link
                    href={`/games/${game.slug}/${lesson.id}`}
                    className='block h-full'
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
