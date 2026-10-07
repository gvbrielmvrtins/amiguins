// Ground-plane artwork: lots and the coastline render above the streets.
const lanes=[
  'M30 55H2990',
  'M30 55V2580',
  'M500 55V2620',
  'M1005 55V2620',
  'M1505 55V2620',
  'M1995 55V1400',
  'M2495 55V1270',
  'M30 465H2990',
  'M1005 575H2495',
  'M30 965H2990',
  'M1005 1250H2495',
  'M30 1500H1890',
  'M30 2060H1690',
  'M30 2620H1505',
];
const crossings=[
  {x:500,y:280,turn:0},{x:500,y:750,turn:0},
  {x:1005,y:300,turn:0},{x:1505,y:330,turn:0},
  {x:1995,y:720,turn:0},{x:2495,y:780,turn:0},
  {x:500,y:1220,turn:0},{x:1005,y:1780,turn:0},
  {x:300,y:465,turn:90},{x:770,y:465,turn:90},
  {x:1260,y:575,turn:90},{x:1770,y:575,turn:90},
  {x:2250,y:465,turn:90},{x:740,y:1500,turn:90},
  {x:1300,y:2060,turn:90},
];
export default function MapStreets(){
  return <g data-layer="streets" pointerEvents="none" stroke="none" aria-label="Ruas de asfalto com faixas de pedestres e sinalização">
    <defs>
      <pattern id="street-asphalt" width="79" height="73" patternUnits="userSpaceOnUse">
        <rect width="79" height="73" fill="#747976"/>
        {Array.from({length:64},(_,i)=><ellipse key={i} cx={(i*37+11)%79} cy={(i*23+17)%73} rx={i%3===0?1.4:.7} ry={i%3===0?1:.6} fill={i%2?'#ADB0A6':'#4F5654'} opacity={i%3===0?.42:.6}/>)}
        <path d="M9 27l5-1m31 32 4 1m12-44 3-1" stroke="#929890" strokeWidth=".8" opacity=".45"/>
      </pattern>
    </defs>
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={lanes.join(' ')} stroke="#BDB6A5" strokeWidth="116"/>
      <path d={lanes.join(' ')} stroke="#4E5654" strokeWidth="104"/>
      <path d={lanes.join(' ')} stroke="url(#street-asphalt)" strokeWidth="98"/>
    </g>
    <g fill="none" stroke="#EACB76" strokeWidth="3" strokeDasharray="19 22" opacity=".8">
      {lanes.map((d,i)=><path key={i} d={d}/>)}
    </g>
    {crossings.map((p,i)=><g key={i} transform={`translate(${p.x} ${p.y}) rotate(${p.turn})`}>
      <rect x="-45" y="-35" width="90" height="70" fill="url(#street-asphalt)"/>
      {Array.from({length:6},(_,j)=><rect key={j} x="-42" y={-30+j*11} width="84" height="6" rx=".7" fill="#FFF6DF"/>)}
      <path d="M-44-43H44M-44 43H44" stroke="#FFF6DF" strokeWidth="3"/>
    </g>)}
    <g fill="none" stroke="#FFF6DF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity=".8">
      {[{x:520,y:590},{x:985,y:1100},{x:1525,y:1860}].map((p,i)=><path key={i} d={`M${p.x} ${p.y+17}v-34m-8 9 8-9 8 9`}/>)}
    </g>
    <g fill="#535C59" stroke="#303A37" strokeWidth="1.5">
      {[{x:487,y:905},{x:992,y:1940},{x:1982,y:590}].map((p,i)=><g key={i} transform={`translate(${p.x} ${p.y})`}>
        <circle r="10"/><circle r="7" fill="none"/>
        <path d="M-5-3H5M-5 1H5M-5 5H5" fill="none"/>
      </g>)}
    </g>
  </g>;
}
