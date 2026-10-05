import {projectGround,uprightProjection} from '@/lib/map-projection';
import {parkRenderedAssets} from '@/lib/park-rendered-assets';
import {gardenRenderedAssets} from '@/lib/garden-rendered-assets';
import {secretGarden} from '@/lib/garden-study';


const point=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
function GardenArt({kind,x,y,size=1}:{kind:string;x:number;y:number;size?:number}){
  const art=gardenRenderedAssets[kind]??parkRenderedAssets[kind];
  return <g transform={`translate(${point(x,y)}) scale(${art.scale*size})`}><image href={`/images/modular/${art.file}`} x={-art.anchorX} y={-art.anchorY} width={art.width} height={art.height}/></g>;
}
export function MazeGround(){return <g transform={`translate(${secretGarden.x} ${secretGarden.y})`}>
  <rect x="-260" y="-240" width="520" height="480" rx="20" fill="url(#civic-grass)" stroke="#82986D" strokeWidth="2"/>
</g>;}
export default function SecretGardenMaze(){
  const at=projectGround(secretGarden.x,secretGarden.y);
  const items=[
    {depth:60,key:'arrival-oak',art:<GardenArt kind="oak" x={200} y={-140} size={.55}/>},
    {depth:195,key:'arrival-birch',art:<GardenArt kind="birch" x={190} y={5} size={.58}/>},
    {depth:280,key:'sundial',art:<GardenArt kind="sundial" x={180} y={100} size={.8}/>},
    {depth:380,key:'arrival-pine',art:<GardenArt kind="pine" x={195} y={185} size={.5}/> }];
  return <g data-secret-garden="rendered-maze" transform={`translate(${at.x} ${at.y})`} pointerEvents="none"><g data-maze-hedge="unified" transform={`${uprightProjection(-.61,.65).transform} scale(.347)`}><image href="/images/modular/jardim-labirinto-unificado-v01.png" x="-775" y="-550" width="1536" height="1024"/></g>{items.sort((a,b)=>a.depth-b.depth).map(item=><g key={item.key}>{item.art}</g>)}</g>;
}



