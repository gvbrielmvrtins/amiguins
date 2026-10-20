import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,writeFile,readFile,rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {snapshotImages,verifyBackup,restoreImages} from './image-backup.mjs';

test('backup restaura bytes e recusa corrupção antes de restaurar',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'amiguins-backup-test-'));
  try{
    const source=path.join(root,'source');await mkdir(source);
    await writeFile(path.join(source,'sample.png'),Buffer.from([0,2,255,17]));
    const backup=path.join(root,'backup');await snapshotImages(source,backup);
    assert.equal((await verifyBackup(backup)).files.length,1);
    const restored=path.join(root,'restore');assert.equal(await restoreImages(backup,restored),1);
    assert.deepEqual(await readFile(path.join(restored,'sample.png')),Buffer.from([0,2,255,17]));
    await writeFile(path.join(backup,'images/sample.png'),Buffer.from([0,2,255,18]));
    await assert.rejects(restoreImages(backup,path.join(root,'bad-restore')),/Integridade/);
  }finally{await rm(root,{recursive:true,force:true});}
});

test('backup recusa sobrescrita e caminhos que escapem da pasta',async()=>{
  const root=await mkdtemp(path.join(os.tmpdir(),'amiguins-backup-test-'));
  try{
    const source=path.join(root,'source');await mkdir(source);await writeFile(path.join(source,'a.png'),'sample');
    const backup=path.join(root,'backup');await snapshotImages(source,backup);
    await assert.rejects(snapshotImages(source,backup),{code:'EEXIST'});
    const manifest=JSON.parse(await readFile(path.join(backup,'manifest.json'),'utf8'));
    manifest.files[0].path='../outside.png';await writeFile(path.join(backup,'manifest.json'),JSON.stringify(manifest));
    await assert.rejects(verifyBackup(backup),/Caminho inválido/);
  }finally{await rm(root,{recursive:true,force:true});}
});
