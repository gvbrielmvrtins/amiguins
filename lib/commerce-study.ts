import type {LandscapeProp} from './pilot-landscape';
export const commerceIds=new Set(['academia-marombins','oficina-vendinhas','binstro']);
export const commerceLots=[
 {id:'academia-marombins',x:1310,y:1780,color:'#F77B5D'},
 {id:'oficina-vendinhas',x:1310,y:2340,color:'#F889BA'},
 {id:'binstro',x:750,y:1780,color:'#FAD846'},
];
export const commerceLandscape:LandscapeProp[]=commerceLots.flatMap(l=>[
 {id:`${l.id}-tree`,kind:'tree' as const,x:l.x-165,y:l.y-120,size:90},
 {id:`${l.id}-lamp`,kind:'lamp' as const,x:l.x+(l.id==='oficina-vendinhas'?195:170),y:l.y+(l.id==='oficina-vendinhas'?50:155)},
 {id:`${l.id}-flowers`,kind:'planter' as const,x:l.x+140,y:l.y-145},
]);
commerceLandscape.push(
 {id:'binstro-terrace-a',kind:'table',x:655,y:1910},
 {id:'binstro-terrace-b',kind:'table',x:830,y:1890},
);


