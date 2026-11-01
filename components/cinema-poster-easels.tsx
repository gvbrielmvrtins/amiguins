import {assetUrl} from '@/lib/asset-url';
import {MovableMapElement} from './map-layout-editor';

// The supplied posters remain original files; only their display plane is projected.
export default function CinemaPosterEasels() {
  return <g data-layer="cinema-poster-easels">
    {[
      {id:'cinema-poster-ultima-casa',file:'cartaz-a-ultima-casa.webp',title:'A Última Casa',x:825,y:510},
      {id:'cinema-poster-la-la-land',file:'cartaz-la-la-land.jpg',title:'La La Land',x:855,y:525},
    ].map(poster=><MovableMapElement key={poster.id} id={poster.id}>
      <g transform={`translate(${poster.x} ${poster.y}) scale(0.036)`} aria-label={`Em cartaz: ${poster.title}`}>
        <image href={assetUrl("/images/modular/cineminha-cartaz-isometrico-v01.webp")} width="1100" height="1430"/>
        <defs>
          <clipPath id={`${poster.id}-upper`}><path d="M0 0H400V600Z"/></clipPath>
          <clipPath id={`${poster.id}-lower`}><path d="M0 0L400 600H0Z"/></clipPath>
        </defs>
        {/* Match all four inner frame corners, including the easel's slight taper. */}
        {[{part:'upper',matrix:'matrix(.975 -.52 .153333 .888333 423 558)'},{part:'lower',matrix:'matrix(1.0075 -.511667 .131667 .882778 423 558)'}].map(plane=><g key={plane.part} transform={plane.matrix} clipPath={`url(#${poster.id}-${plane.part})`} pointerEvents="none">
          <svg width="400" height="600" viewBox="0 0 400 600" overflow="hidden">
            <image href={assetUrl(`/images/modular/${poster.file}`)} width="400" height="600" preserveAspectRatio="xMidYMid slice"/>
          </svg>
        </g>)}
        <path d="M423 558L813 350L905 883L502 1087.667Z" fill="none" stroke="#30261D" strokeWidth="7" strokeOpacity=".32" strokeLinejoin="round" pointerEvents="none"/>
      </g>
    </MovableMapElement>)}
  </g>;
}
