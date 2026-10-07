import {projectGround} from '@/lib/map-projection';
import CivicRenderedProp from './civic-rendered-prop';

// Screen offsets keep the rainbow silhouette clear while the crowd fills the plaza.
const groups=[
  {x:-114,y:-30},{x:114,y:-30},
  {x:-114,y:18},{x:114,y:18},
  {x:-70,y:62},{x:0,y:80},{x:70,y:62},{x:0,y:50},
];
export default function PrideParade(){
  const at=projectGround(-170,-155);
  return <g id="destination-espacin-coloridin" role="group" aria-label="cantIN coloridIN — Parada do Orgulho LGBT" pointerEvents="none" transform={`translate(${at.x} ${at.y})`}>
    <g transform="translate(0 -8)"><CivicRenderedProp kind="prideRainbow"/></g>
    {groups.map((p,i)=><g key={i} transform={`translate(${p.x} ${p.y}) scale(.8)`}>
      <CivicRenderedProp kind={i%2?'prideCrowd2':'prideCrowd1'}/>
    </g>)}
  </g>;
}
