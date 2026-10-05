import type { LandscapeProp } from './pilot-landscape';
export const eastStudyIds=new Set(['linkedin','silicin-valley','taverna-joguins']);
export const eastLots=[
  {id:'taverna-joguins',x:2240,y:200,w:420,h:420,color:'#F77B5D'},
  {id:'linkedin',x:2240,y:710,w:420,h:420,color:'#3774FA'},
  {id:'silicin-valley',x:2750,y:900,w:420,h:420,color:'#3774FA'},
  {id:'east-cafe',x:2750,y:550,w:280,h:150,color:'#FAD846'},
  {id:'east-garden',x:2240,y:1100,w:400,h:180,color:'#91AE77'},
];
export const eastFillers=[{id:'east-cafe',x:2750,y:550},{id:'east-garden',x:2240,y:1100}];
export const eastLandscape:LandscapeProp[]=[
  {id:'east-tav-tree',kind:'tree',x:2075,y:90,size:95},
  {id:'east-tav-lamp',kind:'lamp',x:2090,y:345},
  {id:'east-in-lamp',kind:'lamp',x:2110,y:860},
  {id:'east-valley-lamp',kind:'lamp',x:2575,y:1055},
  {id:'east-cafe-table',kind:'table',x:2820,y:590},
  {id:'east-garden-tree-a',kind:'tree',x:2100,y:1050,size:90},
  {id:'east-garden-tree-b',kind:'tree',x:2370,y:1050,size:85},
];

