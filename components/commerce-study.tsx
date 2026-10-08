import VendinhasFair from './vendinhas-fair-study';
import CivicRenderedProp from './civic-rendered-prop';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import {commerceLots} from '@/lib/commerce-study';
function Props({kind}:{kind:string}){
 if(kind==='academia-marombins')return <>
  <CivicRenderedProp kind="commerceGym" x={-55} y={-80}/>
  <CivicRenderedProp kind="commerceRig" x={-115} y={110}/><CivicRenderedProp kind="commerceWeights" x={35} y={110}/>
 </>;
 if(kind==='oficina-vendinhas')return <VendinhasFair/>;
 return <CivicRenderedProp kind="commerceBistro" x={-30} y={-85}/>;
}
export function CommerceGround(){return null;}
export default function CommerceStudy({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){
 const lot=commerceLots.find(l=>l.id===d.id)!;
 const at=projectGround(lot.x,lot.y);
 return <g id={`destination-${d.id}`} transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="group" aria-label={d.name}><Props kind={d.id}/></g>;
}









