'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { getAudio } from './actions';
import { useToast } from '@/hooks/use-toast';

type VocabularyItem = {
  id: number;
  lessonId: number | null;
  quechua: string;
  spanish: string;
};

export function VocabularyClient({ vocabulary }: { vocabulary: VocabularyItem[] }) {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const { toast } = useToast();

  const handlePlayback = async (item: VocabularyItem) => {
    if (playingId === item.id) return;
    
    let audio: HTMLAudioElement | null = null;
    try {
      setPlayingId(item.id);
      const audioDataUri = await getAudio(item.quechua);
      
      if (!audioDataUri) {
        throw new Error('No se recibió audio.');
      }
      
      audio = new Audio(audioDataUri);
      audio.play();

      audio.onended = () => {
        setPlayingId(null);
      };
      
      audio.onerror = () => {
        throw new Error('Error al reproducir el audio.');
      }
      
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'No se pudo reproducir el audio.',
      });
      setPlayingId(null);
    }
  };
  
  return (
    <div className="space-y-4">
      {vocabulary.map((item) => (
        <div
          key={item.quechua}
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
            disabled={playingId !== null}
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
