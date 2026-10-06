import BeachProp from './beach-prop';
import SavannaProp from './savanna-prop';
import {savannaProps} from '@/lib/savanna-layout';
import { beachProps } from '@/lib/beach-layout';
import { mapCharacters } from '@/lib/map-characters';
import CommunityStudy, {CommunityGround} from './community-study';
import NeighborhoodStudy,{NeighborhoodStudyGround} from './new-neighborhood-study';
import {communityIds,communityLandscape} from '@/lib/community-study';
import CommerceStudy, {CommerceGround} from './commerce-study';
import {commerceIds,commerceLandscape} from '@/lib/commerce-study';
import SecretGardenMaze from './secret-garden-maze';
import EastDestination, { EastGround, EastFiller } from './east-district-study';
import SecretGarden, {GardenGround,GardenStudyProp} from './garden-study';
import {gardenStudyProps} from '@/lib/garden-study';
import { eastStudyIds, eastFillers, eastLandscape } from '@/lib/east-district-study';
import ParkStudyProp from './park-study-prop';
import CivicMapStudy, { CivicGround } from './civic-map-study';
import { civicIds, civicLandscape } from '@/lib/civic-study';
import ParkFence, { parkFencePanels,northGardenFencePanels } from './park-fence';
import FillerBuilding, { FillerGround } from './map-filler-study';
import { fillerBuildings, fillerLandscape, parkStudyProps } from '@/lib/map-filler';
import MapOpenSpaces,{WestGreenProps} from './map-open-spaces';
import MapNeighborhoodLots from './map-neighborhood-lots';
import PinkMapStudy from './pink-map-study';
import { mapPalette as p, modularDestinations } from '@/lib/modular-map';
import { pilotBuildings } from '@/lib/map-pilot-assets';
import { groundTransform, projectGround, buildingScale } from '@/lib/map-projection';
import PinkMapDistrict from '@/components/pink-map-district';
import { pilotLandscape } from '@/lib/pilot-landscape';
import PilotLandscapeProp from '@/components/pilot-landscape-prop';

