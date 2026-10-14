import {readdir,readFile,stat,mkdir,copyFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd();
async function walk(dir){const out=[];for(const e of await readdir(dir,{withFileTypes:true})){const f=path.join(dir,e.name);out.push(...(e.isDirectory()?await walk(f):[f]));}return out;}
const archived=new Set(JSON.parse(await readFile('scripts/deployment-archived-images.json','utf8')));
const files=(await walk('public/images')).filter(f=>!f.includes('/map-hd-preview/')&&!archived.has(f.slice(7)));
const destination=process.env.R2_ASSET_EXPORT_DIR || '/tmp/amiguins-r2-assets';
let bytes=0;
for(const file of files){const key=file.slice(7),target=path.join(destination,key);await mkdir(path.dirname(target),{recursive:true});await copyFile(file,target);bytes+=(await stat(file)).size;}
await writeFile(path.join(destination,'upload-manifest.json'),JSON.stringify({files:files.map(f=>f.slice(7)),bytes},null,2)+'\n');
console.log(JSON.stringify({destination,count:files.length,megabytes:bytes/1e6}));
