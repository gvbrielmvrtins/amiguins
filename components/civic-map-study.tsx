import { modularDestinations, mapPalette as p, type ModularDestination } from '@/lib/modular-map';
import { projectGround } from '@/lib/map-projection';
import { civicIds, civicLotSize } from '@/lib/civic-study';
import CivicRenderedProp from './civic-rendered-prop';
import { civicRenderedAssets } from '@/lib/civic-rendered-assets';

const point=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
function Face({points,fill}:{points:number[][];fill:string}) {return <polygon points={points.map(([x,y,z])=>point(x,y,z)).join(' ')} fill={fill}/>;}
function Block({x,y,w,d,h,color}:{x:number;y:number;w:number;d:number;h:number;color:string}) {return <>
  <Face fill={color} points={[[x,y,0],[x+w,y,0],[x+w,y,h],[x,y,h]]}/>
  <Face fill={color} points={[[x+w,y,0],[x+w,y-d,0],[x+w,y-d,h],[x+w,y,h]]}/>
  <Face fill="#1C1C1C22" points={[[x+w,y,0],[x+w,y-d,0],[x+w,y-d,h],[x+w,y,h]]}/>
  <Face fill={p.cream} points={[[x,y,h],[x+w,y,h],[x+w,y-d,h],[x,y-d,h]]}/>
</>;}
function Window({x,y,z=35,w=22,h=28}:{x:number;y:number;z?:number;w?:number;h?:number}) {return <Face fill="#A5CADA" points={[[x,y,z],[x+w,y,z],[x+w,y,z+h],[x,y,z+h]]}/>;}
function Arch({x,y}:{x:number;y:number}) {
  const at=point(x,y).split(',');
  return <g transform={`matrix(.5196152423 .3 0 -1 ${at[0]} ${at[1]})`}><path d="M0 0V36Q0 59 17 59Q34 59 34 36V0Z" fill="#A5CADA"/></g>;
}
function Fountain({x=0,y=0}:{x?:number;y?:number}) {
  if(civicRenderedAssets.fonte) return <CivicRenderedProp kind="fonte" x={x} y={y}/>;
  const at=point(x,y).split(',');
  return <g transform={`translate(${at[0]} ${at[1]})`}>
    <ellipse rx="44" ry="25" fill="#D5C6AA"/><ellipse cy="-5" rx="40" ry="23" fill="#87B9D0"/>
    <path d="M-9-8V-32H9V-8Z" fill={p.cream}/><ellipse cy="-32" rx="21" ry="11" fill="#D5C6AA"/>
    <path d="M0-34V-53M0-49Q-19-55-21-33M0-49Q19-55 21-33" fill="none" stroke="#3774FA" strokeWidth="3"/>
  </g>;
}
function GatheringArea() {return <g data-study="square-gathering">
  <CivicRenderedProp kind="pergolado" x={-100} y={250}/>
  <CivicRenderedProp kind="jogos" x={97} y={235}/>
  <CivicRenderedProp kind="palco" x={125} y={125}/>
</g>;}

function TarotArea() {return <g data-study="tarot-reading" aria-label="Espaço de leitura de tarô renderizado"><CivicRenderedProp kind="tarot" x={138} y={-12}/></g>;}

export function CivicGround() {return <g data-layer="civic-study-ground" strokeWidth="3">
  <defs><pattern id="civic-grass" width="325" height="320" patternUnits="userSpaceOnUse"><rect width="325" height="320" fill="#9CBA78"/><image href="/images/modular/parque-grama-v01.png" width="325" height="320" preserveAspectRatio="none" opacity=".78"/></pattern></defs>
  {modularDestinations.filter(d=>civicIds.has(d.id)).map(d=>{const height=d.id==='pracinha'?550:civicLotSize;return <g key={d.id} transform={`translate(${d.x-100} ${d.y-100})`}>
    <rect x={-civicLotSize/2+7} y={-civicLotSize/2+7} width={civicLotSize} height={height} rx="35" fill="#B6A487"/>
    <rect x={-civicLotSize/2} y={-civicLotSize/2} width={civicLotSize} height={height} rx="35" fill="#FFFAE9" stroke={p.ink}/>
    <rect x={-civicLotSize/2+12} y={-civicLotSize/2+12} width={civicLotSize-24} height={height-24} rx="28" fill="none" stroke={p[d.color]} strokeWidth="7"/>
    {d.id==='pracinha' && <rect x="-177" y="-155" width="85" height="290" rx="30" fill="url(#civic-grass)" stroke="#547653"/>}
    {d.id==='torre-mistica' && <rect x="-180" y="-150" width="75" height="285" rx="25" fill="url(#civic-grass)" stroke="#547653"/>}
  </g>;})}
</g>;}

