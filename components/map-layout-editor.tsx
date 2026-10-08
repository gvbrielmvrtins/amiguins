'use client';

import {createContext,useContext,useLayoutEffect,useRef,useState,type ReactNode,type PointerEvent} from 'react';
import {createPortal} from 'react-dom';
export type LayoutElement={x:number;y:number;scale?:number;rotation?:number;layer?:number;hidden?:boolean;sourceId?:string};
export type LayoutOffsets=Record<string,LayoutElement>;
type EditorState={enabled:boolean;offsets:LayoutOffsets;selected:string|null;select:(id:string)=>void;move:(id:string,x:number,y:number,begin?:boolean)=>void};
export const MapElementScope=createContext('map');
export const MapEditorContext=createContext<EditorState>({enabled:false,offsets:{},selected:null,select:()=>{},move:()=>{}});
type SelectionBounds={x:number;y:number;width:number;height:number};
export function MovableMapElement({id,children,locked=false,selectionBounds}:{id:string;children:ReactNode;locked?:boolean;selectionBounds?:SelectionBounds}){
  const editor=useContext(MapEditorContext);
  return <><MovableInstance id={id} locked={locked} selectionBounds={selectionBounds}>{children}</MovableInstance>{Object.entries(editor.offsets).filter(([,p])=>p.sourceId===id).map(([copyId])=><MovableInstance key={copyId} id={copyId} duplicate locked={locked} selectionBounds={selectionBounds}>{children}</MovableInstance>)}</>;
}
export function MapLayoutLayers({front}:{front:boolean}){
  const editor=useContext(MapEditorContext);
  const layers=[...new Set(Object.values(editor.offsets).map(p=>p.layer??0))].filter(n=>front?n>0:n<0).sort((a,b)=>a-b);
  return <>{layers.map(layer=><g key={layer} data-layout-layer={layer}/>)}</>;
}
function MovableInstance({id,children,duplicate=false,locked=false,selectionBounds}:{id:string;children:ReactNode;duplicate?:boolean;locked?:boolean;selectionBounds?:SelectionBounds}){
  const editor=useContext(MapEditorContext),art=useRef<SVGGElement>(null),anchor=useRef<SVGGElement>(null);
  const [portal,setPortal]=useState<{target:Element;matrix:string}|null>(null);
  const [bounds,setBounds]=useState({x:0,y:0,width:0,height:0});
  const [hasElements,setHasElements]=useState(false);
  const drag=useRef<{x:number;y:number;dx:number;dy:number}|null>(null);
  const offset=editor.offsets[id]??{x:0,y:0};
  useLayoutEffect(()=>{if(art.current){const b=selectionBounds??art.current.getBBox();setBounds({x:b.x,y:b.y,width:b.width,height:b.height});setHasElements(Boolean(art.current.querySelector('[data-layout-element]')));}},[editor.enabled,children,selectionBounds]);
  useLayoutEffect(()=>{
    const a=anchor.current,svg=a?.ownerSVGElement,layer=offset.layer??0;
    if(!a||!svg||!layer){setPortal(null);return;}
    const target=svg.querySelector(`[data-layout-layer="${layer}"]`),m=a.getCTM(),root=svg.getCTM();
    if(target&&m&&root){const p=root.inverse().multiply(m);setPortal({target,matrix:`matrix(${p.a} ${p.b} ${p.c} ${p.d} ${p.e} ${p.f})`});}
  },[offset.layer,editor.offsets]);
  useLayoutEffect(()=>{
    if(!duplicate||!art.current)return;
    const mapping=new Map<string,string>(),prefix=id.replace(/[^a-zA-Z0-9_-]/g,'-');
    art.current.querySelectorAll('[id]').forEach(node=>{const original=node.getAttribute('data-original-layout-id')??node.id;node.setAttribute('data-original-layout-id',original);const next=`${prefix}-${original}`;mapping.set(original,next);node.id=next;});
    art.current.querySelectorAll('*').forEach(node=>{if(node.hasAttribute('tabindex'))node.setAttribute('tabindex','-1');for(const attr of Array.from(node.attributes)){let value=attr.value;for(const [oldId,newId] of mapping)value=value.replaceAll(`url(#${oldId})`,`url(#${newId})`);if(value!==attr.value)node.setAttribute(attr.name,value);}});
  },[duplicate,children,id]);
  function point(e:PointerEvent<SVGGElement>){const parent=e.currentTarget.parentElement?.parentElement as SVGGraphicsElement|null,m=parent?.getScreenCTM();return m?new DOMPoint(e.clientX,e.clientY).matrixTransform(m.inverse()):null;}
  const cx=bounds.x+bounds.width/2,cy=bounds.y+bounds.height/2;
  const content=offset.hidden?null:<g transform={`translate(${offset.x} ${offset.y}) translate(${cx} ${cy}) rotate(${offset.rotation??0}) scale(${offset.scale??1}) translate(${-cx} ${-cy})`} onClickCapture={duplicate&&!editor.enabled?e=>e.stopPropagation():undefined} onKeyDownCapture={duplicate&&!editor.enabled?e=>e.stopPropagation():undefined}>
    {editor.enabled&&!locked&&!hasElements&&bounds.width>0&&<g className={`map-edit-handle ${editor.selected===id?'selected':''}`} role="button" tabIndex={0} aria-label={`Mover ${id}`} style={{touchAction:'none'}}
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
  return <><g ref={anchor} data-layout-element={id}>{portal?null:content}</g>{portal&&createPortal(<g transform={portal.matrix}>{content}</g>,portal.target)}</>;
}
