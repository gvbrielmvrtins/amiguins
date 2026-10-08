const fs=require('node:fs/promises');
const path=require('node:path');
const {createRequire}=require('node:module');
const bundled=createRequire(path.join(process.env.MAP_RUNTIME_MODULES||'/Users/dolfo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules','package.json'));
const sharp=bundled('sharp');
async function renderPortraits(){
  const source=await fs.readFile('components/exploration-game.tsx','utf8');
  const faces=Function(`return (${source.match(/const facePortraits:[\s\S]*?= (\{[\s\S]*?\n\});/)[1]})`)();
  const places=JSON.parse(source.match(/const destinationPortraits:[^=]+=(\{[^\n]+\});/)[1]);
  const characters=await fs.readFile('lib/map-characters.ts','utf8');
  const out='public/images/menu-portraits';await fs.mkdir(out,{recursive:true});
  for(const [id,face] of Object.entries(faces)){
    const line=characters.split('\n').find(line=>line.includes(`id: '${id}'`));
    const file=line.match(/file: '([^']+)'/)[1];
    const [left,top,size]=face.crop;
    const normalized=await sharp(path.join('public',file)).resize(face.width,face.height).toBuffer();
    await sharp(normalized).extract({left,top,width:size,height:size}).resize(160,160).webp({quality:84}).toFile(path.join(out,`${id}.webp`));
  }
  for(const [id,file] of Object.entries(places))await sharp(path.join('public/images/modular',file)).resize(160,160,{fit:'inside'}).webp({quality:82}).toFile(path.join(out,`${id}.webp`));
  console.log(`Rendered ${Object.keys(faces).length+Object.keys(places).length} lightweight menu portraits.`);
}
module.exports=renderPortraits;
if(require.main===module)renderPortraits().catch(e=>{console.error(e);process.exitCode=1;});
