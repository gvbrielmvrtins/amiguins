'use client';

import { useState, useRef,useEffect, type PointerEvent } from 'react';
import {communityLots} from '@/lib/community-study';
import {commerceLots} from '@/lib/commerce-study';
import {boundedScroll} from '@/lib/map-camera';
import {projectGround} from '@/lib/map-projection';
import { ArrowUpRight, Check, ChevronDown, HelpCircle, Lightbulb, Maximize, Minus, MousePointer2, PawPrint, Plus, RotateCcw, Sparkles, Store, Users, X } from 'lucide-react';
import ModularMap from '@/components/modular-map';
import { modularDestinations } from '@/lib/modular-map';
import { mapCharacters } from '@/lib/map-characters';
import {type Target} from '@/lib/game-data';
const placeListPriority: Record<string, number> = { 'pracinha': 0, 'prefeintura': 1, 'departamento-xerifins': 2 };
const categories=[{id:'people',label:'Pessoas'},{id:'places',label:'Espacins'}] as const;
const targets:Target[]=[...mapCharacters, ...modularDestinations.map<Target>(d=>({id:d.id,name:d.name,article:'o',category:'places',x:d.x,y:d.y,width:0,height:0,clue:'Procure '+d.name+' no mapa.'}))];

const destinationPortraits:Record<string,string>={"vagao-feminino":"metro-vagao-feminino-v03.png","livrinhoteca":"livrinhoteca-isometrico-v01.png","cineminha":"cineminha-isometrico-v01.png","mercado-vagas":"mercado-vagas-isometrico-v01.png","prefeintura":"prefeitura-render-v01.png","taverna-joguins":"taverna-medieval-games-v04.png","pracinha":"pracinha-fonte-v01.png","espacin-coloridin":"coloridin-arco-iris-frontal-v02.png","linkedin":"linkedin-predio-v01.png","jardim-secreto":"rosa-arvore-isometrica-v01.png","estudio-criativins":"estudio-render-v02.png","silicin-valley":"silicin-campus-v01.png","departamento-xerifins":"xerifins-departamento-v01.png","inglish-pub":"inglish-pub-render-v02.png","oficina-vendinhas":"feira-roupas-v01.png","torre-mistica":"torre-mistica-render-v01.png","plaza-hispanica":"plaza-arcada-v01.png","academia-marombins":"academia-render-v02.png","binstro":"binstro-render-v02.png","paises-africanos":"aeroporto-internacional-v02.png"};
function Portrait({target}:{target:Target}){return <img className="portrait" aria-hidden="true" alt="" src={mapCharacters.find(person=>person.id===target.id)?.file ?? `/images/modular/${destinationPortraits[target.id]}`} style={{objectFit:"contain"}}/>;}

