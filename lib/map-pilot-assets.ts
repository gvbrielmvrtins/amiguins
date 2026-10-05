import { uprightProjection } from './map-projection';

// Measured façade/rail and side-wall slopes in the original PNGs.
// These illustrations are oblique, despite their historical "isometrico" names.
// Rectify their two dominant ground directions to the map's ±30° axes.
export const pilotProjections: Record<string, ReturnType<typeof uprightProjection>> = {
  'vagao-feminino': uprightProjection(-400 / 980, 107 / 224),
  cineminha: uprightProjection(-210 / 610, 219 / 356),
  livrinhoteca: uprightProjection(-238 / 658, 274 / 272),
  'mercado-vagas': uprightProjection(-290 / 740, 150 / 201),
};

// Keep original PNGs intact. Image rectangles include the transparent safety margins.
export const pilotBuildings: Record<string, { file: string; x: number; y: number; width: number; height: number; labelX: number; labelY: number; labelAngle: number }> = {
  'vagao-feminino': { file: 'vagao-feminino-isometrico-v01.png', x: -199, y: -183, width: 380, height: 211.11, labelX: 0, labelY: 0, labelAngle: 0 },
  'mercado-vagas': { file: 'mercado-vagas-isometrico-v01.png', x: -202, y: -186, width: 397, height: 221.05, labelX: 0, labelY: 0, labelAngle: 0 },
  cineminha: { file: 'cineminha-isometrico-v01.png', x: -168, y: -222, width: 315, height: 247.15, labelX: -32, labelY: -92, labelAngle: -5 },
  livrinhoteca: { file: 'livrinhoteca-isometrico-v01.png', x: -177, y: -210, width: 325, height: 243.75, labelX: -25, labelY: -88, labelAngle: 0 },
};

export const pilotOrnaments = [
  // Ground positions; each prop is anchored at its bottom center inside its lot.
  { id: 'cineminha-cartaz', file: 'cineminha-cartaz-isometrico-v01.png', destination: 'cineminha', x: 260, y: 820, width: 42, height: 54.6 },
  { id: 'livrinhoteca-banco', file: 'livrinhoteca-banco-isometrico-v01.png', destination: 'livrinhoteca', x: 645, y: 345, width: 74, height: 46.71 },
  { id: 'livrinhoteca-livros', file: 'livrinhoteca-livros-isometrico-v01.png', destination: 'livrinhoteca', x: 875, y: 225, width: 40, height: 32.71 },
];

export const pilotAssetPath = '/images/modular/';

// Pink district only. Anchors use source-image pixels, including transparent margins.
// Scale is map units per source pixel before the upright projection correction.
// Reduced by 32–35% and inset from the lot edges to leave visible circulation.
export const pinkDistrict = [
  { id: 'vagao-feminino', position: { x: 385, y: 350 }, source: { width: 1536, height: 1024 }, anchor: { x: 780, y: 1008 }, scale: 234 / 1402, order: 20, footprint: { width: 234, depth: 135 }, label: { x: 330, y: 425, width: 290 } },
  { id: 'livrinhoteca', position: { x: 850, y: 350 }, source: { width: 1448, height: 1086 }, anchor: { x: 763, y: 1011 }, scale: 187 / 1100, order: 10, footprint: { width: 187, depth: 108 }, label: { x: 780, y: 395, width: 255 } },
  { id: 'cineminha', position: { x: 385, y: 795 }, source: { width: 1415, height: 1111 }, anchor: { x: 725, y: 1011 }, scale: 184 / 1038, order: 40, footprint: { width: 184, depth: 106 }, label: { x: 340, y: 890, width: 225 } },
  { id: 'mercado-vagas', position: { x: 850, y: 795 }, source: { width: 1681, height: 935 }, anchor: { x: 903.5, y: 897 }, scale: 231 / 1157, order: 30, footprint: { width: 231, depth: 133 }, label: { x: 740, y: 915, width: 305 } },
] as const;
