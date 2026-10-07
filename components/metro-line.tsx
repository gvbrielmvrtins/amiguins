import {projectGround, uprightProjection} from '@/lib/map-projection';

export function MetroGround(){return <g data-layer="metro-track" pointerEvents="none" stroke="none" aria-label="Trilhos do metrô junto ao cantIN">
  <defs><pattern id="metro-ballast" width="31" height="29" patternUnits="userSpaceOnUse"><rect width="31" height="29" fill="#8D9187"/>{Array.from({length:14},(_,i)=><path key={i} d={`M${(i*13)%31} ${(i*17)%29}l3-2 3 2-2 3Z`} fill={i%2?'#B7B6A6':'#656C64'}/>)}</pattern></defs>
  <rect x="-480" y="7" width="1530" height="96" rx="5" fill="url(#metro-ballast)"/>
  {Array.from({length:78},(_,i)=><rect key={i} x={-477+i*19.5} y="15" width="8" height="80" rx="1" fill="#806B50" stroke="#4C4A40" strokeWidth="1.5"/>)}
  {[32,78].map(y=><g key={y}><path d={`M-480 ${y+3}H1050`} stroke="#3C4547" strokeWidth="7"/><path d={`M-480 ${y}H1050`} stroke="#C1C8C5" strokeWidth="4"/><path d={`M-480 ${y-1}H1050`} stroke="#F2EEE2" strokeWidth="1.3"/></g>)}
  <path d="M1030 22V88" stroke="#EACB76" strokeWidth="8"/>
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