export default function CivicMapStudy({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}) {
  const at=projectGround(d.x-100,d.y-100);
  return <g id={`destination-${d.id}`} data-civic-study={d.id} className={`modular-destination ${selected===d.id?'is-selected':''}`} transform={`translate(${at.x} ${at.y})`} tabIndex={0} role="button" aria-label={`Examinar ${d.name}`} aria-pressed={selected===d.id} onClick={()=>onSelect(d.id)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(d.id,true);}}}>
    <title>{`${d.name} — espaço renderizado`}</title>
    
    <g stroke={p.ink} strokeWidth="2" strokeLinejoin="round">
      {d.id==='pracinha' && <><Fountain x={10} y={20}/><CivicRenderedProp kind="quiosque" x={120} y={-65}/></>}
      {d.id==='pracinha' && <GatheringArea/>}
      {d.id==='prefeintura' && civicRenderedAssets.prefeitura && <CivicRenderedProp kind="prefeitura" y={20}/>}
      {d.id==='prefeintura' && !civicRenderedAssets.prefeitura && <>
        <Block x={-120} y={-30} w={240} d={125} h={92} color={p.blue}/>
        <Block x={-70} y={-27} w={140} d={20} h={110} color={p.cream}/>
        <Face fill={p.yellow} points={[[ -85,-22,110],[85,-22,110],[0,-22,145]]}/>
        {[-110,-80,80].map(x=><Window key={x} x={x} y={-29} z={47}/>)}
        <Window x={-19} y={-26} z={0} w={38} h={51}/>
        {[-60,-35,35,60].map(x=><Block key={x} x={x} y={-18} w={10} d={12} h={82} color={p.cream}/>)}
        {[0,1,2].map(i=><Block key={i} x={-55-i*9} y={i*12} w={110+i*18} d={12} h={18-i*5} color="#D5C6AA"/>)}
        <path d={`M${point(75,-100,92)}L${point(75,-100,150)}`} fill="none"/><Face fill={p.coral} points={[[75,-100,150],[120,-100,150],[120,-100,130],[75,-100,130]]}/>
      </>}
      {d.id==='torre-mistica' && civicRenderedAssets.torre && <CivicRenderedProp kind="torre" y={25}/>}
      {d.id==='torre-mistica' && <TarotArea/>}
      {d.id==='torre-mistica' && !civicRenderedAssets.torre && <>
        <Block x={-60} y={60} w={120} d={130} h={18} color="#D5C6AA"/>
        <Block x={-44} y={35} w={88} d={88} h={192} color={p.pink}/>
        <Block x={-52} y={42} w={104} d={104} h={205} color={p.pink}/>
        <Face fill={p.blue} points={[[ -65,55,205],[65,55,205],[0,-5,280]]}/>
        <Face fill="#285BCC" points={[[65,55,205],[65,-65,205],[0,-5,280]]}/>
        <Face fill="#6492FF" points={[[ -65,55,205],[-65,-65,205],[0,-5,280]]}/>
        <Face fill={p.blue} points={[[ -65,-65,205],[65,-65,205],[0,-5,280]]}/>
        <Window x={-13} y={43} z={18} w={26} h={42}/>
        {[95,145].map(z=><Window key={z} x={-10} y={43} z={z} w={20} h={28}/>)}
        <circle cx="5" cy="-175" r="13" fill={p.yellow}/><path d="M5-184V-175L12-170" fill="none"/>
        <path d={`M${point(0,-5,280)}v-18`} strokeWidth="3"/>
      </>}
      {d.id==='plaza-hispanica' && <>
        <CivicRenderedProp kind="plaza" x={10} y={-70}/>
        <Fountain x={35} y={105}/><g aria-label="show do rbd 28/10"><CivicRenderedProp kind="letreiro" x={-115} y={40}/></g>
      </>}
    </g>
  </g>;
}








