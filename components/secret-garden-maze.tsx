import {projectGround,uprightProjection} from '@/lib/map-projection';
import {parkRenderedAssets} from '@/lib/park-rendered-assets';
import {gardenRenderedAssets} from '@/lib/garden-rendered-assets';
import {secretGarden} from '@/lib/garden-study';


const point=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
function GardenArt({kind,x,y,size=1}:{kind:string;x:number;y:number;size?:number}){
  const art=gardenRenderedAssets[kind]??parkRenderedAssets[kind];
  return <g transform={`translate(${point(x,y)}) scale(${art.scale*size})`}><image href={`/images/modular/${art.file}`} x={-art.anchorX} y={-art.anchorY} width={art.width} height={art.height}/></g>;
}
// Atlas cells keep the new illustrated pieces independent and reusable.
const residents=[
  [0,155,550],[1,390,520],[2,610,490],[3,805,220],
  [4,1030,335],[5,1030,505],[6,1185,705],[7,780,680],
  [3,565,625],[4,810,830],[0,1330,625],[2,325,640],
  [5,960,760],[6,490,715],[7,705,855],[1,1110,600],
];
const pots=[
  [8,95,615],[9,230,690],[10,360,775],[11,515,860],
  [8,685,960],[9,850,975],[10,1030,855],[11,1195,770],
  [8,1350,690],[9,1450,580],[11,930,160],[8,1100,255],
  [10,360,435],[9,700,380],
];
function GardenSprite({index,px,py,pot=false}:{index:number;px:number;py:number;pot?:boolean}){
  const at=uprightProjection(-.61,.65).project((px-775)*.347,(py-550)*.347);
  const col=index%4,row=Math.floor(index/4),cell=362;
  const clip=`secret-garden-sprite-${index}-${px}-${py}`;
  return <g data-garden-resident={pot?'potted-plant':'animal'} transform={`translate(${at.x} ${at.y}) scale(${(pot?32:28)/cell})`}>
    <defs><clipPath id={clip}><rect x={-cell/2} y={-cell} width={cell} height={cell}/></clipPath></defs>
    <g clipPath={`url(#${clip})`}><image href="/images/modular/jardim-animais-vasos-v01.png" x={-cell/2-col*cell} y={-cell-row*cell} width="1448" height="1086"/></g>
  </g>;
}
export function MazeGround(){return <g transform={`translate(${secretGarden.x} ${secretGarden.y}) scale(.8)`}>
  <rect x="-260" y="-240" width="520" height="480" rx="20" fill="url(#civic-grass)" stroke="#82986D" strokeWidth="2"/>
</g>;}
export default function SecretGardenMaze(){
  const at=projectGround(secretGarden.x,secretGarden.y);
  const items=[
    {depth:60,key:'arrival-oak',art:<GardenArt kind="oak" x={200} y={-140} size={.55}/>},
    {depth:195,key:'arrival-birch',art:<GardenArt kind="birch" x={190} y={5} size={.58}/>},
    {depth:280,key:'sundial',art:<GardenArt kind="sundial" x={180} y={100} size={.8}/>},
    {depth:380,key:'arrival-pine',art:<GardenArt kind="pine" x={195} y={185} size={.5}/> }];
  return <g data-secret-garden="rendered-maze" transform={`translate(${at.x} ${at.y}) scale(.8)`} pointerEvents="none"><g data-maze-hedge="unified" transform={`${uprightProjection(-.61,.65).transform} scale(.347)`}><image href="/images/modular/jardim-labirinto-unificado-v01.png" x="-775" y="-550" width="1536" height="1024"/></g>{[...residents.map(([index,px,py])=><GardenSprite key={`animal-${index}-${px}-${py}`} index={index} px={px} py={py}/>),...pots.map(([index,px,py])=><GardenSprite key={`pot-${index}-${px}-${py}`} index={index} px={px} py={py} pot/>) ]}{items.sort((a,b)=>a.depth-b.depth).map(item=><g key={item.key}>{item.art}</g>)}</g>;
}



