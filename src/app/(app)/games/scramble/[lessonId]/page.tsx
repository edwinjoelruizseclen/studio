
'use client';
import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, Lightbulb, XCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { updateLocalUserProgress } from '@/lib/user-progress';
import { useToast } from '@/hooks/use-toast';
import vocabularyData from '@/lib/vocabulary.json';
import { useParams } from 'next/navigation';
import { Input } from '@/components/ui/input';

/**
 * Baraja las letras de una palabra.
 * @param {string} word - La palabra a barajar.
 * @returns {string} La palabra con sus letras en orden aleatorio.
 */
const shuffle = (word: string) => {
    const a = word.split('');
    const n = a.length;

    for (let i = n - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    const shuffled = a.join('');
    // Se asegura de que la palabra barajada no sea igual a la original.
    if(shuffled === word) return shuffle(word);
    return shuffled;
};

/**
 * Componente para el juego "Palabra Revuelta".
 * El usuario debe ordenar las letras para formar la palabra correcta en quechua.
 */
export default function ScrambleGame() {
  const params = useParams();
  const lessonId = parseInt(params.lessonId as string, 10);
  
  // Prepara las preguntas barajando las palabras del vocabulario de la lección.
  const [questions, setQuestions] = useState(() => vocabularyData.vocabulary
    .filter((v) => v.lessonId === lessonId)
    .map(({ quechua, spanish }) => ({ word: quechua, hint: spanish, scrambled: shuffle(quechua) }))
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;
  const isFinished = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  /**
   * Comprueba si la respuesta introducida por el usuario es correcta.
   */
  const handleCheck = () => {
    if (showFeedback) return;

    setShowFeedback(true);
    if (inputValue.trim().toLowerCase() === currentQuestion.word.toLowerCase()) {
      setIsCorrect(true);
      setCorrectAnswers(correctAnswers + 1);
    } else {
      setIsCorrect(false);
    }
  };

  /**
   * Avanza a la siguiente pregunta.
   */
  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setInputValue('');
      setIsCorrect(null);
      setShowFeedback(false);
    }
  }, [currentQuestionIndex, questions.length]);

  /**
   * Reinicia el juego, barajando las palabras de nuevo.
   */
  const resetGame = () => {
    setQuestions(prev => prev.map(q => ({...q, scrambled: shuffle(q.word) })));
    setCurrentQuestionIndex(0);
    setInputValue('');
    setIsCorrect(null);
    setCorrectAnswers(0);
    setShowFeedback(false);
  };
  
  // Efecto que se ejecuta al finalizar el juego para guardar el progreso.
  useEffect(() => {
    async function handleGameFinish() {
      if (isFinished && questions.length > 0) {
        try {
          await updateLocalUserProgress(lessonId, 100);
          toast({
            title: '¡Lección completada!',
            description: `Has dominado "Palabra Revuelta" para la lección ${lessonId}.`,
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
  }, [isFinished, toast, lessonId, questions.length]);

  // Si no hay vocabulario para esta lección, muestra un mensaje.
  if (questions.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md text-center">
          <h2 className="text-2xl font-bold">Juego no disponible</h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            No hay vocabulario para "Palabra Revuelta" en esta lección.
          </p>
          <Link href="/games">
            <Button variant="outline">Volver a Juegos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-2xl">
        <Link href="/games" className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
        <h1 className="mb-2 text-center font-headline text-3xl font-bold">Palabra Revuelta</h1>
        <p className="mb-4 text-center text-muted-foreground">
          Lección {lessonId}: Ordena las letras para formar la palabra correcta.
        </p>
        <Progress value={progress} className="mb-6 h-2" />
      </div>

      {isFinished ? (
        // Vista de finalización del juego
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="mx-auto mb-4 h-16 w-16 text-primary" />
          <h2 className="text-2xl font-bold">¡Juego Completado!</h2>
          <p className="mt-2 mb-6 text-muted-foreground">
            Acertaste {correctAnswers} de {questions.length} preguntas. ¡Has completado una lección!
          </p>
          <Button onClick={resetGame}>Jugar de Nuevo</Button>
        </Card>
      ) : (
        // Vista de la pregunta actual
        <Card className="w-full max-w-2xl p-6">
          <p className="mb-2 text-center text-sm text-muted-foreground">Pista: {currentQuestion.hint}</p>
          <p className="mb-8 text-center text-4xl font-bold tracking-widest">
            {currentQuestion.scrambled}
          </p>
          <div className="mx-auto flex max-w-sm flex-col items-center gap-4">
            <Input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Escribe la palabra ordenada"
              className="text-center text-lg h-12"
              disabled={showFeedback}
              onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
            />
            <Button onClick={handleCheck} disabled={showFeedback || !inputValue.trim()} className="w-full">
                Comprobar
            </Button>
          </div>

          {/* Feedback después de responder */}
          {showFeedback && (
            <div className={cn('mt-6 rounded-lg p-4 text-center text-lg font-semibold', isCorrect ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive')}>
              {isCorrect ? (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-6 w-6" /> ¡Correcto!
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <XCircle className="h-6 w-6" /> Incorrecto.
                </div>
              )}
              <p className="mt-2 text-sm font-normal text-muted-foreground">
                <Lightbulb className="mr-1 inline h-4 w-4" />
                La palabra correcta es: <span className='font-bold'>{currentQuestion.word}</span>
              </p>
              <Button className="mt-4" onClick={handleNext}>
                Continuar
              </Button>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
