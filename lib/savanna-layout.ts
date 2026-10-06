// Decorative herds leave the airport and its access clear; animals are not game targets.
const herds=[
 {kind:'savannaElephant',x:2390,y:2390,count:5,spacing:75},
 {kind:'savannaGiraffe',x:2480,y:2110,count:5,spacing:85},
 {kind:'savannaZebra',x:2420,y:2210,count:10,spacing:55},
 {kind:'savannaImpala',x:2540,y:2100,count:12,spacing:42},
 {kind:'savannaLion',x:2600,y:2300,count:5,spacing:45},
];
// Keep the full silhouette of Kauana and her lamb clear, including sprite margins.
const lowVegetation=Array.from({length:100},(_,i)=>({
 id:`savanna-grass-${i}`,kind:'savannaGrass',
 x:2350+(i%10)*43+Math.sin(i*2.1)*18,
 y:1960+Math.floor(i/10)*57+Math.cos(i*1.9)*16,
 mirror:i%2===1,scale:.75+(i%3)*.15,
})).filter(item=>{
 if(item.x<2330+Math.max(0,2200-item.y)*.4||item.x+item.y>4950)return false;
 if(item.x>2630&&item.y<2260)return false;
 return [[2360,2130],[2390,2130]].every(([x,y])=>{
  const dx=((item.x-item.y)-(x-y))*.5196152423,dy=((item.x+item.y)-(x+y))*.3;
  return Math.abs(dx)>45||dy< -65||dy>30;
 });
});
const coastalVegetation=[[2400,2090],[2430,2040],[2350,2200],[2370,2250],[2440,2180]].map(([x,y],i)=>({
 id:`savanna-coastal-grass-${i}`,kind:'savannaGrass',x,y,mirror:i%2===0,scale:.85,
}));
export const savannaProps=[...lowVegetation,...coastalVegetation,...herds.flatMap(herd=>Array.from({length:herd.count},(_,i)=>({
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
 {id:'savanna-angel-lamb',kind:'savannaLamb',x:2390,y:2130,mirror:true,scale:1},
 {id:'savanna-oasis',kind:'savannaOasis',x:2440,y:2510,mirror:false,scale:1},
];
export type SavannaItem=typeof savannaProps[number];
