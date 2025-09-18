'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import AppHeader from '@/components/layout/app-header';
import BottomNav from '@/components/layout/bottom-nav';
import { Loader2 } from 'lucide-react';
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
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(isMobile ? false : true);

  useEffect(() => {
    if (!loading && !user) {
      router.replace(`/`);
    }
  }, [user, loading, router, pathname]);
  
  useEffect(() => {
    setOpen(!isMobile);
  }, [isMobile]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  
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
