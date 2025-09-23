# Glosario Técnico para Jóvenes Programadoras

¡Hola! Si nunca has programado, algunos términos pueden sonar como un idioma extraño. ¡Pero no te preocupes! La programación es como aprender a dar instrucciones a la computadora. Este glosario te ayudará a entender los conceptos clave de este proyecto.

---

### A

- **Algoritmo**: Es simplemente una serie de pasos o instrucciones para resolver un problema. Piensa en ello como una receta de cocina: sigues los pasos en orden para obtener un resultado (un pastel delicioso o, en nuestro caso, una app que funciona).

- **API (Interfaz de Programación de Aplicaciones)**: Imagina que estás en un restaurante. No vas a la cocina a preparar tu comida, sino que le pides al camarero lo que quieres, y él se encarga del resto. Una API es como el camarero: es un intermediario que permite que dos programas se comuniquen entre sí sin necesidad de saber cómo funciona el otro por dentro.

- **Array (Arreglo o Lista)**: Es una colección o una lista de elementos guardados juntos. Por ejemplo, una lista de compras (`["leche", "huevos", "pan"]`) o una lista de números (`[1, 2, 3, 4]`). En nuestra app, usamos arrays para guardar las listas de palabras de vocabulario.

### B

- **Bug (Error)**: Es un error o un fallo en el código que hace que la aplicación no se comporte como esperamos. Se llama "bug" (bicho en inglés) porque, hace muchos años, una polilla real causó un problema en una de las primeras computadoras. ¡Encontrar y arreglar bugs es una parte normal de la programación!

### C

- **Componente**: Es como una pieza de LEGO para construir interfaces de usuario. En lugar de escribir el código para un botón o una tarjeta una y otra vez, creamos un "componente" reutilizable. En nuestra app, `Button` y `Card` son componentes. La página principal está hecha de muchos componentes que trabajan juntos.

- **CSS (Hojas de Estilo en Cascada)**: Es el lenguaje que se usa para "vestir" a una página web. Define los colores, las fuentes, los tamaños y las posiciones de los elementos HTML. Si HTML es el esqueleto, CSS es la ropa y el maquillaje.

### D

- **Deploy (Despliegue)**: Es el proceso de "subir" o "publicar" tu aplicación a internet para que cualquier persona en el mundo pueda usarla. Cuando subamos la app a Firebase Hosting, estaremos haciendo un deploy.

- **Dependencias**: Son como las herramientas o ingredientes que nuestro proyecto necesita de otros programadores para funcionar. En lugar de construir todo desde cero, usamos "paquetes" de código que otros ya han hecho. `package.json` es el archivo que lista todas estas dependencias.

### F

- **Framework (Marco de trabajo)**: Es como la estructura o el esqueleto de un edificio. Nos da una base y unas reglas para construir una aplicación de forma ordenada. **Next.js** es nuestro framework. Nos ahorra mucho trabajo porque ya tiene soluciones para cosas comunes como la navegación entre páginas.

### G

- **Git**: Es un sistema de "control de versiones". Imagina que estás escribiendo un cuento y guardas diferentes versiones (`cuento_v1.doc`, `cuento_final.doc`, `cuento_final_final.doc`). Git hace esto de forma automática y mucho más organizada. Permite a los programadores guardar "fotos" de su código en diferentes momentos y volver a ellas si algo sale mal.

### H

- **Hook (Gancho)**: En React, los hooks son funciones especiales que nos permiten "engancharnos" a las características de React. Los más famosos son:
    - **`useState`**: Permite a un componente tener su propia "memoria" o "estado". Por ejemplo, para recordar qué palabra ha seleccionado el usuario en un juego.
    - **`useEffect`**: Permite a un componente hacer algo después de que se haya renderizado en pantalla, como cargar datos desde `localStorage`.

- **HTML (Lenguaje de Marcado de Hipertexto)**: Es el esqueleto de cualquier página web. Define la estructura y el contenido, como los títulos, párrafos, imágenes y botones. No es un lenguaje de programación, sino un lenguaje para describir el contenido.

