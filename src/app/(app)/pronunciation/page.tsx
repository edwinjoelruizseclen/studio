'use client';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, Pause, Play, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import vocabularyData from '@/lib/vocabulary.json';

const phrases = vocabularyData.vocabulary.map(item => ({
  ...item,
  audioSrc: `/audio/${item.quechua.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s/g, '_')}.mp3`
})).sort((a, b) => a.id - b.id);


function PronunciationCard({ phrase }: { phrase: (typeof phrases)[0] }) {
  const { toast } = useToast();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isPlayingNativeAudio, setIsPlayingNativeAudio] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const userAudioRef = useRef<HTMLAudioElement | null>(null);
  const nativeAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleNativePlayback = () => {
    if (isPlayingNativeAudio || isRecording || isPlayingUserAudio) return;

    const audio = nativeAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play();
    }
  };

  useEffect(() => {
    // Pre-load native audio
    const audio = new Audio(phrase.audioSrc);
    audio.onplay = () => setIsPlayingNativeAudio(true);
    audio.onpause = () => setIsPlayingNativeAudio(false);
    audio.onended = () => setIsPlayingNativeAudio(false);
    audio.onerror = () => {
      toast({ variant: 'destructive', title: 'Error de Audio', description: 'No se pudo cargar el audio nativo.' });
      setIsPlayingNativeAudio(false);
    };
    nativeAudioRef.current = audio;

    return () => {
      audio.pause();
      nativeAudioRef.current = null;
    }
  }, [phrase.audioSrc, toast]);


  const handleRecord = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (nativeAudioRef.current) nativeAudioRef.current.pause();
    if (userAudioRef.current) userAudioRef.current.pause();
    setIsPlayingUserAudio(false);
    setIsPlayingNativeAudio(false);

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
    if (userAudioRef.current) {
        if(isPlayingUserAudio) {
            userAudioRef.current.pause();
        } else {
            userAudioRef.current.currentTime = 0;
            userAudioRef.current.play();
        }
    }
  };

  useEffect(() => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.onplay = () => setIsPlayingUserAudio(true);
      audio.onpause = () => setIsPlayingUserAudio(false);
      audio.onended = () => setIsPlayingUserAudio(false);
      userAudioRef.current = audio;
    }
    
    return () => {
        if (userAudioRef.current) {
            URL.revokeObjectURL(userAudioRef.current.src);
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
            disabled={isPlayingNativeAudio || isRecording || isPlayingUserAudio}
          >
             {isPlayingNativeAudio ? <Loader2 className="h-5 w-5 animate-spin" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            size="icon"
            aria-label={isRecording ? 'Detener grabación' : 'Empezar a grabar'}
            onClick={handleRecord}
            disabled={isPlayingNativeAudio || isPlayingUserAudio}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            disabled={!audioUrl || isRecording || isPlayingNativeAudio} 
            aria-label="Reproducir tu grabación"
            onClick={handleUserPlayback}
            >
            {isPlayingUserAudio ? (
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
