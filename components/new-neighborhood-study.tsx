import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import PilotLandscapeProp from './pilot-landscape-prop';
import CivicRenderedProp from './civic-rendered-prop';

function LocalLandscape(props:React.ComponentProps<typeof PilotLandscapeProp>){return <g transform="translate(-1080 -220)"><PilotLandscapeProp {...props}/></g>;}
const pt=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
const riverPath='M2100 3600C2130 2700 2170 2050 2300 1550Q2400 1270 2850 1330L4400 1550';
// Equal 260-unit lots, with 80 units of circulation between every row and column.
const africanLots=[
  {id:'pavilhao',x:0,y:0,width:260,depth:260,color:p.coral,art:'africaPavilion'},
  {id:'comercio',x:340,y:0,width:260,depth:260,color:p.yellow,art:'africaShop'},
  {id:'banca-oeste',x:0,y:340,width:260,depth:260,color:p.pink,art:'africaStall'},
  {id:'banca-leste',x:340,y:340,width:260,depth:260,color:p.pink,art:'africaStall'},
  {id:'residencia-oeste',x:0,y:680,width:260,depth:260,color:p.blue,art:'africaHome'},
  {id:'residencia-leste',x:340,y:680,width:260,depth:260,color:p.blue,art:'africaHome'},
];
function AfricanBuildingLots(){return <g aria-label="Terrenos individuais em relevo do bairro de Países africanos">{africanLots.map(lot=><g key={lot.id} transform={`translate(${lot.x} ${lot.y})`}>
  <rect x={-lot.width/2+7} y={-lot.depth/2+7} width={lot.width} height={lot.depth} rx="18" fill="#B6A487" stroke={p.ink} strokeWidth="3"/>
  <rect x={-lot.width/2} y={-lot.depth/2} width={lot.width} height={lot.depth} rx="18" fill={p.cream} stroke={p.ink} strokeWidth="3"/>
  <rect x={-lot.width/2+9} y={-lot.depth/2+9} width={lot.width-18} height={lot.depth-18} rx="12" fill="none" stroke={lot.color} strokeWidth="3"/>
</g>)}</g>;}
// Offset only toward the city; the opposite shore stays flush with the terrain.
const cityBankPath=Array.from({length:161},(_,i)=>{
  const t=i<=100?i/100:(i-100)/60;
  let x:number,y:number,dx:number,dy:number;
  if(i<=100){const s=1-t;x=s*s*s*2100+3*s*s*t*2130+3*s*t*t*2170+t*t*t*2300;y=s*s*s*3600+3*s*s*t*2700+3*s*t*t*2050+t*t*t*1550;dx=3*s*s*30+6*s*t*40+3*t*t*130;dy=3*s*s*-900+6*s*t*-650+3*t*t*-500;}
  else {const s=1-t;x=s*s*2300+2*s*t*2400+t*t*2850;y=s*s*1550+2*s*t*1270+t*t*1330;dx=2*s*100+2*t*450;dy=2*s*-280+2*t*60;}
  const length=Math.hypot(dx,dy);return `${i?'L':'M'}${x+85*dy/length} ${y-85*dx/length}`;
}).join(' ')+` L${4400+85*220/Math.hypot(1550,220)} ${1550-85*1550/Math.hypot(1550,220)}`;
export function NeighborhoodStudyGround(){return <>
  <defs><pattern id="river-water-rendered" width="520" height="520" patternUnits="userSpaceOnUse"><image href="/images/modular/rio-agua-textura-v02.png" width="520" height="520" preserveAspectRatio="none"/></pattern></defs>
  <g data-layer="river-study" strokeLinejoin="round">
    <path d={cityBankPath} transform="translate(7 7)" fill="none" stroke={p.ink} strokeWidth="26"/>
    <path d={cityBankPath} transform="translate(7 7)" fill="none" stroke="#B6A487" strokeWidth="20"/>
    <path d={riverPath} fill="none" stroke={p.ink} strokeWidth="156"/>
    <path d={riverPath} fill="none" stroke="url(#river-water-rendered)" strokeWidth="150"><title>Rio separando a cidade do bairro de Países africanos — água renderizada</title></path>
    <path d={cityBankPath} fill="none" stroke={p.ink} strokeWidth="26"/>
    <path d={cityBankPath} fill="none" stroke={p.cream} strokeWidth="20"><title>Margem do rio do lado da cidade — calçada contínua com relevo</title></path>
  </g>
  <defs>
    <pattern id="coloridin-grass" width="325" height="320" patternUnits="userSpaceOnUse"><rect width="325" height="320" fill="#9CBA78" stroke="none"/><image href="/images/modular/parque-grama-v01.png" width="325" height="320" preserveAspectRatio="none" opacity=".78"/></pattern>

  </defs>
  <g transform="translate(190 1220)"><title>Parque LGBT com gramado e espaços de piquenique</title><rect x="-204" y="-204" width="420" height="420" rx="30" fill="#B6A487" stroke={p.ink} strokeWidth="3"/><rect x="-210" y="-210" width="420" height="420" rx="30" fill="#FFFAE9" stroke={p.ink} strokeWidth="3"/><rect x="-198" y="-198" width="396" height="396" rx="22" fill="url(#coloridin-grass)" stroke="#91AE77" strokeWidth="6"/><circle r="42" fill={p.cream} stroke={p.yellow} strokeWidth="4"/></g>
  <g transform="translate(2680 1775)"><AfricanBuildingLots/></g>
</>;}
export function RiverBridge(){const at=projectGround(2680,1350);return <g transform={`translate(${at.x} ${at.y})`} aria-label="Ponte entre a cidade e o bairro de Países africanos"><title>Ponte — espaço renderizado</title><CivicRenderedProp kind="africaBridge"/></g>;}
export default function NeighborhoodStudy({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const african=d.id==='paises-africanos',at=projectGround(d.x,d.y);return <g id={`destination-${d.id}`} transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="button" tabIndex={0} aria-label={`Examinar ${d.name}`} aria-pressed={selected===d.id} onClick={()=>onSelect(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(d.id,true);}}}>
<title>{d.name} — {african?'bairro renderizado':'parque renderizado'}</title>
{african?<>
  {africanLots.map(lot=><g key={lot.id} transform={`translate(${pt(lot.x,lot.y)})`}>
    <title>{lot.id} — construção e área de convivência</title>
    <LocalLandscape item={{id:`${lot.id}-tree`,kind:'tree',x:85,y:-80,size:55}}/>
    <CivicRenderedProp kind={lot.art} x={-25} y={-30}/>
    <CivicRenderedProp kind="tavernBench" x={-65} y={80}/>
    <LocalLandscape item={{id:`${lot.id}-flowers`,kind:'planter',x:65,y:85}}/>
  </g>)}
</>:<><g><title>Panos de piquenique renderizados</title><CivicRenderedProp kind="coloridinBlanket" x={-120} y={77.5}/><CivicRenderedProp kind="coloridinBlanket" x={120} y={132.5}/></g>
  <g><title>Áreas de convivência LGBT com fonte e mesas de piquenique</title>
    <LocalLandscape item={{id:'coloridin-tree-back',kind:'tree',x:-150,y:-130,size:75}}/>
    <g transform={`translate(${pt(80,-120)}) scale(.65)`}><CivicRenderedProp kind="fonte"/></g>
    <CivicRenderedProp kind="tavernPicnic" x={-125} y={-35}/>
    <CivicRenderedProp kind="tavernPicnic" x={125} y={0}/>
  </g>
  <g aria-label="Bandeira LGBT no centro da praça"><title>Bandeira arco-íris LGBT — marco central de encontro</title>
    <CivicRenderedProp kind="coloridinFlag"/>
  </g>
  <LocalLandscape item={{id:'coloridin-tree-front',kind:'tree',x:-155,y:140,size:75}}/>
</>}
</g>;}
