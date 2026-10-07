// Positions in upright map pixels around Paula; follow the diagonal beach.
const at=(dx:number,dy:number)=>({x:2080+dx/1.0392304846+dy/.6,y:2050-dx/1.0392304846+dy/.6});
export const paulaBeachProps=[
 {id:'paula-sandcastle',kind:'beachSandcastle',...at(35,-17)},
 {id:'paula-whale',kind:'beachWhale',...at(-110,45)},
 {id:'paula-bather-1',kind:'beachBather1',...at(-30,12)},
 {id:'paula-bather-2',kind:'beachBather2',...at(68,-28)},
 {id:'paula-bather-3',kind:'beachBather2',...at(-52,33)},
 {id:'paula-bather-4',kind:'beachBather1',...at(17,-26)},
 {id:'paula-shell-3',kind:'beachShell',...at(-7,22)},
 {id:'paula-shell-4',kind:'beachShell',...at(44,1)},
 {id:'paula-shell-1',kind:'beachShell',...at(10,14)},
 {id:'paula-shell-2',kind:'beachShell',...at(92,-53)},
];
