import {projectGround} from '@/lib/map-projection';

export const forestClearingItems=[
  {id:'forest-cottage',x:1740,y:-680,house:true,mirror:false},
  {id:'forest-jacu-1',x:1600,y:1740,house:false,mirror:false},
  {id:'forest-jacu-2',x:1675,y:1740,house:false,mirror:true},
  {id:'forest-jacu-3',x:1750,y:1740,house:false,mirror:false},
  {id:'forest-jacu-4',x:1825,y:1740,house:false,mirror:true},
  {id:'forest-jacu-5',x:1900,y:1740,house:false,mirror:true},
];

export default function ForestClearingProp({item}:{item:typeof forestClearingItems[number]}){
  const at=projectGround(item.x,item.y);
  return <g transform={`translate(${at.x} ${at.y})`} pointerEvents="none">
    <g transform={item.mirror?'scale(-1 1)':undefined}>
      {item.house
        ? <image href="/images/modular/casinha-sitio-v01.png" x="-45" y="-65" width="90" height="70"/>
        : <image href="/images/modular/jacu-v01.png" x="-10" y="-17" width="20" height="18"/>}
    </g>
  </g>;
}
