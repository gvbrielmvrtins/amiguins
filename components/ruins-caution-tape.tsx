import {MovableMapElement} from './map-layout-editor';

export default function RuinsCautionTape({front}:{front:boolean}){
  const x=front?501:302,y=front?1422:1307;
  return <g data-layer={front?'ruins-tape-front':'ruins-tape-back'}>
    {[0,1].map(i=><MovableMapElement key={i} id={`ruins-caution-${front?'front-east':'back-west'}-${i}`}>
      <g transform={`translate(${x+i*115} ${y-i*66.7}) scale(${115/1242})`} pointerEvents="none">
        <g transform="matrix(1 -.209 0 1 0 0)"><image href="/images/modular/faixa-nao-ultrapasse-v01.png" x="-164" y="-918" width="1536" height="1024"/></g>
      </g>
    </MovableMapElement>)}
    {[0,1].map(i=><MovableMapElement key={`falling-${i}`} id={`ruins-caution-${front?'front-west':'back-east'}-${i}`}>
      <g transform={`translate(${(front?302:532)+i*99.5} ${(front?1307:1174)+i*57.5}) scale(${99.5/1292})`} pointerEvents="none">
        <g transform="matrix(1 .164 0 1 0 0)"><image href="/images/modular/faixa-nao-ultrapasse-oposta-v01.png" x="-122" y="-450" width="1536" height="1024"/></g>
      </g>
    </MovableMapElement>)}
  </g>;
}
