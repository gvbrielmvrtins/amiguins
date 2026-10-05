import {communityIds} from '@/lib/community-study';
import {commerceIds} from '@/lib/commerce-study';
import { modularDestinations, mapPalette as p } from '@/lib/modular-map';
import { buildingScale } from '@/lib/map-projection';
import { pilotBuildings } from '@/lib/map-pilot-assets';
import { civicIds } from '@/lib/civic-study';

export default function MapNeighborhoodLots({ island = false }: { island?: boolean }) {
  return <g data-layer={island ? 'island-lot' : 'neighborhood-lots'}>
    {modularDestinations.filter(d=>d.id!=='espacin-coloridin' && d.id!=='paises-africanos' && !communityIds.has(d.id) && !commerceIds.has(d.id) && !pilotBuildings[d.id] && !civicIds.has(d.id) && d.id !== 'jardim-secreto' && d.id !== 'taverna-joguins' && d.id !== 'linkedin' && d.id !== 'silicin-valley' && !island).map((d,index)=> {
      // The marker anchor is its front corner. The centre of its ground
      // footprint is behind that corner, not at the top of the drawn roof.
      const inset = d.width * buildingScale * Math.tan(Math.PI/6) / 1.2;
      const cx=d.x-inset, cy=d.y-inset;
      const circle=d.id==='pracinha' || d.id==='plaza-hispanica';
      const radius=d.id==='pracinha' ? 210 : 185;
      return <g key={d.id} data-terrain-for={d.id} transform={`translate(${cx} ${cy})`} fill={d.id==='jardim-secreto' ? '#B6C994' : p.yellow} stroke="#C3A333" strokeWidth="3">
        {d.id==='taverna-joguins' ? <rect x="-180" y="-180" width="360" height="360" rx="60"/> : circle ? <circle r={radius}/> : index%3===0 ? <ellipse rx="190" ry="175"/> : index%3===1 ?
          <path d="M-155-145Q-95-205 30-180Q180-190 195-60Q220 65 120 150Q0 205-120 155Q-205 115-185-20Q-200-100-155-145Z"/> :
          <rect x="-180" y="-175" width="360" height="350" rx="90"/>}
      </g>;
    })}
  </g>;
}




