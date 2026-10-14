import ExplorationGame from '@/components/exploration-game';
import GameLoadingGate from '@/components/game-loading-gate';

export default async function Home(props:{searchParams:Promise<{map?:string}>}) {
  // The query is only used by the local experimental renderer.
  const params=process.env.NODE_ENV==='development' ? await props.searchParams : {};
  return <GameLoadingGate><ExplorationGame optimized={process.env.NODE_ENV==='development'&&params.map==='optimized'} /></GameLoadingGate>;
}
