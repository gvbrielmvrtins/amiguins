import {readFile,readdir,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';

const root=path.resolve('out');
const headers=await readFile(path.join(root,'_headers'),'utf8');
for(const expected of ['X-Content-Type-Options: nosniff','X-Frame-Options: DENY','Content-Security-Policy-Report-Only:'])assert.ok(headers.includes(expected),`Cabeçalho ausente: ${expected}`);
for(const line of headers.split('\n'))assert.ok(line.length<=2000,'Cabeçalho excede limite do Pages.');
assert.ok((await stat(path.join(root,'index.html'))).isFile());
async function walk(dir){
  for(const entry of await readdir(dir,{withFileTypes:true})){
    assert.ok(!entry.isSymbolicLink(),'Exportação contém link simbólico.');
    const file=path.join(dir,entry.name);
    const relative=path.relative(root,file);
    assert.ok(!/(^|\/)(?:\.env[^/]*|\.git|\.aws|images|functions|_worker\.js)(\/|$)/.test(relative),`Arquivo não publicável: ${relative}`);
    assert.ok(!/\.(?:pem|key|p12|pfx|map)$/i.test(relative),`Arquivo não publicável: ${relative}`);
    if(entry.isDirectory())await walk(file);
  }
}
await walk(root);
console.log('Exportação validada: site estático, cabeçalhos presentes, sem imagens, credenciais ou sourcemaps.');
