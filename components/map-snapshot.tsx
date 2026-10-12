'use client';

import {useRef,useState} from 'react';
import ModularMap from './modular-map';
import {MapEditorContext} from './map-layout-editor';
import offsets from '@/lib/map-layout-offsets.json';

// Dedicated local capture surface: saved positions, no browser editor state.
export default function MapSnapshot(){
  const host=useRef<HTMLDivElement>(null),[status,setStatus]=useState('');
  async function exportHD(){
    try{
      setStatus('Preparando imagens…');
      const svg=host.current!.querySelector('svg')!;
      const root=svg.getScreenCTM()!.inverse();
      const bounds=(node:SVGGraphicsElement)=>{
        const b=node.getBBox(),m=root.multiply(node.getScreenCTM()!);
        const pts=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m));
        const x=Math.min(...pts.map(p=>p.x)),y=Math.min(...pts.map(p=>p.y));
        return {x,y,width:Math.max(...pts.map(p=>p.x))-x,height:Math.max(...pts.map(p=>p.y))-y};
      };
      const places=Array.from(svg.querySelectorAll('image')).map(n=>({file:n.getAttribute('href')?.split('/').pop(),definition:!!n.closest('defs'),...bounds(n)}));
      const characters=Array.from(svg.querySelectorAll<SVGGraphicsElement>('[data-character]')).map(n=>({id:n.dataset.character,...bounds(n)}));
      const clone=svg.cloneNode(true) as SVGSVGElement;
      clone.setAttribute('xmlns','http://www.w3.org/2000/svg');
      clone.setAttribute('data-export-metadata',JSON.stringify({viewBox:[380,-70,2320,1800],places,characters}));
      clone.setAttribute('width','2320');clone.setAttribute('height','1800');
      clone.style.width='2320px';clone.style.height='1800px';
      const download=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}));
      const a=document.createElement('a');a.href=download;a.download='amiguins-map-hd.svg';a.click();setTimeout(()=>URL.revokeObjectURL(download),60000);
      setStatus('Exportação concluída.');
    }catch(error){setStatus(String(error));}
  }
  return <><button onClick={exportHD}>Exportar mapa HD local</button><p role="status">{status}</p><MapEditorContext.Provider value={{enabled:false,offsets,selected:null,select:()=>{},move:()=>{}}}>
    <div ref={host} style={{width:9280,height:7200}}><ModularMap selected={null} onSelect={()=>{}}/></div>
  </MapEditorContext.Provider></>;
}
