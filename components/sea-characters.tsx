import {projectGround} from '@/lib/map-projection';
export default function SeaCharacters(){
 const at=projectGround(2300,1800);
 return <g data-layer="glub-glub-characters" transform={`translate(${at.x} ${at.y})`} pointerEvents="none" role="img" aria-label="Dois personagens-peixe no mar dizendo GLUB GLUB">
  <image href="/images/modular/glub-peixe-masculino-v01.png" x="-56" y="-27" width="67.584" height="45.056"/>
  <image href="/images/modular/glub-peixe-feminino-v01.png" x="-8" y="-7" width="61.44" height="40.96"/>
  <g fill="none" stroke="#D9FAFF" strokeWidth="1.2"><circle cx="5" cy="-16" r="3"/><circle cx="11" cy="-27" r="2"/></g>
  <g transform="translate(-4 -43) scale(.48)">
   <path d="M-39-14Q-39-26-23-28H23Q40-27 40-12V13Q40 27 21 27H-19L-37 36-28 24Q-39 21-39 8Z" fill="#426EA0" stroke="#1C1C1C" strokeWidth="3"/>
   <text textAnchor="middle" fill="#FAD846" stroke="#1C1C1C" strokeWidth="1.4" paintOrder="stroke" fontSize="23" fontWeight="900" fontStyle="italic"><tspan x="0" y="-2">GLUB</tspan><tspan x="0" y="22">GLUB</tspan></text>
  </g>
 </g>;
}
