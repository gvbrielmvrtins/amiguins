import { projectGround } from '@/lib/map-projection';
import { parkStudyProps } from '@/lib/map-filler';
import { parkRenderedAssets } from '@/lib/park-rendered-assets';

type Prop = typeof parkStudyProps[number];
const point=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
function Board({ x,y,w,d,z }: { x:number;y:number;w:number;d:number;z:number }) {
  return <polygon points={[[x,y],[x+w,y],[x+w,y+d],[x,y+d]].map(([a,b])=>point(a,b,z)).join(' ')} fill="#B88656"/>;
}
export default function ParkStudyProp({ item }: { item:Prop }) {
  const at=projectGround(item.x,item.y);
  const art=parkRenderedAssets[item.kind];
  if (art) return <g data-park-study={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true"><image href={`/images/modular/${art.file}`} x={-art.anchorX*art.scale} y={-art.anchorY*art.scale} width={art.width*art.scale} height={art.height*art.scale}/></g>;
  const tree=item.kind==='oak'||item.kind==='birch'||item.kind==='pine';
  return <g data-park-study={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true" stroke="#384B37" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
    <ellipse cx="8" cy="3" rx={tree?23:27} ry="8" fill="#405A36" opacity=".15" stroke="none"/>
    {tree && <>
      <path d="M-9 3L-3-8L-4-50H4L3-8L11 4L2 0L-1-5L-3 1Z" fill={item.kind==='birch'?'#EFE8CE':'#9B6A42'}/>
      <path d="M0-25L-15-47M1-36L13-57" fill="none" stroke={item.kind==='birch'?'#EFE8CE':'#9B6A42'} strokeWidth="5"/>
      {item.kind==='oak' && <path d="M-30-49Q-40-65-23-71Q-24-90-6-86Q9-101 23-83Q43-83 37-66Q48-51 27-43Q10-34 0-43Q-20-33-30-49Z" fill="#6C9959"/>}
      {item.kind==='birch' && <><path d="M-16-43Q-28-58-19-77Q-23-94-8-101Q6-112 18-95Q30-78 21-65Q27-49 10-42Z" fill="#A6BC6C"/><path d="M-3-17H3M-3-27H2M-3-38H3" stroke="#626950"/></>}
      {item.kind==='pine' && <path d="M0-100L18-77H10L28-54H17L35-32Q0-20-35-32L-17-54H-28L-10-77H-18Z" fill="#42795D"/>}
    </>}
    {item.kind==='bench' && <g stroke="#594C3D">
      {[-30,24].map(x=><path key={x} d={`M${point(x,-8,0)}L${point(x,-8,18)}L${point(x,9,18)}L${point(x,9,0)}M${point(x,-8,18)}L${point(x,-8,36)}`} fill="none" strokeWidth="3"/>)}
      <Board x={-35} y={-10} w={70} d={20} z={18}/>
      {[24,32].map(z=><polygon key={z} points={[point(-35,-10,z),point(35,-10,z),point(35,-10,z+5),point(-35,-10,z+5)].join(' ')} fill="#B88656"/>)}
    </g>}
    {item.kind==='picnic' && <g stroke="#594C3D">
      {[-27,27].map(x=><g key={x}><path d={`M${point(x,-21)}L${point(x,12,28)}M${point(x,21)}L${point(x,-12,28)}`} fill="none" strokeWidth="4"/></g>)}
      <Board x={-40} y={-17} w={80} d={34} z={29}/>
      <Board x={-40} y={-32} w={80} d={11} z={14}/>
      <Board x={-40} y={21} w={80} d={11} z={14}/>
      <path d={`M${point(-40,0,29)}L${point(40,0,29)}`} strokeWidth="1"/>
    </g>}
  </g>;
}
