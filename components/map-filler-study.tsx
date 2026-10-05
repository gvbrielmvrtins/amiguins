import { projectGround, uprightProjection } from '@/lib/map-projection';
import { fillerBuildings } from '@/lib/map-filler';
import { fillerRenderedAssets } from '@/lib/filler-rendered-assets';

export function FillerGround() {
  return <g data-layer="filler-ground-study" pointerEvents="none" strokeWidth="2.5" strokeLinejoin="round">
    <path d="M92-263H917Q947-263 947-223V-8Q947 17 917 17H92Z" fill="#B6A487" stroke="#1C1C1C" strokeWidth="3"/>
    <path d="M85-270H910Q940-270 940-230V-15Q940 10 910 10H85Z" fill="#FFFAE9" stroke="#1C1C1C" strokeWidth="3"/>
    <path d="M97-258H906Q928-258 928-228V-18Q928-2 906-2H97Z" fill="none" stroke="#F889BA" strokeWidth="7"/>
    <path d="M-323 137Q-333 107-283 107H-28V867H-283Q-323 867-323 827Z" fill="#B6A487" stroke="#1C1C1C" strokeWidth="3"/>
    <path d="M-330 130Q-340 100-290 100H-35V860H-290Q-330 860-330 820Z" fill="#FFFAE9" stroke="#1C1C1C" strokeWidth="3"/>
    <path d="M-320 133Q-328 112-289 112H-47V848H-289Q-318 848-318 818Z" fill="none" stroke="#F77B5D" strokeWidth="7"/>
    <path d="M-340-240Q-335-320-230-320H-70Q-15-300-15-235V-20Q-15 0-40 0H-285Q-330 0-340-40Z" fill="#9CBA78" stroke="#547653"/>
    <defs><clipPath id="park-lawn"><path d="M-340-240Q-335-320-230-320H-70Q-15-300-15-235V-20Q-15 0-40 0H-285Q-330 0-340-40Z"/></clipPath></defs>
    <image href="/images/modular/parque-grama-v01.png" x="-340" y="-320" width="325" height="320" preserveAspectRatio="none" clipPath="url(#park-lawn)" opacity=".78"/>

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
