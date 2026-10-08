import {projectGround} from '@/lib/map-projection';
import CivicRenderedProp from './civic-rendered-prop';
import {MovableMapElement} from './map-layout-editor';

// One independent instance of each existing illustration, ready for local editing.
const groups=[
  {id:'coloridin-folioes-a',kind:'prideCrowd1',x:-150,y:70},
  {id:'coloridin-folioes-b',kind:'prideCrowd2',x:-45,y:70},
];
export default function PrideParade(){
  const at=projectGround(-170,-155);
  return <g id="destination-espacin-coloridin" role="group" aria-label="cantIN coloridIN — Parada do Orgulho LGBT" pointerEvents="none" transform={`translate(${at.x} ${at.y})`}>
    <g transform="translate(0 -8)"><CivicRenderedProp kind="prideRainbow"/></g>
    {groups.map(p=><MovableMapElement key={p.id} id={p.id}>
      <g transform={`translate(${p.x} ${p.y}) scale(.8)`}>
        <CivicRenderedProp kind={p.kind}/>
      </g>
    </MovableMapElement>)}
  </g>;
}
