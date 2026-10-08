'use client';

import {useEffect,useRef,useState} from 'react';
import manifest from '@/lib/map-tiles-manifest.json';
import {mapCharacters} from '@/lib/map-characters';

function Tile({scale,col,row,size,width,height}:{scale:number;col:number;row:number;size:number;width:number;height:number}){
  const node=useRef<HTMLDivElement>(null),[visible,setVisible]=useState(false);
  useEffect(()=>{
    const tile=node.current;if(!tile)return;
    const observer=new IntersectionObserver(entries=>setVisible(entries[0].isIntersecting),{root:tile.closest('.map-viewport'),rootMargin:'250px'});
    observer.observe(tile);return()=>observer.disconnect();
  },[]);
  return <div ref={node} style={{position:'absolute',left:`${col*size/width*100}%`,top:`${row*size/height*100}%`,width:`${Math.min(size,width-col*size)/width*100}%`,height:`${Math.min(size,height-row*size)/height*100}%`}}>
    {visible&&<img src={`/images/map-tiles/${scale}-${col}-${row}.webp`} alt="" draggable={false} decoding="async" style={{display:'block',width:'100%',height:'100%'}}/>}
  </div>;
}

export default function OptimizedMap({onSelect}:{onSelect:(id:string,keyboard?:boolean)=>void}){
  const node=useRef<HTMLDivElement>(null),[resolution,setResolution]=useState(1);
  useEffect(()=>{
    const map=node.current;if(!map)return;
    const observer=new ResizeObserver(()=>{
      const scale=map.getBoundingClientRect().width/2320;
      setResolution(scale>2.4?4:scale>1.2?2:1);
    });observer.observe(map);return()=>observer.disconnect();
  },[]);
  const level=manifest.levels.find(item=>item.scale===resolution)!;
  return <div ref={node} className="optimized-map" style={{position:'relative',width:'100%',aspectRatio:'2320 / 1800',background:'#E9E5D8'}}>
    <div aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
      {Array.from({length:level.rows*level.cols},(_,i)=><Tile key={`${level.scale}-${i}`} {...level} col={i%level.cols} row={Math.floor(i/level.cols)}/>)}
    </div>
    <svg className="optimized-map-interactions" viewBox="380 -70 2320 1800" role="img" aria-label="mapa da amiguINlândia" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
      <g pointerEvents="none" aria-hidden="true">{manifest.places.map((place,i)=><rect key={i} data-place-file={place.file} x={place.x} y={place.y} width={place.width} height={place.height} fill="transparent"/>)}</g>
      {manifest.characters.map(character=><rect key={character.id} {...{x:character.x,y:character.y,width:character.width,height:character.height}} fill="transparent" role="button" tabIndex={0} aria-label={`Encontrar ${mapCharacters.find(p=>p.id===character.id)?.name??character.id}`} className="optimized-character" onClick={()=>onSelect(character.id)} onKeyDown={event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();onSelect(character.id,true);}}}/>)}
    </svg>
  </div>;
}
