'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PlaceholderBadge } from '@/components/album/primitives'
import type { Letter } from '@/lib/types'

export function CoordinatorLetter({ letter }: { letter: Letter }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-letter="sheet"]', {
          rotateX: -75,
          y: 60,
          opacity: 0,
          transformOrigin: 'top center',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        })
        gsap.from('[data-letter="line"]', {
          opacity: 0,
          y: 10,
          stagger: 0.08,
          duration: 0.8,
          delay: 0.6,
          scrollTrigger: { trigger: ref.current, start: 'top 75%', once: true },
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const paragraphs = letter.body.split(/\n{2,}/)

  return (
    <div ref={ref} className="grid gap-10 md:grid-cols-12" style={{ perspective: '1400px' }}>
      <div className="md:col-span-4">
        <p className="text-[11px] uppercase tracking-[0.3em] text-soft-blue/70">Sepucuk Surat</p>
        <h3 className="mt-4 font-serif text-5xl leading-none md:text-6xl">
          {letter.heading || 'Surat dari Koordinator'}
        </h3>
        <p className="mt-6 font-hand text-2xl text-soft-blue">untuk kamu yang membuka album ini</p>
      </div>

      <div className="relative md:col-span-8">
        <div className="absolute -top-5 left-1/2 z-10 h-10 w-32 -translate-x-1/2 bg-[#c9cfd8] shadow-md" aria-hidden>
          <div className="mx-auto mt-2 h-3 w-16 rounded-full bg-navy-2/60" />
        </div>
        <article
          data-letter="sheet"
          className="paper lined relative px-7 pb-12 pt-14 text-navy shadow-2xl md:px-14 md:pt-16"
        >
          <p data-letter="line" className="font-hand text-2xl text-blue">Halo, teman-teman,</p>
          <div className="mt-4 space-y-[32px] font-serif text-xl leading-[32px] md:text-[1.35rem]">
            {paragraphs.map((p, i) => (
              <p key={i} data-letter="line" className="text-pretty">
                {p}
              </p>
            ))}
          </div>
          <div data-letter="line" className="mt-12 flex flex-col items-end">
            <span className="font-hand text-4xl leading-none text-navy-2 -rotate-3">
              {letter.signatureName || '[Nama Koordinator]'}
            </span>
            <span className="mt-2 h-px w-48 bg-navy/30" aria-hidden />
            <span className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {letter.signatureRole || 'Koordinator Asisten Laboratorium'}
            </span>
          </div>
          {letter.placeholder && <PlaceholderBadge className="absolute bottom-4 left-7 md:left-14" />}
        </article>
      </div>
    </div>
  )
}
