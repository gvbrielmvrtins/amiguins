import {communityLots} from './community-study';
import { modularDestinations } from './modular-map';
import { projectGround } from './map-projection';
type Point = {x:number;y:number};
const cross=(a:Point,b:Point,c:Point)=>(b.x-a.x)*(c.y-a.y)-(b.y-a.y)*(c.x-a.x);
function hull(points:Point[]){
 const sorted=points.sort((a,b)=>a.x-b.x||a.y-b.y);
 const half=(items:Point[])=>{const result:Point[]=[];for(const p of items){while(result.length>1&&cross(result[result.length-2],result[result.length-1],p)<=0)result.pop();result.push(p);}return result.slice(0,-1);};
 return [...half(sorted),...half([...sorted].reverse())];
}
// Camera centres follow the occupied city diagonals, excluding empty artboard corners.
export const cameraFootprint=hull([...modularDestinations.map(d=>projectGround(d.x,d.y)),...communityLots.map(l=>projectGround(l.x,l.y)),projectGround(1550,-30),projectGround(2740,200)]);
function clip(points:Point[],inside:(p:Point)=>boolean,intersect:(a:Point,b:Point)=>Point){
 const result:Point[]=[];for(let i=0;i<points.length;i++){const a=points[i],b=points[(i+1)%points.length],ai=inside(a),bi=inside(b);if(ai)result.push(a);if(ai!==bi)result.push(intersect(a,b));}return result;
}
export function boundedScroll(left:number,top:number,width:number,height:number,worldWidth:number,worldHeight:number){
 const scale=worldWidth/2700;
 let polygon=cameraFootprint;
 for(const [axis,bound,lower] of [['x',width/2/scale,true],['x',(worldWidth-width/2)/scale,false],['y',height/2/scale-70,true],['y',(worldHeight-height/2)/scale-70,false]] as const){
  polygon=clip(polygon,p=>lower?p[axis]>=bound:p[axis]<=bound,(a,b)=>{const t=(bound-a[axis])/(b[axis]-a[axis]);return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};});
 }
 const centre={x:(left+width/2)/scale,y:(top+height/2)/scale-70};let nearest=centre;
 if(polygon.length&&polygon.some((p,i)=>cross(p,polygon[(i+1)%polygon.length],centre)<-.001)){
  let distance=Infinity;for(let i=0;i<polygon.length;i++){const a=polygon[i],b=polygon[(i+1)%polygon.length],dx=b.x-a.x,dy=b.y-a.y;
   const t=Math.max(0,Math.min(1,((centre.x-a.x)*dx+(centre.y-a.y)*dy)/(dx*dx+dy*dy||1)));
   const candidate={x:a.x+t*dx,y:a.y+t*dy},d=(candidate.x-centre.x)**2+(candidate.y-centre.y)**2;if(d<distance){distance=d;nearest=candidate;}
  }
 }
 return {left:Math.max(0,Math.min(worldWidth-width,nearest.x*scale-width/2)),top:Math.max(0,Math.min(worldHeight-height,(nearest.y+70)*scale-height/2))};
}

