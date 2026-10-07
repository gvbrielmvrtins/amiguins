export type GardenProp = {id:string;kind:string;x:number;y:number;scale?:number};
export const secretGarden={x:2740,y:200,w:520,h:480};
export const northGarden={x:1550,y:-30,w:440,h:230};
export const gardenStudyProps:GardenProp[]=[
  {id:'north-oak',kind:'oak',x:1420,y:-50},
  {id:'north-pine',kind:'pine',x:1540,y:-65},
  {id:'north-oak-east',kind:'oak',x:1680,y:-65},
  {id:'north-birch',kind:'birch',x:1690,y:35},
];

