import {northForestGround,coastalForestGround,forestCoastEdge} from '@/lib/north-forest';
import {MazeGround} from './secret-garden-maze';
import {projectGround} from '@/lib/map-projection';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {secretGarden,type GardenProp} from '@/lib/garden-study';
import {parkRenderedAssets} from '@/lib/park-rendered-assets';
import {gardenRenderedAssets} from '@/lib/garden-rendered-assets';
import {uprightProjection} from '@/lib/map-projection';

const pt=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
export function ForestGround(){return <g data-layer="forest-ground" stroke="none" pointerEvents="none">
  <path d={northForestGround} fill="url(#civic-grass)" stroke="none" aria-label="Floresta densa que continua além da borda do mapa"/>
  <path d={northForestGround} fill="#35513B" opacity=".28" stroke="none"/>
  <defs>
    <linearGradient id="valley-forest-blend" x1="2945" y1="0" x2="3080" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#CDD3A9"/><stop offset=".48" stopColor="#AFC08D"/><stop offset="1" stopColor="#8EAA73" stopOpacity="0"/></linearGradient>
    <clipPath id="forest-coast-transition"><path d={coastalForestGround}/></clipPath></defs>
  <path d="M2945 662Q3018 658 3058 714L3078 952Q3070 1040 3032 1117Q2978 1180 2860 1180H2550L2550 1100H2912Q2960 1100 2960 1055V722Q2960 690 2945 690Z" fill="url(#civic-grass)" opacity=".8"/>
  <path d="M2945 662Q3018 658 3058 714L3078 952Q3070 1040 3032 1117Q2978 1180 2860 1180H2550L2550 1100H2912Q2960 1100 2960 1055V722Q2960 690 2945 690Z" fill="url(#valley-forest-blend)"/>
  <g clipPath="url(#forest-coast-transition)" fill="none">
    <path d={forestCoastEdge} stroke="#98B27A" strokeWidth="240" opacity=".25"/>
    <path d={forestCoastEdge} stroke="#B6C696" strokeWidth="150" opacity=".35"/>
    <path d={forestCoastEdge} stroke="#D1D4AA" strokeWidth="70" opacity=".5"/>
  </g>
</g>;}
export function GardenGround(){return <g data-layer="gardens-rendered" stroke="#748660" strokeWidth="2.5">
  <MazeGround/>

</g>;}
export function GardenStudyProp({item}:{item:GardenProp}){
  const at=projectGround(item.x,item.y);
  const rendered=gardenRenderedAssets[item.kind];
  if(rendered){const projection=rendered.risingSlope!==undefined?uprightProjection(rendered.risingSlope,rendered.fallingSlope!).transform:undefined;return <g data-garden-prop={item.id} transform={`translate(${at.x} ${at.y}) scale(${item.scale??1})`} pointerEvents="none"><g transform={projection}><g transform={`scale(${rendered.mirror?-rendered.scale:rendered.scale} ${rendered.scale})`}><image href={`/images/modular/${rendered.file}`} x={-rendered.anchorX} y={-rendered.anchorY} width={rendered.width} height={rendered.height}/></g></g></g>;}
  const art=parkRenderedAssets[item.kind];
  if(art)return <g data-garden-prop={item.id} transform={`translate(${at.x} ${at.y}) scale(${item.scale??1})`} pointerEvents="none"><image href={`/images/modular/${art.file}`} x={-art.anchorX*art.scale} y={-art.anchorY*art.scale} width={art.width*art.scale} height={art.height*art.scale}/></g>;
  return null;
}
export default function SecretGarden({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){
  const at=projectGround(secretGarden.x,secretGarden.y);
  return <g id="destination-jardim-secreto" transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="group" aria-label={d.name}>

    <polygon points={[[-260,-240],[260,-240],[260,240],[-260,240]].map(([x,y])=>pt(x,y)).join(' ')} fill="transparent"/>

  </g>;
}




