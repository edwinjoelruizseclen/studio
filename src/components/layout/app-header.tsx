'use client';
import Link from 'next/link';
import { AndeanCrossIcon } from '@/components/icons/andean-cross';
import { SidebarTrigger } from '../ui/sidebar';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
            <SidebarTrigger className="md:hidden" />
            <Link href="/dashboard" className="flex items-center gap-2">
              <AndeanCrossIcon className="h-6 w-6 text-primary" />
              <span className="hidden font-headline text-lg font-bold md:block">Rimay App</span>
            </Link>
        </div>
      </div>
    </header>
  );
}
