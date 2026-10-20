import {createHash} from 'node:crypto';

export function securityHeaders(htmlDocuments) {
  const hashes=new Set();
  for(const html of htmlDocuments){
    for(const [,attributes,body] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){
      if(/\bsrc\s*=/i.test(attributes)||!body.trim())continue;
      hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
    }
  }
  const policy=[
    "default-src 'self'",
    `script-src 'self' ${[...hashes].sort().join(' ')}`.trim(),
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' https://assets.amiguins.com data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://assets.amiguins.com",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'none'",
    "frame-ancestors 'none'",
    "form-action 'none'",
  ].join('; ');
  // Pages limits each header line to 2,000 characters.
  if(`  Content-Security-Policy-Report-Only: ${policy}`.length>2000){
    throw new Error('CSP excede o limite de cabeçalho do Pages; separar as políticas por rota.');
  }
  return `/*\n  X-Content-Type-Options: nosniff\n  X-Frame-Options: DENY\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  Content-Security-Policy-Report-Only: ${policy}\n/\n  Cache-Control: public, max-age=0, must-revalidate\n/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n`;
}
