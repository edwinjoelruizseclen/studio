import { AndeanCrossIcon } from '@/components/icons/andean-cross';
import Link from 'next/link';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute top-4 left-4">
        <Link href="/" className="flex items-center gap-2 text-foreground">
          <AndeanCrossIcon className="h-6 w-6 text-primary" />
          <span className="font-headline text-lg font-bold">Rima Quechua</span>
        </Link>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
