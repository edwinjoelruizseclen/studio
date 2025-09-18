import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { AndeanCrossIcon } from '@/components/icons/andean-cross';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const bgImage = PlaceHolderImages.find(
    (img) => img.id === 'andean-landscape'
  );

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt={bgImage.description}
          fill
          className="object-cover opacity-20"
          data-ai-hint={bgImage.imageHint}
          priority
        />
      )}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/50 via-background/80 to-background" />

      <main className="z-20 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex items-center gap-4">
          <AndeanCrossIcon className="h-16 w-16 text-primary" />
          <h1 className="text-5xl font-bold text-foreground font-headline md:text-7xl">
            Rima Quechua
          </h1>
        </div>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground font-body md:text-xl">
          Tu viaje para dominar el idioma de los Incas comienza aquí.
          Lecciones interactivas, juegos atractivos y práctica de pronunciación auténtica.
        </p>
        <Link href="/login" className="mt-10">
          <Button
            size="lg"
            className="transform text-lg font-bold text-accent-foreground shadow-lg transition-transform hover:scale-105 hover:bg-accent/90 bg-accent"
          >
            Empezar
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </main>
    </div>
  );
}
