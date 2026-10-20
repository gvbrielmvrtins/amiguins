/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === '1';
const nextConfig = {
  ...(staticExport ? {output: 'export', distDir: '.next-pages'} : {}),
  images: {
    unoptimized: true,
  },
  ...(!staticExport ? {async headers() {
    return [{
      source: '/images/:path*',
      headers: [{key:'Cache-Control',value:'public, max-age=86400, stale-while-revalidate=604800'}],
    }];
  }} : {}),
}

export default nextConfig
