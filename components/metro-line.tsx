import {projectGround, uprightProjection} from '@/lib/map-projection';

export function MetroGround(){return <g data-layer="metro-track" pointerEvents="none" stroke="none" aria-label="Trilhos do metrô junto ao cantIN">
  <defs><pattern id="metro-ballast" width="31" height="29" patternUnits="userSpaceOnUse"><rect width="31" height="29" fill="#8D9187"/>{Array.from({length:14},(_,i)=><path key={i} d={`M${(i*13)%31} ${(i*17)%29}l3-2 3 2-2 3Z`} fill={i%2?'#B7B6A6':'#656C64'}/>)}</pattern></defs>
  <rect x="-340" y="7" width="1390" height="96" rx="5" fill="url(#metro-ballast)"/>
  {Array.from({length:72},(_,i)=><rect key={i} x={-337+i*19.5} y="15" width="8" height="80" rx="1" fill="#806B50" stroke="#4C4A40" strokeWidth="1.5"/>)}
  {[32,78].map(y=><g key={y}><path d={`M-340 ${y+3}H1050`} stroke="#3C4547" strokeWidth="7"/><path d={`M-340 ${y}H1050`} stroke="#C1C8C5" strokeWidth="4"/><path d={`M-340 ${y-1}H1050`} stroke="#F2EEE2" strokeWidth="1.3"/></g>)}

</g>;}

const carriageProjection=uprightProjection(-.49,.42).transform;
export default function MetroTrain(){
  return <g id="destination-vagao-feminino" role="group" aria-label="Metrô com um vagão feminino" pointerEvents="none">
    {[{x:260,file:'metro-vagao-feminino-v03.png'},{x:560,file:'metro-carro-frontal-v01.png'}].map(car=>{
      const at=projectGround(car.x,55);
      return <g key={car.file} transform={`translate(${at.x} ${at.y})`}>
        <g transform={carriageProjection}><image href={`/images/modular/${car.file}`} x="-106.4" y="-99.4" width="215.04" height="143.36"/></g>
      </g>;
    })}
  </g>;
}


// Vertical cuts remain upright while the track descends below the ground plane.
function MetroRamp({reverse=false}:{reverse?:boolean}){
  const trenchPoint=(x:number,y:number,depth=0)=>{const p=projectGround(reverse?710-x:x,y);return `${p.x},${p.y+depth}`;};
  const gradientId=reverse?'metro-ramp-shadow-east':'metro-ramp-shadow-west';
  const face=(points:number[][])=>points.map(([x,y,d])=>trenchPoint(x,y,d)).join(' ');
  return <g data-layer="metro-underpass" pointerEvents="none" aria-label={reverse?"Trilhos entrando no subsolo na outra extremidade":"Trilhos saindo de uma passagem subterrânea"} stroke="#454B43" strokeWidth="2" strokeLinejoin="round">
    <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0"><stop stopColor="#222D2C" stopOpacity=".72"/><stop offset=".55" stopColor="#43504A" stopOpacity=".3"/><stop offset="1" stopColor="#7C857C" stopOpacity="0"/></linearGradient></defs>
    {/* Rounded banks taper into the existing ballast rather than a rectangular slab. */}
    <path d={`M${trenchPoint(-690,55)}Q${trenchPoint(-690,-22)} ${trenchPoint(-635,-15)}L${trenchPoint(-395,-5)}Q${trenchPoint(-360,2)} ${trenchPoint(-340,7)}L${trenchPoint(-340,103)}Q${trenchPoint(-360,110)} ${trenchPoint(-395,115)}L${trenchPoint(-635,125)}Q${trenchPoint(-690,130)} ${trenchPoint(-690,55)}Z`} fill="#969B83" stroke="none"/>
    <path d={`M${trenchPoint(-678,55)}Q${trenchPoint(-678,-10)} ${trenchPoint(-635,-3)}L${trenchPoint(-385,4)}L${trenchPoint(-340,7)}L${trenchPoint(-340,103)}L${trenchPoint(-385,106)}L${trenchPoint(-635,114)}Q${trenchPoint(-678,120)} ${trenchPoint(-678,55)}Z`} fill="#B3B39F" stroke="none"/>
    <polygon points={face([[-655,7,48],[-340,7,0],[-340,103,0],[-655,103,48]])} fill="url(#metro-ballast)" stroke="none"/>
    <polygon points={face([[-655,7,48],[-340,7,0],[-340,103,0],[-655,103,48]])} fill={`url(#${gradientId})`} stroke="none"/>
    {[7,103].map(y=><path key={`wall-${y}`} d={`M${trenchPoint(-655,y)}L${trenchPoint(-340,y)}C${trenchPoint(-430,y)} ${trenchPoint(-560,y,48)} ${trenchPoint(-655,y,48)}Z`} fill={y===7?'#AAA792':'#7E8476'} stroke="#727969" strokeWidth="1"/>)}
    {Array.from({length:15},(_,i)=>{const x=-642+i*20,t=(-340-x)/315,depth=48*t*t*(3-2*t);return <path key={i} d={`M${trenchPoint(x,18,depth)}L${trenchPoint(x,92,depth)}`} stroke="#7C6C53" strokeWidth="4"/>;})}
    {[32,78].map(y=><g key={y}><path d={`M${trenchPoint(-655,y,48)}C${trenchPoint(-550,y,48)} ${trenchPoint(-445,y)} ${trenchPoint(-340,y)}`} stroke="#3C4547" strokeWidth="6"/><path d={`M${trenchPoint(-655,y,48)}C${trenchPoint(-550,y,48)} ${trenchPoint(-445,y)} ${trenchPoint(-340,y)}`} stroke="#BFC6C1" strokeWidth="3"/></g>)}
    <path d={`M${trenchPoint(-655,7,48)}L${trenchPoint(-655,7,15)}Q${trenchPoint(-655,55,-14)} ${trenchPoint(-655,103,15)}L${trenchPoint(-655,103,48)}Z`} fill="#202C2B" stroke="#646E61" strokeWidth="2"/>
    <path d={`M${trenchPoint(-655,3,17)}Q${trenchPoint(-655,55,-20)} ${trenchPoint(-655,107,17)}`} fill="none" stroke="#BDBDA9" strokeWidth="8" strokeLinecap="round"/>
    {[7,103].map(y=><path key={`rim-${y}`} d={`M${trenchPoint(-655,y)}Q${trenchPoint(-470,y)} ${trenchPoint(-340,y)}`} fill="none" stroke="#C5C3AE" strokeWidth="3" strokeLinecap="round"/>)}
    {Array.from({length:12},(_,i)=>{const x=-620+i*23,y=i%2?-8:117;return <path key={`bank-${i}`} d={`M${trenchPoint(x,y)}l-2-3 4 1 3-2`} fill="none" stroke={i%3?'#79866A':'#A0AA80'} strokeWidth="2" strokeLinecap="round"/>;})}

  </g>;
}

export function MetroUnderpass(){return <><MetroRamp/><MetroRamp reverse/></>;}
