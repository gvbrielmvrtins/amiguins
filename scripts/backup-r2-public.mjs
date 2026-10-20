import {mkdir,readFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {verifyBackup} from './image-backup.mjs';

const [inventoryFile,destination]=process.argv.slice(2);
if(!inventoryFile||!destination)throw new Error('Uso: node scripts/backup-r2-public.mjs <inventario.json> <pasta-nova>');
const inventory=JSON.parse(await readFile(inventoryFile,'utf8'));
if(inventory.complete!==true||!Array.isArray(inventory.keys)||!inventory.keys.length)throw new Error('Inventário completo é obrigatório.');
const keys=[...new Set(inventory.keys)].sort();
for(const key of keys){
  if(typeof key!=='string'||!/^images\/[A-Za-z0-9_./-]+$/.test(key)||key.split('/').some(p=>!p||p==='..'||p==='.'))throw new Error('Chave de objeto inválida.');
}
const root=path.resolve(destination);
await mkdir(root,{mode:0o700});
const files=[];
let cursor=0;
async function download(){
  while(cursor<keys.length){
    const key=keys[cursor++];
    let bytes;
    for(let attempt=0;attempt<3;attempt++){
      try{
        const response=await fetch(`https://assets.amiguins.com/${key}`,{redirect:'error',signal:AbortSignal.timeout(30000)});
        if(!response.ok)throw new Error(`HTTP ${response.status}: ${key}`);
        const chunks=[];let size=0;
        for await(const chunk of response.body){size+=chunk.length;if(size>64*1024*1024)throw new Error('Objeto excede 64 MB.');chunks.push(chunk);}
        bytes=Buffer.concat(chunks);break;
      }catch(error){if(attempt===2)throw error;}
    }
    const file=path.join(root,key);
    await mkdir(path.dirname(file),{recursive:true});
    await writeFile(file,bytes,{flag:'wx'});
    files.push({path:key,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
    if(files.length%100===0)console.log(`${files.length}/${keys.length} objetos copiados.`);
  }
}
await Promise.all(Array.from({length:4},download));
const manifest={version:1,createdAt:new Date().toISOString(),source:'https://assets.amiguins.com; inventário completo do painel R2',files:files.sort((a,b)=>a.path.localeCompare(b.path))};
await writeFile(path.join(root,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
await verifyBackup(root);
console.log(JSON.stringify({directory:root,files:files.length,bytes:files.reduce((sum,f)=>sum+f.bytes,0),verified:true}));
