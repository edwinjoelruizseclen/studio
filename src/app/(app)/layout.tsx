
'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import AppHeader from '@/components/layout/app-header';
import BottomNav from '@/components/layout/bottom-nav';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Gamepad2,
  Home,
  Mic,
} from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

/**
 * @typedef {object} NavItem
 * @property {string} href - La ruta de la página.
 * @property {string} label - El texto a mostrar para el enlace.
 * @property {React.ElementType} icon - El componente de ícono para el enlace.
 */

/**
 * Define los elementos de navegación para la barra lateral y la barra inferior.
 * @type {NavItem[]}
 */
const navItems = [
  { href: '/dashboard', label: 'Aprender', icon: Home },
  { href: '/lessons', label: 'Lecciones', icon: BookOpen },
  { href: '/games', label: 'Juegos', icon: Gamepad2 },
  { href: '/pronunciation', label: 'Práctica', icon: Mic },
];

/**
 * Layout principal para las páginas autenticadas de la aplicación.
 * Incluye la barra de navegación lateral, la cabecera y la barra de navegación inferior.
 * @param {object} props
 * @param {React.ReactNode} props.children - Los componentes hijos que se renderizarán dentro del layout.
 */
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile ? false : true);
  
  // Efecto para abrir o cerrar la barra lateral según si es vista móvil o de escritorio.
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      {/* Barra de navegación lateral para escritorio */}
      <Sidebar
        collapsible="icon"
        className="hidden border-r bg-card md:block"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.label}
                    >
                      <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      
      {/* Contenido principal de la aplicación */}
      <SidebarInset className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        {/* Barra de navegación inferior para móviles */}
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
