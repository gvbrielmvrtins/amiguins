import {projectGround} from '@/lib/map-projection';
import type {BeachProp as BeachItem} from '@/lib/beach-layout';
import CivicRenderedProp from './civic-rendered-prop';
export default function BeachProp({item}:{item:BeachItem}){
 const at=projectGround(item.x,item.y);
 return <g data-beach-prop={item.id} transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-hidden="true">
 <g transform={item.kind==='beachShell'?'scale(1 .6)':undefined}><CivicRenderedProp kind={item.kind}/></g>
 </g>;
}
