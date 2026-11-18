'use client'

import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { RotateCcw } from 'lucide-react'

export function EnvelopeInteraction({ message }: { message: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  const animate = (toOpen: boolean) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const q = gsap.utils.selector(root)
    const d = reduce ? 0 : 1
    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })
    if (toOpen) {
      tl.to(q('[data-env="seal"]'), { scale: 0, opacity: 0, duration: 0.35 * d })
        .to(q('[data-env="flap"]'), { rotateX: 180, duration: 0.9 * d }, '<0.1')
        .set(q('[data-env="flap"]'), { zIndex: 0 })
        .to(q('[data-env="letter"]'), { yPercent: -62, duration: 1.6 * d, ease: 'power2.out' })
        .to(q('[data-env="letter-text"]'), { opacity: 1, duration: 0.8 * d }, '-=0.6')
        .add(() => letterRef.current?.focus())
    } else {
      tl.to(q('[data-env="letter-text"]'), { opacity: 0, duration: 0.3 * d })
        .to(q('[data-env="letter"]'), { yPercent: 0, duration: 0.9 * d })
        .set(q('[data-env="flap"]'), { zIndex: 30 })
        .to(q('[data-env="flap"]'), { rotateX: 0, duration: 0.7 * d })
        .to(q('[data-env="seal"]'), { scale: 1, opacity: 1, duration: 0.3 * d })
    }
    setOpen(toOpen)
  }

  return (
    <div ref={root} className="mx-auto w-full max-w-xl">
      <div className="relative mx-auto aspect-[3/2] w-full pt-[60%] sm:pt-[48%]">
        <div className="absolute inset-x-0 bottom-0 aspect-[3/2]" style={{ perspective: '1200px' }}>
          <div className="absolute inset-0 bg-[#c8d6e8] shadow-[0_30px_60px_-25px_rgba(0,0,0,0.6)]" aria-hidden />

          <div
            data-env="letter"
            ref={letterRef}
            tabIndex={-1}
            aria-live="polite"
            className="paper lined absolute inset-x-[6%] top-[6%] z-10 h-[150%] overflow-y-auto p-6 text-left text-navy outline-none sm:p-8"
          >
            <div data-env="letter-text" className="opacity-0">
              <p className="font-hand text-2xl text-blue">Untukmu,</p>
              <p className="mt-2 whitespace-pre-line font-serif text-lg leading-[32px] sm:text-xl">{message}</p>
              <p className="mt-6 text-right font-hand text-2xl text-navy-2">— Aslab FKOM 2026–2027</p>
            </div>
          </div>

          <div
            className="absolute inset-0 z-20 bg-[#dce8f5]"
            style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%)' }}
            aria-hidden
          >
            <div
              className="absolute inset-0 bg-[#cfdcee]"
              style={{ clipPath: 'polygon(0 100%, 50% 50%, 100% 100%)' }}
            />
          </div>

          <div
            data-env="flap"
            className="absolute inset-x-0 top-0 z-30 h-[58%] origin-top bg-[#b9cbe2]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', backfaceVisibility: 'visible' }}
            aria-hidden
          />

          <button
            type="button"
            data-env="seal"
            onClick={() => !open && animate(true)}
            aria-label="Buka amplop kenangan"
            className="absolute left-1/2 top-[50%] z-40 flex size-16 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-navy font-serif text-lg italic text-soft-blue shadow-lg ring-4 ring-navy/30 transition-transform duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-soft-blue"
          >
            ACR
          </button>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        {open ? (
          <button
            type="button"
            onClick={() => animate(false)}
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-white/70 hover:text-white"
          >
            <RotateCcw className="size-4" aria-hidden />
            Tutup Kembali
          </button>
        ) : (
          <button
            type="button"
            onClick={() => animate(true)}
            className="bg-white px-8 py-4 text-sm font-medium uppercase tracking-[0.2em] text-navy transition-colors hover:bg-soft-blue"
          >
            Buka Amplop
          </button>
        )}
      </div>
    </div>
  )
}
