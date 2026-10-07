import {projectGround} from '@/lib/map-projection';
import PilotLandscapeProp from './pilot-landscape-prop';


export function WestGreenProps(){return <g aria-label="Faixa verde oeste com árvores, bancos e floreiras">{[1260,1460,1620].map((y,i)=><PilotLandscapeProp key={y} item={{id:`west-green-tree-${i}`,kind:'tree',x:-95,y,size:65}}/>)}{[1350,1540].map(y=>{const at=projectGround(-95,y);return <g key={y} transform={`translate(${at.x} ${at.y})`}><image href="/images/modular/livrinhoteca-banco-isometrico-v01.png" x="-27.75" y="-35" width="55.5" height="35.03" preserveAspectRatio="xMidYMid meet"/></g>;})}<PilotLandscapeProp item={{id:'west-green-planter',kind:'planter',x:-95,y:1400}}/></g>;}

export default function MapOpenSpaces() {
  return <g data-layer="land-use-reservations" strokeWidth="3" strokeLinejoin="round">
    <defs><pattern id="west-green-grass" width="325" height="320" patternUnits="userSpaceOnUse"><rect width="325" height="320" fill="#9CBA78" stroke="none"/><image href="/images/modular/parque-grama-v01.png" width="325" height="320" preserveAspectRatio="none" opacity=".78"/></pattern></defs>
    <g fill="url(#west-green-grass)" stroke="#879D70" data-use="vegetation">
      <path d="M-130 1250Q-130 1190-95 1190Q-55 1190-55 1250L-55 1620Q-55 1680-95 1680Q-130 1680-130 1620Z"></path>
    </g>
  </g>;
}

