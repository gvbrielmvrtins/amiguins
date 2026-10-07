'use client';

import {createContext,useContext,useLayoutEffect,useRef,useState,type ReactNode,type PointerEvent} from 'react';
export type LayoutOffsets=Record<string,{x:number;y:number}>;
type EditorState={enabled:boolean;offsets:LayoutOffsets;selected:string|null;select:(id:string)=>void;move:(id:string,x:number,y:number,begin?:boolean)=>void};
export const MapElementScope=createContext('map');
export const MapEditorContext=createContext<EditorState>({enabled:false,offsets:{},selected:null,select:()=>{},move:()=>{}});
export function MovableMapElement({id,children}:{id:string;children:ReactNode}){
  const editor=useContext(MapEditorContext),art=useRef<SVGGElement>(null);
  const [bounds,setBounds]=useState({x:0,y:0,width:0,height:0});
  const drag=useRef<{x:number;y:number;dx:number;dy:number}|null>(null);
  const offset=editor.offsets[id]??{x:0,y:0};
  useLayoutEffect(()=>{if(editor.enabled&&art.current){const b=art.current.getBBox();setBounds({x:b.x,y:b.y,width:b.width,height:b.height});}},[editor.enabled,children]);
  function point(e:PointerEvent<SVGGElement>){const parent=e.currentTarget.parentElement?.parentElement as SVGGraphicsElement|null,m=parent?.getScreenCTM();return m?new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse()):null;}
  return <g transform={`translate(${offset.x} ${offset.y})`}>
    {editor.enabled&&bounds.width>0&&<g className={`map-edit-handle ${editor.selected===id?'selected':''}`} role="button" tabIndex={0} aria-label={`Mover ${id}`} style={{touchAction:'none'}}
      onTouchStart={e=>e.stopPropagation()} onTouchMove={e=>e.stopPropagation()} onTouchEnd={e=>e.stopPropagation()}
      onClick={e=>{e.stopPropagation();editor.select(id);}}
      onPointerDown={e=>{if(e.button!==0)return;e.stopPropagation();e.preventDefault();const p=point(e);if(!p)return;editor.select(id);editor.move(id,offset.x,offset.y,true);drag.current={x:p.x,y:p.y,dx:offset.x,dy:offset.y};e.currentTarget.setPointerCapture(e.pointerId);}}
      onPointerMove={e=>{if(!drag.current)return;e.stopPropagation();const p=point(e);if(p)editor.move(id,drag.current.dx+p.x-drag.current.x,drag.current.dy+p.y-drag.current.y);}}
      onPointerUp={e=>{e.stopPropagation();drag.current=null;if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);}}
      onPointerCancel={()=>{drag.current=null;}}
      onKeyDown={e=>{const delta={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]}[e.key];if(!delta)return;e.preventDefault();e.stopPropagation();editor.select(id);editor.move(id,offset.x+delta[0]*(e.shiftKey?10:1),offset.y+delta[1]*(e.shiftKey?10:1),true);}}>
      <rect x={bounds.x-2} y={bounds.y-2} width={bounds.width+4} height={bounds.height+4} fill="transparent" stroke="#3774FA" strokeWidth="1.5" vectorEffect="non-scaling-stroke" pointerEvents="all"/>
    </g>}
    <MapElementScope.Provider value={id}><g ref={art} pointerEvents={editor.enabled?"none":undefined}>{children}</g></MapElementScope.Provider>
  </g>;
}
