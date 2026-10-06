// Decorative herds leave the airport and its access clear; animals are not game targets.
const herds=[
 {kind:'savannaElephant',x:2390,y:2390,count:5,spacing:75},
 {kind:'savannaGiraffe',x:2480,y:2110,count:5,spacing:85},
 {kind:'savannaZebra',x:2420,y:2210,count:10,spacing:55},
 {kind:'savannaImpala',x:2620,y:2020,count:12,spacing:42},
 {kind:'savannaLion',x:2600,y:2300,count:5,spacing:45},
];
export const savannaProps=[...herds.flatMap(herd=>Array.from({length:herd.count},(_,i)=>({
 id:`${herd.kind}-${i}`,kind:herd.kind,
 x:herd.x+(i%3)*herd.spacing+(Math.sin(i*2.3)*15),
 y:herd.y+Math.floor(i/3)*herd.spacing+Math.cos(i*1.7)*20,
 mirror:i%3===1,scale:i%4===3?.72:1,
}))),...[
 [2450,2070],[2380,2550],[2660,2180],[2550,1990],[2330,2400],[2510,2430],
].map(([x,y],i)=>({id:`savanna-acacia-${i}`,kind:'savannaAcacia',x,y,mirror:i%2===1,scale:1})),
 {id:'savanna-lioness',kind:'savannaLioness',x:2570,y:2340,mirror:false,scale:1},
 {id:'savanna-rhino',kind:'savannaRhino',x:2390,y:2300,mirror:false,scale:1},
 {id:'savanna-safari',kind:'savannaSafari',x:2510,y:2040,mirror:true,scale:1},
 {id:'savanna-angel-lamb',kind:'savannaLamb',x:2578,y:2245,mirror:false,scale:1},
 {id:'savanna-oasis',kind:'savannaOasis',x:2440,y:2510,mirror:false,scale:1},
];
export type SavannaItem=typeof savannaProps[number];
