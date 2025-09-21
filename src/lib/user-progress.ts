
/**
 * @typedef {object} LessonProgress
 * @description Un objeto donde las claves son los IDs de las lecciones (como string)
 * y los valores son el progreso del usuario (0-100).
 * @example
 * { "1": 100, "2": 50 }
 */
export type LessonProgress = {
  [lessonId: string]: number;
};

// Clave utilizada para guardar el progreso en el almacenamiento local del navegador.
const LOCAL_STORAGE_KEY = 'rimayAppLessonProgress';

/**
 * Obtiene el progreso de las lecciones del usuario desde el localStorage del navegador.
 * @returns {Promise<LessonProgress>} Una promesa que resuelve con el objeto de progreso del usuario.
 * Devuelve un objeto vacío si no hay progreso guardado.
 */
export async function getLocalUserProgress(): Promise<LessonProgress> {
  try {
    // Asegura que el código se ejecute solo en el lado del cliente.
    if (typeof window !== 'undefined') {
      const savedProgress = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedProgress) {
        return JSON.parse(savedProgress);
      }
    }
  } catch (e) {
    console.error("No se pudo leer el progreso de la lección desde localStorage", e);
  }
  // Devuelve un objeto vacío si no se encuentra progreso o si ocurre un error.
  return {};
}

/**
 * Actualiza el progreso de una lección específica para el usuario en el localStorage.
 * @param {number | string} lessonId - El ID de la lección a actualizar.
 * @param {number} progress - El nuevo valor de progreso (de 0 a 100).
 * @returns {Promise<void>}
 */
export async function updateLocalUserProgress(
  lessonId: number | string,
  progress: number
): Promise<void> {
    try {
      if (typeof window !== 'undefined') {
        const savedProgress = await getLocalUserProgress();
        const currentProgress = savedProgress || {};
        currentProgress[String(lessonId)] = progress;
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(currentProgress));
      }
    } catch(e) {
        console.error("No se pudo guardar el progreso de la lección en localStorage", e);
    }
}
