import {MovableMapElement} from './map-layout-editor';

const edges=[
  {id:'back-west',x:330,y:989,width:230,falling:false,front:false},
  {id:'back-east',x:560,y:855,width:202,falling:true,front:false},
  {id:'front-east',x:532,y:1105,width:230,falling:false,front:true},
  {id:'front-west',x:330,y:989,width:202,falling:true,front:true},
];

export default function ConstructionHoarding({front}:{front:boolean}){
  return <g data-layer={front?'construction-hoarding-front':'construction-hoarding-back'}>
    {edges.filter(edge=>edge.front===front).flatMap(edge=>Array.from({length:3},(_,i)=>{
      const width=edge.width/3,scale=width/1260,dy=width*.58;
      const x=edge.x+i*width,y=edge.y+(edge.falling?1:-1)*i*dy;
      return <MovableMapElement key={`${edge.id}-${i}`} id={`construction-hoarding-${edge.id}-${i}`}>
        <g transform={`translate(${edge.falling?x+width:x} ${edge.falling?y+dy:y}) scale(${edge.falling?-scale:scale} ${scale})`} pointerEvents="none">
          <g transform="matrix(1 -.241 0 1 0 0)"><image href="/images/modular/tapume-obras-v01.png" x="-148" y="-987" width="1536" height="1024"/></g>
        </g>
      </MovableMapElement>;
    }))}
  </g>;
}
