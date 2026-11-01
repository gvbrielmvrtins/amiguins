import {assetUrl} from '@/lib/asset-url';
import {MovableMapElement} from './map-layout-editor';

export default function AirportWelcomeGarden(){return <g aria-label="Jardim de boas-vindas junto ao aeroporto" pointerEvents="none" transform="translate(70 25)">
  <MovableMapElement id="airport-welcome-path"><path d="M1715 1635Q1735 1630 1755 1640T1870 1665" fill="none" stroke="#D6C29C" strokeWidth="35" strokeLinecap="round"/><path d="M1715 1635Q1735 1630 1755 1640T1870 1665" fill="none" stroke="#F2E7CC" strokeWidth="30" strokeLinecap="round"/></MovableMapElement>
  <MovableMapElement id="airport-welcome-globe"><image href={assetUrl("/images/modular/aeroporto-jardim-globo-v01.webp")} x="1745" y="1538" width="50" height="75"/></MovableMapElement>
  <MovableMapElement id="airport-welcome-sign"><image href={assetUrl("/images/modular/aeroporto-jardim-setas-malas-v01.webp")} x="1823" y="1570" width="50" height="75"/></MovableMapElement>
  <MovableMapElement id="airport-welcome-bench"><image href={assetUrl('/images/modular/parque-banco-v01.webp')} x="1690" y="1613" width="60" height="47.11"/></MovableMapElement>
  <MovableMapElement id="airport-welcome-planter"><image href={assetUrl('/images/modular/floreira-detalhada-v01.webp')} x="1813" y="1660" width="43" height={43*1024/1536}/></MovableMapElement>
  <MovableMapElement id="airport-welcome-tree"><image href={assetUrl('/images/modular/rosa-arvore-isometrica-v01.webp')} x="1850" y="1614" width="62" height={62*1086/1448}/></MovableMapElement>
</g>;}
