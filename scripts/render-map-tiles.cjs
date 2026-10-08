// Run with the bundled Node runtime. Override MAP_RUNTIME_MODULES / MAP_CHROME
// to use a different local Playwright + sharp installation or Chrome executable.
const fs=require('node:fs/promises');
const path=require('node:path');
const {createRequire}=require('node:module');
const runtime=process.env.MAP_RUNTIME_MODULES||'/Users/dolfo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules';
const bundled=createRequire(path.join(runtime,'package.json'));
const {chromium}=bundled('playwright');
const sharp=bundled('sharp');

async function main(){
  await require('./render-menu-portraits.cjs')();
  const browser=await chromium.launch({headless:true,executablePath:process.env.MAP_CHROME||'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
  try{
    const page=await browser.newPage({viewport:{width:1200,height:900},deviceScaleFactor:1});
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto((process.env.MAP_BASE_URL||'http://localhost:3000')+'/map-snapshot',{waitUntil:'networkidle'});
    await page.locator('svg.modular-map').waitFor();
    await page.waitForTimeout(1500);
    const metadata=await page.evaluate(()=>{
      const svg=document.querySelector('svg.modular-map'),root=svg.getScreenCTM().inverse();
      const bounds=node=>{
        const b=node.getBBox(),m=root.multiply(node.getScreenCTM());
        const pts=[[b.x,b.y],[b.x+b.width,b.y],[b.x,b.y+b.height],[b.x+b.width,b.y+b.height]].map(([x,y])=>new DOMPoint(x,y).matrixTransform(m));
        const x=Math.min(...pts.map(p=>p.x)),y=Math.min(...pts.map(p=>p.y));
        return {x:+x.toFixed(3),y:+y.toFixed(3),width:+(Math.max(...pts.map(p=>p.x))-x).toFixed(3),height:+(Math.max(...pts.map(p=>p.y))-y).toFixed(3)};
      };
      return {
        viewBox:[380,-70,2320,1800],
        places:Array.from(svg.querySelectorAll('image')).map(node=>({file:node.getAttribute('href')?.split('/').pop(),...bounds(node)})).filter(b=>b.width>0&&b.height>0),
        characters:Array.from(svg.querySelectorAll('[data-character]')).map(node=>({id:node.getAttribute('data-character'),...bounds(node)})),
      };
    });
    if(errors.length)throw new Error(errors.join('\n'));
    const snapshot=await page.locator('svg.modular-map').screenshot({timeout:120000});
    const out=path.resolve('public/images/map-tiles');await fs.mkdir(out,{recursive:true});
    const image=sharp(snapshot);const info=await image.metadata();
    if(info.width!==9280||info.height!==7200)throw new Error(`Unexpected capture ${info.width}x${info.height}`);
    const levels=[];let bytes=0;
    for(const scale of [1,2,4]){
      const width=2320*scale,height=1800*scale,size=512;
      const raw=await sharp(snapshot).resize(width,height).removeAlpha().raw().toBuffer();
      const cols=Math.ceil(width/size),rows=Math.ceil(height/size);levels.push({scale,width,height,size,cols,rows});
      for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
        const buffer=await sharp(raw,{raw:{width,height,channels:3}}).extract({left:col*size,top:row*size,width:Math.min(size,width-col*size),height:Math.min(size,height-row*size)}).webp({quality:82}).toBuffer();
        await fs.writeFile(path.join(out,`${scale}-${col}-${row}.webp`),buffer);bytes+=buffer.length;
      }
    }
    const manifest={...metadata,levels,bytes,generatedAt:new Date().toISOString()};
    await fs.writeFile('lib/map-tiles-manifest.json',JSON.stringify(manifest,null,2)+'\n');
    console.log(`Map captured: ${metadata.characters.length} characters, ${levels.reduce((n,l)=>n+l.cols*l.rows,0)} tiles, ${(bytes/1024/1024).toFixed(2)} MB across all resolutions.`);
  }finally{await browser.close();}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
