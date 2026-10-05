import {MazeGround} from './secret-garden-maze';
import {projectGround} from '@/lib/map-projection';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {northGarden,secretGarden,type GardenProp} from '@/lib/garden-study';
import {parkRenderedAssets} from '@/lib/park-rendered-assets';
import {gardenRenderedAssets} from '@/lib/garden-rendered-assets';
import {uprightProjection} from '@/lib/map-projection';

const pt=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
export function GardenGround(){return <g data-layer="gardens-rendered" stroke="#748660" strokeWidth="2.5">
  <MazeGround/>
  <g transform={`translate(${northGarden.x} ${northGarden.y})`}>
    <title>Jardim ao norte da região central — espaço renderizado</title>
    <rect x="-220" y="-115" width="440" height="230" rx="12" fill="url(#civic-grass)"/>
  </g>
</g>;}
export function GardenStudyProp({item}:{item:GardenProp}){
  const at=projectGround(item.x,item.y);
  const rendered=gardenRenderedAssets[item.kind];
  if(rendered){const projection=rendered.risingSlope!==undefined?uprightProjection(rendered.risingSlope,rendered.fallingSlope!).transform:undefined;return <g data-garden-prop={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none"><g transform={projection}><g transform={`scale(${rendered.mirror?-rendered.scale:rendered.scale} ${rendered.scale})`}><image href={`/images/modular/${rendered.file}`} x={-rendered.anchorX} y={-rendered.anchorY} width={rendered.width} height={rendered.height}/></g></g></g>;}
  const art=parkRenderedAssets[item.kind];
  if(art)return <g data-garden-prop={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none"><image href={`/images/modular/${art.file}`} x={-art.anchorX*art.scale} y={-art.anchorY*art.scale} width={art.width*art.scale} height={art.height*art.scale}/></g>;
  return null;
}
export default function SecretGarden({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){
  const at=projectGround(secretGarden.x,secretGarden.y);
  return <g id="destination-jardim-secreto" transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="button" tabIndex={0} aria-label={`Examinar ${d.name}`} aria-pressed={selected===d.id} onClick={()=>onSelect(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(d.id,true);}}}>
    <title>Jardim secreto — labirinto renderizado</title>
    <polygon points={[[-260,-240],[260,-240],[260,240],[-260,240]].map(([x,y])=>pt(x,y)).join(' ')} fill="transparent"/>
    
  </g>;
}




