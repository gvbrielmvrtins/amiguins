import {assetUrl} from '@/lib/asset-url';
import {MovableMapElement} from './map-layout-editor';

// The sprite includes the waterline foam, with transparent gaps showing the
// existing sea texture. Keep its aspect ratio and move the ship/wake together.
export default function Titanic(){return <MovableMapElement id="titanic"><g pointerEvents="none" role="img" aria-label="Titanic navegando no mar, com espuma junto ao casco e rastro na água">
  <image href={assetUrl('/images/modular/titanic-navegando-v01.webp')} x="1740" y="1395" width="170" height={170*1024/1536} preserveAspectRatio="xMidYMid meet"/>
</g></MovableMapElement>;}
