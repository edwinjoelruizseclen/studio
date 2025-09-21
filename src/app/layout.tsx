import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';

/**
 * Metadatos de la aplicación para SEO y PWA.
 */
export const metadata: Metadata = {
  title: 'Rimay App',
  description: 'Aprende quechua con lecciones y juegos interactivos.',
  manifest: '/manifest.json',
};

/**
 * Layout raíz de la aplicación.
 * Es el componente principal que envuelve todas las páginas.
 * @param {object} props
 * @param {React.ReactNode} props.children - El contenido de la página actual.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Carga de fuentes de Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        {/* Metadatos para PWA y dispositivos móviles */}
        <meta name="application-name" content="Rimay App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Rimay App" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#FFFFFF" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#FFFFFF" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body className={cn('min-h-screen font-body antialiased')}>
        {children}
        {/* Componente para mostrar notificaciones (toasts) */}
        <Toaster />
      </body>
    </html>
  );
}
