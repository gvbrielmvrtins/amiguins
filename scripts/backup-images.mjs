import path from 'node:path';
import {realpath} from 'node:fs/promises';
import {snapshotImages,verifyBackup,restoreImages} from './image-backup.mjs';

const [command,directory,destination]=process.argv.slice(2);
if(!directory||!['create','verify','restore'].includes(command)||(command==='restore'&&!destination)){
  throw new Error('Uso: node scripts/backup-images.mjs create <pasta-nova> | verify <backup> | restore <backup> <pasta-nova>');
}
if(command==='create'){
  const requested=path.resolve(directory);
  const target=path.join(await realpath(path.dirname(requested)),path.basename(requested));
  const root=await realpath(process.cwd());
  if(target===root||target.startsWith(root+path.sep))throw new Error('Use um destino fora do repositório.');
  const manifest=await snapshotImages('public/images',target);
  await verifyBackup(target);
  console.log(JSON.stringify({directory:target,files:manifest.files.length,bytes:manifest.files.reduce((sum,file)=>sum+file.bytes,0),verified:true}));
}else if(command==='verify'){
  const manifest=await verifyBackup(directory);
  console.log(JSON.stringify({files:manifest.files.length,verified:true}));
}else{
  console.log(JSON.stringify({restoredFiles:await restoreImages(directory,destination),directory:path.resolve(destination)}));
}
