import Image from 'next/image'
import { ImageIcon, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export function SectionIntro({
  number,
  kicker,
  title,
  children,
  tone = 'light',
  className,
}: {
  number: string
  kicker: string
  title: React.ReactNode
  children?: React.ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <div className={cn('grid gap-6 md:grid-cols-12 md:gap-8', className)}>
      <div className="md:col-span-3" data-reveal>
        <p className={cn('font-serif text-7xl leading-none md:text-8xl', dark ? 'text-white/15' : 'text-navy/10')}>
          {number}
        </p>
        <p
          className={cn(
            'mt-3 text-[11px] font-medium uppercase tracking-[0.3em]',
            dark ? 'text-soft-blue/80' : 'text-blue',
          )}
        >
          {kicker}
        </p>
      </div>
      <div className="md:col-span-9" data-reveal data-delay="0.1">
        <h2
          className={cn(
            'text-balance font-serif text-5xl leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl',
            dark ? 'text-white' : 'text-navy',
          )}
        >
          {title}
        </h2>
        {children && (
          <div
            className={cn(
              'mt-6 max-w-2xl text-pretty text-base leading-relaxed md:text-lg',
              dark ? 'text-white/70' : 'text-muted-foreground',
            )}
          >
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

export function PhotoPlaceholder({ label = 'Foto menyusul', className }: { label?: string; className?: string }) {
  return (
    <div
      className={cn(
        'paper flex h-full w-full flex-col items-center justify-center gap-2 text-navy/40',
        className,
      )}
    >
      <ImageIcon className="size-6" aria-hidden />
      <span className="font-hand text-lg">{label}</span>
    </div>
  )
}

export function PortraitPlaceholder({ className }: { className?: string }) {
  return (
    <div className={cn('flex h-full w-full flex-col items-center justify-center gap-2 bg-soft-blue text-navy/35', className)}>
      <User className="size-10" strokeWidth={1.2} aria-hidden />
      <span className="font-hand text-lg">Foto menyusul</span>
    </div>
  )
}

export function Photo({
  src,
  alt,
  sizes,
  priority,
  className,
  placeholderLabel,
  portrait,
}: {
  src?: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
  placeholderLabel?: string
  portrait?: boolean
}) {
  if (!src) {
    return portrait ? <PortraitPlaceholder className={className} /> : <PhotoPlaceholder label={placeholderLabel} className={className} />
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn('object-cover', className)}
    />
  )
}

export function PlaceholderBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block bg-soft-blue px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.2em] text-navy',
        className,
      )}
    >
      Konten contoh
    </span>
  )
}
