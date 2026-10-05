import type { LandscapeProp } from './pilot-landscape';

export const civicIds = new Set(['pracinha','torre-mistica','prefeintura','plaza-hispanica']);
// Equal 420-unit lots on a 510-unit grid leave 90-unit streets on both axes.
export const civicLotSize=420;
const civicLandscapeBase: LandscapeProp[] = [
  {id:'civic-city-tree',kind:'tree',x:1090,y:300,size:100},
  {id:'civic-city-lamp',kind:'lamp',x:1400,y:470},
  {id:'civic-city-notice',kind:'notice',x:1120,y:460},
  {id:'civic-city-flowers',kind:'planter',x:1260,y:480},
  {id:'civic-square-tree',kind:'tree',x:1120,y:820,size:100},
  {id:'civic-square-bench',kind:'bench',x:1140,y:1000},
  {id:'civic-square-table',kind:'table',x:1350,y:870},
  {id:'civic-square-lamp',kind:'lamp',x:1420,y:1010},
  {id:'civic-tower-tree',kind:'tree',x:1510,y:545,size:95},
  {id:'civic-tower-flowers',kind:'planter',x:1710,y:740},
  {id:'civic-tower-lamp',kind:'lamp',x:1800,y:740},
  {id:'civic-plaza-tree',kind:'tree',x:1625,y:1020,size:95},
  {id:'civic-plaza-table',kind:'table',x:1680,y:1240},
  {id:'civic-plaza-bench',kind:'bench',x:1850,y:1280},
  {id:'civic-plaza-lamp',kind:'lamp',x:1930,y:1260},
  {id:'civic-plaza-flowers',kind:'planter',x:1880,y:1070},
];
export const civicLandscape: LandscapeProp[] = civicLandscapeBase.map(item=>{
  const [dx,dy]=item.id.startsWith('civic-tower-') ? [110,-270] : item.id.startsWith('civic-square-') ? [-10,-100] : item.id.startsWith('civic-plaza-') ? [0,-260] : [0,0];
  return {...item,x:item.x+dx,y:item.y+dy};
});
