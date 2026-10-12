import manifest from '@/lib/map-hd-manifest.json';
import {notFound} from 'next/navigation';
import ExplorationGame from '@/components/exploration-game';
import GameLoadingGate from '@/components/game-loading-gate';
export default function MapHDPreview(){
  if(process.env.NODE_ENV!=='development')notFound();
  return <><p style={{padding:'12px 24px'}}>Prévia local HD · resolução fixa · <a href="/">Voltar ao mapa original</a></p><GameLoadingGate><ExplorationGame optimized hd hdManifest={manifest}/></GameLoadingGate></>;
}
