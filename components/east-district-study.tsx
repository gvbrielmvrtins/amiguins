import CivicRenderedProp from './civic-rendered-prop';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import {eastLots} from '@/lib/east-district-study';
function TavernFurniture(){return <g data-tavern-furniture="rendered">
  <CivicRenderedProp kind="tavernRoundTable" x={-120} y={110}/>
  <CivicRenderedProp kind="tavernRoundTable" x={-65} y={5}/>
  <CivicRenderedProp kind="tavernRoundTable" x={145} y={-10}/>
  <CivicRenderedProp kind="tavernRoundTable" x={5} y={135}/>
  <CivicRenderedProp kind="tavernRoundTable" x={123} y={110}/>
</g>;}
function Building({kind}:{kind:string}){return <g stroke={p.ink} strokeWidth="2" strokeLinejoin="round">
  {kind==='taverna-joguins' && <>
    <CivicRenderedProp kind="tavern" y={-65}/>
    <TavernFurniture/>
  </>}
  {kind==='linkedin' && <>
    <CivicRenderedProp kind="linkedinBuilding" y={-55}/>
    <CivicRenderedProp kind="linkedinTerminal" x={143} y={30}/>

    <CivicRenderedProp kind="linkedinCheckin" x={120} y={148}/>
  </>}
  {kind==='silicin-valley' && <>
    <CivicRenderedProp kind="valleyCampus" y={-70}/>
    <CivicRenderedProp kind="valleyPrototype" x={-127} y={70}/>
    <CivicRenderedProp kind="valleyRobot" x={-18} y={147}/>
    <CivicRenderedProp kind="valleyCycles" x={105} y={40}/>
  </>}
  {kind==='east-cafe' && <CivicRenderedProp kind="eastCafe" x={-40} y={-35}/>}
</g>;}
export function EastGround(){return <g data-layer="east-district-study-ground" stroke={p.ink} strokeWidth="3">{eastLots.map(l=><g key={l.id} transform={`translate(${l.x} ${l.y})`}><rect x={-l.w/2+6} y={-l.h/2+6} width={l.w} height={l.h} rx="30" fill="#B6A487"/><rect x={-l.w/2} y={-l.h/2} width={l.w} height={l.h} rx="30" fill="#FFFAE9"/><rect x={-l.w/2+12} y={-l.h/2+12} width={l.w-24} height={l.h-24} rx="22" fill={l.id==='east-garden'?'url(#civic-grass)':'none'} stroke={l.color} strokeWidth="6"/></g>)}</g>;}
export function EastFiller({item}:{item:{id:string;x:number;y:number}}){const at=projectGround(item.x,item.y);return <g transform={`translate(${at.x} ${at.y})`} aria-label={item.id==='east-cafe'?'Café de apoio renderizado':'Jardim de convivência'}><Building kind={item.id}/></g>;}
export default function EastDestination({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const at=projectGround(d.x-100,d.y-100);return <g id={`destination-${d.id}`} className={`modular-destination ${selected===d.id?'is-selected':''}`} transform={`translate(${at.x} ${at.y})`} role="button" tabIndex={0} aria-label={`Examinar ${d.name}`} aria-pressed={selected===d.id} onClick={()=>onSelect(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(d.id,true);}}}><title>{d.name} — espaço renderizado</title><Building kind={d.id}/></g>;}















