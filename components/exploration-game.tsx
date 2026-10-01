'use client';

import { useState, useRef, type PointerEvent } from 'react';
import { Asterisk, ArrowUpRight, Check, ChevronDown, HelpCircle, Lightbulb, Maximize, Minus, MousePointer2, PawPrint, Plus, RotateCcw, Sparkles, Store, Users, X } from 'lucide-react';
import { categories, targets, worldImage, type Target } from '@/lib/game-data';

function Portrait({ target }: { target: Target }) {
  const scale = target.category === 'places' ? .25 : .9;
  return <span className="portrait" aria-hidden="true" style={{ backgroundImage: `url(${worldImage})`, backgroundSize: `${1264 * scale}px ${848 * scale}px`, backgroundPosition: `${29 - target.x / 100 * 1264 * scale}px ${29 - target.y / 100 * 848 * scale}px` }} />;
}

export default function ExplorationGame() {
  const [found, setFound] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [hint, setHint] = useState(false);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState<'all' | 'remaining'>('all');
  const help = useRef<HTMLDialogElement>(null);
  const reset = useRef<HTMLDialogElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const didDrag = useRef(false);
  const current = targets.find(t => t.id === selected);
  const complete = found.length === targets.length;
  function discover(target: Target) {
    if (didDrag.current || found.includes(target.id)) return;
    setFound(prev => [...prev, target.id]);
    setMessage(`${target.name}: encontrado! Boa, explorador.`);
    setHint(false);
    if (selected === target.id) setSelected(null);
  }
  function startDrag(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === 'touch' || !viewport.current) return;
    didDrag.current = false;
    drag.current = { x: e.clientX, y: e.clientY, left: viewport.current.scrollLeft, top: viewport.current.scrollTop };
  }
  function moveDrag(e: PointerEvent<HTMLDivElement>) {
    if (!drag.current || !viewport.current) return;
    const dx = e.clientX - drag.current.x, dy = e.clientY - drag.current.y;
    if (Math.abs(dx) + Math.abs(dy) > 5) didDrag.current = true;
    viewport.current.scrollLeft = drag.current.left - dx;
    viewport.current.scrollTop = drag.current.top - dy;
  }
  function giveHint() {
    const next = current && !found.includes(current.id) ? current : targets.find(t => !found.includes(t.id));
    if (!next) return;
    setSelected(next.id); setHint(true); setMessage(next.clue);
  }
  return <main className="game-shell">
    <header className="site-header">
