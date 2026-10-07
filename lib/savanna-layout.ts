// Decorative herds leave the airport and its access clear; animals are not game targets.
const herds=[
 {kind:'savannaElephant',x:2390,y:2390,count:5,spacing:75},
 {kind:'savannaGiraffe',x:2480,y:2110,count:5,spacing:85},
 {kind:'savannaZebra',x:2420,y:2210,count:10,spacing:55},
 {kind:'savannaImpala',x:2540,y:2100,count:12,spacing:42},
 {kind:'savannaLion',x:2600,y:2300,count:5,spacing:45},
];
// Keep the full silhouette of Kauana and her lamb clear, including sprite margins.
const lowVegetation=Array.from({length:240},(_,i)=>({
 id:`savanna-grass-${i}`,kind:'savannaGrass',
 x:2350+(i%15)*29+Math.sin(i*2.1)*18,
 y:1960+Math.floor(i/15)*36+Math.cos(i*1.9)*16,
 mirror:i%2===1,scale:.75+(i%3)*.15,
})).filter(item=>{
 if(item.x<2330+Math.max(0,2200-item.y)*.4||item.x+item.y>4950)return false;
 if(item.x>2630&&item.y<2260)return false;
 return [[2410,2180],[2440,2180]].every(([x,y])=>{
  const dx=((item.x-item.y)-(x-y))*.5196152423,dy=((item.x+item.y)-(x+y))*.3;
  return Math.abs(dx)>30||dy< -43||dy>23;
 });
});
const coastalVegetation=[[2400,2090],[2430,2040],[2315,2160],[2340,2200],[2370,2250],[2440,2180],[2375,2050],[2405,2165],[2330,2245]].map(([x,y],i)=>({
 id:`savanna-coastal-grass-${i}`,kind:'savannaGrass',x,y,mirror:i%2===0,scale:.85,
}));
const vegetation=[...lowVegetation,...coastalVegetation].map(item=>{
 // Keep vegetation west of the terminal silhouette; reuse displaced clumps inland.
 const sx=(item.x-item.y)*.5196152423,sy=(item.x+item.y)*.3;
 if(sx>250&&sy<1460)return {...item,x:2380+(Number(item.id.match(/\d+$/)?.[0]??0)%6)*35,y:2320+(Number(item.id.match(/\d+$/)?.[0]??0)%5)*33};
 return item;
});
export const savannaProps=[...vegetation,...herds.flatMap(herd=>Array.from({length:herd.count},(_,i)=>({
 id:`${herd.kind}-${i}`,kind:herd.kind,
 x:herd.kind==='savannaGiraffe'&&i===0?2390:herd.kind==='savannaElephant'&&i>=3?(i===3?2590:2670):herd.x+(i%3)*herd.spacing+(Math.sin(i*2.3)*15),
 y:herd.kind==='savannaGiraffe'&&i===0?2130:herd.kind==='savannaElephant'&&i>=3?2410:herd.y+Math.floor(i/3)*herd.spacing+Math.cos(i*1.7)*20,
 mirror:i%3===1,scale:i%4===3?.72:1,
}))),...[
 [2384,2240],[2350,2680],[2490,2040],[2460,1970],[2330,2400],[2400,2010],
].map(([x,y],i)=>({id:`savanna-acacia-${i}`,kind:'savannaAcacia',x,y,mirror:i%2===1,scale:i===0?.6:i===1?.85:i===4?.75:.6})),
 {id:'savanna-acacia-behind-jeep',kind:'savannaAcacia',x:2405,y:2095,mirror:false,scale:.7},
 ...[[2570,2060],[2780,2260],[2520,1980],[2720,2350]].map(([x,y],i)=>({id:`savanna-visitor-${i+1}`,kind:`savannaVisitor${i+1}`,x,y,mirror:false,scale:1})),
 {id:'savanna-lioness',kind:'savannaLioness',x:2570,y:2340,mirror:false,scale:1},
 {id:'savanna-rhino',kind:'savannaRhino',x:2390,y:2300,mirror:false,scale:1},
 {id:'savanna-safari',kind:'savannaSafari',x:2455,y:2145,mirror:true,scale:.85},
 {id:'savanna-angel-lamb',kind:'savannaLamb',x:2440,y:2180,mirror:true,scale:1},
 {id:'savanna-oasis',kind:'savannaOasis',x:2440,y:2510,mirror:false,scale:1},
];
export type SavannaItem=typeof savannaProps[number];
