import {groundTransform} from '@/lib/map-projection';
import {MovableMapElement} from './map-layout-editor';

const patches=[
  {id:'ground-grass-square',x:1620,y:640,texture:'editable-patch-grass'},
  {id:'ground-grass-organic',x:1830,y:640,texture:'editable-patch-grass',organic:true},
  {id:'ground-sand-square',x:1620,y:850,texture:'beach-sand'},
  {id:'ground-asphalt-square',x:1830,y:850,texture:'street-asphalt'},
  {id:'ground-sidewalk-square',x:1620,y:1060,texture:'editable-patch-sidewalk'},
];

// Flat surfaces reuse the scenery's textures and ground projection.
// Keep the editor wrapper outside the projection so its layer controls remain independent.
export default function EditableGroundPatches(){
  return <g data-layer="editable-ground-patches">
    <defs>
      <pattern id="editable-patch-sidewalk" patternUnits="userSpaceOnUse" width="30" height="30">
        <rect width="30" height="30" fill="#CCC8BB"/>
        <rect x=".8" y=".8" width="28.4" height="28.4" rx=".6" fill="#DDD9CD"/>
        <path d="M2 28V2H28" fill="none" stroke="#EEEADF" strokeWidth=".7"/>
        <path d="M5 8h1m14 11h1M9 24h1m14-19h1" stroke="#BFBBAF" strokeWidth=".7" opacity=".65"/>
      </pattern>
      <pattern id="editable-patch-grass" patternUnits="userSpaceOnUse" x="-120" y="-120" width="240" height="240">
        <image href="/images/modular/parque-grama-v01.png" width="240" height="240" preserveAspectRatio="none" stroke="none"/>
      </pattern>
    </defs>
    {patches.map(patch=><MovableMapElement key={patch.id} id={patch.id}>
      <g transform={groundTransform} pointerEvents="none" stroke="none">
        <g transform={`translate(${patch.x} ${patch.y})`} fill={`url(#${patch.texture})`}>
          {patch.organic
            ? <path d="M-84-40Q-102-91-44-88Q-8-112 41-80Q95-78 89-26Q110 18 64 51Q50 97-10 81Q-61 107-85 53Q-111 12-84-40Z"/>
            : <rect x="-90" y="-90" width="180" height="180"/>}
        </g>
      </g>
    </MovableMapElement>)}
  </g>;
}
