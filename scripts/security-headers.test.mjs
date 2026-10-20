import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {securityHeaders} from './security-headers.mjs';

test('permite bootstrap exato do Next com hash, sem liberar scripts inline arbitrários',()=>{
  const script='self.__next_f.push([1,"hello"]);';
  const expected=createHash('sha256').update(script).digest('base64');
  const headers=securityHeaders([`<script>${script}</script><script src="/app.js"></script>`]);
  const policy=headers.split('\n').find(line=>line.includes('Content-Security-Policy-Report-Only:'));
  assert.ok(policy.includes(`'sha256-${expected}'`));
  assert.ok(!/script-src[^;]*unsafe-inline/.test(policy));
  assert.ok(policy.includes("object-src 'none'"));
  assert.ok(policy.includes('https://assets.amiguins.com'));
  assert.ok(!headers.includes('  Content-Security-Policy:'));
});

test('recusa uma política que o Pages não consegue publicar',()=>{
  assert.throws(()=>securityHeaders(Array.from({length:50},(_,n)=>`<script>window.example=${n}</script>`)),/limite/);
});
