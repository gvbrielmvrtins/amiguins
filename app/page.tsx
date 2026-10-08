import ExplorationGame from '@/components/exploration-game';

export default async function Home({searchParams}:{searchParams:Promise<{map?:string}>}) {
  const params=await searchParams;
  return <ExplorationGame optimized={process.env.NODE_ENV==='development'&&params.map==='optimized'} />;
}
