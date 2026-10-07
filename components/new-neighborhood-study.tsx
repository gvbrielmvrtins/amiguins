import {cityShorePath} from '@/lib/beach-layout';
import {mapPalette as p,type ModularDestination} from '@/lib/modular-map';
import {projectGround} from '@/lib/map-projection';
import PilotLandscapeProp from './pilot-landscape-prop';
import CivicRenderedProp from './civic-rendered-prop';

function LocalLandscape(props:React.ComponentProps<typeof PilotLandscapeProp>){return <g transform="translate(-1080 -220)"><PilotLandscapeProp {...props}/></g>;}
const pt=(x:number,y:number,z=0)=>`${(x-y)*.5196152423},${(x+y)*.3-z}`;
const seaPath='M2100 3600C2130 2700 2170 2050 2300 1550Q2400 1270 2850 1330L4400 1550';
// The entire opposite shore represents the rest of the world, without building lots.
const continentBase = `${seaPath}L4400 3600H2100Z`;
// Natural coves and headlands on the opposite bank; the city's bank stays intact.
const coastPoints=Array.from({length:65},(_,i)=>{
  const t=i<=40?i/40:(i-40)/24;let x:number,y:number,dx:number,dy:number;
  if(i<=40){const s=1-t;x=s*s*s*2100+3*s*s*t*2130+3*s*t*t*2170+t*t*t*2300;y=s*s*s*3600+3*s*s*t*2700+3*s*t*t*2050+t*t*t*1550;dx=3*s*s*30+6*s*t*40+3*t*t*130;dy=3*s*s*-900+6*s*t*-650+3*t*t*-500;}
  else{const s=1-t;x=s*s*2300+2*s*t*2400+t*t*2850;y=s*s*1550+2*s*t*1270+t*t*1330;dx=2*s*100+2*t*450;dy=2*s*-280+2*t*60;}
  const offset=140+35*Math.sin(i*.6)+22*Math.sin(i*.25),length=Math.hypot(dx,dy);
  return `${x-offset*dy/length} ${y+offset*dx/length}`;
});
const coastPath=coastPoints.reduce((path,point,i)=>{
  if(!i)return `M${point}`;
  const next=coastPoints[Math.min(i+1,coastPoints.length-1)].split(' ').map(Number),current=point.split(' ').map(Number);
  return `${path}Q${point} ${(current[0]+next[0])/2} ${(current[1]+next[1])/2}`;
},'')+ ' Q3320 1590 3650 1530T4400 1680';
const internationalGround = `${coastPath}L4400 3600H2200Z`;
// A sandy beach follows the village shore; foam marks its waterline.
const beachPath=cityShorePath(170);
const foamPath=cityShorePath(104);
const promenadePath=cityShorePath(262);
// Coastal paving takes precedence over the campus ground at this junction.
export function ValleyCoastOverlay(){return <g pointerEvents="none" stroke="none">
  <defs><clipPath id="valley-coastal-overlay"><rect x="2480" y="850" width="760" height="700"/></clipPath></defs>
  <g clipPath="url(#valley-coastal-overlay)" fill="none" strokeLinejoin="round" strokeLinecap="round">
    <path d={beachPath} stroke="#D4B879" strokeWidth="140"/>
    <path d={beachPath} stroke="url(#beach-sand)" strokeWidth="132"/>
    <path d={promenadePath} stroke="#B8B2A4" strokeWidth="54"/>
    <path d={promenadePath} stroke="url(#copacabana-mosaic)" strokeWidth="46"/>
  </g>
</g>;}
export function NeighborhoodStudyGround(){return <>
  <defs><pattern id="copacabana-mosaic" width="160" height="100" patternUnits="userSpaceOnUse"><rect width="160" height="100" fill="#FFFEF9" stroke="none"/><path d="M-40 0Q0-35 40 0T120 0T200 0M-40 50Q0 15 40 50T120 50T200 50M-40 100Q0 65 40 100T120 100T200 100" fill="none" stroke="#343331" strokeWidth="17"/><path d="M0 0V100M10 0V100M20 0V100M30 0V100M40 0V100M50 0V100M60 0V100M70 0V100M80 0V100M90 0V100M100 0V100M110 0V100M120 0V100M130 0V100M140 0V100M150 0V100M0 10H160M0 20H160M0 30H160M0 40H160M0 50H160M0 60H160M0 70H160M0 80H160M0 90H160" fill="none" stroke="#C9C5BB" strokeWidth=".6" opacity=".5"/></pattern><pattern id="beach-sand" width="90" height="90" patternUnits="userSpaceOnUse"><rect width="90" height="90" fill="#F3DEAA" stroke="none"/><path d="M12 17h6M58 41h8M29 70h5" stroke="#C9A96B" strokeWidth="2" opacity=".5"/><circle cx="74" cy="12" r="1.5" fill="#C9A96B" stroke="none"/><circle cx="18" cy="48" r="1" fill="#C9A96B" stroke="none"/></pattern><pattern id="international-grass" width="325" height="320" patternUnits="userSpaceOnUse"><rect width="325" height="320" fill="#9CBA78" stroke="none"/><image href="/images/modular/parque-grama-v01.png" width="325" height="320" preserveAspectRatio="none" opacity=".78"/></pattern><pattern id="sea-water-rendered" width="520" height="520" patternUnits="userSpaceOnUse"><image href="/images/modular/rio-agua-textura-v02.png" width="520" height="520" preserveAspectRatio="none"/></pattern></defs>
  <g data-layer="sea-study" aria-label="Mar entre a vila e o continente internacional">
    <path d={continentBase} fill="url(#sea-water-rendered)" stroke="none"/>
    <path d={seaPath} fill="none" stroke="url(#sea-water-rendered)" strokeWidth="200"></path>
  </g>
  <g data-layer="international-continent" aria-label="Continente dos amiguINs INternacionais — espaço para quem mora em qualquer país">
    <path d={internationalGround} fill="url(#international-grass)" stroke="none"/><path d={internationalGround} fill="#D8BF78" fillOpacity=".62" stroke="none"/><path d={coastPath} fill="none" stroke="#DCC58F" strokeWidth="22" strokeLinejoin="round" strokeLinecap="round"/>
    <defs><pattern id="savanna-earth-texture" width="113" height="97" patternUnits="userSpaceOnUse">
      <rect width="113" height="97" fill="#CDA46B" stroke="none"/>
      <path d="M3 28Q28 6 60 22T120 20M-12 76Q18 57 51 75T124 71" fill="none" stroke="#DABB85" strokeWidth="15" opacity=".42"/>
      <path d="M10 18l7-2m23 16 9 3m29-24 4 2M18 65l8 3m48 16 8-3m14-31 6 2" stroke="#9E784D" strokeWidth="2" opacity=".65"/>
      <g fill="#A67D50" stroke="none" opacity=".7"><ellipse cx="29" cy="44" rx="2.5" ry="1.5"/><ellipse cx="86" cy="36" rx="3" ry="2"/><circle cx="53" cy="90" r="1.5"/><circle cx="106" cy="7" r="1.3"/></g>
      <path d="M49 59l-3-7m3 7 2-9m-2 9 5-4M96 89l-3-7m3 7 2-9" stroke="#A38E4F" strokeWidth="1.5" fill="none"/>
    </pattern><clipPath id="savanna-ground-clip"><path d={internationalGround}/></clipPath></defs>
    <g clipPath="url(#savanna-ground-clip)" aria-label="Chão de terra da savana">
      <path d="M2340 2020Q2490 1930 2670 2020Q2770 2170 2760 2360Q2660 2570 2350 2580Q2240 2340 2340 2020Z" fill="url(#savanna-earth-texture)" stroke="#D7B77D" strokeWidth="32" strokeLinejoin="round"/>
      <path d="M2380 2090Q2510 2150 2700 2100M2330 2430Q2490 2380 2720 2460" fill="none" stroke="#B99362" strokeWidth="3" opacity=".4"/>
    </g>
    <g aria-label="Vegetação rasteira da savana" clipPath="url(#savanna-ground-clip)" stroke="#A18F50" strokeWidth="2" fill="none" opacity=".75">
      {Array.from({length:48},(_,i)=>{const x=2360+(i%8)*140,y=1900+Math.floor(i/8)*105;return <path key={i} d={`M${x} ${y}l-6-13m6 13l2-17m-2 17l9-10`}/>;})}
    </g>
    <path d="M2850 1780Q2710 1930 2780 2050T3010 2700" fill="none" stroke="#DAD2AC" strokeWidth="42" strokeLinecap="round"/>
    <path d="M2850 1780Q2710 1930 2780 2050T3010 2700" fill="none" stroke={p.cream} strokeWidth="30" strokeLinecap="round"/>
  </g>
  <g data-layer="village-beach" strokeLinejoin="round" strokeLinecap="round" aria-label="Praia na margem da vila">
    <path d={beachPath} fill="none" stroke="#E5D5AF" strokeWidth="170" opacity=".25"/>
    <path d={beachPath} fill="none" stroke="#E5D5AF" strokeWidth="154" opacity=".45"/>
    <path d={beachPath} fill="none" stroke="#D4B879" strokeWidth="140"/>
    <path d={beachPath} fill="none" stroke="url(#beach-sand)" strokeWidth="132"></path>
    <g data-layer="beach-promenade" aria-label="Calçadão com mosaico de ondas inspirado em Copacabana">
      <path d={promenadePath} fill="none" stroke="#B8B2A4" strokeWidth="54"/>
      <path d={promenadePath} fill="none" stroke="url(#copacabana-mosaic)" strokeWidth="46"></path>
    </g>
    <path d={foamPath} fill="none" stroke="#D7F2F7" strokeWidth="12" opacity=".85"></path>
  </g>
  <defs>
    <pattern id="coloridin-grass" width="325" height="320" patternUnits="userSpaceOnUse"><rect width="325" height="320" fill="#9CBA78" stroke="none"/><image href="/images/modular/parque-grama-v01.png" width="325" height="320" preserveAspectRatio="none" opacity=".78"/></pattern>

  </defs>

</>;}
export default function NeighborhoodStudy({destination:d,selected,onSelect}:{destination:ModularDestination;selected:string|null;onSelect:(id:string,keyboard?:boolean)=>void}){const international=d.id==='paises-africanos',at=projectGround(d.x,d.y);return <g id={`destination-${d.id}`} transform={`translate(${at.x} ${at.y})`} className={`modular-destination ${selected===d.id?'is-selected':''}`} role="group" aria-label={d.name}>

{international?<>
  <g aria-label="Aeroporto dos amiguINs INternacionais"><CivicRenderedProp kind="internationalAirport" x={100} y={140}/></g>
  <g transform="matrix(0.5196152423 0.3 -0.5196152423 0.3 0 0)">
    <path d={internationalGround} transform={`translate(${-d.x} ${-d.y})`} fill="transparent" stroke="none"/>
  </g>
</>:<><g><CivicRenderedProp kind="coloridinBlanket" x={-120} y={77.5}/><CivicRenderedProp kind="coloridinBlanket" x={120} y={132.5}/></g>
  <g>
    <LocalLandscape item={{id:'coloridin-tree-back',kind:'tree',x:-150,y:-130,size:75}}/>
    <g transform={`translate(${pt(80,-120)}) scale(.65)`}><CivicRenderedProp kind="fonte"/></g>
    <CivicRenderedProp kind="tavernPicnic" x={-125} y={-35}/>
    <CivicRenderedProp kind="tavernPicnic" x={125} y={0}/>
  </g>
  <g aria-label="Bandeira LGBT no centro da praça">
    <CivicRenderedProp kind="coloridinFlag"/>
  </g>
  <LocalLandscape item={{id:'coloridin-tree-front',kind:'tree',x:-155,y:140,size:75}}/>
</>}
</g>;}
