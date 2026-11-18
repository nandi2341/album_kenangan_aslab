import Link from 'next/link'
import { SITE } from '@/lib/constants'

export function Footer() {
  return (
    <footer className="grain bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-serif text-3xl italic">{SITE.title}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
            {SITE.organization}, {SITE.university}. Periode {SITE.period}.
          </p>
        </div>
        <nav aria-label="Navigasi footer">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-soft-blue/70">Halaman</p>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><Link className="hover:text-white" href="/">Beranda</Link></li>
            <li><Link className="hover:text-white" href="/assistants">Para Asisten</Link></li>
            <li><Link className="hover:text-white" href="/gallery">Galeri Kenangan</Link></li>
            <li><Link className="hover:text-white" href="/guestbook">Buku Tamu</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-soft-blue/70">Catatan</p>
          <p className="mt-4 font-hand text-2xl leading-snug text-soft-blue">
            Terima kasih telah membuka halaman-halaman ini.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs text-white/50 md:px-8">
          © {SITE.period} Aslab FKOM {SITE.university}
        </p>
      </div>
    </footer>
  )
}
