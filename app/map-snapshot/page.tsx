import {notFound} from 'next/navigation';
import MapSnapshot from '@/components/map-snapshot';

export default function SnapshotPage(){
  if(process.env.NODE_ENV!=='development')notFound();
  return <MapSnapshot/>;
}
