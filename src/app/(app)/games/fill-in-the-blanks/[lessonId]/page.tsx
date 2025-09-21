
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
import { useParams } from 'next/navigation';

/**
 * @typedef {object} Question
 * @property {number} lessonId - ID de la lección a la que pertenece la pregunta.
 * @property {string} sentence - La oración con un espacio en blanco (`__`).
 * @property {string[]} options - Las posibles respuestas para el espacio en blanco.
 * @property {string} answer - La respuesta correcta.
 * @property {string} translation - La traducción al español de la oración completa.
 */

/**
 * Array con todas las preguntas para el juego de rellenar huecos.
 * @type {Question[]}
 */
const allQuestions = [
  {
    lessonId: 3,
    sentence: 'Hatun __ puka wasi kani.',
    options: ['allqu', 'misi', 'wasi'],
    answer: 'wasi',
    translation: 'Tengo una casa roja y grande.',
  },
  {
    lessonId: 3,
    sentence: 'Payqa __ mikun.',
    options: ['yaku', 'tanta', 'killa'],
    answer: 'tanta',
    translation: 'Él/Ella come pan.',
  },
  {
    lessonId: 3,
    sentence: 'Ñuqa yachaywasiman __.',
    options: ['purini', 'pukllani', 'rini'],
    answer: 'rini',
    translation: 'Yo voy a la escuela.',
  },
  {
    lessonId: 3,
    sentence: 'Qamqa __ munanki.',
    options: ['yaku', 'inti', 'ñan'],
    answer: 'yaku',
    translation: 'Tú quieres agua.',
  },
  {
    lessonId: 3,
    sentence: '__ inti llunshin.',
    options: ['Chisi', 'Pacha', 'Punchaw'],
    answer: 'Punchaw',
    translation: 'El sol brilla durante el día.',
  },
];

/**
 * Componente para el juego "Rellena los Huecos".
 * El usuario debe elegir la palabra correcta para completar una oración.
 */
export default function FillInTheBlanksGame() {
  const params = useParams();
  const lessonId = parseInt(params.lessonId as string, 10);
  
  // Filtra las preguntas para la lección actual.
  const [questions, setQuestions] = useState(() => allQuestions.filter(q => q.lessonId === lessonId));
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const { toast } = useToast();

  const progress = questions.length > 0 ? (currentQuestionIndex / questions.length) * 100 : 0;
  const isFinished = currentQuestionIndex === questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  /**
   * Maneja el clic en una opción de respuesta.
   * @param {string} option - La opción seleccionada por el usuario.
   */
  const handleOptionClick = (option: string) => {
    if (showFeedback) return;

    setSelectedOption(option);
    setShowFeedback(true);

    if (option === currentQuestion.answer) {
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
      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
    }
  }, [currentQuestionIndex, questions.length]);
  
  /**
   * Reinicia el juego al estado inicial.
   */
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setCorrectAnswers(0);
    setShowFeedback(false);
  }

  // Efecto que se ejecuta cuando el juego termina para guardar el progreso.
  useEffect(() => {
    /**
     * Si el juego ha finalizado, actualiza el progreso del usuario al 100%
     * para esta lección y muestra una notificación.
     */
    async function handleGameFinish() {
      if (isFinished && questions.length > 0) {
          try {
            await updateLocalUserProgress(lessonId, 100); 
            toast({
              title: '¡Lección completada!',
              description: `Has dominado "Rellena los Huecos" para la lección ${lessonId}.`,
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

  // Si no hay preguntas para esta lección, muestra un mensaje.
  if (questions.length === 0) {
    return (
      <div className="container mx-auto flex flex-col items-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-md text-center">
            <h2 className="text-2xl font-bold">Juego no disponible</h2>
            <p className="mt-2 mb-6 text-muted-foreground">
                No hay preguntas de "Rellena los Huecos" para esta lección.
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
        <Link
          href="/games"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a Juegos
        </Link>
        <h1 className="mb-2 text-center font-headline text-3xl font-bold">
          Rellena los Huecos
        </h1>
        <p className="mb-4 text-center text-muted-foreground">
          Lección {lessonId}: Elige la palabra correcta para completar la oración.
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
          <p className="mb-8 text-center text-2xl font-semibold">
            {currentQuestion.sentence.replace('__', '____')}
          </p>
          <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option) => (
              <Button
                key={option}
                variant="outline"
                className={cn('h-14 w-full text-lg', {
                  'border-primary bg-primary/10 text-primary-foreground': selectedOption === option && isCorrect === true,
                  'border-destructive bg-destructive/10 text-destructive-foreground': selectedOption === option && isCorrect === false,
                  'pointer-events-none': showFeedback,
                })}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>

          {/* Feedback después de responder */}
          {showFeedback && (
            <div
              className={cn(
                'mt-6 rounded-lg p-4 text-center text-lg font-semibold',
                isCorrect ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
              )}
            >
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
                {currentQuestion.translation}
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
