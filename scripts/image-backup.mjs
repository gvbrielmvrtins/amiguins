import {copyFile,mkdir,readdir,readFile,realpath,writeFile,lstat} from 'node:fs/promises';
import {createReadStream} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';

export async function sha256(file){
  const hash=createHash('sha256');
  for await(const chunk of createReadStream(file))hash.update(chunk);
  return hash.digest('hex');
}

function safePath(root,relative){
  if(typeof relative!=='string'||!relative||relative.includes('\\')||path.isAbsolute(relative)||relative.split('/').some(part=>part==='..'||part===''||part==='.'))throw new Error('Caminho inválido no backup.');
  return path.join(root,relative);
}

async function walk(root,directory=root){
  const files=[];
  for(const entry of await readdir(directory,{withFileTypes:true})){
    if(entry.isSymbolicLink())throw new Error('Links simbólicos não são permitidos no backup.');
    const file=path.join(directory,entry.name);
    if(entry.isDirectory())files.push(...await walk(root,file));
    else if(entry.isFile())files.push(path.relative(root,file).split(path.sep).join('/'));
    else throw new Error('Tipo de arquivo não suportado no backup.');
  }
  return files.sort();
}

export async function snapshotImages(source,destination){
  const sourceRoot=await realpath(source);
  const target=path.resolve(destination);
  const parent=await realpath(path.dirname(target));
  const actualTarget=path.join(parent,path.basename(target));
  if(actualTarget===sourceRoot||actualTarget.startsWith(sourceRoot+path.sep))throw new Error('Backup precisa ficar fora da origem.');
  // Refuse existing destinations: a snapshot never overwrites the previous one.
  await mkdir(actualTarget,{mode:0o700});
  const files=[];
  for(const relative of await walk(sourceRoot)){
    const sourceFile=safePath(sourceRoot,relative);
    const destinationFile=safePath(actualTarget,`images/${relative}`);
    await mkdir(path.dirname(destinationFile),{recursive:true});
    await copyFile(sourceFile,destinationFile);
    files.push({path:`images/${relative}`,bytes:(await lstat(destinationFile)).size,sha256:await sha256(destinationFile)});
  }
  const manifest={version:1,createdAt:new Date().toISOString(),source:'public/images (originais locais)',files};
  await writeFile(path.join(actualTarget,'manifest.json'),JSON.stringify(manifest,null,2)+'\n',{flag:'wx'});
  return manifest;
}

export async function verifyBackup(directory){
  const root=await realpath(directory);
  const manifest=JSON.parse(await readFile(path.join(root,'manifest.json'),'utf8'));
  if(manifest.version!==1||!Array.isArray(manifest.files)||!manifest.files.length)throw new Error('Manifesto inválido.');
  const seen=new Set();
  for(const entry of manifest.files){
    const file=safePath(root,entry.path);
    if(seen.has(entry.path)||!entry.path.startsWith('images/')||!Number.isSafeInteger(entry.bytes)||entry.bytes<0||!/^[a-f0-9]{64}$/.test(entry.sha256))throw new Error('Entrada inválida no manifesto.');
    seen.add(entry.path);
    const resolved=await realpath(file);
    if(!resolved.startsWith(root+path.sep)||(await lstat(file)).isSymbolicLink())throw new Error('Arquivo fora do backup.');
    if((await lstat(file)).size!==entry.bytes||await sha256(file)!==entry.sha256)throw new Error(`Integridade inválida: ${entry.path}`);
  }
  const actual=await walk(path.join(root,'images'));
  if(actual.length!==seen.size)throw new Error('Arquivos extras no backup.');
  return manifest;
}

export async function restoreImages(directory,destination){
  // Verify everything before creating or copying anything into the restore target.
  const manifest=await verifyBackup(directory);
  const target=path.resolve(destination);
  await mkdir(target,{mode:0o700});
  for(const entry of manifest.files){
    const restored=safePath(target,entry.path.slice('images/'.length));
    await mkdir(path.dirname(restored),{recursive:true});
    await copyFile(safePath(path.resolve(directory),entry.path),restored);
    if(await sha256(restored)!==entry.sha256)throw new Error(`Falha de restauração: ${entry.path}`);
  }
  return manifest.files.length;
}
