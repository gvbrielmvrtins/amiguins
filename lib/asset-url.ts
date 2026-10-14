/** Direct CDN access: no Vercel rewrite/proxy, local files remain the fallback. */
export function assetUrl(file:string):string {
  const origin=process.env.NEXT_PUBLIC_ASSET_ORIGIN?.replace(/\/$/,'');
  if(!origin||!file.startsWith('/images/')||file.startsWith('/images/map-hd-preview/'))return file;
  return `${origin}${file}`;
}