<a className="wordmark" href="/" aria-label="Where is AmiguINs? Início"><span className="logo-eyes" aria-hidden="true"><i /><i /></span><span><small>WHERE IS</small><strong>AmiguINs<span>?</span></strong></span></a>
</header>
    <div className="game-layout">
      <aside className="discovery-panel">
        <div className="panel-intro"><h1>Cadê todo<br />mundo<span>?</span><span className="intro-spark" aria-hidden="true"><Asterisk size="1em" strokeWidth={2.5} /></span></h1><p>Tem um montão de histórias por aqui.<br />Encontre cada uma delas!</p></div>
        <div className="progress-section"><div className="progress-label"><span>Sua descoberta</span><strong>{found.length}<span> / 15</span></strong></div><div className="progress-track" role="progressbar" aria-label="Elementos encontrados" aria-valuenow={found.length} aria-valuemin={0} aria-valuemax={15}><span style={{ width: `${found.length / 15 * 100}%` }} /></div></div>
        <div className="list-filter"><button aria-pressed={filter === 'all'} className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>Todos</button><button aria-pressed={filter === 'remaining'} className={filter === 'remaining' ? 'active' : ''} onClick={() => setFilter('remaining')}>Faltam encontrar <span>{15 - found.length}</span></button></div>
        <div className="category-list">{categories.map(category => {
          const items = targets.filter(t => t.category === category.id);
          const count = items.filter(t => found.includes(t.id)).length;
          const Icon = category.id === 'people' ? Users : category.id === 'places' ? Store : PawPrint;
          return <section className="category" key={category.id}><button className="category-heading" aria-expanded={!collapsed.includes(category.id)} onClick={() => setCollapsed(prev => prev.includes(category.id) ? prev.filter(c => c !== category.id) : [...prev, category.id])}><span className={`category-icon ${category.color}`}><Icon size={16} /></span><strong>{category.label}</strong><span className="category-count">{count}<span>/{items.length}</span></span><ChevronDown size={15} className={collapsed.includes(category.id) ? 'closed' : ''} /></button>{!collapsed.includes(category.id) && <div className={`target-grid ${category.id === 'places' ? 'places-grid' : ''}`}>{items.filter(t => filter !== 'remaining' || !found.includes(t.id)).map(target => <button key={target.id} className={`target-card ${selected === target.id ? 'selected' : ''} ${found.includes(target.id) ? 'found' : ''}`} aria-label={`Procurar ${target.name}${found.includes(target.id) ? ', encontrado' : ''}`} aria-pressed={selected === target.id} onClick={() => { setSelected(target.id); setHint(false); setMessage(found.includes(target.id) ? `${target.name} já foi encontrado!` : `Procurando ${target.name}. Encontre no mapa!`); }}><span className="portrait-wrap"><Portrait target={target} />{found.includes(target.id) && <span className="found-check"><Check size={12} /></span>}</span><span>{target.name}</span></button>)}</div>}</section>;
        })}</div>
        
      </aside>
      <section className="map-section" aria-label="Mapa interativo da Vila AmiguINs">
        <div className="map-topbar" />
        <div className="map-frame">
          <div className="map-viewport" ref={viewport} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => { drag.current = null; }} onPointerLeave={() => { drag.current = null; }}>
            <div className="map-world" style={{ width: `${zoom * 100}%` }}><img src={worldImage} alt="Vila ilustrada retrô com cinema, loja de discos, café, palco, fonte e moradores passeando ao redor de um rio." draggable={false} />{targets.map(target => <button key={target.id} className={`map-target ${found.includes(target.id) ? 'is-found' : ''} ${hint && selected === target.id ? 'is-hint' : ''}`} style={{ left: `${target.x}%`, top: `${target.y}%`, width: `${target.width}%`, height: `${target.height}%` }} aria-label={`Encontrar ${target.name}`} disabled={found.includes(target.id)} onClick={() => discover(target)}>{found.includes(target.id) && <span><Check size={16} /></span>}</button>)}</div>
          </div>

          <div className="map-controls"><button aria-label="Aumentar zoom" disabled={zoom >= 2} onClick={() => setZoom(z => Math.min(2, z + .25))}><Plus size={19} /></button><span>{Math.round(zoom * 100)}%</span><button aria-label="Diminuir zoom" disabled={zoom <= 1} onClick={() => setZoom(z => Math.max(1, z - .25))}><Minus size={19} /></button><div /><button aria-label="Ajustar mapa à tela" onClick={() => { setZoom(1); viewport.current?.scrollTo({ top: 0, left: 0 }); }}><Maximize size={17} /></button></div>
          <button className="help-button" onClick={() => help.current?.showModal()}><HelpCircle size={17} /><span>Como jogar</span></button>
<button className="hint-button" disabled={complete} onClick={giveHint}><Lightbulb size={18} /> Uma ajudinha?</button>
          {(message || complete) && <div className={`game-message ${complete ? 'complete' : ''}`} role="status"><Sparkles size={19} /><span>{complete ? 'Você encontrou os 15 AmiguINs! Que tal explorar de novo?' : message}</span><button aria-label="Fechar mensagem" onClick={() => setMessage('')}><X size={15} /></button></div>}
        </div>
        <footer className="map-footer"><button onClick={() => reset.current?.showModal()}><RotateCcw size={14} /> Recomeçar</button></footer>
      </section>
    </div>
    <dialog ref={help} className="game-dialog"><button className="dialog-close" aria-label="Fechar instruções" onClick={() => help.current?.close()}><X /></button><span className="dialog-flower"><Asterisk size="1em" strokeWidth={2.5} /></span><h2>O encontro começa<br />com um olhar.</h2><p>Explore a vila e encontre 10 pessoas, 3 espaços e 2 animais.</p><ol><li>Escolha um AmiguIN na lista para ver quem procurar.</li><li>Clique nele no mapa para registrar a descoberta.</li><li>Use o zoom e arraste o mapa para ver os detalhes.</li><li>Se precisar, peça uma ajudinha!</li></ol><small>Este é um protótipo: seu progresso vale enquanto esta página estiver aberta.</small><button className="dialog-primary" onClick={() => help.current?.close()}>Vamos explorar <ArrowUpRight size={17} /></button></dialog>
    <dialog ref={reset} className="game-dialog"><h2>Mais uma volta?</h2><p>As descobertas desta rodada serão apagadas e todos os AmiguINs estarão escondidos de novo.</p><div className="dialog-actions"><button onClick={() => reset.current?.close()}>Continuar jogando</button><button className="dialog-primary" onClick={() => { setFound([]); setSelected(null); setHint(false); setMessage(''); setZoom(1); reset.current?.close(); }}>Recomeçar</button></div></dialog>
  </main>;
}
