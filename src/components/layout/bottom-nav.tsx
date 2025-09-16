'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Gamepad2, Mic, MessageSquareQuote } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', label: 'Learn', icon: BookOpen },
  { href: '/games', label: 'Games', icon: Gamepad2 },
  { href: '/pronunciation', label: 'Practice', icon: Mic },
  { href: '/translate', label: 'Translator', icon: MessageSquareQuote },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card md:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
