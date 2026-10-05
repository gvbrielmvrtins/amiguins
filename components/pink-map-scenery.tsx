import { mapPalette as p } from '@/lib/modular-map';
import { buildingScale, projectGround } from '@/lib/map-projection';
import { pinkDistrict, pilotAssetPath, pilotProjections } from '@/lib/map-pilot-assets';

// Ground positions, shared with the buildings; only this district receives scenery.
export const pinkScenery = [
  { id: 'tree-station', kind: 'tree', x: 150, y: 185, width: 230 },
  { id: 'tree-library', kind: 'tree', x: 1080, y: 125, width: 220 },
  { id: 'tree-cinema', kind: 'tree', x: 125, y: 685, width: 200 },
  { id: 'tree-market', kind: 'tree', x: 810, y: 965, width: 185 },
  { id: 'garden-station', kind: 'garden', x: 610, y: 170, width: 155 },
  { id: 'garden-cinema', kind: 'garden', x: 260, y: 965, width: 130 },
  { id: 'garden-market', kind: 'garden', x: 1060, y: 910, width: 150 },
  { id: 'garden-library', kind: 'garden', x: 1010, y: 245, width: 115 },
  { id: 'tree-cinema-garden', kind: 'tree', x: 165, y: 950, width: 150 },
  { id: 'garden-central', kind: 'garden', x: 650, y: 480, width: 115 },
  { id: 'lamp-station', kind: 'lamp', x: 210, y: 490, width: 30 },
  { id: 'lamp-library', kind: 'lamp', x: 1030, y: 340, width: 30 },
  { id: 'lamp-cinema', kind: 'lamp', x: 390, y: 960, width: 30 },
  { id: 'lamp-market', kind: 'lamp', x: 1040, y: 610, width: 30 },
] as const;
export type PinkSceneryItem = typeof pinkScenery[number];

export function PinkSceneryProp({ item }: { item: PinkSceneryItem }) {
  const point = projectGround(item.x, item.y);
  const tree = item.kind === 'tree';
  const height = item.width * (tree ? 1086 / 1448 : 1024 / 1536);
  return <g data-scenery={item.id} transform={`translate(${point.x} ${point.y})`} aria-hidden="true" pointerEvents="none">
    {item.kind === 'lamp' ? <g stroke={p.ink} strokeWidth="2.5" strokeLinejoin="round">
      <ellipse cy="1" rx="15" ry="7" fill={p.ink} opacity=".16" stroke="none"/>
      <path d="M-5 0V-71H5V0L0 3Z" fill={p.blue}/>
      <path d="M0-65V-94Q0-103 10-103H23" fill="none" strokeWidth="5"/>
      <path d="M10-99Q23-116 36-99Z" fill={p.coral}/>
      <ellipse cx="23" cy="-99" rx="13" ry="4" fill={p.yellow}/>
    </g> : <image href={`${pilotAssetPath}${tree ? 'rosa-arvore-isometrica-v01.png' : 'rosa-jardineira-banco-isometrica-v01.png'}`} x={-item.width*.5} y={-height*.91} width={item.width} height={height} preserveAspectRatio="xMidYMid meet"/>}
  </g>;
}

export function PinkGround() {
  return <g data-layer="pink-landscape-ground" aria-hidden="true" pointerEvents="none">
    <defs>
      <clipPath id="pink-scenery-area"><path d="M95 105Q490 50 960 105L1110 820Q800 1000 180 1030L100 920Z"/></clipPath>
    </defs>
    <g clipPath="url(#pink-scenery-area)" strokeWidth="3">
      <rect x="0" y="0" width="1200" height="1100" fill="#F5EBCB" stroke="none"/>
      <path d="M110 145Q300 85 610 120L625 230Q290 215 140 340Z" fill="#A4B879" stroke="#586C45"/>
      <path d="M910 130Q1060 135 1090 300L1030 395L935 345Z" fill="#A4B879" stroke="#586C45"/>
      <path d="M105 560Q180 530 220 615L205 835Q320 875 405 985L130 1015Z" fill="#A4B879" stroke="#586C45"/>
      <path d="M795 880Q955 775 1060 815L1060 980H740Z" fill="#A4B879" stroke="#586C45"/>
      {fronts.filter(front => front.id !== 'vagao-feminino').map(front => {
        const x = front.from.x + 155;
        const y = front.from.y - 30;
        const dx = (front.to.x-front.from.x)*.55;
        const dy = (front.to.y-front.from.y)*.55;
        return <g key={front.id}>
          <path d={`M${x} ${y}l${dx} ${dy}l80 0l${-dx} ${-dy}Z`} fill="#AAC58B" stroke="#587B51" strokeWidth="3" strokeLinejoin="round"/>
          {[.15,.4,.65,.9].map(t=><path key={t} d={`M${x+dx*t+30} ${y+dy*t}l-7 -10m7 10l10 -7`} fill="none" stroke="#719359" strokeWidth="3" strokeLinecap="round"/>)}
        </g>;
      })}
      <path d="M620 610Q670 555 700 620L695 720Q640 750 610 705Z" fill="#AAC58B" stroke="#587B51"/>

    </g>
  </g>;
}

