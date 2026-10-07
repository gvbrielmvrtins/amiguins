// Pilot landscape: only these four lots and the two connecting pedestrian lanes.
export const pilotLots = [
  { id: 'vagao-feminino', x: 105, y: 105, width: 350, height: 100, accent: '#F889BA' },
  { id: 'cineminha', x: 105, y: 525, width: 350, height: 345, accent: '#F77B5D' },
  { id: 'livrinhoteca', x: 555, y: 105, width: 370, height: 305, accent: '#FAD846' },
  { id: 'mercado-vagas', x: 555, y: 525, width: 370, height: 345, accent: '#3774FA' },
] as const;

export type LandscapeKind = 'tree' | 'bench' | 'table' | 'clock' | 'popcorn' | 'notice' | 'planter' | 'lamp' | 'bollard';
export type LandscapeProp = { id: string; kind: LandscapeKind; x: number; y: number; size?: number };
export const pilotLandscape: LandscapeProp[] = [
  { id: 'station-tree', kind: 'tree', x: 165, y: 190, size: 112 },
  { id: 'station-clock', kind: 'clock', x: 250, y: 145 },
  { id: 'station-flowers', kind: 'planter', x: 185, y: 185 },
  { id: 'cinema-tree', kind: 'tree', x: 160, y: 610, size: 105 },
  { id: 'cinema-popcorn', kind: 'popcorn', x: 215, y: 705 },
  { id: 'cinema-flowers', kind: 'planter', x: 175, y: 830 },
  { id: 'cinema-queue-a', kind: 'bollard', x: 425, y: 700 },
  { id: 'cinema-queue-b', kind: 'bollard', x: 425, y: 765 },
  { id: 'library-tree', kind: 'tree', x: 610, y: 175, size: 115 },
  { id: 'library-flowers', kind: 'planter', x: 605, y: 370 },
  { id: 'market-tree', kind: 'tree', x: 610, y: 590, size: 105 },
  { id: 'market-noticeboard', kind: 'notice', x: 720, y: 565 },
  { id: 'market-meeting-table', kind: 'table', x: 665, y: 715 },
  { id: 'market-flowers', kind: 'planter', x: 610, y: 825 },
  // Furniture at lane edges, leaving the central walking strips unobstructed.
  { id: 'lane-lamp-north', kind: 'lamp', x: 475, y: 220 },
  { id: 'lane-lamp-junction', kind: 'lamp', x: 535, y: 435 },
  { id: 'lane-lamp-south', kind: 'lamp', x: 475, y: 780 },
  { id: 'lane-lamp-east', kind: 'lamp', x: 875, y: 500 },
];
