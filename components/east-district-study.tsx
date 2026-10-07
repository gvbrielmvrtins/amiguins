import CivicRenderedProp from './civic-rendered-prop';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import {eastLots} from '@/lib/east-district-study';
function TavernFurniture(){return <g data-tavern-furniture="rendered">
  <CivicRenderedProp kind="tavernRoundTable" x={-115} y={120}/>
  <CivicRenderedProp kind="tavernRoundTable" x={-20} y={145}/>
  <CivicRenderedProp kind="tavernRoundTable" x={85} y={120}/>
</g>;}
function TavernDucks(){return <g pointerEvents="none" data-tavern-ducks="decorative">
  {[[-130,50],[-60,175],[100,160],[80,60]].map(([x,y],i)=><g key={`tavern-duck-${i}`} transform={`translate(${(x-y)*.5196152423} ${(x+y)*.3}) scale(${i%2?-1:1} 1)`}><image href="/images/modular/taverna-pato-v01.png" x="-13" y="-23" width="26" height="24"/></g>)}
</g>;}
function Building({kind}:{kind:string}){return <g stroke={p.ink} strokeWidth="2" strokeLinejoin="round">
  {kind==='taverna-joguins' && <>
    <CivicRenderedProp kind="tavern" y={-55}/>
    <TavernFurniture/>
    <TavernDucks/>
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
  <defs><linearGradient id="tavern-road-edge" x1="0" y1="-130" x2="0" y2="-90" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0"/><stop offset="1" stopColor="white"/></linearGradient><linearGradient id="tavern-road-side" x1="-255" y1="0" x2="-200" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0"/><stop offset="1" stopColor="white"/></linearGradient><linearGradient id="tavern-forest-tone" x1="120" y1="0" x2="325" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#35513B" stopOpacity="0"/><stop offset="1" stopColor="#35513B" stopOpacity=".28"/></linearGradient><mask id="tavern-road-top-mask" x="-270" y="-140" width="630" height="380"><rect x="-270" y="-140" width="630" height="380" fill="url(#tavern-road-edge)"/></mask><mask id="tavern-road-side-mask" x="-270" y="-140" width="630" height="380"><rect x="-270" y="-140" width="630" height="380" fill="url(#tavern-road-side)"/></mask><radialGradient id="valley-ground-fade" cx=".43" cy=".4" r=".7"><stop offset=".58" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient><mask id="valley-ground-soft-edge" x="-235" y="-245" width="510" height="510"><rect x="-235" y="-245" width="510" height="510" fill="url(#valley-ground-fade)"/></mask></defs>
  {eastLots.map(l=><g key={l.id} transform={`translate(${l.x} ${l.y})`}>
    {l.id==='taverna-joguins'?<><g mask="url(#tavern-road-top-mask)"><g mask="url(#tavern-road-side-mask)"><path d="M-248-108Q-80-112 90-105L345-104V215L160 210Q20 188-100 205Q-222 206-244 145Z" fill="url(#civic-grass)" stroke="none"/><path d="M-248-108Q-80-112 90-105L345-104V215L160 210Q20 188-100 205Q-222 206-244 145Z" fill="url(#tavern-forest-tone)" stroke="none"/></g></g><path d="M-167 75Q-160 10-95-50Q-30-92 40-73L133-30Q170 60 112 117L-67 144Q-130 125-167 75Z" fill="#DAC9A5" stroke="none"/></>:l.id==='silicin-valley'?<path d="M-210-165Q-170-220-55-208L130-205Q213-185 224-65L215 105Q195 180 90 207L-100 205Q-214 172-217 65Z" fill="#FFFAE9" stroke="none" mask="url(#valley-ground-soft-edge)"/>:<>
      <rect x={-l.w/2+6} y={-l.h/2+6} width={l.w} height={l.h} rx="30" fill="#B6A487"/>
      <rect x={-l.w/2} y={-l.h/2} width={l.w} height={l.h} rx="30" fill="#FFFAE9"/>
      <rect x={-l.w/2+12} y={-l.h/2+12} width={l.w-24} height={l.h-24} rx="22" fill={l.id==='east-garden'?'url(#civic-grass)':'none'} stroke={l.color} strokeWidth="6"/>
    </>}
  </g>)}
</g>;}

export function EastFiller({item}:{item:{id:string;x:number;y:number}}){const at=projectGround(item.x,item.y);return <g transform={`translate(${at.x} ${at.y})`} aria-label={item.id==='east-cafe'?'Café de apoio renderizado':'Jardim de convivência'}><Building kind={item.id}/></g>;}
export default function EastDestination({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const at=projectGround(d.x-100,d.y-100);return <g id={`destination-${d.id}`} className={`modular-destination ${selected===d.id?'is-selected':''}`} transform={`translate(${at.x} ${at.y})`} role="group" aria-label={d.name}><Building kind={d.id}/></g>;}















