import {cityShorePoints} from '@/lib/beach-layout';
import {projectGround} from '@/lib/map-projection';
import {MovableMapElement} from './map-layout-editor';

const shore=cityShorePoints(145);
const models=[
  {id:'beachgoer-ball',file:'banhista-bola-v01.png',index:165,width:17.25},
  {id:'beachgoer-towel',file:'banhista-toalha-v01.png',index:177,width:14.1},
  {id:'beachgoer-surfer',file:'banhista-surfista-v01.png',index:189,width:15.6},
];

export default function ExtraBeachgoers(){
  return <g data-layer="extra-beachgoers">{models.map(model=>{
    const at=projectGround(shore[model.index].x,shore[model.index].y);
    return <MovableMapElement key={model.id} id={model.id}>
      <image href={`/images/modular/${model.file}`} x={at.x-model.width/2} y={at.y-30} width={model.width} height="30" pointerEvents="none"/>
    </MovableMapElement>;
  })}</g>;
}