// Façade samples are source-image pixels, not the image's bottom-center anchor.
// This keeps the pavement parallel to each approved illustration, including its
// small hand-drawn variation from mathematical 30-degree axes.
const frontages = [
  { id: 'vagao-feminino', from: [500, 940], to: [1390, 610], entrance: [940, 900] },
  { id: 'cineminha', from: [610, 1010], to: [1220, 800], entrance: [970, 900] },
  { id: 'livrinhoteca', from: [770, 1010], to: [1270, 850], entrance: [1040, 930] },
  { id: 'mercado-vagas', from: [680, 890], to: [1420, 600], entrance: [1100, 745] },
];
function sourceToGround(id: string, pixel: number[]) {
  const site = pinkDistrict.find(site => site.id === id)!;
  // Entrances and attached pavement must follow the same correction as the art.
  const corrected = pilotProjections[id].project(pixel[0] - site.anchor.x, pixel[1] - site.anchor.y);
  const dx = corrected.x * site.scale * buildingScale;
  const dy = corrected.y * site.scale * buildingScale;
  return { x: site.position.x + (dx / .5196152423 + dy / .3) / 2,
    y: site.position.y + (dy / .3 - dx / .5196152423) / 2 };
}
export const fronts = frontages.map(front => ({
  id: front.id, from: sourceToGround(front.id, front.from),
  to: sourceToGround(front.id, front.to), entrance: sourceToGround(front.id, front.entrance),
}));
// Pavement is a surface parallel to the sampled façade, not a thick line.
export const forecourts = fronts.filter(front => front.id !== 'vagao-feminino').map(front => ({
  id: front.id,
  points: [front.from, front.to, {x: front.to.x+115,y:front.to.y}, {x:front.from.x+115,y:front.from.y}].map(point=>`${point.x},${point.y}`).join(' '),
}));
// Join the façade promenades directly, rather than superimposing a second
// street grid. Every branch has an entrance or an external connection.
const [, cinemaFront, libraryFront, marketFront] = fronts;
const at = (point: { x: number; y: number }) => `${point.x+75} ${point.y}`;
// Measured long rail axis: (980, -400) in the wagon's source image.
// Both platform edges use this exact vector; the stair foot lands inside it.
const stationPlatformPixels = [[470,1000],[1450,600],[1610,720],[630,1120]];
const stationPlatform = stationPlatformPixels.map(pixel => sourceToGround('vagao-feminino', pixel));
export const stationPolygon = stationPlatform.map(point => `${point.x},${point.y}`).join(' ');
// Leave the curb open at the two pedestrian connections. All remaining
// segments retain the same measured rail direction as the platform itself.
const stationCurb = [[.18, .48], [.72, 1]].map(([from, to]) => {
  const start = stationPlatform[3];
  const end = stationPlatform[2];
  const point = (t: number) => `${start.x+(end.x-start.x)*t} ${start.y+(end.y-start.y)*t}`;
  return `M${point(from)}L${point(to)}`;
});
function stationConnection(pixel: number[], target: { x: number; y: number }) {
  const start = sourceToGround('vagao-feminino', pixel);
  const end = { x: target.x+75, y: target.y };
  const mid = (start.y+end.y)/2;
  return `M${start.x} ${start.y}C${start.x+50} ${mid} ${end.x} ${mid} ${end.x} ${end.y}`;
}
export const pinkWalkways = [
  stationConnection([670, 1080], cinemaFront.to),
  `M${at(libraryFront.from)}L${at(marketFront.to)}`,
  stationConnection([1200, 860], libraryFront.from),
  `M${at(cinemaFront.from)}L600 865L${at(marketFront.from)}`,
  `M${at(libraryFront.from)}L960 430L1110 507`,
  `M${at(marketFront.from)}L990 800L1100 770`,
  'M600 865L525 1035',
];

export function PinkStreets() {
  return <g data-layer="pink-streets" clipPath="url(#pink-scenery-area)" aria-hidden="true" pointerEvents="none">
    {forecourts.map(court => <polygon key={court.id} data-forecourt={court.id} points={court.points} fill={p.cream} stroke={p.ink} strokeWidth="4" strokeLinejoin="round"/>)}
    <polygon data-surface="station-platform" points={stationPolygon} fill={p.cream} stroke={p.ink} strokeWidth="4" strokeLinejoin="round"/>
    {[{color:p.ink,width:80},{color:'#E3D5B5',width:75},{color:p.cream,width:64}].map(pass=><g key={pass.color} fill="none" stroke={pass.color} strokeWidth={pass.width} strokeLinecap="round" strokeLinejoin="round">{pinkWalkways.map(d=><path key={d} d={d}/>)}</g>)}
    {forecourts.map(court => <polygon key={court.id} points={court.points} fill={p.cream} stroke="none"/>)}
    <polygon points={stationPolygon} fill={p.cream} stroke="none"/>
    {stationCurb.map(d => <path key={d} d={d} fill="none" stroke="#B7A786" strokeWidth="5"/>)}
  </g>;
}
