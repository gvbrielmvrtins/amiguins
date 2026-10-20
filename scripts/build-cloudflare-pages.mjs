import {spawnSync} from 'node:child_process';
import {readdir,stat,rm,rename,writeFile,readFile} from 'node:fs/promises';
import path from 'node:path';
import {securityHeaders} from './security-headers.mjs';

const env={...process.env,STATIC_EXPORT:'1',NEXT_PUBLIC_ASSET_ORIGIN:process.env.NEXT_PUBLIC_ASSET_ORIGIN || 'https://assets.amiguins.com'};
const build=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build','--webpack'],{stdio:'inherit',env});
if(build.status!==0)process.exit(build.status ?? 1);
// This Next version uses distDir as the static export destination.
await rm('out',{recursive:true,force:true});
await rename('.next-pages','out');
// These are generated copies: illustrations stay in public/ and are served by R2.
await rm('out/images',{recursive:true,force:true});
async function walk(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);files.push(...(e.isDirectory()?await walk(p):[p]));}return files;}
const files=await walk('out');
const html=await Promise.all(files.filter(file=>file.endsWith('.html')).map(file=>readFile(file,'utf8')));
await writeFile('out/_headers',securityHeaders(html));
files.push('out/_headers');
let bytes=0;
for(const file of files){const size=(await stat(file)).size;if(size>25*1024*1024)throw new Error(`Arquivo excede o limite do Pages: ${file}`);bytes+=size;}
if(files.length>20000)throw new Error('Exportação excede o limite de arquivos do Pages.');
console.log(`Pages: ${files.length} arquivos, ${(bytes/1e6).toFixed(1)} MB; imagens no R2, sem funções de servidor.`);
