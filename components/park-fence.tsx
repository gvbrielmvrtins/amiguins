import { projectGround, uprightProjection } from '@/lib/map-projection';

// Continuous front fence; access stays on the clear east side.
const perimeter = [[-260,-302],[-85,-302],[-85,-275],[-50,-275],[-50,-245],[-30,-245],[-30,-170],[-30,-110],[-30,-35],[-60,-35],[-60,-15],[-280,-15],[-280,-40],[-322,-40],[-322,-225],[-290,-225],[-290,-280],[-260,-280],[-260,-302]];
const projection=uprightProjection(-335/875,335/875);
const scale=.035;
const panelLength=875*projection.project(1,0).x*scale/.5196152423;
const northEdges=[[[1340,-135],[1760,-135]],[[1760,-135],[1760,75]],[[1760,75],[1575,75]],[[1525,75],[1340,75]],[[1340,75],[1340,-135]]];
export const northGardenFencePanels=northEdges.flatMap(([[x,y],[endX,endY]],i)=>{
  const length=Math.hypot(endX-x,endY-y),dx=(endX-x)/length,dy=(endY-y)/length;
  return Array.from({length:Math.ceil(length/panelLength)},(_,n)=>{
    const used=Math.min(panelLength,length-n*panelLength),startX=x+dx*n*panelLength,startY=y+dy*n*panelLength;
    return {id:`north-fence-${i}-${n}`,x:startX+dx*used/2,y:startY+dy*used/2,startX,startY,endX:startX+dx*used,endY:startY+dy*used,fraction:used/panelLength};
  });
});
export const parkFencePanels = perimeter.slice(0,-1).flatMap(([x,y],i)=>{
  if(i===6) return []; // 60 logical units of clear entrance away from furniture.
  const [endX,endY]=perimeter[i+1];
  const length=Math.hypot(endX-x,endY-y),dx=(endX-x)/length,dy=(endY-y)/length;
  return Array.from({length:Math.ceil(length/panelLength)},(_,n)=>{
    const used=Math.min(panelLength,length-n*panelLength);
    const startX=x+dx*n*panelLength,startY=y+dy*n*panelLength;
    return {id:`park-fence-${i}-${n}`,x:startX+dx*used/2,y:startY+dy*used/2,startX,startY,endX:startX+dx*used,endY:startY+dy*used,fraction:used/panelLength};
  });
});

export default function ParkFence({item}:{item:typeof parkFencePanels[number]}) {
  // Orient the same-size panel on either ground axis. Crop short ends instead
  // of squeezing the entire illustration into a corner or a remaining gap.
  const reverse=item.endX<item.startX || item.endY<item.startY;
  const start=projectGround(reverse?item.endX:item.startX,reverse?item.endY:item.startY);
  const mirror=item.startX===item.endX?-1:1;
  const clipId=`${item.id}-clip`;
  return <g data-park-fence={item.id} pointerEvents="none" aria-hidden="true" transform={`translate(${start.x} ${start.y}) scale(${mirror*scale} ${scale})`}><g transform={projection.transform}>
    <defs><clipPath id={clipId}><rect x="-100" y="-650" width={875*item.fraction+200} height="1150"/></clipPath></defs>
    <image href="/images/modular/parque-cerca-v01.png" x="-285" y="-640" width="1415" height="1111" clipPath={`url(#${clipId})`}/>
  </g></g>;
}
