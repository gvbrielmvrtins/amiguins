import { readFile, readdir, stat, mkdir, rename } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Only previously reviewed illustrations are eligible. New assets are kept by default.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const archived = JSON.parse(await readFile(path.join(root, 'scripts/deployment-archived-images.json'), 'utf8'));
const audit = process.argv.includes('--audit');
if (process.env.VERCEL !== '1' && !audit) {
  console.log('Assets: originais preservados no build local.');
  process.exit(0);
}

async function sourceText(directory) {
  let text = '';
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) text += await sourceText(file);
    else if (/\.(tsx?|jsx?|json|css|mjs)$/.test(entry.name)) text += '\n' + await readFile(file, 'utf8');
  }
  return text;
}
const source = (await Promise.all(['app', 'components', 'lib'].map(dir => sourceText(path.join(root, dir))))).join('\n');
let bytes = 0;
let count = 0;
for (const asset of archived) {
  if (!asset.startsWith('images/') || asset.includes('..')) throw new Error(`Invalid asset: ${asset}`);
  // Reusing a historical image in code automatically includes it again.
  if (source.includes(path.basename(asset))) continue;
  const file = path.join(root, 'public', asset);
  const info = await stat(file).catch(error => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (!info) continue;
  bytes += info.size;
  count++;
  if (!audit) {
    const destination = path.join(root, '.deployment-asset-archive', asset);
    await mkdir(path.dirname(destination), { recursive: true });
    await rename(file, destination);
  }
}
console.log(`Assets: ${count} versões antigas ${audit ? 'podem ficar' : 'ficaram'} fora da publicação (${(bytes / 1_000_000).toFixed(1)} MB).`);
