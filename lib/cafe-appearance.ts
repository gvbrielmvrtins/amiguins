/** Switch to 'original' after the seasonal decoration ends. Both assets are preserved. */
export const cafeAppearance: 'original' | 'halloween' = 'halloween';
const cafeVariants = {
  original: 'cafe-apoio-render-v01.webp',
  halloween: 'cafe-apoio-halloween-v01.webp',
};
export const cafeArtwork = cafeVariants[cafeAppearance];
