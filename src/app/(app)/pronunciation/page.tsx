import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Volume2, Mic, Pause, Play } from 'lucide-react';

const phrases = [
  { id: 1, quechua: 'Allinllachu?', english: 'Hello, how are you?' },
  { id: 2, quechua: 'Tupananchiskama', english: 'Goodbye' },
  { id: 3, quechua: 'Sulpayki', english: 'Thank you' },
  { id: 4, quechua: 'Ari', english: 'Yes' },
  { id: 5, quechua: 'Manam', english: 'No' },
  { id: 6, quechua: 'Yaku, panay', english: 'Water, please' },
];

function PronunciationCard({ phrase }: { phrase: (typeof phrases)[0] }) {
  const isPlaying = false;
  const isRecording = false;

  return (
    <Card className="p-4">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xl font-semibold">{phrase.quechua}</p>
          <p className="text-muted-foreground">{phrase.english}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Listen to native pronunciation"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
          <Button
            variant={isRecording ? 'destructive' : 'secondary'}
            size="icon"
            aria-label={isRecording ? 'Stop recording' : 'Start recording'}
          >
            <Mic className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" disabled aria-label="Play your recording">
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function PronunciationPage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <h1 className="font-headline text-3xl font-bold">
          Pronunciation Practice
        </h1>
        <p className="text-muted-foreground">
          Listen to native speakers, record yourself, and compare to perfect
          your accent.
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
