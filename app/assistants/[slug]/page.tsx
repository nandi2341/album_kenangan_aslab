import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Sparkles, Star, Heart } from 'lucide-react'
import { Photo, PlaceholderBadge } from '@/components/album/primitives'
import { getAssistant, getAssistants } from '@/lib/content'
import { STUDY_PROGRAM_LABELS } from '@/lib/constants'
import { cn } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const assistants = await getAssistants()
  return assistants.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const a = await getAssistant(slug)
  if (!a) return { title: 'Profil tidak ditemukan' }
  return {
    title: a.fullName,
    description: `${a.position} ${a.laboratory} — Asisten Laboratorium FKOM Universitas Kuningan.`,
  }
}

const STICKERS = [Star, Heart, Sparkles]

export default async function AssistantProfilePage({ params }: Props) {
  const { slug } = await params
  const assistant = await getAssistant(slug)
  if (!assistant) notFound()

  const all = await getAssistants()
  const idx = all.findIndex((a) => a.slug === slug)
  const variant = Math.max(idx, 0) % 3
  const tilt = ['-rotate-3', 'rotate-2', '-rotate-1'][variant]
  const next = all.length > 1 ? all[(idx + 1) % all.length] : null
  const funFacts = (assistant.funFacts ?? []).filter(Boolean).slice(0, 3)

  const info = [
    { label: 'Program Studi', value: `${assistant.studyProgram} — ${STUDY_PROGRAM_LABELS[assistant.studyProgram]}` },
    { label: 'Laboratorium', value: assistant.laboratory },
    { label: 'Jabatan', value: assistant.position },
    { label: 'Periode', value: assistant.servicePeriod || '2026–2027' },
  ]

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-28 md:px-8 md:pt-36">
      <Link
        href="/assistants"
        className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground hover:text-navy"
      >
        <ArrowLeft className="size-4" aria-hidden />
        Direktori Asisten
      </Link>

      <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className={cn('lg:col-span-5', variant === 1 && 'lg:order-2 lg:col-start-8')}>
          <figure className={cn('polaroid mx-auto max-w-sm', tilt)}>
            <div className="relative aspect-[4/5] overflow-hidden bg-soft-blue">
              <Photo
                src={assistant.portraitUrl}
                alt={`Potret ${assistant.fullName}`}
                sizes="(min-width: 1024px) 400px, 90vw"
                priority
                portrait
              />
            </div>
            <figcaption className="mt-4 text-center font-hand text-4xl text-navy">
              {assistant.nickname || assistant.fullName.split(' ')[0]}
            </figcaption>
          </figure>
        </div>

        <div className={cn('lg:col-span-7', variant === 1 && 'lg:order-1')}>
          <p className="text-[11px] font-medium uppercase tracking-[0.3em] text-blue">{assistant.position}</p>
          <h1 className="mt-4 text-balance font-serif text-5xl leading-[0.95] tracking-tight text-navy md:text-7xl">
            {assistant.fullName}
          </h1>
          {assistant.placeholder && <PlaceholderBadge className="mt-4" />}

          <dl className="mt-10 grid grid-cols-1 border-t border-navy/15 sm:grid-cols-2">
            {info.map((i) => (
              <div key={i.label} className="border-b border-navy/15 py-4 sm:odd:pr-6">
                <dt className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">{i.label}</dt>
                <dd className="mt-1 font-serif text-xl text-navy">{i.value}</dd>
              </div>
            ))}
          </dl>

          {assistant.personalQuote && (
            <blockquote className="mt-14 border-l-2 border-blue pl-6">
              <p className="text-pretty font-serif text-3xl italic leading-snug text-navy md:text-4xl">
                {'\u201C'}
                {assistant.personalQuote}
                {'\u201D'}
              </p>
            </blockquote>
          )}
        </div>
      </div>

      <div className="mt-24 grid gap-12 lg:grid-cols-12">
        <section aria-labelledby="memo-title" className="lg:col-span-7">
          <div className={cn('paper lined relative p-8 md:p-12', variant === 2 ? 'rotate-[0.5deg]' : '-rotate-[0.5deg]')}>
            <span className="tape -top-3 left-10" aria-hidden />
            <h2 id="memo-title" className="font-hand text-3xl text-blue">
              Pesan &amp; Pengalaman
            </h2>
            {assistant.messageAndExperience ? (
              <div className="mt-4 space-y-4 text-lg leading-[32px] text-navy">
                {assistant.messageAndExperience.split(/\n{2,}/).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-lg italic leading-[32px] text-navy/50">Tulisan menyusul.</p>
            )}
          </div>
        </section>

        <section aria-labelledby="facts-title" className="lg:col-span-5">
          <h2 id="facts-title" className="text-[11px] font-medium uppercase tracking-[0.3em] text-blue">
            Fakta Seru
          </h2>
          {funFacts.length ? (
            <ul className="mt-6 space-y-5">
              {funFacts.map((fact, i) => {
                const Icon = STICKERS[(i + variant) % STICKERS.length]
                return (
                  <li key={i} className="flex items-start gap-4">
                    <span
                      className={cn(
                        'flex size-10 shrink-0 items-center justify-center rounded-full bg-soft-blue text-navy shadow-sm',
                        i % 2 ? 'rotate-6' : '-rotate-6',
                      )}
                      aria-hidden
                    >
                      <Icon className="size-4" />
                    </span>
                    <p className="pt-2 leading-relaxed text-navy">{fact}</p>
                  </li>
                )
              })}
            </ul>
          ) : (
            <p className="mt-6 text-muted-foreground">Belum ada fakta seru yang dibagikan.</p>
          )}
        </section>
      </div>

      {next && (
        <Link
          href={`/assistants/${next.slug}`}
          className="group mt-28 flex items-end justify-between gap-6 border-t border-navy/15 pt-8"
        >
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground">Profil berikutnya</p>
            <p className="mt-2 font-serif text-3xl text-navy transition-colors group-hover:text-blue md:text-5xl">
              {next.fullName}
            </p>
          </div>
          <span className="font-hand text-2xl text-blue">lanjut {'\u2192'}</span>
        </Link>
      )}
    </main>
  )
}
