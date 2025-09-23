# Guía Paso a Paso: Creación de Rimay App

Este documento detalla el proceso de construcción de Rimay App, una Progressive Web App (PWA) para aprender quechua a través de lecciones y juegos interactivos.

> **Nota para estudiantes:** Si no entiendes alguna palabra técnica, ¡no te preocupes! Hemos creado un **`GLOSARIO_TECNICO.md`** en el proyecto para explicarte todo de forma sencilla.

## 1. Tecnologías Utilizadas

*   **Framework**: Next.js 15 (con App Router y Turbopack)
*   **Lenguaje**: TypeScript
*   **Estilos**: Tailwind CSS
*   **Componentes UI**: ShadCN/UI
*   **Iconos**: `lucide-react`
*   **PWA**: `next-pwa`

## 2. Configuración Inicial del Proyecto

1.  **Crear la aplicación Next.js:**
    Se inicia un nuevo proyecto con la configuración básica de Next.js, TypeScript y Tailwind CSS.

    ```bash
    npx create-next-app@latest rimay-app --typescript --tailwind --eslint
    ```

2.  **Inicializar ShadCN/UI:**
    Se configura ShadCN para gestionar los componentes de la interfaz de usuario, estableciendo los alias y las rutas para los estilos.

    ```bash
    npx shadcn-ui@latest init
    ```

3.  **Instalar dependencias adicionales:**
    Se añaden las librerías necesarias para la PWA, los componentes de Radix UI (base de ShadCN) y utilidades.

    ```bash
    npm install next-pwa class-variance-authority clsx lucide-react tailwind-merge tailwindcss-animate zod @radix-ui/react-slot @radix-ui/react-progress @radix-ui/react-dialog @radix-ui/react-tooltip @radix-ui/react-separator
    ```

4.  **Configurar la PWA:**
    Se modifica `next.config.mjs` para integrar `next-pwa`, asegurando que la aplicación genere un *service worker* y pueda funcionar sin conexión. Se crea el archivo `public/manifest.json` para definir el nombre, los iconos y los colores de la PWA.

## 3. Estructura y Estilos Base

1.  **Fuentes y Estilos Globales (`src/app/globals.css`):**
    Se importa la fuente "PT Sans" desde Google Fonts y se definen las variables de color (CSS variables) para los temas claro y oscuro, siguiendo el sistema de diseño de ShadCN.

2.  **Layout Principal (`src/app/layout.tsx`):**
    Se crea la estructura HTML raíz de toda la aplicación. Aquí se configuran los metadatos para SEO y PWA, se enlaza la hoja de estilos global y se añade el `Toaster` para las notificaciones.

3.  **Página de Inicio (`src/app/page.tsx`):**
    Se diseña la landing page, que presenta la aplicación al usuario. Incluye un fondo atractivo, el logo (AndeanCrossIcon) y un botón de "Empezar" que dirige al dashboard.

## 4. Desarrollo de la Aplicación Autenticada

### a. Layout de la App (`src/app/(app)/layout.tsx`)

Se crea un layout anidado que envuelve todas las pantallas internas de la aplicación (dashboard, lecciones, juegos). Este layout incluye:
*   **`AppHeader`**: La cabecera superior.
*   **`Sidebar`**: La barra de navegación lateral para escritorio.
*   **`BottomNav`**: La barra de navegación inferior para dispositivos móviles.

### b. Dashboard (`src/app/(app)/dashboard/page.tsx`)

Es la pantalla principal que ve el usuario.
*   **Funcionalidad**: Muestra estadísticas clave del progreso del usuario, como el progreso total, las lecciones completadas y una racha (actualmente estática).
*   **Lógica Clave**: Utiliza `useEffect` para cargar el progreso guardado en `localStorage` a través de la función `getLocalUserProgress`. Muestra un estado de carga mientras se obtienen los datos.

### c. Lecciones

1.  **Listado de Lecciones (`/lessons/page.tsx`):**
    *   Muestra todas las lecciones disponibles, agrupadas por módulos (Principiante, Intermedio, Avanzado).
    *   Cada tarjeta de lección muestra su título, descripción y una barra de progreso que se actualiza según los datos de `localStorage`.

