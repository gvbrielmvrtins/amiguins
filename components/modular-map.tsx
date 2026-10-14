import {assetUrl} from '@/lib/asset-url';
import ForestClearingProp,{forestClearingItems} from './forest-clearing';
import ConstructionSite from './construction-site';
import EditableTrafficProps from './editable-traffic-props';
import ArchaeologicalRuins from './archaeological-ruins';
import CinemaPosterEasels from './cinema-poster-easels';
import ExtraBeachgoers from './extra-beachgoers';
import MapCars from './map-cars';
import EditableGroundPatches from './editable-ground-patches';
import {MovableMapElement,MapLayoutLayers} from './map-layout-editor';
import NorthMetropolis, {MetropolisTransitionGround} from './north-metropolis';
import NorthMountain, {NorthMountainGround} from './north-mountain';
import NorthDesert from './north-desert';
import {forestCoastPlants} from '@/lib/north-forest';
import forestComposite from '@/lib/forest-composite.json';
import cornfieldComposite from '@/lib/cornfield-composite.json';
import MetroTrain, {MetroGround,MetroUnderpass} from './metro-line';
import MapStreets from './map-streets';
import PrideParade from './pride-parade';
import BeachProp from './beach-prop';
import {paulaBeachProps} from '@/lib/paula-beach-layout';
import SeaCharacters from './sea-characters';
import SavannaProp from './savanna-prop';
import {savannaProps} from '@/lib/savanna-layout';
import { beachProps } from '@/lib/beach-layout';
import { mapCharacters } from '@/lib/map-characters';
import CommunityStudy, {CommunityGround} from './community-study';
import NeighborhoodStudy,{NeighborhoodStudyGround,ValleyCoastOverlay} from './new-neighborhood-study';
import {communityIds,communityLandscape} from '@/lib/community-study';
import CommerceStudy, {CommerceGround} from './commerce-study';
import {commerceIds,commerceLandscape} from '@/lib/commerce-study';
import SecretGardenMaze from './secret-garden-maze';
import EastDestination, { EastGround, EastFiller } from './east-district-study';
import SecretGarden, {GardenGround,GardenStudyProp,ForestGround} from './garden-study';
import {gardenStudyProps} from '@/lib/garden-study';
import { eastStudyIds, eastFillers, eastLandscape } from '@/lib/east-district-study';
import CivicMapStudy, { CivicGround } from './civic-map-study';
import { civicIds, civicLandscape } from '@/lib/civic-study';
import FillerBuilding, { FillerGround } from './map-filler-study';
import { fillerBuildings, fillerLandscape } from '@/lib/map-filler';
import MapOpenSpaces,{WestGreenProps} from './map-open-spaces';
import MapNeighborhoodLots from './map-neighborhood-lots';
import PinkMapStudy from './pink-map-study';
import { mapPalette as p, modularDestinations } from '@/lib/modular-map';
import { pilotBuildings } from '@/lib/map-pilot-assets';
import { groundTransform, projectGround, buildingScale, uprightProjection } from '@/lib/map-projection';
import PinkMapDistrict from '@/components/pink-map-district';
import { pilotLandscape } from '@/lib/pilot-landscape';
import PilotLandscapeProp from '@/components/pilot-landscape-prop';

