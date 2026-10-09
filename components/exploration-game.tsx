'use client';

import { useState, useRef,useEffect, useLayoutEffect, useCallback, type TouchEvent, type PointerEvent } from 'react';
import {boundedScroll} from '@/lib/map-camera';
import { ArrowUpRight, Check, ChevronDown, HelpCircle, Maximize, Minus, MousePointer2, PawPrint, Plus, RotateCcw, Sparkles, Store, Users, X } from 'lucide-react';
import dynamic from 'next/dynamic';
import OptimizedMap from './optimized-map';
const ModularMap=dynamic(()=>import('@/components/modular-map'));
import {MapEditorContext,type LayoutOffsets,type LayoutElement} from './map-layout-editor';
import savedLayoutOffsets from '@/lib/map-layout-offsets.json';
import { modularDestinations } from '@/lib/modular-map';
import {eastFillers} from '@/lib/east-district-study';
import { mapCharacters } from '@/lib/map-characters';
import {type Target} from '@/lib/game-data';
const sheriffIds=new Set(mapCharacters.filter(p=>p.isSheriff).map(p=>p.id));
const placeListPriority: Record<string, number> = { 'pracinha': 0, 'prefeintura': 1, 'departamento-xerifins': 2 };
const categories=[{id:'people',label:'AMIGUINS'},{id:'places',label:'Espacins'}] as const;
const cafeLocation=eastFillers.find(item=>item.id==='east-cafe')!;
const targets:Target[]=[...mapCharacters, ...modularDestinations.map<Target>(d=>({id:d.id,name:d.name,article:'o',category:'places',x:d.x,y:d.y,width:0,height:0,clue:'Procure '+d.name+' no mapa.'})),{id:'east-cafe',name:'cafézIN',article:'o',category:'places',x:cafeLocation.x,y:cafeLocation.y,width:0,height:0,clue:'Procure o cafézIN no mapa.'}];

const destinationPortraits:Record<string,string>={"east-cafe":"cafe-apoio-render-v01.png","colabin":"colabin-laboratorio-v02.png","vagao-feminino":"metro-vagao-feminino-v04.png","livrinhoteca":"livrinhoteca-isometrico-v01.png","cineminha":"cineminha-isometrico-v01.png","mercado-vagas":"mercado-vagas-isometrico-v01.png","prefeintura":"prefeitura-render-v02.png","taverna-joguins":"taverna-medieval-games-v04.png","pracinha":"praca-central-circular-v01.png","espacin-coloridin":"coloridin-arco-iris-frontal-v02.png","linkedin":"linkedin-predio-v02.png","jardim-secreto":"rosa-arvore-isometrica-v01.png","estudio-criativins":"estudio-render-v02.png","silicin-valley":"silicin-campus-v01.png","departamento-xerifins":"xerifins-departamento-v01.png","inglish-pub":"inglish-pub-render-v02.png","oficina-vendinhas":"feira-roupas-v01.png","torre-mistica":"torre-feiticaria-v02.png","plaza-hispanica":"plaza-arcada-bandeiras-v02.png","academia-marombins":"academia-render-v02.png","binstro":"binstro-render-v02.png","paises-africanos":"aeroporto-internacional-v02.png"};
// Crop the existing illustration to the head without exposing the map pose or props.
const facePortraits:Record<string,{width:number;height:number;crop:[number,number,number]}>= {
  'maria-fernanda-figueiroa':{width:1024,height:1536,crop:[340,45,390]},
  'luara-nardelli':{width:1024,height:1536,crop:[290,70,540]},
  'naiane-de-mello':{width:1024,height:1536,crop:[270,0,530]},
  'diego-ungari':{width:1388,height:1133,crop:[445,0,350]},
  'elton-pavesi':{width:1024,height:1536,crop:[210,0,560]},
  'davi-cabeca':{width:1254,height:1254,crop:[110,10,1140]},
  'loisi-vieira':{width:1310,height:1200,crop:[275,20,410]},
  'henrique-hardman':{width:1199,height:1312,crop:[450,15,540]},
  'patrick-canuto':{width:1024,height:1536,crop:[250,20,510]},
  'paula-lotti':{width:1024,height:1536,crop:[270,20,420]},
  'gabriel-martins':{width:1024,height:1536,crop:[260,55,490]},
  'nathan-machado':{width:1024,height:1536,crop:[250,35,490]},
  'kauana-moreira':{width:1024,height:1536,crop:[285,0,440]},
};
function Portrait({target,optimized=false}:{target:Target;optimized?:boolean}){
  const mirrored=target.id==='naiane-de-mello'||target.id==='luara-nardelli';
  if(optimized)return <img className="portrait" aria-hidden="true" alt="" src={`/images/menu-portraits/${target.id}.webp`} style={{objectFit:'contain',transform:mirrored?'scaleX(-1)':undefined}}/>;
  const person=mapCharacters.find(p=>p.id===target.id),face=facePortraits[target.id];
  if(person&&face){const [x,y,size]=face.crop;return <svg className="portrait face-portrait" style={{transform:mirrored?'scaleX(-1)':undefined}} aria-hidden="true" viewBox={`${x} ${y} ${size} ${size}`}><image href={person.file} width={face.width} height={face.height}/></svg>;}
  return <img className="portrait" aria-hidden="true" alt="" src={`/images/modular/${destinationPortraits[target.id]}`} style={{objectFit:'contain'}}/>;
}