### I

- **Import / Export**: Son las palabras clave que nos permiten dividir nuestro código en múltiples archivos para mantenerlo ordenado.
    - `export`: Hace que una función o variable esté disponible para que otros archivos la puedan usar.
    - `import`: Permite que un archivo use una función o variable que otro archivo ha exportado.

### J

- **JSON (Notación de Objetos de JavaScript)**: Es un formato de texto muy simple para guardar y intercambiar datos. Es muy fácil de leer tanto para humanos como para máquinas. Nuestro archivo `vocabulary.json` usa este formato para guardar todo el vocabulario de la app.

- **JavaScript (JS)**: Es el lenguaje de programación que le da "vida" a una página web. Se encarga de la interactividad: qué pasa cuando haces clic en un botón, cómo funcionan los juegos, cómo se actualiza el progreso, etc.

### L

- **`localStorage` (Almacenamiento Local)**: Es un pequeño "almacén" que tienen los navegadores web para que una página pueda guardar información directamente en la computadora del usuario. En nuestra app, lo usamos para guardar el progreso de las lecciones, para que no se pierda si cierras la página.

### N

- **Next.js**: Es el **framework** de React que usamos. Nos da una estructura sólida y optimizaciones para que nuestra aplicación sea rápida y fácil de construir.

- **npm (Node Package Manager)**: Es el "administrador de paquetes" de Node.js. Imagina una tienda de aplicaciones para programadores. npm nos permite descargar e instalar fácilmente las "dependencias" (herramientas y librerías) que necesitamos para nuestro proyecto.

### P

- **PWA (Progressive Web App)**: Es una aplicación web que se comporta casi como una aplicación nativa (de las que descargas en la App Store o Google Play). Se puede "instalar" en la pantalla de inicio de tu celular, funciona sin conexión a internet y es muy rápida. ¡Nuestra Rimay App es una PWA!

- **Props (Propiedades)**: Son la forma en que los componentes "padre" pasan información a sus componentes "hijo". Si un componente `Button` es una pieza de LEGO, las `props` serían las instrucciones que le dicen de qué color ser (`color="primary"`) o qué texto mostrar (`text="Empezar"`).

### R

- **React**: Es una **librería** de JavaScript para construir interfaces de usuario. Su idea principal es crear la interfaz a base de **componentes** (piezas reutilizables). Es una de las tecnologías más populares para el desarrollo web moderno.

- **Renderizar**: Es el proceso de dibujar la interfaz de usuario en la pantalla. Cuando React toma nuestros componentes y los convierte en los elementos visuales que ves en el navegador, está "renderizando".

### S

- **State (Estado)**: Es la "memoria" interna de un componente. Es un objeto donde un componente guarda información que puede cambiar con el tiempo y que afecta a lo que se renderiza. Por ejemplo, en el juego de memoria, el "estado" guarda qué cartas están volteadas. Cuando el estado cambia, React vuelve a renderizar el componente para reflejar ese cambio.

### T

- **Tailwind CSS**: Es un **framework de CSS** que nos permite dar estilo a nuestros componentes de una forma muy rápida, usando "clases de utilidad" directamente en el HTML. En lugar de escribir un archivo CSS separado, escribimos clases como `p-4` (padding de 4) o `font-bold` (texto en negrita).

- **TypeScript (TS)**: Es un "superconjunto" de JavaScript. Es decir, es JavaScript con superpoderes. Su principal ventaja es que añade "tipos" al lenguaje. Esto nos ayuda a evitar muchos errores comunes porque el sistema nos avisa si estamos intentando usar un número como si fuera texto, por ejemplo.

### U

- **UI (Interfaz de Usuario)**: Es la parte visual de la aplicación con la que el usuario interactúa. Incluye todos los botones, menús, tarjetas y textos que ves en la pantalla.

- **URL (Localizador Uniforme de Recursos)**: Es la dirección única de una página en internet, como `https://www.google.com`.