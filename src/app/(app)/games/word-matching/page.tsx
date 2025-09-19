
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

const wordPairs = [
  { quechua: 'Wasi', english: 'Casa' },
  { quechua: 'Allqu', english: 'Perro' },
  { quechua: 'Misi', english: 'Gato' },
  { quechua: 'Yaku', english: 'Agua' },
  { quechua: 'Inti', english: 'Sol' },
  { quechua: 'Killa', english: 'Luna' },
];

type Word = { type: 'quechua' | 'english'; text: string };

export default function WordMatchingGame() {
  const [words, setWords] = useState<Word[]>([]);
  const [selected, setSelected] = useState<Word[]>([]);
  const [matched, setMatched] = useState<string[]>([]);
  const [attempted, setAttempted] = useState<Word[]>([]);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const shuffleWords = useCallback(() => {
    const quechuaWords = wordPairs.map(
      (p) => ({ type: 'quechua', text: p.quechua } as Word)
    );
    const englishWords = wordPairs.map(
      (p) => ({ type: 'english', text: p.english } as Word)
    );
    const allWords = [...quechuaWords, ...englishWords];
    setWords(allWords.sort(() => Math.random() - 0.5));
    setMatched([]);
    setSelected([]);
    setAttempted([]);
  }, []);

  useEffect(() => {
    shuffleWords();
  }, [shuffleWords]);

  const isFinished = matched.length === wordPairs.length * 2;

  useEffect(() => {
    setProgress((matched.length / (wordPairs.length * 2)) * 100);
    
    async function handleGameFinish() {
      if (isFinished) {
          try {
            // Lesson 2 is the word matching game
            await updateLocalUserProgress(2, 100); 
            toast({
              title: '¡Lección completada!',
              description: 'Tu progreso ha sido guardado en este dispositivo.',
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

  }, [matched, isFinished, toast]);

  useEffect(() => {
    if (selected.length === 2) {
      setAttempted(selected);
      const [first, second] = selected;
      const pair = wordPairs.find(
        (p) =>
          (p.quechua === first.text && p.english === second.text) ||
          (p.english === first.text && p.quechua === second.text)
      );

      if (pair) {
        setTimeout(() => {
          setMatched((prev) => [...prev, pair.quechua, pair.english]);
          setSelected([]);
          setAttempted([]);
        }, 500);
      } else {
        setTimeout(() => {
          setSelected([]);
          setAttempted([]);
        }, 800);
      }
    }
  }, [selected]);

  const handleWordClick = (word: Word) => {
    if (
      selected.length < 2 &&
      !selected.some((s) => s.text === word.text) &&
      !matched.includes(word.text)
    ) {
      setSelected((prev) => [...prev, word]);
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <Link
          href="/games"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
        <h1 className="mb-2 text-center font-headline text-3xl font-bold">
          Emparejar Palabras
        </h1>
        <p className="mb-4 text-center text-muted-foreground">
          Une la palabra en quechua con su traducción en español.
        </p>
        <Progress value={progress} className="mb-6 h-2" />
      </div>

      {isFinished ? (
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h2 className="text-2xl font-bold">¡Felicidades!</h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            ¡Has unido todas las palabras y completado una lección!
          </p>
          <Button onClick={shuffleWords}>
            <Shuffle className="mr-2 h-4 w-4" />
            Jugar de Nuevo
          </Button>
        </Card>
      ) : (
        <div className="grid w-full max-w-2xl grid-cols-2 gap-4 md:grid-cols-3">
          {words.map((word, i) => {
            const isSelected = selected.some((s) => s.text === word.text);
            const isMatched = matched.includes(word.text);
            const isWrong =
              attempted.some((a) => a.text === word.text) && !isMatched;

            return (
              <Button
                key={`${word.text}-${i}`}
                variant="outline"
                onClick={() => handleWordClick(word)}
                disabled={isMatched || selected.length === 2}
                className={cn(
                  'h-20 text-lg font-semibold transition-all duration-300',
                  isSelected &&
                    'border-primary bg-primary/80 text-primary-foreground',
                  isMatched &&
                    'border-dashed bg-muted text-muted-foreground opacity-60 line-through',
                  isWrong &&
                    'animate-shake border-destructive bg-destructive/80 text-destructive-foreground'
                )}
              >
                {word.text}
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
}
