import { pilotLots as lots } from '@/lib/pilot-landscape';

// Each building owns a lot; the circulation network occupies the gaps.
export default function PinkMapStudy() {
  return <g data-layer="pink-study" pointerEvents="none">
    <defs>
      <clipPath id="pink-study-boundary"><path d="M-400-220Q-340-380-140-380L970-240Q1130-210 1130-50L1110 820Q800 1000 180 1030L-210 970Q-400 850-400 570Z"/></clipPath>
      <mask id="pink-study-outside-lots" maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="1100">
        <rect width="1200" height="1100" fill="white"/>
        {lots.map(lot=><rect key={lot.id} x={lot.x} y={lot.y} width={lot.width} height={lot.height} rx="48" fill="black" stroke="black" strokeWidth="12"/>)}
      </mask>
    </defs>
    <g clipPath="url(#pink-study-boundary)" stroke="none">

      {/* Pedestrian gaps retain the open surrounding ground surface. */}

      {lots.map(lot=> {
        return <g key={lot.id} data-building-lot={lot.id}>
          <rect data-reserved-bed={lot.id} x={lot.x+23} y={lot.y+23} width="84" height={lot.height-65} rx="25" fill={lot.id === 'mercado-vagas' || lot.id === 'livrinhoteca' ? 'url(#civic-grass)' : '#9CBA78'} stroke="#547653" strokeWidth="2"/>
          {[55,105,155,205].map((dy,i)=><g key={dy} stroke="#648D58" strokeWidth="2" fill="none"><path d={`M${lot.x+43+i%2*30} ${lot.y+dy}l-5-8m5 8l8-6`}/><path d={`M${lot.x+65} ${lot.y+dy+14}l-3-6m3 6l6-4`}/></g>)}
          {/* Small stepping stones lead to the side gardens, not across doorways. */}
          {[0,1,2].map(i=><rect key={i} x={lot.x+117+i*29} y={lot.y+lot.height-92} width="21" height="32" rx="5" fill="#E4D8BE" stroke="#BAAD91" strokeWidth="1.5"/>)}
          <path d={`M${lot.x+lot.width-68} ${lot.y+20}V${lot.y+lot.height-20}`} stroke="#E7DDC9" strokeWidth="2"/>
        </g>;
      })}
    </g>
  </g>;
}