2.  **Detalle de Lección (`/lessons/[id]/page.tsx`):**
    *   Es una página dinámica que muestra el contenido de una lección específica según su ID.
    *   Presenta el vocabulario de la lección utilizando el componente `VocabularyClient`.
    *   Incluye botones para navegar a la lección anterior y siguiente.

3.  **Cliente de Vocabulario (`/lessons/vocabulary-client.tsx`):**
    *   Renderiza la lista de palabras en quechua y español.
    *   **Funcionalidad Clave**: Implementa un botón de reproducción de audio que utiliza la API de Síntesis de Voz (`SpeechSynthesisUtterance`) nativa del navegador para pronunciar la palabra en quechua.

### d. Mini-Juegos

Se desarrollan cuatro juegos interactivos para practicar el vocabulario. Cada juego es una página dinámica que se adapta a un `lessonId`.

1.  **Word Matching (`/games/word-matching`):**
    *   **Objetivo**: Unir palabras en quechua con sus traducciones en español.
    *   **Lógica**: Se barajan las palabras de la lección y se muestran como botones. El usuario selecciona un par, y el juego valida si la selección es correcta.

2.  **Fill in the Blanks (`/games/fill-in-the-blanks`):**
    *   **Objetivo**: Completar una oración en quechua eligiendo la palabra correcta entre varias opciones.
    *   **Lógica**: Presenta una oración con un espacio en blanco y varias opciones. Valida la respuesta del usuario y proporciona feedback inmediato.

3.  **Memory (`/games/memory`):**
    *   **Objetivo**: Encontrar los pares de tarjetas quechua-español.
    *   **Lógica**: Se crea un mazo de cartas barajado (usando el algoritmo Fisher-Yates). El usuario voltea dos cartas para ver si coinciden.

4.  **Scramble (`/games/scramble`):**
    *   **Objetivo**: Ordenar las letras de una palabra revuelta para formar la palabra correcta en quechua.
    *   **Lógica**: Baraja las letras de una palabra y se la presenta al usuario junto a una pista (la traducción al español). El usuario introduce su respuesta en un campo de texto.

**Lógica común en los juegos:**
*   Al finalizar un juego, se llama a `updateLocalUserProgress` para marcar la lección correspondiente como completada (progreso del 100%).
*   Se usan `toasts` para notificar al usuario sobre la finalización de la lección.

### e. Práctica de Pronunciación (`/pronunciation/page.tsx`)

*   **Objetivo**: Permitir al usuario escuchar una palabra, grabar su propia pronunciación y compararla.
*   **Lógica Clave**:
    *   Utiliza `SpeechSynthesisUtterance` para la pronunciación nativa.
    *   Utiliza `navigator.mediaDevices.getUserMedia` y `MediaRecorder` para grabar el audio del usuario.
    *   Genera una URL local (`URL.createObjectURL`) para que el usuario pueda reproducir su propia grabación.

## 5. Lógica Reutilizable y Utilidades

*   **`user-progress.ts`**: Contiene funciones (`getLocalUserProgress`, `updateLocalUserProgress`) para abstraer la lógica de lectura y escritura del progreso del usuario en el `localStorage` del navegador.
*   **`use-mobile.tsx`**: Un hook personalizado que detecta si la aplicación se está ejecutando en un dispositivo móvil basándose en el ancho de la ventana.
*   **`use-toast.ts`**: Hook que gestiona el estado de las notificaciones emergentes (toasts) en toda la aplicación.

## 6. Pruebas y Despliegue

1.  **Pruebas Locales:**
    *   Se corre `npm run dev` para iniciar el servidor de desarrollo.
    *   Se prueba cada funcionalidad: navegación entre páginas, carga de progreso, funcionamiento de cada juego y la práctica de pronunciación.
    *   Se utilizan las herramientas de desarrollo del navegador para simular estar sin conexión y verificar que la PWA funciona correctamente.

2.  **Compilación para Producción:**
    *   Se corre `npm run build` para compilar la aplicación y generar los archivos estáticos optimizados.
    *   El comando también genera el *service worker* y el *fallback* para la PWA.

3.  **Despliegue:**
    *   Los archivos generados en el directorio `.next/` (o la salida exportada) se suben a un proveedor de hosting estático como Firebase Hosting, Vercel o Netlify.
    *   ¡Listo! Rimay App está en línea y disponible para los usuarios.