import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Photo, PlaceholderBadge, SectionIntro } from '@/components/album/primitives'
import { CoordinatorLetter } from './coordinator-letter'
import type { LabLeader, Letter } from '@/lib/types'

export function PeopleSection({
  intro,
  groupPhotoAssistantsUrl,
  groupPhotoLeadersUrl,
  heads,
  staff,
  letter,
}: {
  intro?: string
  groupPhotoAssistantsUrl?: string
  groupPhotoLeadersUrl?: string
  heads: LabLeader[]
  staff: LabLeader[]
  letter: Letter
}) {
  return (
    <section aria-labelledby="people-title" className="grain overflow-hidden bg-navy py-24 text-white md:py-36">
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          number="03"
          kicker="Bab Ketiga"
          tone="dark"
          title={
            <span id="people-title">
              The People <em className="text-soft-blue">Behind</em> the Lab
            </span>
          }
        >
          <p>
            {intro ||
              '[Pengantar tentang orang-orang yang membuat laboratorium terasa hidup akan ditampilkan di sini. Teks ini dapat diubah melalui Sanity Studio.]'}
          </p>
        </SectionIntro>

        <figure className="relative mt-16 md:mt-24">
          <div className="relative aspect-[4/3] overflow-hidden bg-navy-2 sm:aspect-[16/9]" data-reveal="image">
            <Photo
              src={groupPhotoAssistantsUrl}
              alt="Foto bersama seluruh asisten laboratorium FKOM periode 2026–2027"
              sizes="(min-width: 1280px) 1216px, 100vw"
              placeholderLabel="Foto bersama asisten menyusul"
            />
          </div>
          <figcaption className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <span className="font-hand text-2xl text-soft-blue">Formasi lengkap, {'2026–2027'}</span>
            <Link
              href="/assistants"
              className="group inline-flex items-center gap-3 self-start border-b border-white/50 pb-1 text-sm font-medium uppercase tracking-[0.2em] hover:border-white"
            >
              Kenali Mereka
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </figcaption>
        </figure>

        <div className="mt-28 md:mt-40">
          <div className="flex items-end justify-between gap-6 border-b border-white/15 pb-6" data-reveal>
            <h3 className="font-serif text-4xl md:text-5xl">Kepala Laboratorium & Laboran</h3>
            <p className="hidden text-[11px] uppercase tracking-[0.3em] text-soft-blue/70 md:block">Pembimbing kami</p>
          </div>

          <div className="mt-14 space-y-20">
            {heads.map((head, i) => (
              <article
                key={head._id}
                className={`grid items-center gap-8 md:grid-cols-12 ${i % 2 ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                <div className="md:col-span-4" data-reveal>
                  <div className="relative mx-auto aspect-[3/4] w-full max-w-xs overflow-hidden bg-navy-2">
                    <Photo src={head.portraitUrl} alt={`Potret ${head.fullName}`} sizes="320px" portrait />
                  </div>
                </div>
                <blockquote className="md:col-span-8" data-reveal data-delay="0.1">
                  <p className="font-serif text-3xl italic leading-snug text-white/95 md:text-4xl lg:text-5xl">
                    {'\u201C'}
                    {head.quote}
                    {'\u201D'}
                  </p>
                  <footer className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                    <span className="text-lg font-medium">{head.fullName}</span>
                    <span className="h-px w-8 bg-soft-blue/50" aria-hidden />
                    <span className="text-sm uppercase tracking-[0.2em] text-soft-blue/80">
                      Kepala {head.laboratory}
                    </span>
                    {head.placeholder && <PlaceholderBadge />}
                  </footer>
                </blockquote>
              </article>
            ))}
          </div>

          <div className="mt-24 grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5" data-reveal>
              <div className="relative aspect-[4/3] overflow-hidden bg-navy-2">
                <Photo
                  src={groupPhotoLeadersUrl}
                  alt="Foto bersama kepala laboratorium dan laboran"
                  sizes="(min-width: 768px) 40vw, 100vw"
                  placeholderLabel="Foto bersama pembimbing menyusul"
                />
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:col-span-7" aria-label="Laboran">
              {staff.map((person, i) => (
                <li key={person._id} data-reveal="polaroid" data-rotate={[-2, 1.5, -1][i % 3]}>
                  <figure className="polaroid !pb-4 text-navy">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Photo src={person.portraitUrl} alt={`Potret ${person.fullName}`} sizes="200px" portrait />
                    </div>
                    <figcaption className="mt-3">
                      <span className="block text-sm font-medium">{person.fullName}</span>
                      <span className="text-[11px] uppercase tracking-[0.2em] text-blue">Laboran</span>
                      {person.quote && (
                        <span className="mt-2 block font-hand text-lg leading-tight text-navy/75">{person.quote}</span>
                      )}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-28 md:mt-40">
          <CoordinatorLetter letter={letter} />
        </div>
      </div>
    </section>
  )
}
