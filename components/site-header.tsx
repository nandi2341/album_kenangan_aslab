'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MusicToggle } from './music-toggle'

const NAV = [
  { href: '/', label: 'Beranda' },
  { href: '/assistants', label: 'Para Asisten' },
  { href: '/gallery', label: 'Galeri' },
  { href: '/guestbook', label: 'Buku Tamu' },
]

export function SiteHeader({ musicUrl }: { musicUrl?: string }) {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const onDark = pathname === '/' && !scrolled && !open
  const solid = scrolled && !open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        solid ? 'border-b border-border bg-background/95' : 'bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className={cn(
            'relative z-50 font-serif text-lg italic tracking-wide transition-colors',
            onDark || open ? 'text-white' : 'text-navy',
          )}
        >
          A Chapter <span className="not-italic">to</span> Remember
        </Link>

        <nav aria-label="Navigasi utama" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {NAV.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'text-xs font-medium uppercase tracking-[0.2em] transition-colors',
                      onDark ? 'text-white/75 hover:text-white' : 'text-navy/70 hover:text-navy',
                      active && (onDark ? 'text-white' : 'text-navy underline underline-offset-8'),
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="relative z-50 flex items-center gap-2">
          <MusicToggle src={musicUrl} tone={onDark || open ? 'light' : 'dark'} />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={cn(
              'inline-flex size-10 items-center justify-center md:hidden',
              onDark || open ? 'text-white' : 'text-navy',
            )}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
            <span className="sr-only">{open ? 'Tutup menu' : 'Buka menu'}</span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="grain fixed inset-0 z-40 bg-navy px-6 pt-28 md:hidden"
      >
        <nav aria-label="Navigasi seluler">
          <ol className="flex flex-col gap-6">
            {NAV.map((item, i) => (
              <li key={item.href} className="flex items-baseline gap-4 border-b border-white/10 pb-6">
                <span className="font-sans text-xs tracking-widest text-soft-blue/60">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <Link href={item.href} className="font-serif text-4xl text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-10 font-hand text-2xl text-soft-blue/80">Aslab FKOM · 2026–2027</p>
      </div>
    </header>
  )
}
