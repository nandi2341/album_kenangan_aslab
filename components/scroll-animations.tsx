'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Declarative GSAP hooks:
 *  data-reveal            fade + rise when scrolled into view
 *  data-reveal="image"    clip-path wipe for photographs
 *  data-reveal="polaroid" drop in with a slight rotation settle
 *  data-parallax="0.15"   subtle vertical drift relative to scroll
 */
export function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const mm = gsap.matchMedia()

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        const kind = el.dataset.reveal
        const trigger = { trigger: el, start: 'top 88%', once: true }
        if (kind === 'image') {
          gsap.fromTo(
            el,
            { clipPath: 'inset(12% 12% 12% 12%)', opacity: 0.2 },
            { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1, duration: 1.4, ease: 'power3.out', scrollTrigger: trigger },
          )
        } else if (kind === 'polaroid') {
          const rotate = Number(el.dataset.rotate || 0)
          gsap.fromTo(
            el,
            { y: 50, opacity: 0, rotate: rotate * 2.5 },
            { y: 0, opacity: 1, rotate, duration: 1.1, ease: 'back.out(1.4)', scrollTrigger: trigger },
          )
        } else {
          gsap.fromTo(
            el,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: 'power3.out',
              delay: Number(el.dataset.delay || 0),
              scrollTrigger: trigger,
            },
          )
        }
      })

      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const speed = Number(el.dataset.parallax || 0.15)
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })
    })

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => {
      window.clearTimeout(refresh)
      mm.revert()
    }
  }, [pathname])

  return null
}
