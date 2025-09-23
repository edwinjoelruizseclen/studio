
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Función de utilidad para combinar clases de Tailwind CSS de forma segura.
 * Utiliza `clsx` para manejar clases condicionales y `tailwind-merge` para
 * resolver conflictos de clases de Tailwind.
 * @param {...ClassValue[]} inputs - Una lista de clases a combinar.
 * @returns {string} Una cadena de texto con las clases combinadas y optimizadas.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
