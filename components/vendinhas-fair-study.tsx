import CivicRenderedProp from './civic-rendered-prop';
const stalls=[
 {x:-105,y:-115,kind:'fairClothes',label:'Barraca de roupas'},
 {x:80,y:-115,kind:'fairBooks',label:'Barraca de livros e impressos'},
 {x:-105,y:30,kind:'fairCeramics',label:'Barraca de cerâmica e artesanato'},
 {x:95,y:35,kind:'fairElectronics',label:'Barraca de eletrônicos'},
 {x:-115,y:145,kind:'fairProduce',label:'Banca de produtos frescos'},
].sort((a,b)=>a.x+a.y-b.x-b.y);
export default function VendinhasFair(){return <g data-fair="rendered" aria-label="Feira de vendas renderizada com roupas, livros, cerâmica, eletrônicos e produtos frescos">{stalls.map(s=><g key={s.kind} aria-label={s.label}><title>{s.label} — espaço renderizado</title><CivicRenderedProp kind={s.kind} x={s.x} y={s.y}/></g>)}</g>;}
