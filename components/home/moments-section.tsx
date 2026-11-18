import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SectionIntro } from '@/components/album/primitives'
import { PolaroidGrid } from '@/components/album/polaroid-grid'
import type { GalleryPhoto } from '@/lib/types'

export function MomentsSection({
  photos,
  categories,
}: {
  photos: GalleryPhoto[]
  categories: { slug: string; title: string; description?: string }[]
}) {
  return (
    <section aria-labelledby="moments-title" className="paper overflow-hidden py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          number="04"
          kicker="Bab Keempat"
          title={
            <span id="moments-title">
              Moments We <em className="text-blue">Shared</em>
            </span>
          }
        >
          <p>Bukan urutan acara, melainkan potongan-potongan kecil yang ingin kami simpan lebih lama.</p>
        </SectionIntro>

        <ol className="mt-16 grid gap-6 border-y border-navy/15 py-8 md:grid-cols-3">
          {categories.map((c, i) => (
            <li key={c.slug} className="flex gap-4" data-reveal data-delay={i * 0.1}>
              <span className="font-serif text-3xl italic text-blue">{'\u2116'}{i + 1}</span>
              <div>
                <Link
                  href={`/gallery?kategori=${c.slug}`}
                  className="font-serif text-2xl text-navy underline-offset-4 hover:underline"
                >
                  {c.title}
                </Link>
                {c.description && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.description}</p>}
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16">
          <PolaroidGrid photos={photos.slice(0, 8)} />
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-4 bg-navy px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue"
          >
            Lihat Semua Kenangan
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  )
}
