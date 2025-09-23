
import data from './placeholder-images.json';

/**
 * @typedef {object} ImagePlaceholder
 * @property {string} id - Identificador único de la imagen.
 * @property {string} description - Descripción de la imagen.
 * @property {string} imageUrl - URL de la imagen de marcador de posición (usando picsum.photos).
 * @property {string} imageHint - Pista para la IA sobre el contenido de la imagen.
 */
export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

/**
 * Array que contiene los datos de las imágenes de marcador de posición, importados desde el JSON.
 * @type {ImagePlaceholder[]}
 */
export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages;
