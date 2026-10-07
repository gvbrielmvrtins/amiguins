const desertEdge='M520-600H2600V-80Q2370-30 2150 15Q1950 55 1790 115Q1630 190 1460 190Q1300 175 1130 125Q950 90 780 60Q650 40 520-30Z';

export default function NorthDesert(){return <g data-layer="north-desert" pointerEvents="none" stroke="none" strokeWidth="0" aria-label="Deserto de dunas entre a metrópole e a montanha">
  <defs>
    <pattern id="desert-sand" width="61" height="47" patternUnits="userSpaceOnUse"><rect width="61" height="47" fill="#EED096"/><path d="M3 12q12-5 26-1M34 31q10-4 24-1M8 41l9-2" fill="none" stroke="#CBA979" strokeWidth=".8" opacity=".42"/><circle cx="19" cy="24" r=".9" fill="#F7DFAC"/><circle cx="47" cy="7" r=".7" fill="#B88E5F" opacity=".35"/></pattern>
    <linearGradient id="desert-urban-blend" x1="650" y1="0" x2="1450" y2="0" gradientUnits="userSpaceOnUse"><stop stopColor="#DAD8C7"/><stop offset=".42" stopColor="#E2D8B7"/><stop offset="1" stopColor="#EED096"/></linearGradient>
    <filter id="desert-edge-soft"><feGaussianBlur stdDeviation="28"/></filter>
    <mask id="desert-blend"><path d={desertEdge} fill="white" filter="url(#desert-edge-soft)"/></mask>
    <clipPath id="desert-boundary"><path d={desertEdge}/></clipPath>
  </defs>
  <g mask="url(#desert-blend)">
    <rect x="480" y="-650" width="2170" height="900" fill="url(#desert-sand)"/>
    <rect x="480" y="-650" width="1100" height="900" fill="url(#desert-urban-blend)" opacity=".64"/>
    {Array.from({length:14},(_,i)=><path key={`ripple-${i}`} d={`M${850+i*43} ${30+i%3*19}q90-28 185-10t180-15`} fill="none" stroke={i%2?'#FFF0C4':'#D1AA75'} strokeWidth={i%3===0?2:1} opacity=".24"/>)}
    <g clipPath="url(#desert-boundary)">
      {[{x:1050,y:-200,w:400},{x:1350,y:-240,w:460},{x:1670,y:-250,w:470},{x:1190,y:-65,w:350},{x:1480,y:-70,w:400},{x:1760,y:-115,w:420}].map((d,i)=><image key={i} href="/images/modular/deserto-dunas-v01.png?v=1" x={d.x} y={d.y} width={d.w} height={d.w*.58} transform={i%2?`translate(${2*d.x+d.w} 0) scale(-1 1)`:undefined}/>)}
    </g>
  </g>
</g>;}