const mainland = 'M-5000-5000H8000V8000H-5000Z';
export default function ModularMap({ selected, onSelect }: { selected: string | null; onSelect: (id: string, keyboard?: boolean) => void }) {
  return <svg className="modular-map" viewBox="380 -70 2320 1800" aria-label="mapa da amiguINlândia" aria-describedby="modular-map-description">

    <desc id="modular-map-description">Vinte destinos ilustrados em terreno retrô-pop, com praças, parques e áreas livres reservadas para personagens futuros. Além do mar, um continente aberto representa o resto do mundo e acolhe os amiguINs que moram em qualquer país, com um aeroporto para receber os personagens internacionais e uma praia na margem da vila.</desc>
    <defs>
      <pattern id="map-base-texture" width="137" height="131" patternUnits="userSpaceOnUse">
        <rect width="137" height="131" fill="#E9E5D8"/>
        {Array.from({length:55},(_,i)=><ellipse key={i} cx={(i*47+13)%137} cy={(i*61+29)%131} rx={i%4===0?3:1.5} ry={i%4===0?1.5:.85} fill={i%3===0?'#FFFEF9':'#AAA494'} opacity={i%3===0?.55:.38}/>)}
        <path d="M17 41l2-.4m66 58 2 .3m-37-84 1.6-.2m67 60 1.8 .4" fill="none" stroke="#AAA494" strokeWidth="1.2" opacity=".35"/>
      </pattern>
      <pattern id="map-checks" width="64" height="64" patternUnits="userSpaceOnUse" ><rect width="64" height="64" fill={p.cream}/><path d="M0 0H32V32H0ZM32 32H64V64H32Z" fill={p.coral}/></pattern>
      <pattern id="map-stripes" width="30" height="30" patternUnits="userSpaceOnUse" patternTransform="rotate(25)"><rect width="30" height="30" fill={p.yellow}/><rect width="10" height="30" fill={p.pink}/></pattern>
      <clipPath id="map-land"><path d={mainland}/></clipPath>
      <pattern id="pamonha-earth-texture" patternUnits="userSpaceOnUse" width="47" height="43">
        <rect width="47" height="43" fill="#B9A278"/>
        <path d="M3 9l5-2m18 7l4 1m-15 20l6-2m17-8l4 2" stroke="#957B55" strokeWidth="1.3" opacity=".45"/>
        <path d="M7 27l4 1m20-24l5 1m-4 30l3-1" stroke="#DDC69D" strokeWidth="1.5" opacity=".6"/>
        <circle cx="19" cy="8" r="1" fill="#806A4D" opacity=".35"/>
        <circle cx="41" cy="39" r="1.2" fill="#D9C5A4"/>
      </pattern>
      <linearGradient id="pamonha-earth-edge"><stop offset="0" stopColor="white"/><stop offset=".65" stopColor="white"/><stop offset="1" stopColor="black"/></linearGradient>
      <mask id="pamonha-earth-fade" maskUnits="userSpaceOnUse" x="300" y="680" width="230" height="1020"><rect x="300" y="680" width="230" height="1020" fill="url(#pamonha-earth-edge)"/></mask>
    </defs>
    <g data-layer="terrain">
    <rect x="0" y="-100" width="3000" height="2100" fill="url(#map-base-texture)"/>
    <g transform={groundTransform} stroke={p.ink} strokeWidth="5" strokeLinejoin="round">
      <path d={mainland} fill="url(#map-base-texture)"/>
      <g transform="matrix(.96225044865 -.96225044865 1.66666666667 1.66666666667 -1405.8971512087 672.5638178753)"><NorthDesert/></g>
      <g transform="matrix(.96225044865 -.96225044865 1.66666666667 1.66666666667 -1405.8971512087 672.5638178753)"><MetropolisTransitionGround/></g>
      <g clipPath="url(#map-land)">
        <MapStreets/>
        <MetroGround/>
        <ForestGround/>
        <NeighborhoodStudyGround/>
        <PinkMapStudy/>
        <MapNeighborhoodLots/>
        <MapOpenSpaces/>
        <FillerGround/>
        <CivicGround/><EastGround/><GardenGround/><CommerceGround/><CommunityGround/>
        <ValleyCoastOverlay/>
      </g>
    </g>
    </g>
    <MovableMapElement id="forest-composite" locked>
      <image data-forest-composite="back" href={assetUrl(forestComposite.back.file)} x={forestComposite.x} y={forestComposite.y} width={forestComposite.width} height={forestComposite.height} pointerEvents="none" aria-label="Árvores de trás da floresta"/>
    </MovableMapElement>
    <MovableMapElement id="forest-composite-front" locked><image data-forest-composite="front" href={assetUrl(forestComposite.front.file)} x={forestComposite.x} y={forestComposite.y} width={forestComposite.width} height={forestComposite.height} pointerEvents="none" aria-label="Árvores da frente da floresta"/></MovableMapElement>
    <MovableMapElement id="north-metropolis" locked><NorthMetropolis/></MovableMapElement>
    <MetroUnderpass/>
    <MapLayoutLayers front={false}/>
    <MovableMapElement id="north-mountain-ground" locked><NorthMountainGround/></MovableMapElement>
    <MovableMapElement id="north-mountain" locked><NorthMountain/></MovableMapElement>
    <g data-layer="destinations-depth-sorted">
    <MovableMapElement id="pamonha-cornfield-ground"><path d="M300 686Q404 682 447 704Q495 731 470 790Q456 846 483 895Q506 946 475 1005Q461 1048 481 1104Q503 1170 468 1220Q446 1270 474 1325Q497 1380 468 1433Q448 1480 480 1532Q510 1598 459 1648Q422 1674 300 1668Z" fill="url(#pamonha-earth-texture)" mask="url(#pamonha-earth-fade)" pointerEvents="none"/></MovableMapElement>
    <g pointerEvents="none" fill="url(#pamonha-earth-texture)">
      {[{x:558,y:1558,width:389},{x:1063,y:2118,width:384}].map(lot=><polygon key={lot.y} points={[[lot.x,lot.y],[lot.x+lot.width,lot.y],[lot.x+lot.width,lot.y+444],[lot.x,lot.y+444]].map(([x,y])=>{const p=projectGround(x,y);return `${p.x},${p.y}`;}).join(' ')}/>)}
    </g>
    <MovableMapElement id="pamonha-earth-organic"><path d="M483 1480C472 1454 493 1428 523 1424C547 1409 579 1417 595 1430C624 1434 639 1454 628 1473C640 1494 615 1515 589 1514C565 1532 534 1524 516 1515C489 1517 475 1500 483 1480Z" fill="url(#pamonha-earth-texture)" pointerEvents="none"/></MovableMapElement>
    <EditableGroundPatches/>
    <ConstructionSite/>
    <EditableTrafficProps/>
    <ArchaeologicalRuins/>
    <CinemaPosterEasels/>
    <ExtraBeachgoers/>
    <MovableMapElement id="silent-observer-newspaper"><image href={assetUrl("/images/modular/observador-jornal-v01.webp")} x="1140" y="1180" width="30" height="45" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="silent-observer-mug"><image href={assetUrl("/images/modular/observador-caneca-v01.webp")} x="1180" y="1180" width="30" height="45" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="silent-observer-tree"><image href={assetUrl("/images/modular/observador-arvore-v01.webp")} x="1220" y="1165" width="40" height="60" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="pingulin-microphone-original"><image href={assetUrl("/images/modular/pingulin-microfone-original.webp")} x="2025" y="972" width="32" height="34.37" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="pingulin-headphones-original"><image href={assetUrl("/images/modular/pingulin-fone-original.webp")} x="2090" y="976" width="30" height="36.55" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="retired-mascot-grandpa-crochet"><image href={assetUrl("/images/modular/mascote-vovo-croche-v01.webp")} x="1240" y="815" width="30" height="45" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="jorge-family-nonplayable"><g transform="translate(691.508051 1405) scale(0.75)" aria-label="Jorge, filho de Andressa e Jackson" pointerEvents="none"><svg x={-14.501953125/2} y={-44} width={14.501953125} height={45} viewBox="640 0 330 1024" overflow="hidden"><image href={assetUrl("/images/characters/andressa-jackson-jorge-v01.webp")} width="1536" height="1024"/></svg></g></MovableMapElement>
    <MovableMapElement id="marlon-virus-nonplayable"><image href={assetUrl("/images/modular/marlon-virus-v01.webp")} x="1500" y="1050" width="22" height="22" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="hen-rebeca-accessories"><image href={assetUrl("/images/modular/galinha-rebeca-v01.webp")} x="1490" y="1090" width="25" height="30" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="rebeca-dimensional-vortex"><image href={assetUrl("/images/modular/vortex-rebeca-v01.webp")} x="1380" y="1020" width="100" height="100" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="gabriel-female-moustache-nonplayable"><image href={assetUrl("/images/modular/gabriel-versao-feminina-bigode-v01.webp")} x="460" y="570" width="30" height="45" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="bolsonaro-cage-nonplayable"><image href={assetUrl("/images/modular/bolsonaro-jaula-npc-v04.webp")} x="1610" y="755" width="44" height="66" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="football-field-bleachers"><g transform="translate(944 1098)" pointerEvents="none"><g transform={uprightProjection(-.554, .587).transform}><image href={assetUrl("/images/modular/campinho-arquibancada-v02.webp")} width="380" height="253.33"/></g></g></MovableMapElement>
    <MovableMapElement id="lula-nonplayable"><image href={assetUrl("/images/modular/lula-npc-v02.webp")} x="1550" y="755" width="28" height="42" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="job-seekers-queue"><image href={assetUrl("/images/modular/fila-empregos-v01.webp")} x="1265" y="515" width="120" height="80" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="work-booklet-loose"><image href={assetUrl("/images/modular/carteira-trabalho-avulsa-v01.webp")} x="1370" y="610" width="30" height="30" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="cemetery-single-image"><image href={assetUrl("/images/modular/cemiterio-v01.webp")} x="885" y="1070" width="175" height="140" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="small-evangelical-church"><image href={assetUrl("/images/modular/igreja-evangelica-v01.webp")} x="1060" y="1085" width="130" height="101" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="pastor-false-eyelashes"><image href={assetUrl("/images/modular/pastor-cilios-v01.webp")} x="1245" y="1140" width="30" height="45" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="teenage-girls-group"><image href={assetUrl("/images/modular/trio-adolescentes-v01.webp")} x="1180" y="1140" width="44" height="66" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="cyclist-pedaling"><image href={assetUrl("/images/modular/ciclista-pedalando-v02.webp")} x="1450" y="1190" width="27" height="40" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="spoiled-spilled-milk"><image href={assetUrl("/images/modular/leite-derramado-estragado-v01.webp")} x="745" y="1345" width="40" height="31" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="cottage-stone-path"><image href={assetUrl("/images/modular/caminho-pedrinhas-v01.webp")} x="1117" y="1185" width="90" height="60" pointerEvents="none"/></MovableMapElement>
    <SeaCharacters/>
    <g transform="translate(1095.588457269 1459)" pointerEvents="none" aria-label="Buraco que Paula está cavando"><ellipse cx="-7" cy="0" rx="11" ry="5" fill="#AB7F48" stroke="#CDA260" strokeWidth="2"/><path d="M-15 0Q-7-5 2 0" fill="none" stroke="#735733" strokeWidth="2"/><path d="M-22 3Q-18-5-13 1L-10 5Z" fill="#D8B87B" stroke="#BE965B" strokeWidth="1"/></g>
    {savannaProps.filter(item=>item.kind==='savannaOasis').map(item=><SavannaProp key={item.id} item={item}/>)}
    <WestGreenProps/>
    {[...[...savannaProps.filter(item=>item.kind!=='savannaOasis'),...forestCoastPlants].map(item=>({...item,type: 'savanna' as const})), ...forestClearingItems.map(item=>({...item,type:'forest-clearing' as const})), ...[...beachProps,...paulaBeachProps].map(item=>({...item,type: 'beach' as const})), ...mapCharacters.map(item=>({...item,type: 'character' as const})), ...[...gardenStudyProps.filter(item=>!item.id.startsWith('secret-')&&!item.id.startsWith('north-'))].map(item=>({type: 'garden' as const,...item})), ...modularDestinations.map(destination => ({ type: 'destination' as const, ...destination })), ...eastFillers.map(item=>({type: 'east-filler' as const,...item})), ...fillerBuildings.map(item => ({ type: 'filler' as const, ...item })), ...[...communityLandscape, ...commerceLandscape, ...pilotLandscape, ...fillerLandscape.filter(item=>item.id!=='filler-park-flowers'), ...civicLandscape, ...eastLandscape].map(item => ({ type: 'landscape' as const, ...item }))].sort((a,b) => (a.id==='ze-elias-dolfo'?5000:a.id==='luara-nardelli'?1201:a.id==='naiane-de-mello'?617:a.id==='henrique-hardman'?616:a.id==='patrick-canuto'?3085:a.id==='loisi-vieira'?3086:a.id==='vagao-feminino'?615:a.id==='taverna-joguins'?a.x+a.y-200:a.x+a.y)-(b.id==='ze-elias-dolfo'?5000:b.id==='luara-nardelli'?1201:b.id==='naiane-de-mello'?617:b.id==='henrique-hardman'?616:b.id==='patrick-canuto'?3085:b.id==='loisi-vieira'?3086:b.id==='vagao-feminino'?615:b.id==='taverna-joguins'?b.x+b.y-200:b.x+b.y)).map(destination => {
      const render=()=>{
      if (destination.type === 'forest-clearing') return <ForestClearingProp item={destination}/>;
      if (destination.type === 'savanna') return <SavannaProp key={destination.id} item={destination}/>;
      if (destination.type === 'beach') return <BeachProp key={destination.id} item={destination}/>;
      if (destination.type === 'character') {
        if (destination.id === 'camila-ochoa') return null;
        const at = projectGround(destination.x, destination.y);
        return <g key={destination.id} id={`character-${destination.id}`} data-character={destination.id} transform={`translate(${at.x} ${at.y-(destination.elevation??0)}) scale(${buildingScale})`} className="modular-destination map-character" role="button" tabIndex={0} aria-label={`Encontrar ${destination.name}`} onClick={() => onSelect(destination.id)} onKeyDown={event => { if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); onSelect(destination.id, true); } }}>

          <rect x={-destination.width/2} y={1-destination.height} width={destination.width} height={destination.height+1} rx={5} fill="transparent"/>
          {destination.spriteFrame ? <svg x={-destination.width/2} y={1-destination.height} width={destination.width} height={destination.height} viewBox={`${destination.spriteFrame.x} ${destination.spriteFrame.y} ${destination.spriteFrame.width} ${destination.spriteFrame.height}`} overflow="hidden" pointerEvents="none"><image href={assetUrl(destination.file)} width={destination.spriteFrame.sourceWidth} height={destination.spriteFrame.sourceHeight}/></svg> : <image href={assetUrl(destination.file)} x={-destination.width/2} y={1-destination.height} width={destination.width} height={destination.height} pointerEvents="none"/>}
        </g>;
      }
      if (destination.type === 'garden') return <GardenStudyProp key={destination.id} item={destination}/>;
      if (destination.type === 'east-filler') return <EastFiller key={destination.id} item={destination}/>;
      if (destination.type === 'filler') return <FillerBuilding key={destination.id} item={destination}/>;
      if (destination.type === 'landscape') return <PilotLandscapeProp key={destination.id} item={destination}/>;
      if(destination.id==='pingos-nos-ins'){
        const at=projectGround(destination.x,destination.y);
        return <g id="destination-pingos-nos-ins" aria-label="pINgos nos INs — redação de jornal, comunicação e marketing" pointerEvents="none">
          <image href={assetUrl("/images/modular/pingos-nos-ins-redacao-v04.webp")} x={at.x-100} y={at.y-158} width="200" height="160.58"/>
        </g>;
      }
      if(destination.id==='colabin'){
        const at=projectGround(destination.x,destination.y);
        return <g pointerEvents="none">
          <g transform={`translate(${at.x} ${at.y-12}) matrix(.5196152423 .3 -.5196152423 .3 0 0)`}>
            <path d="M-145-112Q-155-143-117-148L74-143Q133-150 153-105L146 80Q159 120 109 140L-83 151Q-132 146-149 107L-159-18Z" fill="url(#editable-patch-sidewalk)" stroke="none"/>
          </g>
          <image href={assetUrl("/images/modular/colabin-laboratorio-v02.webp")} x={at.x-100} y={at.y-165} width={200} height={170}/>
        </g>;
      }
      if(destination.id==='espacin-coloridin')return <PrideParade key={destination.id}/>;
      if(destination.id==='paises-africanos')return <NeighborhoodStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (destination.id==='jardim-secreto') return <g key={destination.id}><SecretGardenMaze/><SecretGarden destination={destination} selected={selected} onSelect={onSelect}/></g>;
      if (communityIds.has(destination.id)) return <CommunityStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (commerceIds.has(destination.id)) return <CommerceStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (eastStudyIds.has(destination.id)) return <EastDestination key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (civicIds.has(destination.id)) return <CivicMapStudy key={destination.id} destination={destination} selected={selected} onSelect={onSelect}/>;
      if (destination.id==='vagao-feminino') return <MetroTrain key={destination.id}/>;
      if (pilotBuildings[destination.id]) return <PinkMapDistrict key={destination.id} only={destination.id} selected={selected} onSelect={onSelect}/>;
      const { id, x, y, width, color, lines, name } = destination;
      const position = projectGround(x, y);
      const half = width / 2;
      const depth = half * Math.tan(Math.PI / 6);
      const plaza = id === 'pracinha';
      const height = id === 'torre-mistica' ? 260 : plaza ? 80 : 150;
      return <g key={id} id={`destination-${id}`} className={`modular-destination ${selected === id ? 'is-selected' : ''}`} transform={`translate(${position.x} ${position.y}) scale(${buildingScale})`} role="group" aria-label={name}>


        <path d={`M${-half} ${-depth}L0 ${-depth*2}L${half+28} ${-depth+20}L28 20Z`} fill={p.ink} opacity="0.18"/>
        <g stroke={p.ink} strokeWidth="4" strokeLinejoin="round">
          <path d={`M${-half} ${-depth}V${-height-depth}L0 ${-height}V0Z`} fill={p[color]}/>
          <path d={`M0 0V${-height}L${half} ${-height-depth}V${-depth}Z`} fill={p[color]}/>
          <path d={`M0 0V${-height}L${half} ${-height-depth}V${-depth}Z`} fill={p.ink} fillOpacity="0.12"/>
          <path d={`M${-half} ${-height-depth}L0 ${-height-depth*2}L${half} ${-height-depth}L0 ${-height}Z`} fill={p.cream}/>
        </g>
      </g>;
      };
      return <MovableMapElement key={destination.id} id={destination.id} locked={destination.id==='colabin'||destination.id==='jardim-secreto'}>{render()}</MovableMapElement>;
    })}
    <MovableMapElement id="snake-plant-pot"><image href={assetUrl("/images/modular/vaso-espada-sao-jorge-v01.webp")} x="1690" y="719" width="50" height="37.48" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="camila-ochoa">
      <g transform="translate(-468.34 94.65) translate(1240 1321.5) scale(3) translate(-1240 -1321.5)">
      <g id="character-camila-ochoa" data-character="camila-ochoa" role="button" tabIndex={0} aria-label="Encontrar Camila Ochoa" className="modular-destination map-character" transform="rotate(-8 1250 1316)" onClick={()=>onSelect('camila-ochoa')} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect('camila-ochoa',true);}}}>
        <rect x="1243" y="1302.5" width="14" height="12.69" fill="transparent"/>
        <image href={assetUrl("/images/characters/camila-ochoa-v02.webp")} x="1243" y="1302.5" width="14" height="12.69" pointerEvents="none"/>
      </g>
      </g>
    </MovableMapElement>
    <MovableMapElement id="totem-eu-amo-amiguins" selectionBounds={{x:1190,y:1299,width:100,height:45}}>
      <image href={assetUrl("/images/modular/totem-eu-amo-amiguins-v02.webp")} x="1190" y="1299" width="100" height="45" pointerEvents="none"/>
    </MovableMapElement>
    <MovableMapElement id="rock-in-rio-sign"><image href={assetUrl("/images/modular/rock-in-rio-sign-v01.webp")} x="1180" y="1315" width="150" height="75" pointerEvents="none" aria-label="Letreiro Rock in Rio"/></MovableMapElement>
    <MovableMapElement id="hens-foraging-group"><image href={assetUrl("/images/modular/galinhas-ciscando-v01.webp")} x="870" y="1045" width="60" height="40" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="children-action-figures"><image href={assetUrl("/images/modular/criancas-bonequinhos-v01.webp")} x="850" y="975" width="75" height="55" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-mariachis"><image href={assetUrl("/images/modular/plaza-mariachis-v01.webp")} x="710" y="840" width="75" height="55.15" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-tango"><image href={assetUrl("/images/modular/plaza-tango-v01.webp")} x="800" y="875" width="48" height="67.64" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-tecidos"><image href={assetUrl("/images/modular/plaza-tecidos-v01.webp")} x="960" y="760" width="90" height="87.43" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-arepas"><image href={assetUrl("/images/modular/plaza-arepas-v01.webp")} x="690" y="925" width="75" height="89.92" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-peruvian-food-cart"><image href={assetUrl("/images/modular/plaza-carrinho-peruano-cuy-v02.webp")} x="880" y="780" width="80" height="100" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-argentine-obelisk"><image href={assetUrl("/images/modular/plaza-obelisco-argentino-v01.webp")} x="790" y="700" width="57" height="180" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="plaza-rbd-stage"><image href={assetUrl("/images/modular/plaza-palco-rbd-v01.webp")} x="1000" y="730" width="200" height="157" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="editable-residential-building"><image href={assetUrl("/images/modular/metropole-residencial-v01.webp")} x="780" y="860" width="95" height="120" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="central-circular-square" locked><image href={assetUrl("/images/modular/praca-central-circular-v01.webp")} x="760" y="720" width="300" height="224.8" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="linkedin-building-reimport-v02"><image href={assetUrl("/images/modular/linkedin-predio-v02.webp")} x="1100" y="750" width="175" height="137.4" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="desert-camel"><image href={assetUrl("/images/modular/deserto-camelo-v01.webp")} x="1550" y="35" width="78" height="65" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="desert-editable-dune"><image href={assetUrl("/images/modular/deserto-dunas-v01.webp")} x="1510" y="-60" width="340" height="195" pointerEvents="none"/></MovableMapElement>
    <MapCars/>
    {cornfieldComposite.flatMap(block=>block.layers.map(layer=><MovableMapElement key={`${block.id}-${layer}`} id={`${block.id}-layer-${layer}`} locked={block.id!=='pamonhal-bloco-3'}><svg x={block.x} y={block.y} width={block.width} height={block.height} viewBox={`${block.layers.indexOf(layer)*block.tileWidth} 0 ${block.tileWidth} ${block.tileHeight}`} overflow="hidden" pointerEvents="none"><image href={assetUrl(block.file)} width={block.atlasWidth} height={block.tileHeight}/></svg></MovableMapElement>))}
    <MapLayoutLayers front/>
    </g>
  </svg>;
}