export default function ExplorationGame({optimized=false}:{optimized?:boolean}) {


  const localEditor=process.env.NODE_ENV==='development'&&!optimized;
  const [editing,setEditing]=useState(false);
  const [layoutOffsets,setLayoutOffsets]=useState<LayoutOffsets>(savedLayoutOffsets);
  const [editingSelection,setEditingSelection]=useState<string|null>(null);
  useEffect(()=>{if(editingSelection==='north-metropolis'||editingSelection==='north-mountain')setEditingSelection(null);},[editingSelection]);
  const [layoutReady,setLayoutReady]=useState(false);
  const layoutHistory=useRef<LayoutOffsets[]>([]);
  useEffect(()=>{
    if(!localEditor)return;
    try{const parsed=JSON.parse(localStorage.getItem('amiguins-map-layout-v1')??'{}');
      const valid:LayoutOffsets={...savedLayoutOffsets};for(const [id,p] of Object.entries(parsed)){const point=p as LayoutElement;if(point&&Number.isFinite(point.x)&&Number.isFinite(point.y))valid[id]={x:point.x,y:point.y,scale:Number.isFinite(point.scale)?Math.max(.1,Math.min(4,point.scale!)):1,rotation:Number.isFinite(point.rotation)?point.rotation!%360:0,layer:Number.isFinite(point.layer)?Math.max(-100,Math.min(100,Math.round(point.layer!))):0,hidden:point.hidden===true,...(typeof point.sourceId==='string'?{sourceId:point.sourceId}:{})};}setLayoutOffsets(valid);
    }catch{}setLayoutReady(true);
  },[localEditor]);
  useEffect(()=>{if(localEditor&&layoutReady){try{localStorage.setItem('amiguins-map-layout-v1',JSON.stringify(layoutOffsets));}catch{}}},[layoutOffsets,layoutReady,localEditor]);
  function moveElement(id:string,x:number,y:number,begin=false){
    if(begin){layoutHistory.current.push(layoutOffsets);if(layoutHistory.current.length>100)layoutHistory.current.shift();}
    setLayoutOffsets(prev=>({...prev,[id]:{...prev[id],x:Math.round(x*100)/100,y:Math.round(y*100)/100}}));
  }
  function editElement(patch:Partial<LayoutElement>){
    if(!editingSelection)return;
    layoutHistory.current.push(layoutOffsets);
    setLayoutOffsets(prev=>({...prev,[editingSelection]:{...(prev[editingSelection]??{x:0,y:0}),...patch}}));
  }
  function duplicateElement(){
    if(!editingSelection)return;
    const original=layoutOffsets[editingSelection]??{x:0,y:0},sourceId=original.sourceId??editingSelection,id=`${sourceId}::copy:${crypto.randomUUID()}`;
    layoutHistory.current.push(layoutOffsets);
    setLayoutOffsets(prev=>({...prev,[id]:{...original,sourceId,x:original.x+25,y:original.y+25,hidden:false}}));setEditingSelection(id);
  }
  const editedElement=editingSelection?layoutOffsets[editingSelection]:undefined;
  function exportLayout(){
    const blob=new Blob([JSON.stringify({version:2,coordinates:'svg-offsets',elements:layoutOffsets},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='amiguins-posicoes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  const [found, setFound] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  // New 100% equals 200% of the previous 1.75× preview baseline.
  const mapScale = zoom * 3.5;
  const wheelZoom=useRef(zoom);
  useLayoutEffect(()=>{wheelZoom.current=zoom;},[zoom]);
  const [message, setMessage] = useState('');
  const [messageVersion,setMessageVersion]=useState(0);
  function showMessage(text:string){
    setMessage(text);
    setMessageVersion(version=>version+1);
  }
  useEffect(()=>{
    if(!message)return;
    const timer=window.setTimeout(()=>setMessage(''),5000);
    return()=>window.clearTimeout(timer);
  },[message,messageVersion]);
  const [filter, setFilter] = useState<'all' | 'remaining'>('all');
  const help = useRef<HTMLDialogElement>(null);
  const reset = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const [viewportNode,setViewportNode]=useState<HTMLDivElement|null>(null);
  const attachViewport=useCallback((node:HTMLDivElement|null)=>{
    viewport.current=node;
    setViewportNode(node);
  },[]);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const didDrag = useRef(false);
  const touchGesture = useRef<{distance:number;zoom:number;mapX:number;mapY:number} | null>(null);
  const zoomAnchor = useRef<{mapX:number;mapY:number;x:number;y:number} | null>(null);
  function renderedMapScale(v:HTMLDivElement){
    const world=v.querySelector<HTMLElement>('.map-world');
    return (world?.getBoundingClientRect().width??v.clientWidth)/2320;
  }
  useLayoutEffect(()=>{
    const v=viewport.current,anchor=zoomAnchor.current;
    if(!v||!anchor)return;
    const scale=renderedMapScale(v);
    v.scrollLeft=anchor.mapX*scale-anchor.x;
    v.scrollTop=anchor.mapY*scale-anchor.y;
    zoomAnchor.current=null;
  },[zoom]);
  function beginTouch(e:TouchEvent<HTMLDivElement>){
    const v=viewport.current;if(!v)return;
    if(e.touches.length>=2){
      const [a,b]=Array.from(e.touches),rect=v.getBoundingClientRect(),scale=renderedMapScale(v);
      const x=(a.clientX+b.clientX)/2-rect.left,y=(a.clientY+b.clientY)/2-rect.top;
      touchGesture.current={distance:Math.max(1,Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)),zoom,mapX:(v.scrollLeft+x)/scale,mapY:(v.scrollTop+y)/scale};
      drag.current=null;didDrag.current=true;
    }else if(e.touches.length===1){
      const t=e.touches[0];
      drag.current={x:t.clientX,y:t.clientY,left:v.scrollLeft,top:v.scrollTop};
    }
  }
  function moveTouch(e:TouchEvent<HTMLDivElement>){
    const v=viewport.current;if(!v)return;
    if(e.touches.length>=2&&touchGesture.current){
      e.preventDefault();
      const [a,b]=Array.from(e.touches),g=touchGesture.current,rect=v.getBoundingClientRect();
      const x=(a.clientX+b.clientX)/2-rect.left,y=(a.clientY+b.clientY)/2-rect.top;
      const next=Math.max(.25,Math.min(5,g.zoom*Math.hypot(a.clientX-b.clientX,a.clientY-b.clientY)/g.distance));
      zoomAnchor.current={mapX:g.mapX,mapY:g.mapY,x,y};
      const scale=renderedMapScale(v);
      v.scrollLeft=g.mapX*scale-x;v.scrollTop=g.mapY*scale-y;
      setZoom(next);didDrag.current=true;
    }else if(e.touches.length===1&&drag.current){
      e.preventDefault();const t=e.touches[0],g=drag.current,dx=t.clientX-g.x,dy=t.clientY-g.y;
      if(Math.abs(dx)+Math.abs(dy)>5)didDrag.current=true;
      v.scrollLeft=g.left-dx;v.scrollTop=g.top-dy;
    }
  }
  function endTouch(e:TouchEvent<HTMLDivElement>){
    touchGesture.current=null;drag.current=null;
    if(e.touches.length)beginTouch(e);
  }
  const current = targets.find(t => t.id === selected);
  const complete = mapCharacters.length > 0 && found.length === mapCharacters.length;
  function constrainCamera(){
    const v=viewport.current;if(!v)return;
    const next=boundedScroll(v.scrollLeft,v.scrollTop,v.clientWidth,v.clientHeight,v.scrollWidth,v.scrollHeight);
    if(Math.abs(v.scrollLeft-next.left)>.5)v.scrollLeft=next.left;
    if(Math.abs(v.scrollTop-next.top)>.5)v.scrollTop=next.top;
  }
  useEffect(()=>{
    constrainCamera();const v=viewport.current;if(!v)return;
    const observer=new ResizeObserver(constrainCamera);observer.observe(v);return()=>observer.disconnect();
  },[zoom]);
  useEffect(()=>{
    const v=viewportNode;if(!v)return;
    function wheel(e:WheelEvent){
      e.preventDefault();
      const delta=(e.deltaY||e.deltaX)*(e.deltaMode===1?16:e.deltaMode===2?v!.clientHeight:1);
      if(!delta)return;
      const next=Math.max(.25,Math.min(5,wheelZoom.current*Math.exp(-Math.max(-200,Math.min(200,delta))*.0015)));
      if(next===wheelZoom.current)return;
      const rect=v!.getBoundingClientRect(),x=e.clientX-rect.left,y=e.clientY-rect.top,scale=renderedMapScale(v!);
      zoomAnchor.current={mapX:(v!.scrollLeft+x)/scale,mapY:(v!.scrollTop+y)/scale,x,y};
      wheelZoom.current=next;setZoom(next);
    }
    v.addEventListener('wheel',wheel,{passive:false,capture:true});
    return()=>v.removeEventListener('wheel',wheel,true);
  },[viewportNode]);
  function locateDestination(id:string){
    setSelected(id);const v=viewport.current,d=targets.find(item=>item.id===id);if(!v||!d)return false;
    // Follow rendered artwork rather than the original lot coordinates. The
    // browser bounds include editor translations, rotation, scale and portals.
    const file=id==='jardim-secreto'?'jardim-labirinto-unificado-v01.png':destinationPortraits[id];
    const images=Array.from(v.querySelectorAll<SVGImageElement>(`image[href="/images/modular/${file}"], [data-place-file="${file}"]`));
    const image=images.find(node=>{
      const rect=node.getBoundingClientRect();
      return rect.width>0&&rect.height>0;
    });
    if(!image){setMessage(`O elemento principal de ${d.name} está oculto ou foi excluído do mapa.`);return false;}
    const rect=image.getBoundingClientRect(),frame=v.getBoundingClientRect();
    const next=boundedScroll(v.scrollLeft+rect.left-frame.left+rect.width/2-v.clientWidth/2,v.scrollTop+rect.top-frame.top+rect.height/2-v.clientHeight/2,v.clientWidth,v.clientHeight,v.scrollWidth,v.scrollHeight);
    v.scrollTo({left:next.left,top:next.top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    return true;
  }

  function changeZoom(next:number){
    const v=viewport.current;
    if(!v){setZoom(next);return;}
    const scale=renderedMapScale(v),cx=(v.scrollLeft+v.clientWidth/2)/scale,cy=(v.scrollTop+v.clientHeight/2)/scale;
    setZoom(next);
    requestAnimationFrame(()=>{const scale=renderedMapScale(v);v.scrollLeft=cx*scale-v.clientWidth/2;v.scrollTop=cy*scale-v.clientHeight/2;constrainCamera();});
  }
  function discover(target: Target) {
    if (target.category !== 'people' || found.includes(target.id)) return;
    setFound(prev => [...prev, target.id]);
    showMessage(`Você encontrou ${target.name}!`);
    if (selected === target.id) setSelected(null);
  }
  function startDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !viewport.current) return;
    e.preventDefault();
    didDrag.current = false;
    drag.current = { x: e.clientX, y: e.clientY, left: viewport.current.scrollLeft, top: viewport.current.scrollTop };
  }
  function moveDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !drag.current || !viewport.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) didDrag.current = true;
    viewport.current.scrollLeft = drag.current.left - dx;
    viewport.current.scrollTop = drag.current.top - dy;
    constrainCamera();
  }
  return <MapEditorContext.Provider value={{enabled:localEditor&&editing,offsets:localEditor?layoutOffsets:savedLayoutOffsets,selected:editingSelection,select:setEditingSelection,move:moveElement}}><main className="game-shell">
    {process.env.NODE_ENV==='development'&&<div className="map-preview-links"><a href={optimized?'/':'/?map=optimized'}>{optimized?'Voltar ao editor local':'Testar mapa otimizado'}</a>{optimized&&<span>Prévia otimizada · posições salvas</span>}</div>}
    {localEditor&&<div className="map-editor-toolbar">
      <button onClick={()=>setEditing(v=>!v)} aria-pressed={editing}>{editing?'Concluir edição':'Editar posições'}</button>
      {editing&&<><button disabled={!layoutHistory.current.length} onClick={()=>{const previous=layoutHistory.current.pop();if(previous)setLayoutOffsets(previous);}}>Desfazer</button>
      <button onClick={exportLayout}>Exportar alterações</button>
      <button disabled={!editingSelection} onClick={duplicateElement}>Duplicar</button>
      <button disabled={!editingSelection||editedElement?.hidden} onClick={()=>editElement({hidden:true})}>Excluir</button>
      <label>Tamanho <input aria-label="Tamanho do elemento em porcentagem" type="number" min="10" max="400" step="5" disabled={!editingSelection} value={Math.round((editedElement?.scale??1)*100)} onChange={e=>{const n=Number(e.target.value);if(Number.isFinite(n)&&n>=10&&n<=400)editElement({scale:n/100});}}/>%</label>
      <label>Rotação <input aria-label="Rotação do elemento em graus" type="number" min="-360" max="360" step="5" disabled={!editingSelection} value={editedElement?.rotation??0} onChange={e=>{const n=Number(e.target.value);if(Number.isFinite(n)&&Math.abs(n)<=360)editElement({rotation:n});}}/>°</label>
      <button disabled={!editingSelection} onClick={()=>editElement({rotation:((editedElement?.rotation??0)-15)%360})}>↶ 15°</button>
      <button disabled={!editingSelection} onClick={()=>editElement({rotation:((editedElement?.rotation??0)+15)%360})}>↷ 15°</button>
      <label>Camada <input aria-label="Camada do elemento" type="number" min="-100" max="100" disabled={!editingSelection} value={editedElement?.layer??0} onChange={e=>{const n=Number(e.target.value);if(Number.isFinite(n)&&Math.abs(n)<=100)editElement({layer:Math.round(n)});}}/></label>
      <button disabled={!editingSelection} onClick={()=>editElement({layer:Math.max(-100,(editedElement?.layer??0)-1)})}>Para trás</button>
      <button disabled={!editingSelection} onClick={()=>editElement({layer:Math.min(100,(editedElement?.layer??0)+1)})}>Para frente</button>
      <button disabled={!editingSelection||!layoutOffsets[editingSelection]} onClick={()=>{if(editingSelection){layoutHistory.current.push(layoutOffsets);setLayoutOffsets(prev=>{const next={...prev};if(editingSelection in savedLayoutOffsets){next[editingSelection]=savedLayoutOffsets[editingSelection as keyof typeof savedLayoutOffsets];}else{delete next[editingSelection];}return next;});}}}>Restaurar elemento</button>
      <span>{editingSelection??'Selecione e arraste um elemento'} · setas ajustam; Shift move mais · salvo neste navegador</span></>}
    </div>}

    <div className="game-layout">
      <aside className="discovery-panel">
        <div className="progress-section"><div className="progress-label"><span>Você encontrou</span><strong>{found.length}<span> / {mapCharacters.length}</span></strong></div><div className="progress-track" role="progressbar" aria-label="Pessoas encontradas" aria-valuenow={found.length} aria-valuemin={0} aria-valuemax={mapCharacters.length}><span style={{ width: `${found.length / Math.max(1,mapCharacters.length) * 100}%` }} /></div></div>
        <div className="category-list">{categories.map(category => {
          const items = targets.filter(t => t.category === category.id);
          if (category.id === 'places') items.sort((a, b) => (placeListPriority[a.id] ?? 3) - (placeListPriority[b.id] ?? 3));
          const count = items.filter(t => found.includes(t.id)).length;
          const Icon = Store;
          return <section className="category" key={category.id}><button className="category-heading" aria-expanded={!collapsed.includes(category.id)} onClick={() => setCollapsed(prev => prev.includes(category.id) ? prev.filter(c => c !== category.id) : [...prev, category.id])}><strong>{category.label}</strong>{category.id === 'people' && <span className="category-count">{count}<span>/{items.length}</span></span>}<ChevronDown size={15} className={collapsed.includes(category.id) ? 'closed' : ''} /></button>{!collapsed.includes(category.id) && <div className={`target-grid ${category.id === 'places' ? 'places-grid' : ''}`}>{items.filter(t => category.id === 'places' || filter !== 'remaining' || !found.includes(t.id)).map(target => <button key={target.id} className={`target-card ${selected === target.id ? 'selected' : ''} ${found.includes(target.id) ? 'found' : ''}`} aria-label={target.category === 'places' ? `Ir para ${target.name}` : `Procurar ${target.name}${sheriffIds.has(target.id)?', xerifIN':''}${found.includes(target.id) ? ', encontrado' : ''}`} aria-pressed={selected === target.id} onClick={() => { if(target.category === 'places'){if(locateDestination(target.id))showMessage(`Você está em ${target.name}.`);return;} setSelected(target.id); showMessage(found.includes(target.id) ? `${target.name} já foi encontrado!` : `Procurando ${target.name}. Encontre no mapa!`); }}><span className="portrait-wrap"><Portrait target={target} optimized={optimized}/>{sheriffIds.has(target.id)&&<span className="sheriff-badge" role="img" aria-label="xerifIN"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l3 6 6.6 1-4.8 4.7 1.1 6.6L12 18.2l-5.9 3.1 1.1-6.6L2.4 10 9 9Z" fill="#FAD846" stroke="#604722" strokeWidth="1.4"/>{[[12,3],[21.6,10],[17.9,21.3],[6.1,21.3],[2.4,10]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="1.5" fill="#FFE888" stroke="#604722" strokeWidth=".8"/>)}</svg></span>}{found.includes(target.id) && <span className="found-check"><Check size={12} /></span>}</span><span>{target.name}</span></button>)}</div>}</section>;
        })}</div>


      </aside>
      <section className="map-section" aria-label="Mapa interativo da Vila AmiguINs">
        <div className="map-topbar" aria-hidden="true"/>
        <div className="map-frame">
          <div className="map-viewport" ref={attachViewport} onTouchStart={e=>{if(e.touches.length===1)didDrag.current=false;beginTouch(e);}} onTouchMove={moveTouch} onTouchEnd={endTouch} onTouchCancel={()=>{touchGesture.current=null;drag.current=null;}} onScroll={constrainCamera} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerLeave={() => { drag.current = null; }}>
            <div className="map-world modular-world" style={{width:`${mapScale*100}%`,minWidth:`${740*mapScale}px`}}>{optimized?<OptimizedMap onSelect={(id,keyboard)=>{if(keyboard||!didDrag.current){const target=targets.find(t=>t.id===id);if(target?.category === 'people')discover(target);else if(target){locateDestination(id);showMessage(`Você está em ${target.name}.`);}}}}/>:<ModularMap selected={selected} onSelect={(id,keyboard)=>{if(keyboard||!didDrag.current){const target=targets.find(t=>t.id===id);if(target?.category === 'people')discover(target);else if(target){locateDestination(id);showMessage(`Você está em ${target.name}.`);}}}}/>}</div>
          </div>

          <div className="map-controls"><button aria-label="Aumentar zoom" disabled={zoom >= 5} onClick={() => changeZoom(Math.min(5, zoom + .25))}><Plus size={19} /></button><span>{Math.round(zoom * 100)}%</span><button aria-label="Diminuir zoom" disabled={zoom <= .25} onClick={() => changeZoom(Math.max(.25, zoom - .25))}><Minus size={19} /></button><div /><button aria-label="Ajustar mapa à tela" onClick={() => { setZoom(1); viewport.current?.scrollTo({ top: 0, left: 0 }); }}><Maximize size={17} /></button></div>
          {<div className="map-actions"><button className="help-button" aria-label="Como jogar" onClick={() => help.current?.showModal()}><HelpCircle size={17} /></button><button className="help-button" aria-label="Recomeçar" onClick={() => reset.current?.showModal()}><RotateCcw size={17} /></button></div>}

          {message && <div className={`game-message ${complete ? 'complete' : ''}`} role="status"><Sparkles size={19} /><span>{complete ? `Você encontrou todas as ${mapCharacters.length} pessoas da vila! Que tal explorar de novo?` : message}</span><button aria-label="Fechar mensagem" onClick={() => setMessage('')}><X size={15} /></button></div>}
        </div>
        <div className="map-footer"><span>{mapCharacters.length} pessoas para encontrar · clique nos EspacINs para navegar · use o zoom e arraste para explorar</span></div>
      </section>
    </div>
    <dialog ref={help} className="game-dialog"><button className="dialog-close" aria-label="Fechar instruções" onClick={() => help.current?.close()}><X /></button><h2>Explore a amiguINlândia</h2><ol><li>Escolha um amiguIN para procurar.</li><li>Ao encontrar, clique no amiguIN no mapa para registrar a descoberta.</li><li>Clique em um espacIN da lista para ir até ele no mapa.</li><li>Use o mouse (no computador) ou gesto de pinça nos dedos (no celular) para ampliar ou reduzir; arraste o mapa para explorar.</li><li>Eles não são registráveis, mas o mapa está cheio de easter eggs... encontrou todos? 👀</li></ol><button className="dialog-primary" onClick={() => help.current?.close()}>Vamos explorar <ArrowUpRight size={17} /></button></dialog>
    <dialog ref={reset} className="game-dialog"><h2>Mais uma volta?</h2><p>As descobertas desta rodada serão apagadas e as pessoas poderão ser encontradas novamente.</p><div className="dialog-actions"><button onClick={() => reset.current?.close()}>Continuar jogando</button><button className="dialog-primary" onClick={() => { setFound([]); setSelected(null); setMessage(''); setZoom(1); reset.current?.close(); }}>Recomeçar</button></div></dialog>
  </main></MapEditorContext.Provider>;
}


















