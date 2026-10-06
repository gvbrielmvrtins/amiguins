import {projectGround} from '@/lib/map-projection';
import type {SavannaItem} from '@/lib/savanna-layout';
import CivicRenderedProp from './civic-rendered-prop';
export default function SavannaProp({item}:{item:SavannaItem}){
 const at=projectGround(item.x,item.y);
 return <g data-savanna-prop={item.id} transform={`translate(${at.x} ${at.y}) scale(${item.mirror?-item.scale:item.scale} ${item.scale})`} pointerEvents="none" aria-hidden="true">
 <CivicRenderedProp kind={item.kind}/>
 </g>;
}
