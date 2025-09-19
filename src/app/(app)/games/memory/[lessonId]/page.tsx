
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Shuffle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { updateLocalUserProgress } from '@/lib/user-progress';
import { useToast } from '@/hooks/use-toast';
import vocabularyData from '@/lib/vocabulary.json';

type CardInfo = {
  id: number;
  type: 'quechua' | 'spanish';
  text: string;
  pairId: number;
};

export default function MemoryGame({ params }: { params: { lessonId: string } }) {
  const lessonId = parseInt(params.lessonId, 10);
  const [pairs, setPairs] = useState(() => vocabularyData.vocabulary
    .filter((v) => v.lessonId === lessonId)
    .map(({ quechua, spanish }) => ({ quechua, spanish }))
  );
  
  const [cards, setCards] = useState<CardInfo[]>([]);
  const [flipped, setFlipped] = useState<CardInfo[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const createDeck = useCallback(() => {
    if (pairs.length === 0) return;
    const deck = pairs.flatMap((pair, index) => [
      { id: index * 2, type: 'quechua', text: pair.quechua, pairId: index },
      { id: index * 2 + 1, type: 'spanish', text: pair.spanish, pairId: index },
    ]);
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlipped([]);
    setMatched([]);
  }, [pairs]);

  useEffect(() => {
    createDeck();
  }, [createDeck]);
  
  const isFinished = matched.length === pairs.length && pairs.length > 0;

  useEffect(() => {
    if (pairs.length > 0) {
      setProgress((matched.length / pairs.length) * 100);
    }

    async function handleGameFinish() {
      if (isFinished) {
          try {
            await updateLocalUserProgress(lessonId, 100); 
            toast({
              title: '¡Lección completada!',
              description: `Has dominado el juego de memoria para la lección ${lessonId}.`,
            });
          } catch (error) {
            console.error('Failed to update progress', error);
            toast({
              variant: 'destructive',
              title: 'Error',
              description: 'No se pudo guardar tu progreso.',
            });
          }
      }
    }
    handleGameFinish();

  }, [matched, isFinished, toast, lessonId, pairs.length]);

  useEffect(() => {
    if (flipped.length === 2) {
      const [first, second] = flipped;
      if (first.pairId === second.pairId) {
        setMatched((prev) => [...prev, first.pairId]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  }, [flipped]);

  const handleCardClick = (card: CardInfo) => {
    if (flipped.length < 2 && !flipped.includes(card) && !matched.includes(card.pairId)) {
      setFlipped((prev) => [...prev, card]);
    }
  };

  if (pairs.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-bold">Juego no disponible</h2>
            <p className="mt-2 mb-6 text-muted-foreground">
                No hay vocabulario para el juego de memoria en esta lección.
            </p>
            <Link href="/games">
                <Button variant="outline">Volver a Juegos</Button>
            </Link>
        </div>
      </div>
    )
  }


  return (
    <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <Link href="/games" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
        <h1 className="mb-2 text-center font-headline text-3xl font-bold">Juego de Memoria</h1>
        <p className="mb-4 text-center text-muted-foreground">Lección {lessonId}: Encuentra los pares de palabras.</p>
        <Progress value={progress} className="mb-6 h-2" />
      </div>

      {isFinished ? (
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h2 className="text-2xl font-bold">¡Excelente Memoria!</h2>
          <p className="mt-2 mb-6 text-muted-foreground">¡Has encontrado todos los pares y completado una lección!</p>
          <Button onClick={createDeck}>
            <Shuffle className="mr-2 h-4 w-4" />
            Jugar de Nuevo
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
          {cards.map((card) => {
            const isFlipped = flipped.some(f => f.id === card.id);
            const isMatched = matched.includes(card.pairId);
            const showCard = isFlipped || isMatched;

            return (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={cn(
                  'flex h-24 w-24 cursor-pointer items-center justify-center p-2 text-center transition-transform duration-300',
                  showCard ? 'bg-card' : 'bg-primary/20',
                  isMatched ? 'opacity-50' : 'hover:scale-105'
                )}
                style={{ transformStyle: 'preserve-3d', transform: showCard ? 'rotateY(180deg)' : '' }}
              >
                <div 
                  className="absolute h-full w-full flex items-center justify-center p-2 font-semibold"
                  style={{ backfaceVisibility: 'hidden', transform: showCard ? 'rotateY(180deg)' : '' }}
                >
                  {showCard ? card.text : ''}
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
