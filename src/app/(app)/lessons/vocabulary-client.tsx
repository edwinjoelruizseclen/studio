'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VocabularyItem = {
  id: number;
  lessonId: number | null;
  quechua: string;
  spanish: string;
};

export function VocabularyClient({ vocabulary }: { vocabulary: VocabularyItem[] }) {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const { toast } = useToast();

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

  const handlePlayback = (item: VocabularyItem) => {
    if (playingId !== null || !isSupported) return;

    try {
      setPlayingId(item.id);
      
      const utterance = new SpeechSynthesisUtterance(item.quechua);
      
      // Attempt to find a Spanish voice for better phonetic pronunciation
      const voices = window.speechSynthesis.getVoices();
      const spanishVoice = voices.find(voice => voice.lang.startsWith('es'));
      if (spanishVoice) {
        utterance.voice = spanishVoice;
      }
      utterance.lang = 'es-US'; // Fallback language
      
      utterance.onend = () => {
        setPlayingId(null);
      };
      
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        toast({
          variant: 'destructive',
          title: 'Error de audio',
          description: `No se pudo reproducir el audio para "${item.quechua}".`,
        });
        setPlayingId(null);
      };

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