export default function ExplorationGame() {


  const [found, setFound] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  // New 100% equals 200% of the previous 1.75× preview baseline.
  const mapScale = zoom * 3.5;
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'remaining'>('all');
  const help = useRef<HTMLDialogElement>(null);
  const reset = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const didDrag = useRef(false);
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
  function locateDestination(id:string){
    setSelected(id);const v=viewport.current,d=targets.find(item=>item.id===id);if(!v||!d)return;
    const lot=[...communityLots,...commerceLots].find(item=>item.id===id);
    const at=projectGround(lot?.x??d.x,lot?.y??d.y),scale=v.scrollWidth/2700;
    const next=boundedScroll(at.x*scale-v.clientWidth/2,(at.y+70)*scale-v.clientHeight/2,v.clientWidth,v.clientHeight,v.scrollWidth,v.scrollHeight);
    v.scrollTo({left:next.left,top:next.top,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
  function changeZoom(next:number){
    const v=viewport.current;
    if(!v){setZoom(next);return;}
    const scale=v.scrollWidth/2700,cx=(v.scrollLeft+v.clientWidth/2)/scale,cy=(v.scrollTop+v.clientHeight/2)/scale;
    setZoom(next);
    requestAnimationFrame(()=>{const scale=v.scrollWidth/2700;v.scrollLeft=cx*scale-v.clientWidth/2;v.scrollTop=cy*scale-v.clientHeight/2;constrainCamera();});
  }
  function discover(target: Target) {
    if (target.category !== 'people' || found.includes(target.id)) return;
    setFound(prev => [...prev, target.id]);
    setMessage(`Você encontrou ${target.name}!`);
    if (selected === target.id) setSelected(null);
  }
  function startDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !viewport.current) return;
    e.preventDefault();
    didDrag.current = false;
    drag.current = { x: e.clientX, y: e.clientY, left: viewport.current.scrollLeft, top: viewport.current.scrollTop };
  }
  function moveDrag(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !viewport.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) didDrag.current = true;
    viewport.current.scrollLeft = drag.current.left - dx;
    viewport.current.scrollTop = drag.current.top - dy;
    constrainCamera();
  }
  function giveHint() {
    const remaining = mapCharacters.filter(t => !found.includes(t.id));
    if (!remaining.length) return;
    const next = remaining[Math.floor(Math.random() * remaining.length)];
    locateDestination(next.id); setSelected(next.id); setMessage(`Procure ${next.name} nesta região do mapa.`);
  }
  return <main className="game-shell">
    <div className="game-layout">
      <aside className="discovery-panel">
        <div className="progress-section"><div className="progress-label"><span>Você encontrou</span><strong>{found.length}<span> / {mapCharacters.length}</span></strong></div><div className="progress-track" role="progressbar" aria-label="Pessoas encontradas" aria-valuenow={found.length} aria-valuemin={0} aria-valuemax={mapCharacters.length}><span style={{ width: `${found.length / Math.max(1,mapCharacters.length) * 100}%` }} /></div></div>
        <div className="category-list">{categories.map(category => {
          const items = targets.filter(t => t.category === category.id);
          if (category.id === 'places') items.sort((a, b) => (placeListPriority[a.id] ?? 3) - (placeListPriority[b.id] ?? 3));
          const count = items.filter(t => found.includes(t.id)).length;
          const Icon = Store;
          return <section className="category" key={category.id}><button className="category-heading" aria-expanded={!collapsed.includes(category.id)} onClick={() => setCollapsed(prev => prev.includes(category.id) ? prev.filter(c => c !== category.id) : [...prev, category.id])}><strong>{category.label}</strong>{category.id === 'people' && <span className="category-count">{count}<span>/{items.length}</span></span>}<ChevronDown size={15} className={collapsed.includes(category.id) ? 'closed' : ''} /></button>{!collapsed.includes(category.id) && <div className={`target-grid ${category.id === 'places' ? 'places-grid' : ''}`}>{items.filter(t => category.id === 'places' || filter !== 'remaining' || !found.includes(t.id)).map(target => <button key={target.id} className={`target-card ${selected === target.id ? 'selected' : ''} ${found.includes(target.id) ? 'found' : ''}`} aria-label={target.category === 'places' ? `Ir para ${target.name}` : `Procurar ${target.name}${found.includes(target.id) ? ', encontrado' : ''}`} aria-pressed={selected === target.id} onClick={() => { if(target.category === 'places'){locateDestination(target.id);setMessage(`Você está em ${target.name}.`);return;} setSelected(target.id); setMessage(found.includes(target.id) ? `${target.name} já foi encontrado!` : `Procurando ${target.name}. Encontre no mapa!`); }}><span className="portrait-wrap"><Portrait target={target}/>{found.includes(target.id) && <span className="found-check"><Check size={12} /></span>}</span><span>{target.name}</span></button>)}</div>}</section>;
        })}</div>


      </aside>
      <section className="map-section" aria-label="Mapa interativo da Vila AmiguINs">
        <div className="map-topbar" aria-hidden="true"/>
        <div className="map-frame">
          <div className="map-viewport" ref={viewport} onScroll={constrainCamera} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerLeave={() => { drag.current = null; }}>
            <div className="map-world modular-world" style={{width:`${mapScale*100}%`,minWidth:`${740*mapScale}px`}}><ModularMap selected={selected} onSelect={(id,keyboard)=>{if(keyboard||!didDrag.current){const target=targets.find(t=>t.id===id);if(target?.category === 'people')discover(target);else if(target){locateDestination(id);setMessage(`Você está em ${target.name}.`);}}}}/></div>
          </div>

          <div className="map-controls"><button aria-label="Aumentar zoom" disabled={zoom >= 3} onClick={() => changeZoom(Math.min(3, zoom + .25))}><Plus size={19} /></button><span>{Math.round(zoom * 100)}%</span><button aria-label="Diminuir zoom" disabled={zoom <= .25} onClick={() => changeZoom(Math.max(.25, zoom - .25))}><Minus size={19} /></button><div /><button aria-label="Ajustar mapa à tela" onClick={() => { setZoom(1); viewport.current?.scrollTo({ top: 0, left: 0 }); }}><Maximize size={17} /></button></div>
          {<div className="map-actions"><button className="help-button" aria-label="Como jogar" onClick={() => help.current?.showModal()}><HelpCircle size={17} /></button><button className="help-button" aria-label="Recomeçar" onClick={() => reset.current?.showModal()}><RotateCcw size={17} /></button></div>}
{<button className="hint-button" aria-label="Uma ajudinha?" disabled={complete} onClick={giveHint}><Lightbulb size={18} /></button>}
          {(message || complete) && <div className={`game-message ${complete ? 'complete' : ''}`} role="status"><Sparkles size={19} /><span>{complete ? `Você encontrou todas as ${mapCharacters.length} pessoas da vila! Que tal explorar de novo?` : message}</span><button aria-label="Fechar mensagem" onClick={() => setMessage('')}><X size={15} /></button></div>}
        </div>
        <div className="map-footer"><span>{mapCharacters.length} pessoas para encontrar · clique nos EspacINs para navegar · use o zoom e arraste para explorar</span></div>
      </section>
    </div>
    <dialog ref={help} className="game-dialog"><button className="dialog-close" aria-label="Fechar instruções" onClick={() => help.current?.close()}><X /></button><h2>Explore a Vila AmiguINs</h2><ol><li>Escolha uma pessoa na lista para procurar.</li><li>Clique na pessoa no mapa para registrar a descoberta.</li><li>Clique em um EspacIN na lista para ir até ele no mapa.</li><li>Use o zoom e arraste o mapa para ver os detalhes.</li><li>Se precisar, peça uma ajudinha!</li></ol><button className="dialog-primary" onClick={() => help.current?.close()}>Vamos explorar <ArrowUpRight size={17} /></button></dialog>
    <dialog ref={reset} className="game-dialog"><h2>Mais uma volta?</h2><p>As descobertas desta rodada serão apagadas e as pessoas poderão ser encontradas novamente.</p><div className="dialog-actions"><button onClick={() => reset.current?.close()}>Continuar jogando</button><button className="dialog-primary" onClick={() => { setFound([]); setSelected(null); setMessage(''); setZoom(1); reset.current?.close(); }}>Recomeçar</button></div></dialog>
  </main>;
}



















