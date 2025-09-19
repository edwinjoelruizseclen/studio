'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type VocabularyItem = {
  id: number;
  lessonId: number | null;
  quechua: string;
  spanish: string;
  audioSrc: string;
};

export function VocabularyClient({ vocabulary }: { vocabulary: VocabularyItem[] }) {
  const [playingId, setPlayingId] = useState<number | null>(null);
  const { toast } = useToast();

  const handlePlayback = (item: VocabularyItem) => {
    if (playingId !== null) return;

    setPlayingId(item.id);
    const audio = new Audio(item.audioSrc);
    
    audio.onerror = () => {
      toast({
        variant: 'destructive',
        title: 'Error de audio',
        description: `No se pudo encontrar o reproducir el archivo de audio para "${item.quechua}".`,
      });
      setPlayingId(null);
    };

    audio.onended = () => {
      setPlayingId(null);
    };
    
    audio.play();
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
            disabled={playingId !== null}
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
