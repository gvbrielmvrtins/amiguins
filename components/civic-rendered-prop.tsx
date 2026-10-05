import { civicRenderedAssets } from '@/lib/civic-rendered-assets';
import { uprightProjection } from '@/lib/map-projection';
export default function CivicRenderedProp({kind,x=0,y=0}:{kind:string;x?:number;y?:number}){
  const art=civicRenderedAssets[kind];
  if(!art)return null;
  const projection=art.risingSlope!==undefined?uprightProjection(art.risingSlope,art.fallingSlope!).transform:undefined;
  return <g data-civic-art={kind} transform={`translate(${(x-y)*.5196152423} ${(x+y)*.3})`}><g transform={projection}><g transform={`scale(${art.mirror?-art.scale:art.scale} ${art.scale})`}><image href={`/images/modular/${art.file}`} x={-art.anchorX} y={-art.anchorY} width={art.width} height={art.height}/></g></g></g>;
}
