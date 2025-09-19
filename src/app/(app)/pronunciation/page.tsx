'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, Pause, Play, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import vocabularyData from '@/lib/vocabulary.json';
import { getAudio } from '../lessons/actions';


const phrases = vocabularyData.vocabulary
  .sort((a, b) => a.id - b.id);


function PronunciationCard({ phrase }: { phrase: (typeof phrases)[0] }) {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleNativePlayback = async () => {
    // Don't play if something is already happening
    if (isSynthesizing || isRecording || isPlaying) return;
    
    try {
      setIsSynthesizing(true);
      const audioDataUri = await getAudio(phrase.quechua);
      if (!audioDataUri) {
        throw new Error('No se pudo generar el audio.');
      }
      
      const audio = new Audio(audioDataUri);
      nativeAudioRef.current = audio;
      audio.play();

      audio.onended = () => setIsSynthesizing(false);
      audio.onerror = () => {
        setIsSynthesizing(false);
        toast({ variant: 'destructive', title: 'Error', description: 'No se pudo reproducir el audio.' });
      };

    } catch (error: any) {
        setIsSynthesizing(false);
        toast({ variant: 'destructive', title: 'Error', description: error.message || 'No se pudo reproducir el audio.' });
    }
  };


  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    // Stop any other audio before recording
    if (nativeAudioRef.current) nativeAudioRef.current.pause();
    if (audioRef.current) audioRef.current.pause();
    setIsPlaying(false);
    setIsSynthesizing(false);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      toast({
        variant: 'destructive',
        title: 'Error de Micrófono',
        description: 'No se pudo acceder al micrófono. Asegúrate de haber dado permiso.',
      });
    }
  };
  
  const handleUserPlayback = () => {
    if (audioRef.current) {
        if(isPlaying) {
            audioRef.current.pause(); // onpause event will set isPlaying to false
        } else {
            audioRef.current.currentTime = 0;
            audioRef.current.play(); // onplay event will set isPlaying to true
        }
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlaying(true);
      audio.onpause = () => setIsPlaying(false);
      audio.onended = () => setIsPlaying(false);
      audioRef.current = audio;
    }
    
    return () => {
        // Cleanup function
        if (audioRef.current) {
            URL.revokeObjectURL(audioRef.current.src);
        }
        if (nativeAudioRef.current) {
            nativeAudioRef.current.pause();
        }
    };
  }, [audioUrl]);
  

  return (
    <Card className="p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xl font-semibold">{phrase.quechua}</p>
          <p className="text-muted-foreground">{phrase.spanish}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Escuchar pronunciación nativa"
            onClick={handleNativePlayback}
            disabled={isSynthesizing || isRecording || isPlaying}
          >
             {isSynthesizing ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            size="icon"
            aria-label={isRecording ? 'Detener grabación' : 'Empezar a grabar'}
            onClick={handleRecord}
            disabled={isSynthesizing || isPlaying}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            disabled={!audioUrl || isRecording || isSynthesizing} 
            aria-label="Reproducir tu grabación"
            onClick={handleUserPlayback}
            >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className={cn("h-5 w-5", !audioUrl && "text-muted-foreground")} />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function PronunciationPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
       <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold">
          Práctica de Pronunciación
        </h1>
        <p className="text-muted-foreground">
          Escucha una pronunciación de alta calidad, grábate y compara para perfeccionar
          tu acento.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-4">
        {phrases.map((phrase) => (
          <PronunciationCard key={phrase.id} phrase={phrase} />
        ))}
      </div>
    </div>
  );
}
