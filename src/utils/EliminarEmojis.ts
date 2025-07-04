// src/utils/removeEmojis.ts

/**
 * Elimina emojis de un texto.
 * @param text Texto original posiblemente con emojis.
 * @returns Texto sin emojis.
 */
export const EliminarEmojis = (text: string): string => {
  return text.replace(
    /([\u203C-\u3299]|[\uD83C-\uDBFF\uDC00-\uDFFF]|\uD83D[\uDC00-\uDE4F])|[\u2600-\u27BF]|[\uFE00-\uFE0F]/g,
    ''
  );
};
