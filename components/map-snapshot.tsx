'use client';

import ModularMap from './modular-map';
import {MapEditorContext} from './map-layout-editor';
import offsets from '@/lib/map-layout-offsets.json';

// Dedicated development capture surface: saved positions, no local editor state.
export default function MapSnapshot(){
  return <MapEditorContext.Provider value={{enabled:false,offsets,selected:null,select:()=>{},move:()=>{}}}>
    <div style={{width:9280,height:7200}}><ModularMap selected={null} onSelect={()=>{}}/></div>
  </MapEditorContext.Provider>;
}
