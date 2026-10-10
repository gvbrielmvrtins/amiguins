import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Gasoek_One, Archivo_Narrow } from 'next/font/google'
import localFont from 'next/font/local'

const displayFont = Gasoek_One({ weight: '400', subsets: ['latin'], display: 'swap', variable: '--font-gasoek' })
const bodyFont = Archivo_Narrow({ subsets: ['latin'], display: 'swap', variable: '--font-archivo' })
const headingFont = localFont({
  src: [
    { path: '../public/fonts/now/Now-Regular.otf', weight: '400', style: 'normal' },
    { path: '../public/fonts/now/Now-Medium.otf', weight: '500', style: 'normal' },
    { path: '../public/fonts/now/Now-Bold.otf', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-now',
})

export const metadata: Metadata = {
  title: "mapa da amiguINlândia | where's amiguINs?",
  description: 'Explore a Vila AmiguINs: um universo retrô e colorido para encontrar pessoas, lugares e novos amigos.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/favicon-32.png',
        type: 'image/png',
        sizes: '32x32',
      },
      {
        url: '/favicon-192.png',
        type: 'image/png',
        sizes: '192x192',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#FFFEF9',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`light ${displayFont.variable} ${headingFont.variable} ${bodyFont.variable}`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
