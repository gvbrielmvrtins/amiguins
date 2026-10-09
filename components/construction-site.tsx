import {MovableMapElement} from './map-layout-editor';
import ConstructionHoarding from './construction-hoarding';

// Implantação dentro do terreno oeste superior, com recuos para as ruas.
export default function ConstructionSite(){
  return <g data-layer="construction-site">
    <ConstructionHoarding front={false}/>
    <MovableMapElement id="construction-beam-structure"><image href="/images/modular/obra-estrutura-vigas-v01.png" x="418" y="862" width="92" height="75.5" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="construction-tractor"><image href="/images/modular/obra-trator-v01.png" x="470" y="901" width="112" height="84" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="construction-worker-shovel"><image href="/images/modular/obra-trabalhador-pa-v01.png" x="615" y="925" width="38" height="57" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="construction-worker-barrow"><image href="/images/modular/obra-trabalhador-carrinho-v01.png" x="550" y="967" width="47" height="56" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="construction-materials"><image href="/images/modular/obra-materiais-v01.png" x="477" y="997" width="86" height="68" pointerEvents="none"/></MovableMapElement>
    <MovableMapElement id="construction-sign"><g transform="translate(-63 -110)" pointerEvents="none"><path d="M612 995v29m53-29v29" stroke="#78583B" strokeWidth="3"/><rect x="603" y="980" width="72" height="36" rx="3" fill="#FFF0C4" stroke="#78583B" strokeWidth="2"/><text x="639" y="991" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#573E28">SEMPRE EM</text><text x="639" y="1000" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#573E28">CONSTRUÇÃO</text><text x="639" y="1009" textAnchor="middle" fontSize="5.5" fill="#573E28">Novidades chegando!</text></g></MovableMapElement>
    <ConstructionHoarding front/>
    <MovableMapElement id="construction-men-working-sign"><image href="/images/modular/placa-homens-trabalhando-v01.png" x="688" y="1008" width="64" height="99" pointerEvents="none"/></MovableMapElement>
  </g>;
}
