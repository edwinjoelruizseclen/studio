
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Gamepad2,
  Mic,
  Home,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @typedef {object} NavItem
 * @property {string} href - La ruta de la página.
 * @property {string} label - El texto a mostrar para el enlace.
 * @property {React.ElementType} icon - El componente de ícono para el enlace.
 */

/**
 * Define los elementos de navegación para la barra inferior.
 * @type {NavItem[]}
 */
const navItems = [
  { href: '/dashboard', label: 'Aprender', icon: Home },
  { href: '/lessons', label: 'Lecciones', icon: BookOpen },
  { href: '/games', label: 'Juegos', icon: Gamepad2 },
  { href: '/pronunciation', label: 'Práctica', icon: Mic },
];

/**
 * Componente de barra de navegación inferior que se muestra solo en dispositivos móviles.
 */
export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-card md:hidden">
      <div className="grid h-16 grid-cols-4">
        {navItems.map((item) => {
          // Determina si el enlace actual está activo.
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                isActive
                  ? 'text-primary' // Estilo para enlace activo
                  : 'text-muted-foreground hover:text-foreground' // Estilo para enlace inactivo
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
