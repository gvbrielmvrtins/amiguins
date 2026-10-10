import ExplorationGame from '@/components/exploration-game';
import GameLoadingGate from '@/components/game-loading-gate';

export default async function Home({searchParams}:{searchParams:Promise<{map?:string}>}) {
  const params=await searchParams;
  return <GameLoadingGate><ExplorationGame optimized={process.env.NODE_ENV==='development'&&params.map==='optimized'} /></GameLoadingGate>;
}
