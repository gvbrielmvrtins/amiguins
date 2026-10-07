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
export function EastGround(){return <g data-layer="east-district-study-ground" stroke={p.ink} strokeWidth="3">
  <defs><radialGradient id="valley-ground-fade" cx=".43" cy=".4" r=".7"><stop offset=".58" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient><mask id="valley-ground-soft-edge" x="-235" y="-245" width="510" height="510"><rect x="-235" y="-245" width="510" height="510" fill="url(#valley-ground-fade)"/></mask></defs>
  {eastLots.map(l=><g key={l.id} transform={`translate(${l.x} ${l.y})`}>
    {l.id==='silicin-valley'?<path d="M-210-165Q-170-220-55-208L130-205Q213-185 224-65L215 105Q195 180 90 207L-100 205Q-214 172-217 65Z" fill="#FFFAE9" stroke="none" mask="url(#valley-ground-soft-edge)"/>:<>
      <rect x={-l.w/2+6} y={-l.h/2+6} width={l.w} height={l.h} rx="30" fill="#B6A487"/>
      <rect x={-l.w/2} y={-l.h/2} width={l.w} height={l.h} rx="30" fill="#FFFAE9"/>
      <rect x={-l.w/2+12} y={-l.h/2+12} width={l.w-24} height={l.h-24} rx="22" fill={l.id==='east-garden'?'url(#civic-grass)':'none'} stroke={l.color} strokeWidth="6"/>
    </>}
  </g>)}
</g>;}

export function EastFiller({item}:{item:{id:string;x:number;y:number}}){const at=projectGround(item.x,item.y);return <g transform={`translate(${at.x} ${at.y})`} aria-label={item.id==='east-cafe'?'Café de apoio renderizado':'Jardim de convivência'}><Building kind={item.id}/></g>;}
export default function EastDestination({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const at=projectGround(d.x-100,d.y-100);return <g id={`destination-${d.id}`} className={`modular-destination ${selected===d.id?'is-selected':''}`} transform={`translate(${at.x} ${at.y})`} role="group" aria-label={d.name}><Building kind={d.id}/></g>;}















