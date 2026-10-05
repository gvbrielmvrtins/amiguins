import type { LandscapeProp } from './pilot-landscape';

// Scenery only: these buildings are not destinations or interactive markers.
export const fillerBuildings = [
  { id: 'north-residence-coral', x: 190, y: -155, w: 145, d: 100, h: 92, color: '#F77B5D', shop: false },
  { id: 'north-corner-store', x: 415, y: -155, w: 150, d: 100, h: 58, color: '#FAD846', shop: true },
  { id: 'north-residence-pink', x: 655, y: -155, w: 150, d: 100, h: 112, color: '#F889BA', shop: true },
  { id: 'west-small-shop', x: -245, y: 270, w: 125, d: 110, h: 55, color: '#F77B5D', shop: true },
  { id: 'west-townhouse', x: -245, y: 480, w: 125, d: 115, h: 88, color: '#F889BA', shop: false },
  { id: 'west-workshop', x: -245, y: 690, w: 125, d: 100, h: 50, color: '#FAD846', shop: true },
] as const;

export const fillerLandscape: LandscapeProp[] = [
  { id: 'filler-north-lamp-west', kind: 'lamp', x: 165, y: -10 },
  { id: 'filler-north-lamp-middle', kind: 'lamp', x: 450, y: -10 },
  { id: 'filler-north-lamp-east', kind: 'lamp', x: 815, y: -10 },
  { id: 'filler-west-lamp-park', kind: 'lamp', x: -55, y: 180 },
  { id: 'filler-west-lamp-middle', kind: 'lamp', x: -55, y: 455 },
  { id: 'filler-west-lamp-end', kind: 'lamp', x: -55, y: 780 },
  { id: 'filler-park-flowers', kind: 'planter', x: -295, y: -75 },
  { id: 'filler-north-tree-a', kind: 'tree', x: 120, y: -95, size: 82 },
  { id: 'filler-north-tree-b', kind: 'tree', x: 870, y: -100, size: 90 },
  { id: 'filler-north-table', kind: 'table', x: 585, y: -25 },
  { id: 'filler-north-flowers', kind: 'planter', x: 390, y: -30 },
  { id: 'filler-west-tree', kind: 'tree', x: -255, y: 360, size: 82 },
  { id: 'filler-west-table', kind: 'table', x: -150, y: 575 },
  { id: 'filler-west-flowers', kind: 'planter', x: -270, y: 150 },
];

export const parkStudyProps = [
  { id: 'park-pond', kind: 'pond', x: -225, y: -120 },
  { id: 'park-oak', kind: 'oak', x: -260, y: -210 },
  { id: 'park-birch', kind: 'birch', x: -75, y: -185 },
  { id: 'park-pine', kind: 'pine', x: -270, y: -25 },
  { id: 'park-picnic', kind: 'picnic', x: -110, y: -55 },
  { id: 'park-bench', kind: 'bench', x: -80, y: -150 },
] as const;
