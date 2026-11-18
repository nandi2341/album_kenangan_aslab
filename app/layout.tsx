import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Caveat, Cormorant_Garamond, Inter } from 'next/font/google'
import { SiteHeader } from '@/components/site-header'
import { Footer } from '@/components/footer'
import { ScrollAnimations } from '@/components/scroll-animations'
import { getSiteSettings } from '@/lib/content'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' })

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'A Chapter to Remember — Aslab FKOM Universitas Kuningan 2026–2027',
    template: '%s — A Chapter to Remember',
  },
  description:
    'Album kenangan digital Asisten Laboratorium Fakultas Ilmu Komputer Universitas Kuningan periode 2026–2027.',
  openGraph: {
    title: 'A Chapter to Remember',
    description:
      'Album kenangan digital Asisten Laboratorium FKOM Universitas Kuningan, periode 2026–2027.',
    images: ['/images/hero-lab.png'],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#101D35',
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()
  return (
    <html lang="id" className={`${cormorant.variable} ${inter.variable} ${caveat.variable}`}>
      <body className="antialiased">
        <a
          href="#konten"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-navy"
        >
          Lewati ke konten
        </a>
        <SiteHeader musicUrl={settings.musicUrl} />
        <div id="konten">{children}</div>
        <Footer />
        <ScrollAnimations />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
