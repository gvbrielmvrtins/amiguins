import type {LandscapeProp} from './pilot-landscape';
export const communityLots=[
 {id:'inglish-pub',x:750,y:2340,size:420,color:'#F77B5D'},
 {id:'estudio-criativins',x:750,y:1220,size:420,color:'#FAD846'},
 {id:'departamento-xerifins',x:190,y:1780,size:420,color:'#3774FA'},
];
export const communityIds=new Set(communityLots.map(l=>l.id));
export const communityLandscape:LandscapeProp[]=communityLots.flatMap(l=>[
 {id:`${l.id}-tree`,kind:'tree' as const,x:l.x-145,y:l.y-120,size:85},
 {id:`${l.id}-lamp`,kind:'lamp' as const,x:l.x-165,y:l.y+140},
 {id:`${l.id}-planter`,kind:'planter' as const,x:l.x+135,y:l.y-130},
]);
communityLandscape.push({id:'xerifins-notice',kind:'notice',x:120,y:1925});


