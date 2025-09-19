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
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  Gamepad2,
  Home,
  MessageSquareQuote,
  Mic,
} from 'lucide-react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '/dashboard', label: 'Aprender', icon: Home },
  { href: '/lessons', label: 'Lecciones', icon: BookOpen },
  { href: '/games', label: 'Juegos', icon: Gamepad2 },
  { href: '/pronunciation', label: 'Práctica', icon: Mic },
  { href: '/translate', label: 'Traductor', icon: MessageSquareQuote },
];

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile ? false : true);
  
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);
  
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
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
                    <Link href={item.href} legacyBehavior passHref>
                      <SidebarMenuButton
                        isActive={isActive}
                        tooltip={item.label}
                      >
                        <item.icon />
                        <span>{item.label}</span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 pb-20 md:pb-0">{children}</main>
        <BottomNav />
      </SidebarInset>
    </SidebarProvider>
  );
}
