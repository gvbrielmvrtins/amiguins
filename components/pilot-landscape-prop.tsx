import { projectGround } from '@/lib/map-projection';
import { mapPalette as p } from '@/lib/modular-map';
import { pilotAssetPath } from '@/lib/map-pilot-assets';
import type { LandscapeProp } from '@/lib/pilot-landscape';

// Individual illustrated props, with source-pixel contact anchors and uniform scale.
// Preserve the existing ground positions and depth sorting; no duplicate SVG shadow.
const illustratedProps = {
  clock: { file: 'relogio-detalhado-v01.png', width: 1024, height: 1536, anchorX: 512, anchorY: 1470, scale: .057 },
  bollard: { file: 'balizador-detalhado-v01.png', width: 1024, height: 1536, anchorX: 512, anchorY: 1450, scale: .023 },
  table: { file: 'cafeteria-mesa-tenda-v01.png', width: 1415, height: 1111, anchorX: 735, anchorY: 940, scale: .06 },
  notice: { file: 'mural-detalhado-v01.png', width: 1415, height: 1111, anchorX: 700, anchorY: 965, scale: .052 },
  lamp: { file: 'poste-detalhado-v01.png', width: 1024, height: 1536, anchorX: 392, anchorY: 1440, scale: .072 },
  popcorn: { file: 'pipoca-detalhada-v01.png', width: 1415, height: 1111, anchorX: 710, anchorY: 1000, scale: .062 },
  planter: { file: 'floreira-detalhada-v01.png', width: 1536, height: 1024, anchorX: 800, anchorY: 930, scale: .04 },
};

export default function PilotLandscapeProp({ item }: { item: LandscapeProp }) {
  const at = projectGround(item.x,item.y);
  const treeWidth = item.size ?? 105;
  const illustration = item.kind === 'clock' || item.kind === 'lamp' || item.kind === 'popcorn' || item.kind === 'planter' || item.kind === 'table' || item.kind === 'notice' || item.kind === 'bollard' ? illustratedProps[item.kind] : null;
  if (illustration) return <g data-landscape={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true">
    <image href={`${pilotAssetPath}${illustration.file}`} x={-illustration.anchorX*illustration.scale} y={-illustration.anchorY*illustration.scale} width={illustration.width*illustration.scale} height={illustration.height*illustration.scale} preserveAspectRatio="xMidYMid meet"/>
  </g>;
  return <g data-landscape={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true" stroke={p.ink} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cx="7" cy="3" rx={item.kind==='tree'?22:19} ry="8" fill={p.ink} opacity=".12" stroke="none"/>
    {item.kind==='tree' && <image href={`${pilotAssetPath}rosa-arvore-isometrica-v01.png`} x={-treeWidth*.525} y={-treeWidth*.7} width={treeWidth} height={treeWidth*.75} preserveAspectRatio="xMidYMid meet"/>}
  </g>;
}



