import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionIntro } from '@/components/album/primitives'
import { PolaroidGrid } from '@/components/album/polaroid-grid'
import { getGallery, getGalleryCategories } from '@/lib/content'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Galeri Kenangan',
  description: 'Arsip foto Asisten Laboratorium FKOM Universitas Kuningan periode 2026–2027.',
}

type Props = { searchParams: Promise<{ kategori?: string }> }

export default async function GalleryPage({ searchParams }: Props) {
  const { kategori } = await searchParams
  const [photos, categories] = await Promise.all([getGallery(), getGalleryCategories()])
  const activeCategory = categories.find((c) => c.slug === kategori)
  const shown = activeCategory ? photos.filter((p) => p.categorySlug === activeCategory.slug) : photos

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <SectionIntro
        number="∞"
        kicker="Galeri Kenangan"
        title={
          <>
            Semua yang sempat <em className="text-blue">terekam</em>
          </>
        }
      >
        {activeCategory?.description ?? 'Dari tawa di sela praktikum hingga formasi lengkap di akhir periode.'}
      </SectionIntro>

      <nav aria-label="Kategori galeri" className="mt-12 flex flex-wrap gap-2 border-b border-navy/10 pb-6">
        <CategoryLink href="/gallery" active={!activeCategory} label={`Semua (${photos.length})`} />
        {categories.map((c) => (
          <CategoryLink
            key={c.slug}
            href={`/gallery?kategori=${c.slug}`}
            active={activeCategory?.slug === c.slug}
            label={`${c.title} (${photos.filter((p) => p.categorySlug === c.slug).length})`}
          />
        ))}
      </nav>

      <div className="mt-14">
        {shown.length ? (
          <PolaroidGrid photos={shown} />
        ) : (
          <p className="paper p-12 text-center font-serif text-2xl italic text-navy">Foto untuk kategori ini menyusul.</p>
        )}
      </div>
    </main>
  )
}

function CategoryLink({ href, active, label }: { href: string; active: boolean; label: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'border px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors',
        active ? 'border-navy bg-navy text-white' : 'border-navy/20 text-navy hover:border-navy',
      )}
    >
      {label}
    </Link>
  )
}
