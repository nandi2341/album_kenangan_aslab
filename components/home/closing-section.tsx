import Link from 'next/link'
import { ArrowRight, Download, FileClock } from 'lucide-react'
import { PlaceholderBadge, SectionIntro } from '@/components/album/primitives'
import { GuestbookForm } from '@/components/guestbook/guestbook-form'
import { GuestbookList } from '@/components/guestbook/guestbook-list'
import { EnvelopeInteraction } from './envelope-interaction'
import { EndCredits } from './end-credits'
import type { Assistant, GuestbookEntry, Letter } from '@/lib/types'

export function ClosingSection({
  closing,
  finalLetter,
  entries,
  pdfUrl,
  assistants,
}: {
  closing: Letter
  finalLetter: string
  entries: GuestbookEntry[]
  pdfUrl?: string
  assistants: Assistant[]
}) {
  return (
    <section aria-labelledby="closing-title" className="grain overflow-hidden bg-navy py-24 text-white md:py-36">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          number="06"
          kicker="Bab Terakhir"
          tone="dark"
          title={
            <span id="closing-title">
              Until We Meet <em className="text-soft-blue">Again</em>
            </span>
          }
        />

        <div className="mt-16 grid gap-16 md:mt-24 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6" data-reveal>
            <p className="text-[11px] uppercase tracking-[0.3em] text-soft-blue/70">{closing.heading || 'Sampai Jumpa Lagi'}</p>
            <div className="mt-6 space-y-6 font-serif text-2xl leading-relaxed text-white/90 md:text-3xl">
              {closing.body.split(/\n{2,}/).map((p, i) => (
                <p key={i} className="text-pretty">
                  {p}
                </p>
              ))}
            </div>
            {closing.signatureName && (
              <p className="mt-8 font-hand text-3xl text-soft-blue">{closing.signatureName}</p>
            )}
            {closing.placeholder && <PlaceholderBadge className="mt-6" />}
          </div>
          <div className="lg:col-span-6">
            <EnvelopeInteraction message={finalLetter} />
          </div>
        </div>

        <div id="buku-tamu" className="mt-32 scroll-mt-20 md:mt-44">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <h3 className="font-serif text-5xl leading-none md:text-6xl">
                Buku <em className="text-soft-blue">Tamu</em>
              </h3>
              <p className="mt-6 max-w-md leading-relaxed text-white/70">
                Untuk praktikan, dosen, alumni, dan siapa saja yang pernah singgah. Tulis kesanmu, dan kami akan
                menyimpannya di halaman ini.
              </p>
              <div className="mt-8 text-navy">
                <GuestbookForm tone="dark" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <GuestbookList entries={entries} tone="dark" limit={6} />
              <Link
                href="/guestbook"
                className="group mt-6 inline-flex items-center gap-3 border-b border-white/50 pb-1 text-sm font-medium uppercase tracking-[0.2em] hover:border-white"
              >
                Baca Semua Pesan
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-28 flex flex-col items-center gap-4 border-y border-white/15 py-14 text-center" data-reveal>
          <p className="text-[11px] uppercase tracking-[0.3em] text-soft-blue/70">Edisi Cetak</p>
          {pdfUrl ? (
            <a
              href={`${pdfUrl}?dl=`}
              className="inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:bg-soft-blue"
            >
              <Download className="size-4" aria-hidden />
              Unduh Album Versi Cetak (PDF)
            </a>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-3 border border-white/25 px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white/50"
              >
                <FileClock className="size-4" aria-hidden />
                Unduh Album Versi Cetak (PDF)
              </span>
              <p className="font-hand text-xl text-soft-blue/80">Versi cetak sedang disiapkan. Nantikan, ya.</p>
            </div>
          )}
        </div>

        <EndCredits assistants={assistants} />
      </div>
    </section>
  )
}
