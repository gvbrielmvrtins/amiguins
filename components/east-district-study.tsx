import {MovableMapElement,MapElementScope} from './map-layout-editor';
import {useContext} from 'react';
import {streetLanes} from './map-streets';
import CivicRenderedProp from './civic-rendered-prop';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import {eastLots} from '@/lib/east-district-study';
function TavernFurniture(){return <g data-tavern-furniture="rendered">
  <CivicRenderedProp kind="tavernRoundTable" x={-115} y={120}/>
  <CivicRenderedProp kind="tavernRoundTable" x={-20} y={145}/>
  <CivicRenderedProp kind="tavernRoundTable" x={85} y={120}/>
</g>;}
function TavernDucks(){const scope=useContext(MapElementScope);return <g pointerEvents="none" data-tavern-ducks="decorative">
  {[[-130,50],[-60,175],[100,160],[80,60]].map(([x,y],i)=><MovableMapElement key={`tavern-duck-${i}`} id={`${scope}/duck/${i}`}><g transform={`translate(${(x-y)*.5196152423} ${(x+y)*.3}) scale(${i%2?-1:1} 1)`}><image href="/images/modular/taverna-pato-v01.png" x="-13" y="-23" width="26" height="24"/></g></MovableMapElement>)}
</g>;}
function Building({kind}:{kind:string}){return <g stroke={p.ink} strokeWidth="2" strokeLinejoin="round">
  {kind==='taverna-joguins' && <>
    <CivicRenderedProp kind="tavern" y={-55}/>
    <MovableMapElement id="tavern-roof-pizza-slice"><image href="/images/modular/fatia-pizza-telhado-v01.png" x="-50" y="-150" width="48" height="34" pointerEvents="none"/></MovableMapElement>
    <TavernFurniture/>
    <TavernDucks/>
    <MovableMapElement id="tavern-pizza-delivery-man"><image href="/images/modular/entregador-pizza-v01.png" x="-55" y="-40" width="40" height="69" pointerEvents="none"/></MovableMapElement>
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
  {kind.startsWith('valley-robot-') && <g pointerEvents="none" transform={kind.endsWith('-b')?'scale(-1 1)':undefined}>
    <image href={`/images/modular/silicin-${kind.includes('walle')?'walle':kind.includes('humanoid')?'humanoide':'aspirador'}-v01.png?v=1`} x={kind.includes('vacuum')?-9:-13} y={kind.includes('vacuum')?-10:-31} width={kind.includes('vacuum')?18:26} height={kind.includes('vacuum')?11:32}/>
  </g>}
  {kind==='valley-ring' && <CivicRenderedProp kind="valleyRing"/>}
  {kind==='east-cafe' && <CivicRenderedProp kind="eastCafe" x={-40} y={-35}/>}
</g>;}
export function EastGround(){return <g data-layer="east-district-study-ground" stroke={p.ink} strokeWidth="3">
  <defs>
    <mask id="valley-clear-streets" maskUnits="userSpaceOnUse" x="0" y="0" width="4400" height="3600">
      <rect width="4400" height="3600" fill="white" stroke="none"/>
      <path d={streetLanes.join(' ')} fill="none" stroke="black" strokeWidth="116" strokeLinecap="round" strokeLinejoin="round"/>
    </mask>
    <pattern id="tavern-grass-continuous" patternUnits="userSpaceOnUse" x="-270" y="-140" width="630" height="380"><rect width="630" height="380" fill="#9CBA78"/><image href="/images/modular/parque-grama-v01.png" width="630" height="380" preserveAspectRatio="none" opacity=".78"/></pattern>
    <pattern id="valley-concrete-paving" width="96" height="64" patternUnits="userSpaceOnUse">
      <rect width="96" height="64" fill="#AAA99F" stroke="none"/>
      <rect x=".9" y=".9" width="46.2" height="30.2" rx=".6" fill="#D0CFC6" stroke="none"/>
      <rect x="48.9" y=".9" width="46.2" height="30.2" rx=".6" fill="#C8C8BF" stroke="none"/>
      <rect x="-23.1" y="32.9" width="46.2" height="30.2" rx=".6" fill="#C4C5BD" stroke="none"/>
      <rect x="24.9" y="32.9" width="46.2" height="30.2" rx=".6" fill="#CDCDC4" stroke="none"/>
      <rect x="72.9" y="32.9" width="46.2" height="30.2" rx=".6" fill="#C4C5BD" stroke="none"/>
      <path d="M2 29V2H46M50 29V2H94M26 61V34H70" fill="none" stroke="#ECEBE2" strokeWidth=".65" opacity=".65"/>
      {Array.from({length:52},(_,i)=><circle key={i} cx={(i*37+7)%96} cy={(i*23+11)%64} r={i%3===0?.6:.35} fill={i%2?'#8F9188':'#F0EEE5'} stroke="none" opacity=".3"/>)}
      <path d="M11 17l2-.5m43 4 2 .4m-18 25 2-.4m45 4 2 .3" stroke="#999C92" strokeWidth=".55" opacity=".3"/>
    </pattern>
    <linearGradient id="tavern-road-edge" x1="0" y1="-130" x2="0" y2="-90" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0"/><stop offset="1" stopColor="white"/></linearGradient><linearGradient id="tavern-road-side" x1="-255" y1="0" x2="-200" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="white" stopOpacity="0"/><stop offset="1" stopColor="white"/></linearGradient><linearGradient id="tavern-forest-tone" x1="120" y1="0" x2="325" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#35513B" stopOpacity="0"/><stop offset="1" stopColor="#35513B" stopOpacity=".28"/></linearGradient><mask id="tavern-road-top-mask" x="-270" y="-140" width="630" height="380"><rect x="-270" y="-140" width="630" height="380" fill="url(#tavern-road-edge)"/></mask><mask id="tavern-road-side-mask" x="-270" y="-140" width="630" height="380"><rect x="-270" y="-140" width="630" height="380" fill="url(#tavern-road-side)"/></mask><radialGradient id="valley-ground-fade" cx=".43" cy=".4" r=".7"><stop offset=".58" stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></radialGradient><mask id="valley-ground-soft-edge" x="-235" y="-245" width="510" height="510"><rect x="-235" y="-245" width="510" height="510" fill="url(#valley-ground-fade)"/></mask></defs>
  {eastLots.map(l=><g key={l.id} mask={l.id==='valley-ring'||l.id==='silicin-valley'?'url(#valley-clear-streets)':undefined}><g transform={`translate(${l.x} ${l.y})`}>
    {l.id==='taverna-joguins'?<><g mask="url(#tavern-road-top-mask)"><g mask="url(#tavern-road-side-mask)"><path d="M-248-108Q-80-112 90-105L345-104V215L160 210Q20 188-100 205Q-222 206-244 145Z" fill="url(#tavern-grass-continuous)" stroke="none"/><path d="M-248-108Q-80-112 90-105L345-104V215L160 210Q20 188-100 205Q-222 206-244 145Z" fill="url(#tavern-forest-tone)" stroke="none"/></g></g><path d="M-167 75Q-160 10-95-50Q-30-92 40-73L133-30Q170 60 112 117L-67 144Q-130 125-167 75Z" fill="#DAC9A5" stroke="none"/></>:l.id==='valley-ring'?<path d="M-210-72Q-190-95-95-85L180-85Q220-65 225 30L215 365Q100 395-140 365L-215 260Z" fill="url(#valley-concrete-paving)" stroke="none"/>:l.id==='silicin-valley'?<path d="M-210-165Q-170-220-55-208L130-205Q213-185 224-65L215 105Q195 180 90 207L-100 205Q-214 172-217 65Z" fill="url(#valley-concrete-paving)" stroke="none" mask="url(#valley-ground-soft-edge)"/>:<>
    </>}
  </g></g>)}
</g>;}

export function EastFiller({item}:{item:{id:string;x:number;y:number}}){const at=projectGround(item.x,item.y);return <g transform={`translate(${at.x} ${at.y})`} pointerEvents="none" aria-label={item.id==='east-cafe'?'Café de apoio renderizado':item.id.startsWith('valley-')?'Campus e robôs do silicIN valley':'Jardim de convivência'}><Building kind={item.id}/></g>;}
export default function EastDestination({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const at=projectGround(d.x-100,d.y-100);return <g id={`destination-${d.id}`} className={`modular-destination ${selected===d.id?'is-selected':''}`} transform={`translate(${at.x} ${at.y})`} role="group" aria-label={d.name}><Building kind={d.id}/></g>;}














