// Allow the viewport to reach every edge of the rendered map at any zoom.
// Restricting its centre to occupied lots makes peripheral art inaccessible.
export function boundedScroll(left:number,top:number,width:number,height:number,worldWidth:number,worldHeight:number){
 return {
  left:Math.max(0,Math.min(Math.max(0,worldWidth-width),left)),
  top:Math.max(0,Math.min(Math.max(0,worldHeight-height),top)),
 };
}
