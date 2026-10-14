import {assetUrl} from '@/lib/asset-url';
import {useContext} from 'react';
import {MovableMapElement,MapElementScope} from './map-layout-editor';
import { civicRenderedAssets } from '@/lib/civic-rendered-assets';
import { uprightProjection } from '@/lib/map-projection';
export default function CivicRenderedProp({kind,x=0,y=0,locked=false}:{kind:string;x?:number;y?:number;locked?:boolean}){
  const scope=useContext(MapElementScope);
  const art=civicRenderedAssets[kind];
  if(!art)return null;
  const projection=art.risingSlope!==undefined?uprightProjection(art.risingSlope,art.fallingSlope!).transform:undefined;
  return <MovableMapElement id={`${scope}/${kind}/${x}/${y}`} locked={locked}><g data-civic-art={kind} transform={`translate(${(x-y)*.5196152423} ${(x+y)*.3})`}><g transform={projection}><g transform={`scale(${art.mirror?-art.scale:art.scale} ${art.scale})`}><image href={assetUrl(`/images/modular/${art.file}`)} x={-art.anchorX} y={-art.anchorY} width={art.width} height={art.height} pointerEvents="none"/></g></g></g></MovableMapElement>;
}
