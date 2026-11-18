import type { GuestbookEntry } from '@/lib/types'
import { cn } from '@/lib/utils'

export function GuestbookList({
  entries,
  tone = 'light',
  limit,
}: {
  entries: GuestbookEntry[]
  tone?: 'light' | 'dark'
  limit?: number
}) {
  const dark = tone === 'dark'
  const shown = limit ? entries.slice(0, limit) : entries

  if (shown.length === 0) {
    return (
      <div className={cn('border border-dashed p-10 text-center', dark ? 'border-white/25' : 'border-navy/25')}>
        <p className={cn('font-serif text-2xl italic', dark ? 'text-white/85' : 'text-navy')}>
          Halaman ini masih menunggu tulisan pertama.
        </p>
        <p className={cn('mt-2 text-sm', dark ? 'text-white/55' : 'text-muted-foreground')}>
          Pesan yang sudah disetujui admin akan muncul di sini.
        </p>
      </div>
    )
  }

  return (
    <ul className="columns-1 gap-8 md:columns-2 [&>li]:mb-8">
      {shown.map((entry, i) => (
        <li
          key={entry._id}
          data-reveal
          className={cn('break-inside-avoid border-t pt-6', dark ? 'border-white/20' : 'border-navy/15')}
        >
          <blockquote>
            <p
              className={cn(
                'whitespace-pre-line text-pretty font-serif leading-snug',
                i % 3 === 0 ? 'text-2xl md:text-3xl' : 'text-xl',
                dark ? 'text-white/90' : 'text-navy',
              )}
            >
              {'\u201C'}
              {entry.message}
              {'\u201D'}
            </p>
            <footer className="mt-4 flex flex-wrap items-center gap-3">
              <span className={cn('font-hand text-2xl', dark ? 'text-soft-blue' : 'text-blue')}>{entry.name}</span>
              <span
                className={cn(
                  'text-[10px] font-medium uppercase tracking-[0.25em]',
                  dark ? 'text-white/50' : 'text-muted-foreground',
                )}
              >
                {entry.status} ·{' '}
                {new Date(entry.submittedAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </footer>
          </blockquote>
        </li>
      ))}
    </ul>
  )
}
