import { studyRoads } from '@/lib/map-study-roads';

export default function MapStreetStudy() {
  // Outline pass followed by a fill pass keeps intersections open.
  return <g data-layer="street-network" fill="none" strokeLinecap="round" strokeLinejoin="round" pointerEvents="none">
    <g stroke="#A69F8E" strokeWidth="68">{studyRoads.map(road => <path key={road.id} d={road.d}/>)}</g>
    <g stroke="#FFFEF9" strokeWidth="64">{studyRoads.map(road => <path key={road.id} data-road={road.id} d={road.d}/>)}</g>
  </g>;
}

