'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowDown } from 'lucide-react'
import { SITE } from '@/lib/constants'

export function HeroSection({ logoUrl, heroImageUrl }: { logoUrl?: string; heroImageUrl?: string }) {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('[data-hero="bg"]', { scale: 1.12, opacity: 0, duration: 2.2 })
          .from('[data-hero="rule"]', { scaleX: 0, duration: 1.1, transformOrigin: 'left' }, '-=1.6')
          .from('[data-hero="meta"]', { y: 14, opacity: 0, duration: 0.8, stagger: 0.1 }, '-=0.9')
          .from('[data-hero="word"]', { yPercent: 110, duration: 1.2, stagger: 0.12 }, '-=0.8')
          .from('[data-hero="photo"]', { y: 80, opacity: 0, rotate: 0, duration: 1.3, stagger: 0.15 }, '-=0.9')
          .from('[data-hero="cta"]', { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
      })
    }, root)
    return () => ctx.revert()
  }, [])

  const openAlbum = () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('laboratorium')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section
      ref={root}
      aria-labelledby="hero-title"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-navy text-white"
    >
      <div data-hero="bg" className="absolute inset-0 -z-0" aria-hidden>
        <Image
          src={heroImageUrl || '/images/hero-lab.png'}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-10 pt-24 md:px-8 md:pt-28">
        <div className="flex items-start justify-between gap-6">
          <div data-hero="meta" className="flex items-center gap-3">
            {logoUrl ? (
              <Image src={logoUrl} alt="Logo Aslab FKOM" width={48} height={48} className="size-12 object-contain" />
            ) : (
              <span
                className="flex size-12 items-center justify-center rounded-full border border-dashed border-white/40 text-[9px] uppercase tracking-widest text-white/60"
                aria-label="Tempat logo organisasi"
              >
                Logo
              </span>
            )}
            <span className="hidden text-[11px] uppercase tracking-[0.3em] text-white/60 sm:inline">
              Edisi Kenangan
            </span>
          </div>
          <p data-hero="meta" className="text-right font-serif text-xl italic text-soft-blue md:text-2xl">
            Vol. {SITE.period}
          </p>
        </div>

        <div data-hero="rule" className="mt-6 h-px w-full bg-white/25" aria-hidden />

        <div className="relative grid flex-1 items-end gap-10 py-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p data-hero="meta" className="mb-6 text-[11px] font-medium uppercase tracking-[0.35em] text-soft-blue/80">
              Album Kenangan Digital
            </p>
            <h1
              id="hero-title"
              className="font-serif text-[clamp(3.6rem,13vw,10.5rem)] font-normal leading-[0.86] tracking-tight"
            >
              {['A Chapter', 'to Remember'].map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <span data-hero="word" className={i === 1 ? 'block italic text-soft-blue' : 'block'}>
                    {line}
                  </span>
                </span>
              ))}
            </h1>
            <p data-hero="meta" className="mt-8 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
              {SITE.organization} {SITE.university}
            </p>
          </div>

          <div className="relative hidden h-[26rem] lg:col-span-4 lg:block" aria-hidden>
            <figure data-hero="photo" className="polaroid absolute right-4 top-0 w-60 rotate-[5deg]">
              <div className="relative aspect-[4/5] overflow-hidden bg-soft-blue">
                <Image src="/images/lab-workstation.png" alt="" fill sizes="240px" className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-3 text-center font-hand text-xl text-navy/80">
                hari pertama di lab
              </figcaption>
            </figure>
            <figure data-hero="photo" className="polaroid absolute bottom-0 left-0 w-56 -rotate-[6deg]">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
              <div className="relative aspect-square overflow-hidden bg-soft-blue">
                <Image src="/images/lab-whiteboard.png" alt="" fill sizes="224px" className="object-cover" />
              </div>
              <figcaption className="absolute inset-x-0 bottom-3 text-center font-hand text-xl text-navy/80">
                papan tulis penuh cerita
              </figcaption>
            </figure>
          </div>
        </div>

        <div data-hero="cta" className="flex flex-col items-start justify-between gap-6 border-t border-white/25 pt-6 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={openAlbum}
            className="group inline-flex items-center gap-4 bg-white px-7 py-4 text-sm font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:bg-soft-blue"
          >
            Buka Album
            <ArrowDown className="size-4 transition-transform group-hover:translate-y-1" aria-hidden />
          </button>
          <p className="font-hand text-2xl text-soft-blue/90">Fakultas Ilmu Komputer · {SITE.period}</p>
        </div>
      </div>
    </section>
  )
}
