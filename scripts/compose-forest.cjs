// Compose existing tree art without changing its pixels or illustrated identity.
const fs = require('node:fs/promises');
const path = require('node:path');
const ts = require('typescript');
const {createRequire} = require('node:module');
require.extensions['.ts'] = (module, file) => module._compile(ts.transpileModule(require('node:fs').readFileSync(file, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, file);
const {northForestTrees} = require('../lib/north-forest.ts');
const {parkRenderedAssets} = require('../lib/park-rendered-assets.ts');
const {projectGround} = require('../lib/map-projection.ts');
const offsets = require('../lib/map-layout-offsets.json');
const runtime = process.env.MAP_RUNTIME_MODULES || '/Users/dolfo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const sharp = createRequire(path.join(runtime, 'package.json'))('sharp');
async function main() {
  const entries = [];
  for (const tree of [...northForestTrees].sort((a,b)=>a.x+a.y-b.x-b.y)) {
    const art = parkRenderedAssets[tree.kind], at = projectGround(tree.x,tree.y), scale = (tree.scale??1)*art.scale;
    const x = at.x-art.anchorX*scale, y = at.y-art.anchorY*scale, width = art.width*scale, height = art.height*scale;
    const instances = [[tree.id,offsets[tree.id]??{}],...Object.entries(offsets).filter(([,o])=>o.sourceId===tree.id)];
    for (const [id,o] of instances) {
      if(o.hidden) continue;
      const cx=x+width/2,cy=y+height/2,s=o.scale??1,angle=(o.rotation??0)*Math.PI/180;
      const points=[[x,y],[x+width,y],[x,y+height],[x+width,y+height]].map(([px,py])=>({x:cx+(o.x??0)+s*((px-cx)*Math.cos(angle)-(py-cy)*Math.sin(angle)),y:cy+(o.y??0)+s*((px-cx)*Math.sin(angle)+(py-cy)*Math.cos(angle))}));
      entries.push({id,kind:tree.kind,layer:o.layer??0,front:at.y+(o.y??0)>projectGround(2100,-500).y,transform:`translate(${o.x??0} ${o.y??0}) translate(${cx} ${cy}) rotate(${o.rotation??0}) scale(${s}) translate(${-cx} ${-cy})`,x,y,width,height,bounds:{x:Math.min(...points.map(p=>p.x)),y:Math.min(...points.map(p=>p.y)),right:Math.max(...points.map(p=>p.x)),bottom:Math.max(...points.map(p=>p.y))}});
    }
  }
  const visible=entries.filter(e=>e.bounds.right>380&&e.bounds.x<2700&&e.bounds.bottom>-70&&e.bounds.y<1730);
  const x=Math.max(380,Math.floor(Math.min(...visible.map(e=>e.bounds.x)))),y=Math.max(-70,Math.floor(Math.min(...visible.map(e=>e.bounds.y))));
  const width=Math.min(2700,Math.ceil(Math.max(...visible.map(e=>e.bounds.right))))-x,height=Math.min(1730,Math.ceil(Math.max(...visible.map(e=>e.bounds.bottom))))-y;
  const defs=[];
  for(const kind of new Set(visible.map(e=>e.kind))){
    const art=parkRenderedAssets[kind];
    const bytes=await sharp(path.join('public/images/modular',art.file)).webp({lossless:true,effort:6}).toBuffer();
    defs.push(`<image id="${kind}" width="${art.width}" height="${art.height}" href="data:image/webp;base64,${bytes.toString('base64')}"/>`);
  }
  const ordered=visible.sort((a,b)=>a.layer-b.layer);
  const layers={};
  for(const [name,front] of [['back',false],['front',true]]) {
    const trees=ordered.filter(e=>e.front===front);
    const nodes=trees.map(e=>`<g transform="${e.transform}"><use href="#${e.kind}" transform="translate(${e.x} ${e.y}) scale(${e.width/parkRenderedAssets[e.kind].width})"/></g>`);
    const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="${x} ${y} ${width} ${height}"><defs>${defs.join('')}</defs>${nodes.join('')}</svg>`;
    const file=`/images/modular/floresta-${name}-v01.svg`;
    await fs.writeFile('public'+file,svg);
    layers[name]={file,trees:trees.length,bytes:Buffer.byteLength(svg)};
  }
  await fs.writeFile('lib/forest-composite.json',JSON.stringify({x,y,width,height,sourceTrees:northForestTrees.length,...layers},null,2)+'\n');
  console.log(layers);
}
main().catch(error=>{console.error(error);process.exitCode=1;});
