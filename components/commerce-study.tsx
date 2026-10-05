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
export function CommerceGround(){return <g data-layer="commerce-study-ground">{commerceLots.map(l=><g key={l.id} transform={`translate(${l.x} ${l.y})`}><rect x="-204" y="-204" width="420" height="420" rx="25" fill="#B6A487"/><rect x="-210" y="-210" width="420" height="420" rx="25" fill={p.cream} stroke={p.ink} strokeWidth="3"/><rect x="-198" y="-198" width="396" height="396" rx="18" fill="none" stroke={l.color} strokeWidth="6"/></g>)}</g>;}
export default function CommerceStudy({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){
 const lot=commerceLots.find(l=>l.id===d.id)!;
 const at=projectGround(lot.x,lot.y);
 return <g id={`destination-${d.id}`} transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="button" tabIndex={0} aria-label={`Examinar ${d.name}`} aria-pressed={selected===d.id} onClick={()=>onSelect(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(d.id,true);}}}><title>{`${d.name} — espaço renderizado`}</title><Props kind={d.id}/></g>;
}









