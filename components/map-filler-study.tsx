import { projectGround, uprightProjection } from '@/lib/map-projection';
import { fillerBuildings } from '@/lib/map-filler';
import { fillerRenderedAssets } from '@/lib/filler-rendered-assets';

export function FillerGround() {
  return <g data-layer="filler-ground-study" pointerEvents="none" strokeWidth="2.5" strokeLinejoin="round">
    <g transform="translate(-170 -155)">
      <rect x="-175" y="-150" width="350" height="300" rx="18" fill="#F4D7CC" stroke="#F0B981"/>
      {Array.from({length:100},(_,i)=><path key={i} d={`M${-160+(i%20)*16.5} ${-133+Math.floor(i/20)*60+Math.sin(i)*12}l4 3`} stroke={['#F77B5D','#FAD846','#3774FA','#A163BF','#63A77C'][i%5]} strokeWidth="3"/>)}
    </g>

  </g>;
}

type Building = typeof fillerBuildings[number];
// Project horizontal faces only; heights stay upright in screen space.
const pt = (x: number,y: number,z=0) => `${(x-y)*.5196152423},${(x+y)*.3-z}`;
export default function FillerBuilding({ item: b }: { item: Building }) {
  const at=projectGround(b.x,b.y);
  const art=fillerRenderedAssets[b.id];
  if (art) {
    const corner=projectGround(b.x+b.w,b.y);
    return <g data-filler-building={b.id} pointerEvents="none" aria-hidden="true">
      <g transform={`translate(${corner.x} ${corner.y})`}>
        <g transform={uprightProjection(art.risingSlope,art.fallingSlope).transform}>
          <image href={`/images/modular/${art.file}`} x={-art.anchorX*art.scale} y={-art.anchorY*art.scale} width={art.width*art.scale} height={art.height*art.scale}/>
        </g>
      </g>
    </g>;
  }
  const east=b.id.startsWith('west-');
  const frontWidth=east ? b.d : b.w;
  const facade=(points: number[][])=>polygon(points.map(([x,y,z])=>east ? [b.w+y,-x,z] : [x,y,z]));
  const polygon=(points: number[][])=>points.map(([x,y,z])=>pt(x,y,z)).join(' ');
  return <g data-filler-building={b.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true" stroke="#1C1C1C" strokeWidth="2.5" strokeLinejoin="round">
    <polygon points={polygon([[0,0,0],[b.w,0,0],[b.w,-b.d,0],[0,-b.d,0]])} fill="#1C1C1C" opacity=".1" stroke="none" transform="translate(8 5)"/>
    <polygon points={polygon([[0,0,0],[b.w,0,0],[b.w,0,b.h],[0,0,b.h]])} fill={b.color}/>
    <polygon points={polygon([[b.w,0,0],[b.w,-b.d,0],[b.w,-b.d,b.h],[b.w,0,b.h]])} fill={b.color}/>
    <polygon points={polygon([[b.w,0,0],[b.w,-b.d,0],[b.w,-b.d,b.h],[b.w,0,b.h]])} fill="#1C1C1C" fillOpacity=".16"/>
    <polygon points={polygon([[0,0,b.h],[b.w,0,b.h],[b.w,-b.d,b.h],[0,-b.d,b.h]])} fill="#FFFEF9"/>
    <polygon points={facade([[frontWidth*.42,0,0],[frontWidth*.65,0,0],[frontWidth*.65,0,30],[frontWidth*.42,0,30]])} fill="#3774FA"/>
    {[22,frontWidth-42].map(x=><polygon key={x} points={facade([[x,0,14],[x+23,0,14],[x+23,0,36],[x,0,36]])} fill="#A5CADA" stroke="#FFFEF9"/>)}
    {b.h>70 && [22,frontWidth*.45,frontWidth-38].map(x=><polygon key={x} points={facade([[x,0,b.h-40],[x+20,0,b.h-40],[x+20,0,b.h-18],[x,0,b.h-18]])} fill="#3774FA" stroke="#FFFEF9"/>)}
    {b.shop && <g>
      <polygon points={facade([[8,0,42],[frontWidth-8,0,42],[frontWidth-8,23,37],[8,23,37]])} fill="#FFFEF9"/>
      {[0,2,4,6].map(i=><polygon key={i} points={facade([[8+i*(frontWidth-16)/8,0,42],[8+(i+1)*(frontWidth-16)/8,0,42],[8+(i+1)*(frontWidth-16)/8,23,37],[8+i*(frontWidth-16)/8,23,37]])} fill="#F889BA" stroke="none"/>)}
    </g>}
  </g>;
}
