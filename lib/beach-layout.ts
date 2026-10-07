// Sample the whole shoreline by distance so furniture does not bunch up on bends.
function shore(t:number){
  if(t<=1){const s=1-t;return {x:s*s*s*2100+3*s*s*t*2130+3*s*t*t*2170+t*t*t*2300,y:s*s*s*3600+3*s*s*t*2700+3*s*t*t*2050+t*t*t*1550};}
  if(t<=2){t-=1;const s=1-t;return {x:s*s*2300+2*s*t*2400+t*t*2850,y:s*s*1550+2*s*t*1270+t*t*1330};}
  t-=2;return {x:2850+1550*t,y:1330+220*t};
}
const samples=Array.from({length:301},(_,i)=>shore(i/100));
const distances=[0];for(let i=1;i<samples.length;i++)distances.push(distances[i-1]+Math.hypot(samples[i].x-samples[i-1].x,samples[i].y-samples[i-1].y));
// Shared coastal undulations keep sand, promenade, foam and furniture aligned.
function coastalWave(distance:number){
  return 25*Math.sin(distance/145)+11*Math.sin(distance/263+.7);
}
export function cityShorePoints(offset:number){
  return samples.map((point,i)=>{
    const before=samples[Math.max(0,i-1)],after=samples[Math.min(samples.length-1,i+1)];
    const dx=after.x-before.x,dy=after.y-before.y,length=Math.hypot(dx,dy);
    const shift=offset+coastalWave(distances[i]);
    return {x:point.x+shift*dy/length,y:point.y-shift*dx/length};
  });
}
export function cityShorePath(offset:number){
  return cityShorePoints(offset).map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' ');
}
export const beachProps=Array.from({length:22},(_,i)=>{
  const distance=(i+.5)*distances[300]/22;
  const index=distances.findIndex(d=>d>=distance),a=samples[index-1],b=samples[index],t=(distance-distances[index-1])/(distances[index]-distances[index-1]);
  const dx=b.x-a.x,dy=b.y-a.y,length=Math.hypot(dx,dy),offset=174+coastalWave(distance),x=a.x+t*dx+offset*dy/length,y=a.y+t*dy-offset*dx/length;
  const items: {id:string;kind:string;x:number;y:number}[]=[];
  const atOffset=(offset:number)=>({x:x+(offset-174)*dy/length,y:y-(offset-174)*dx/length});
  if(i%2===0){
    items.push({id:`beach-umbrella-${i}`,kind:'beachUmbrella',x,y});
    if(i!==6)items.push({id:`beach-rest-${i}`,kind:i%4===0?'coloridinBlanket':'beachChair',x:x+32*dx/length,y:y+32*dy/length});
  }else{
    const featurePosition=atOffset(i%4===1?214:163);
    // Move this palm along the sand, away from the campus robot and prototypes.
    if(i===13){featurePosition.x+=425;featurePosition.y+=41;}
    items.push({id:`beach-feature-${i}`,kind:i%4===1?'beachPalm':'beachBall',...featurePosition});
    items.push({id:`beach-shell-${i}`,kind:'beachShell',...atOffset(132)});
  }
  return items;
}).flat();
export type BeachProp=typeof beachProps[number];