const mainland = 'M-5000-5000H8000V8000H-5000Z';
export default function ModularMap({ selected, onSelect }: { selected: string | null; onSelect: (id: string, keyboard?: boolean) => void }) {
  return <svg className="modular-map" viewBox="0 -70 2700 1800" aria-labelledby="modular-map-title modular-map-description">
    <title id="modular-map-title">Mapa da Vila AmiguINs</title>
    <desc id="modular-map-description">Vinte destinos ilustrados em terreno retrô-pop, com praças, parques e áreas livres reservadas para personagens futuros. Além do mar, um continente aberto representa o resto do mundo e acolhe os amiguINs que moram em qualquer país, com um aeroporto para receber os personagens internacionais e uma praia na margem da vila.</desc>
    <defs>
      <pattern id="map-checks" width="64" height="64" patternUnits="userSpaceOnUse" ><rect width="64" height="64" fill={p.cream}/><path d="M0 0H32V32H0ZM32 32H64V64H32Z" fill={p.coral}/></pattern>
      <pattern id="map-stripes" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="30" height="30" fill={p.yellow}/><rect width="10" height="30" fill={p.pink}/></pattern>
      <clipPath id="map-land"><path d={mainland}/></clipPath>
    </defs>
    <g data-layer="terrain">
    <rect x="0" y="-100" width="3000" height="2100" fill="#E9E5D8"/>
    <g transform={groundTransform} stroke={p.ink} strokeWidth="5" strokeLinejoin="round">
      <path d={mainland} fill="#E9E5D8"/>
      <g clipPath="url(#map-land)">
        <NeighborhoodStudyGround/>
        <PinkMapStudy/>
        <MapNeighborhoodLots/>
        <MapOpenSpaces/>
        <FillerGround/>
        <CivicGround/><EastGround/><GardenGround/><CommerceGround/><CommunityGround/>
      </g>
    </g>
    </g>
    <g data-layer="destinations-depth-sorted">
    {savannaProps.filter(item=>item.kind==='savannaOasis').map(item=><SavannaProp key={item.id} item={item}/>)}
    <WestGreenProps/>
    {[...savannaProps.filter(item=>item.kind!=='savannaOasis').map(item=>({...item,type: 'savanna' as const})), ...beachProps.map(item=>({...item,type: 'beach' as const})), ...mapCharacters.map(item=>({...item,type: 'character' as const})), ...gardenStudyProps.filter(item=>!item.id.startsWith('secret-')).map(item=>({type: 'garden' as const,...item})), ...modularDestinations.map(destination => ({ type: 'destination' as const, ...destination })), ...eastFillers.map(item=>({type: 'east-filler' as const,...item})), ...[...parkFencePanels,...northGardenFencePanels].map(item=>({type:'fence' as const,...item})), ...parkStudyProps.map(item => ({ type: 'park' as const, ...item })), ...fillerBuildings.map(item => ({ type: 'filler' as const, ...item })), ...[...communityLandscape, ...commerceLandscape, ...pilotLandscape, ...fillerLandscape, ...civicLandscape, ...eastLandscape].map(item => ({ type: 'landscape' as const, ...item }))].sort((a,b) => (a.x+a.y)-(b.x+b.y)).map(destination => {
      if (destination.type === 'savanna') return <SavannaProp key={destination.id} item={destination}/>;
      if (destination.type === 'beach') return <BeachProp key={destination.id} item={destination}/>;
      if (destination.type === 'character') {
        const at = projectGround(destination.x, destination.y);
        return <g key={destination.id} id={`character-${destination.id}`} data-character={destination.id} transform={`translate(${at.x} ${at.y}) scale(${buildingScale})`} className="modular-destination map-character" role="button" tabIndex={0} aria-label={`Encontrar ${destination.name}`} onClick={() => onSelect(destination.id)} onKeyDown={event => { if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(destination.id, true); } }}>
          <title>{`${destination.name} — ${destination.clue}`}</title>
          <rect x={-15} y={-44} width={30} height={46} rx={5} fill="transparent"/>
          <image href={destination.file} x={-15} y={-44} width={destination.width} height={destination.height} pointerEvents="none"/>
        </g>;
      }
      if (destination.type === 'garden') return <GardenStudyProp key={destination.id} item={destination}/>;
      if (destination.type === 'east-filler') return <EastFiller key={destination.id} item={destination}/>;
      if (destination.type === 'fence') return <ParkFence key={destination.id} item={destination}/>;
      if (destination.type === 'park') return <ParkStudyProp key={destination.id} item={destination}/>;
      if (destination.type === 'filler') return <FillerBuilding key={destination.id} item={destination}/>;
      if (destination.type === 'landscape') return <PilotLandscapeProp key={destination.id} item={destination}/>;
      if(destination.id==='espacin-coloridin'||destination.id==='paises-africanos')return <NeighborhoodStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (destination.id==='jardim-secreto') return <g key={destination.id}><SecretGardenMaze/><SecretGarden destination={destination} selected={selected} onSelect={onSelect}/></g>;
      if (communityIds.has(destination.id)) return <CommunityStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (commerceIds.has(destination.id)) return <CommerceStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (eastStudyIds.has(destination.id)) return <EastDestination key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (civicIds.has(destination.id)) return <CivicMapStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (pilotBuildings[destination.id]) return <PinkMapDistrict key={destination.id} only={destination.id} selected={selected} onSelect={onSelect}/>;
      const { id, x, y, width, color, lines, name } = destination;
      const position = projectGround(x, y);
      const half = width / 2;
      const depth = half * Math.tan(Math.PI / 6);
      const plaza = id === 'pracinha';
      const height = id === 'torre-mistica' ? 260 : plaza ? 80 : 150;
      return <g key={id} id={`destination-${id}`} className={`modular-destination ${selected === id ? 'is-selected' : ''}`} transform={`translate(${position.x} ${position.y}) scale(${buildingScale})`} role="group" aria-label={name}>
        <title>{`${name} — espaço provisório`}</title>
        
        <path d={`M${-half} ${-depth}L0 ${-depth*2}L${half+28} ${-depth+20}L28 20Z`} fill={p.ink} opacity="0.18"/>
        <g stroke={p.ink} strokeWidth="4" strokeLinejoin="round">
          <path d={`M${-half} ${-depth}V${-height-depth}L0 ${-height}V0Z`} fill={p[color]}/>
          <path d={`M0 0V${-height}L${half} ${-height-depth}V${-depth}Z`} fill={p[color]}/>
          <path d={`M0 0V${-height}L${half} ${-height-depth}V${-depth}Z`} fill={p.ink} fillOpacity="0.12"/>
          <path d={`M${-half} ${-height-depth}L0 ${-height-depth*2}L${half} ${-height-depth}L0 ${-height}Z`} fill={p.cream}/>
        </g>
      </g>;
    })}
    </g>
  </svg>;
}










