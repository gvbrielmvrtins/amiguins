import {MovableMapElement} from './map-layout-editor';
import { projectGround, buildingScale } from '@/lib/map-projection';
import { modularDestinations, mapPalette as p } from '@/lib/modular-map';
import { pinkDistrict, pilotBuildings, pilotOrnaments, pilotAssetPath, pilotProjections } from '@/lib/map-pilot-assets';

export default function PinkMapDistrict({ selected, onSelect, only }: { only?: string; selected: string | null; onSelect: (id: string, keyboard?: boolean) => void }) {
  const ordered = pinkDistrict.filter(site => !only || site.id === only).sort((a, b) => a.order - b.order);
  return <g data-module="pink-district">
    <g data-layer="buildings">
      {ordered.map(site => {
        const asset = pilotBuildings[site.id];
        const position = projectGround(site.position.x, site.position.y);
        const name = modularDestinations.find(d => d.id === site.id)!.name;
        const x = -site.anchor.x * site.scale;
        const y = -site.anchor.y * site.scale;
        const width = site.source.width * site.scale;
        const height = site.source.height * site.scale;
        const building=<g key={site.id} id={`destination-${site.id}`} data-order={site.order} transform={`translate(${position.x} ${position.y}) scale(${buildingScale})`} className={`modular-destination ${selected === site.id ? 'is-selected' : ''}`} role="group" aria-label={name}>

          <g data-projection="upright-isometric" transform={pilotProjections[site.id].transform}>

            <image href={`${pilotAssetPath}${asset.file}`} x={x} y={y} width={width} height={height} preserveAspectRatio="xMidYMid meet"/>
          </g>
        </g>;
        return site.id==='livrinhoteca'
          ? <MovableMapElement key={site.id} id="livrinhoteca/building">{building}</MovableMapElement>
          : building;
      })}
    </g>
    <g data-layer="foreground-decoration" aria-hidden="true" pointerEvents="none">
      {pilotOrnaments.filter(ornament => !only || ornament.destination === only).sort((a,b) => (a.y+a.height)-(b.y+b.height)).map(ornament => {
        const position = projectGround(ornament.x, ornament.y);
        const width = ornament.width * buildingScale;
        const height = ornament.height * buildingScale;
        const image=<image key={ornament.id} href={`${pilotAssetPath}${ornament.file}`} x={position.x-width/2} y={position.y-height} width={width} height={height} preserveAspectRatio="xMidYMid meet"/>;
        return ornament.destination==='livrinhoteca'
          ? <MovableMapElement key={ornament.id} id={ornament.id}>{image}</MovableMapElement>
          : image;
      })}
    </g>
  </g>;
}

