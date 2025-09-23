
'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

/**
 * @typedef {object} VocabularyItem
 * @property {number} id - Identificador único del item.
 * @property {number | null} lessonId - ID de la lección a la que pertenece.
 * @property {string} quechua - La palabra en quechua.
 * @property {string} spanish - La traducción al español.
 */
type VocabularyItem = {
  id: number;
  lessonId: number | null;
  quechua: string;
  spanish: string;
};

/**
 * Componente de cliente que renderiza una lista de vocabulario
 * y maneja la reproducción de audio usando la API de Síntesis de Voz del navegador.
 * @param {object} props
 * @param {VocabularyItem[]} props.vocabulary - Array de items de vocabulario a mostrar.
 */
export function VocabularyClient({ vocabulary }: { vocabulary: VocabularyItem[] }) {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

  // Comprueba si el navegador soporta la API de Síntesis de Voz al montar el componente.
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
      toast({
        variant: 'destructive',
        title: 'Funcionalidad no soportada',
        description: 'Tu navegador no soporta la síntesis de voz.',
      });
    }
  }, [toast]);

  /**
   * Maneja la reproducción del audio de un item de vocabulario.
   * @param {VocabularyItem} item - El item de vocabulario a reproducir.
   */
  const handlePlayback = (item: VocabularyItem) => {
    if (playingId !== null || !isSupported) return;

    try {
      setPlayingId(item.id);
      
      // Crea un nuevo objeto de síntesis de voz.
      const utterance = new SpeechSynthesisUtterance(item.quechua);
      
      // Intenta encontrar una voz en español para una pronunciación fonética más precisa,
      // ya que no hay voces nativas de quechua en los navegadores.
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      utterance.lang = 'es-US'; // Lenguaje de fallback.
      
      // Se ejecuta cuando la reproducción termina.
      utterance.onend = () => {
        setPlayingId(null);
      };
      
      // Se ejecuta si hay un error.
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        toast({
          variant: 'destructive',
          title: 'Error de audio',
          description: `No se pudo reproducir el audio para "${item.quechua}".`,
        });
        setPlayingId(null);
      };

      // Inicia la reproducción.
      window.speechSynthesis.speak(utterance);

    } catch (error) {
      console.error('Error in handlePlayback:', error);
      toast({
        variant: 'destructive',
        title: 'Error inesperado',
        description: 'Ocurrió un error al intentar reproducir el audio.',
      });
      setPlayingId(null);
    }
  };
  
  return (
    <div className="space-y-4">
      {vocabulary.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-md bg-background p-3 hover:bg-accent/10"
        >
          <div>
            <p className="text-lg font-semibold">{item.quechua}</p>
            <p className="text-muted-foreground">{item.spanish}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => handlePlayback(item)}
            disabled={playingId !== null || !isSupported}
            aria-label={`Escuchar ${item.quechua}`}
          >
            {playingId === item.id ? (
                <Loader2 className="h-6 w-6 animate-spin" />
            ) : (
                <Volume2 className="h-6 w-6" />
            )}
          </Button>
        </div>
      ))}
    </div>
  );
}
