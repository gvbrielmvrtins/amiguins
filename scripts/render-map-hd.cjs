// Offline rasterization of the local SVG export; no browser or production changes.
const fs=require('node:fs/promises'),path=require('node:path');
const {createRequire}=require('node:module');
const runtime=process.env.MAP_RUNTIME_MODULES||'/Users/dolfo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const sharp=createRequire(path.join(runtime,'package.json'))('sharp');
async function main(){
 let svg=await fs.readFile(process.argv[2]||'/Users/dolfo/Downloads/amiguins-map-hd.svg','utf8');
 const meta=JSON.parse(svg.match(/data-export-metadata="([^"]+)"/)[1].replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/&#x27;/g,"'"));
 await fs.mkdir('/tmp/amiguins-hd-assets',{recursive:true});
 const sources=[...new Set([...svg.matchAll(/href="(\/images\/[^\"]+)"/g)].map(m=>m[1]))],cache=new Map();
 for(const [i,url] of sources.entries()){
  const file=path.join('public',url.split('?')[0]);
  const matches=meta.places.filter(p=>p.file===url.split('/').pop());
  const maxWidth=Math.max(1,...matches.map(p=>Math.ceil(p.width*6))),maxHeight=Math.max(1,...matches.map(p=>Math.ceil(p.height*6)));
  const data=await sharp(file).resize({width:maxWidth,height:maxHeight,fit:'inside',withoutEnlargement:true}).png().toBuffer();
  const name=`asset-${i}.png`;await fs.writeFile(`/tmp/amiguins-hd-assets/${name}`,data);cache.set(url,`amiguins-hd-assets/${name}`);
  if(i%25===0)console.log(`Embedded ${i}/${sources.length}`);
 }
 svg=svg.replace(/href="(\/images\/[^\"]+)"/g,(_,url)=>`href="${cache.get(url)}"`);
 // Rasterize the original geometry at 6x, then store lossless blocks.
 const scale=6,width=13920,height=10800,size=768;
 const out='public/images/map-hd-preview';await fs.mkdir(out,{recursive:true});
 const cols=Math.ceil(width/size),rows=Math.ceil(height/size);let bytes=0;
 const only=process.env.MAP_ONLY_CHARACTER;
 const ids=only?.split(',');
 const previous=only?JSON.parse(await fs.readFile('lib/map-hd-manifest.json','utf8')):null;
 const affected=only?[...previous.characters.filter(c=>ids.includes(c.id)),...meta.characters.filter(c=>ids.includes(c.id))]:[];
 if(only&&!affected.length)throw new Error(`Unknown character: ${only}`);
 const startRow=Number(process.env.MAP_START_ROW||0);
 for(let row=0;row<startRow;row++)for(let col=0;col<cols;col++)bytes+=(await fs.stat(`${out}/${scale}-${col}-${row}.webp`)).size;
 for(let row=startRow;row<rows;row++)for(let col=0;col<cols;col++){
  const w=Math.min(size,width-col*size),h=Math.min(size,height-row*size);
  let imageIndex=0;
  const x=380+col*size/scale,y=-70+row*size/scale;
  if(only&&!affected.some(b=>b.x+b.width>=x-6&&b.y+b.height>=y-6&&b.x<=x+w/scale+6&&b.y<=y+h/scale+6)){bytes+=(await fs.stat(`${out}/${scale}-${col}-${row}.webp`)).size;continue;}
  const clipped=svg.replace(/<image\b[^>]*>(?:<\/image>)?/g,node=>{
    const b=meta.places[imageIndex++];
    return b?.definition?node:b&&b.x+b.width<x-6||b&&b.y+b.height<y-6||b&&b.x>x+w/scale+6||b&&b.y>y+h/scale+6?'':node;
  });
  const tile=clipped.replace(/<svg[^>]+>/,head=>head.replace(/width="[^"]*"/,`width="${w}"`).replace(/height="[^"]*"/,`height="${h}"`).replace(/viewBox="[^"]*"/,`viewBox="${380+col*size/scale} ${-70+row*size/scale} ${w/scale} ${h/scale}"`).replace(/style="[^"]*"/,'style="display:block"'));
  const tileFile=`/tmp/amiguins-hd-${col}-${row}.svg`;
  await fs.writeFile(tileFile,tile);
  const data=await sharp(tileFile,{limitInputPixels:false}).flatten({background:'#fffef9'}).webp({lossless:true,effort:2}).toBuffer();
  await fs.writeFile(`${out}/${scale}-${col}-${row}.webp`,data);bytes+=data.length;await fs.unlink(tileFile);
  if(col===cols-1)console.log(`Row ${row+1}/${rows} complete`);
 }
 await fs.writeFile('lib/map-hd-manifest.json',JSON.stringify({...meta,levels:[{scale,width,height,size,cols,rows}],bytes,generatedAt:new Date().toISOString()},null,2));
 console.log(`${cols*rows} lossless tiles, ${(bytes/1024/1024).toFixed(1)} MB`);
}
main().catch(e=>{console.error(e);process.exitCode=1});
