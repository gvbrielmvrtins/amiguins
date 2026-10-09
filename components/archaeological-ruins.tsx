import {MovableMapElement} from './map-layout-editor';
import RuinsCautionTape from './ruins-caution-tape';

export default function ArchaeologicalRuins(){
  return <g data-layer="archaeological-ruins">
    <RuinsCautionTape front={false}/>
    <MovableMapElement id="ruins-first-logo-statue"><image href="/images/modular/ruinas-estatua-primeira-marca-v01.png" x="640" y="1225" width="60" height="70" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="ruins-standing-wall"><image href="/images/modular/ruinas-parede-pixacao-v01.png" x="440" y="1230" width="150" height="100" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="ruins-broken-arch"><image href="/images/modular/ruinas-arco-quebrado-v01.png" x="550" y="1290" width="80" height="52" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="ruins-rubble"><image href="/images/modular/ruinas-pedras-v01.png" x="490" y="1350" width="65" height="39" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="ruins-rubble-east"><image href="/images/modular/ruinas-pedras-v01.png" x="590" y="1280" width="43" height="26" pointerEvents="none"/></MovableMapElement>
    <RuinsCautionTape front/>
  </g>;
}
