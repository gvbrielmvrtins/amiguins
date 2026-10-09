import {MovableMapElement} from './map-layout-editor';

// The supplied posters remain original files; only their display plane is projected.
export default function CinemaPosterEasels() {
  return <g data-layer="cinema-poster-easels">
    {[
      {id:'cinema-poster-ultima-casa',file:'cartaz-a-ultima-casa.webp',title:'A Última Casa',x:825,y:510},
      {id:'cinema-poster-la-la-land',file:'cartaz-la-la-land.jpg',title:'La La Land',x:855,y:525},
    ].map(poster=><MovableMapElement key={poster.id} id={poster.id}>
      <g transform={`translate(${poster.x} ${poster.y}) scale(0.036)`} aria-label={`Em cartaz: ${poster.title}`}>
        <image href="/images/modular/cineminha-cartaz-isometrico-v01.png" width="1100" height="1430"/>
        <image href={`/images/modular/${poster.file}`} width="418" height="534" preserveAspectRatio="none" transform="matrix(1 -0.4952 0.1423 1 421 556)" pointerEvents="none"/>
      </g>
    </MovableMapElement>)}
  </g>;
}
