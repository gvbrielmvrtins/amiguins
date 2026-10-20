import {spawnSync} from 'node:child_process';
import {readdir,stat,rm,rename,writeFile} from 'node:fs/promises';
import path from 'node:path';

const env={...process.env,STATIC_EXPORT:'1',NEXT_PUBLIC_ASSET_ORIGIN:process.env.NEXT_PUBLIC_ASSET_ORIGIN || 'https://assets.amiguins.com'};
const build=spawnSync(process.execPath,['node_modules/next/dist/bin/next','build','--webpack'],{stdio:'inherit',env});
if(build.status!==0)process.exit(build.status ?? 1);
// This Next version uses distDir as the static export destination.
await rm('out',{recursive:true,force:true});
await rename('.next-pages','out');
// These are generated copies: illustrations stay in public/ and are served by R2.
await rm('out/images',{recursive:true,force:true});
await writeFile('out/_headers','/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/\n  Cache-Control: public, max-age=0, must-revalidate\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n');
async function walk(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);files.push(...(e.isDirectory()?await walk(p):[p]));}return files;}
const files=await walk('out');
let bytes=0;
for(const file of files){const size=(await stat(file)).size;if(size>25*1024*1024)throw new Error(`Arquivo excede o limite do Pages: ${file}`);bytes+=size;}
if(files.length>20000)throw new Error('Exportação excede o limite de arquivos do Pages.');
console.log(`Pages: ${files.length} arquivos, ${(bytes/1e6).toFixed(1)} MB; imagens no R2, sem funções de servidor.`);
