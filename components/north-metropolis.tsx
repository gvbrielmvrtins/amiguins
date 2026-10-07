import {uprightProjection} from '@/lib/map-projection';
import {fillerRenderedAssets} from '@/lib/filler-rendered-assets';

// The urban fabric extends past the upper and left artboard edges.
const blocks=Array.from({length:6},(_,row)=>Array.from({length:14},(_,col)=>{
  const sx=-160+col*108+(row%2)*25,sy=335-row*100;
  const frontier=sx<520?350:sx<610?180:sx<950?-20:45;
  if(sy>frontier || sx>1330)return null;
  return {id:`metropolis-${row}-${col}`,sx,sy,height:150+(row*19+col*31)%105,variant:(col+row)%3};
})).flat().filter(b=>b!==null).sort((a,b)=>a.sy-b.sy);

const cityBoundary='M-220-450H1390V35Q1290 25 1190 35Q1030 20 910-65Q715-90 670-5Q630 100 595 190Q550 330 450 380L-220 420Z';
const transitionPath='M-180 310Q150 310 465 345Q575 270 620 155Q655 80 730 70L815 95Q705 225 670 335Q600 470 455 555L-180 650Z';
const transitionProps=Array.from({length:32},(_,i)=>{
  const t=i/31;
  return {x:-60+t*670,y:555-t*310+Math.sin(i*1.8)*42,kind:i%4};
});
export function MetropolisTransitionGround(){return <g stroke="none" strokeWidth="0" pointerEvents="none" aria-label="Transição arborizada entre a metrópole e a vila">
  <defs>
    <pattern id="city-fringe-texture" width="43" height="37" patternUnits="userSpaceOnUse"><rect width="43" height="37" fill="#CACBA8"/><path d="M3 8l6-2M26 27l5 1M13 31l3-3" stroke="#A4B28A" strokeWidth="1"/><circle cx="33" cy="9" r="1.3" fill="#E2D8B8"/></pattern>
    <filter id="city-fringe-soft"><feGaussianBlur stdDeviation="14"/></filter>
    <mask id="city-fringe-mask"><path d={transitionPath} fill="white" filter="url(#city-fringe-soft)"/></mask>
  </defs>
  <g mask="url(#city-fringe-mask)"><path d={transitionPath} fill="url(#city-fringe-texture)"/>
    <path d="M-180 490Q120 430 355 440Q505 420 580 290Q625 185 735 95" fill="none" stroke="#DCD6BD" strokeWidth="64"/>
    <path d="M-180 490Q120 430 355 440Q505 420 580 290Q625 185 735 95" fill="none" stroke="#E9E2CE" strokeWidth="42"/>
    <path d="M360 440Q470 515 570 595" fill="none" stroke="#E9E2CE" strokeWidth="35"/>
    {Array.from({length:45},(_,i)=><path key={i} d={`M${-130+i*19} ${380+Math.sin(i)*75}l8 4-3 2`} fill="none" stroke="#8DAB77" strokeWidth="2" opacity=".45"/>)}
  </g>
<TransitionProps/>
</g>;}
function TransitionProps(){return <g pointerEvents="none">{transitionProps.map((a,i)=><g key={`city-transition-${i}`} transform={`translate(${a.x} ${a.y})`}>
  {a.kind<2?<image href="/images/modular/rosa-arvore-isometrica-v01.png" x="-40" y="-60" width="80" height="60"/>:a.kind===2?<image href="/images/modular/parque-banco-v01.png" x="-22" y="-31" width="44" height="35"/>:<image href="/images/modular/floreira-detalhada-v01.png" x="-21" y="-22" width="42" height="28"/>}
</g>)}</g>;}
export default function NorthMetropolis(){return <g data-layer="north-metropolis" pointerEvents="none" aria-label="Metrópole que continua além da borda superior do mapa">
  <defs><linearGradient id="city-desert-fringe" x1="760" y1="0" x2="1390" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#DAD8C7"/><stop offset=".55" stopColor="#DED7BD"/><stop offset="1" stopColor="#E8CFA0"/></linearGradient><clipPath id="metropolis-boundary"><path d={cityBoundary}/></clipPath><filter id="city-edge-soft"><feGaussianBlur stdDeviation="10"/></filter><mask id="city-ground-mask"><path d={cityBoundary} fill="white" filter="url(#city-edge-soft)"/></mask></defs>
  <g clipPath="url(#metropolis-boundary)" mask="url(#city-ground-mask)">
    <path d={cityBoundary} fill="url(#city-desert-fringe)"/>
    {[-240,-90,60,210].map(y=><g key={y}><path d={`M-220 ${y}L1400 ${y+935}`} stroke="#DAD5C3" strokeWidth="56"/><path d={`M-220 ${y}L1400 ${y+935}`} stroke="#747976" strokeWidth="38"/><path d={`M-220 ${y}L1400 ${y+935}`} stroke="#D8CB91" strokeWidth="1.5" strokeDasharray="12 15"/></g>)}
  </g>
    {blocks.map(b=><g key={b.id} transform={`translate(${b.sx} ${b.sy})`} data-metropolis-building={b.id}>
      <path d="M-47 0L0-27 47 0 0 27Z" fill="#E4DDC8"/>
      {b.variant===1?<image href="/images/modular/metropole-residencial-v01.png" x={-565*b.height/1370} y={-1400*b.height/1370} width={1105*b.height/1370} height={1424*b.height/1370}/>:<image href="/images/modular/metropole-escritorios-v01.png" x={-730*b.height/1060} y={-1080*b.height/1060} width={1415*b.height/1060} height={1111*b.height/1060}/>}
      <image href="/images/modular/poste-detalhado-v01.png" x="40" y="-31" width="20" height="30"/>
      <image href="/images/modular/floreira-detalhada-v01.png" x="-45" y="5" width="27" height="18"/>


    </g>)}
  {blocks.filter(b=>b.sy===335 && b.sx<440).map((b,i)=>{
    const art=fillerRenderedAssets[i%2?'north-residence-coral':'north-corner-store'];
    return <g key={`shop-${b.id}`} transform={`translate(${b.sx+45} ${b.sy+38}) ${uprightProjection(art.risingSlope,art.fallingSlope).transform} scale(${art.scale*.48})`}><image href={`/images/modular/${art.file}`} x={-art.anchorX} y={-art.anchorY} width={art.width} height={art.height}/></g>;
  })}
<TransitionProps/>
</g>;}
