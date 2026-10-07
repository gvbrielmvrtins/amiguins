import {cityShorePoints} from './beach-layout';
import type {SavannaItem} from './savanna-layout';
import {projectGround} from './map-projection';
import type {GardenProp} from './garden-study';

// The far sides extend beyond the SVG artboard; only the village edge is visible.
const originalForestGround='M1080-5000H7000V-50C6100-90 5200-20 4400-65S3000-20 2500-65S1660-20 1140-45Q1050-55 1060-160Z';
export const northForestTrees:GardenProp[]=[];
for(let row=0;row<40;row++){
  for(let col=0;col<45;col++){
    const seed=row*47+col*29;
    const x=1120+col*125+(row%2)*55+Math.sin(seed)*24;
    const y=-90-row*103+Math.cos(seed*1.7)*19;
    const at=projectGround(x,y);
    // Include offscreen crowns so no empty strip appears at the map border.
    if(at.x>1580 && at.y<355)continue;
    if(at.x < -160 || at.x > 2860 || at.y < -180 || at.y > 1900)continue;
    northForestTrees.push({id:`north-forest-${row}-${col}`,kind:seed%7===0?'birch':seed%3===0?'pine':'oak',x,y,scale:.94+(seed%7)*.065});
  }
}

const coast=cityShorePoints(292).filter(p=>p.x>=2990);
const last=coast[coast.length-1];
coast.push({x:7000,y:last.y+(7000-last.x)*220/1550});
export const forestCoastEdge=coast.map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' ');
export const coastalForestGround=`M2990-110H7000L${coast.slice().reverse().map(p=>`${p.x} ${p.y}`).join('L')}Z`;
export const northForestGround=originalForestGround+' '+coastalForestGround;
function edgeY(x:number){
  const next=coast.findIndex(p=>p.x>=x);
  if(next<=0)return coast[0].y;
  const a=coast[next-1],b=coast[next];
  return a.y+(b.y-a.y)*(x-a.x)/(b.x-a.x);
}
export const forestCoastPlants:SavannaItem[]=[];
for(let row=0;row<18;row++)for(let col=0;col<36;col++){
  const seed=row*31+col*43;
  const x=3060+col*118+(row%2)*46+Math.sin(seed)*18;
  const y=18+row*95+Math.cos(seed)*18;
  const distance=edgeY(x)-y;
  const at=projectGround(x,y);
  if(distance<135 || at.x>2860 || at.y>1900)continue;
  // The dense interior gradually gives way to smaller, scattered trees.
  if(distance<280 && seed%3===0)continue;
  northForestTrees.push({id:`coastal-forest-${row}-${col}`,kind:seed%4===0?'pine':seed%9===0?'birch':'oak',x,y,scale:distance<280?.65+(seed%3)*.09:.94+(seed%5)*.065});
}
for(let i=0;i<58;i++){
  const x=3020+i*36,y=edgeY(x)-45-(i%4)*21;
  const at=projectGround(x,y);
  if(at.x>2860 || at.y>1900)continue;
  forestCoastPlants.push({id:`forest-coast-grass-${i}`,kind:'savannaGrass',x,y,scale:.7+(i%3)*.1,mirror:i%2===0});
}

// Low vegetation stitches the campus edge into the coastal forest without
// covering its buildings, robot, prototypes or the promenade.
for(let i=0;i<17;i++){
  const x=2980+(i%3)*23+Math.sin(i)*7;
  const y=706+i*19;
  if(y>edgeY(x)-32)continue;
  forestCoastPlants.push({id:`valley-forest-grass-${i}`,kind:'savannaGrass',x,y,scale:.58+(i%4)*.08,mirror:i%2===0});
}
for(let i=0;i<8;i++){
  const x=2600+i*48,y=1133+Math.sin(i*1.7)*10;
  // At the shore the promenade takes precedence over vegetation.
  const shoreline=cityShorePoints(292).find(p=>p.x>=x);
  if(!shoreline || y>shoreline.y-30)continue;
  forestCoastPlants.push({id:`valley-coast-grass-${i}`,kind:'savannaGrass',x,y,scale:.55,mirror:i%2===0});
}

// A sheltered clearing keeps the reduced maze and its visitors unobstructed.
const clearing=projectGround(2100,-500);
for(let i=northForestTrees.length-1;i>=0;i--){
  const at=projectGround(northForestTrees[i].x,northForestTrees[i].y);
  if(((at.x-clearing.x)/285)**2+((at.y-65-clearing.y)/220)**2<1)northForestTrees.splice(i,1);
}

// Follow the maze's diamond footprint instead of leaving an oversized oval clearing.
// The near-side roots sit lower so their upright crowns stay outside the garden.
const gardenTreeCorners=[[0,-170],[255,35],[0,185],[-255,35]];
for(let i=0;i<40;i++){
  const side=Math.floor(i/10),t=(i%10)/10;
  const a=gardenTreeCorners[side],b=gardenTreeCorners[(side+1)%4];
  const dx=a[0]+(b[0]-a[0])*t,dy=a[1]+(b[1]-a[1])*t;
  const x=2100+dx/(2*.5196152423)+dy/.6;
  const y=-500-dx/(2*.5196152423)+dy/.6;
  northForestTrees.push({id:`secret-garden-ring-${i}`,kind:i%6===0?'pine':i%9===0?'birch':'oak',x,y,scale:.5+(i%3)*.025});
}

// A staggered outer row joins the close border to the surrounding tall forest.
const outerTreeCorners=[[0,-225],[310,30],[0,250],[-310,30]];
for(let i=0;i<32;i++){
  const side=Math.floor(i/8),t=((i%8)+.5)/8;
  const a=outerTreeCorners[side],b=outerTreeCorners[(side+1)%4];
  const dx=a[0]+(b[0]-a[0])*t,dy=a[1]+(b[1]-a[1])*t;
  northForestTrees.push({id:`secret-garden-outer-${i}`,kind:i%4===0?'pine':'oak',x:2100+dx/(2*.5196152423)+dy/.6,y:-500-dx/(2*.5196152423)+dy/.6,scale:.72+(i%3)*.035});
}
