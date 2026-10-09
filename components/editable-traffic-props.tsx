import {MovableMapElement} from './map-layout-editor';

export default function EditableTrafficProps(){
  return <g data-layer="editable-traffic-props">
    <MovableMapElement id="railway-crossing-gate"><g transform="translate(641 1195) scale(-1 1)" pointerEvents="none"><image href="/images/modular/cancela-ferroviaria-v01.png" width="96" height="65"/></g></MovableMapElement>
    <MovableMapElement id="traffic-barrier-rising"><image href="/images/modular/barreira-transito-v01.png" x="460" y="1210" width="70" height="61" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="traffic-barrier-falling"><g transform="translate(590 1270) scale(-1 1)" pointerEvents="none"><image href="/images/modular/barreira-transito-v01.png" width="70" height="61"/></g></MovableMapElement>
    <MovableMapElement id="traffic-light-rising"><g transform="translate(632 1230) scale(-1 1)" pointerEvents="none"><image href="/images/modular/semaforo-v01.png" width="42" height="95"/></g></MovableMapElement>
    <MovableMapElement id="traffic-light-falling"><image href="/images/modular/semaforo-v01.png" x="490" y="1300" width="42" height="95" pointerEvents="none"/></MovableMapElement>
  </g>;
}
