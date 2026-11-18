'use client'

import { useRef, useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { GUESTBOOK_STATUSES } from '@/lib/constants'
import { cn } from '@/lib/utils'

type State =
  | { kind: 'idle' }
  | { kind: 'loading' }
  | { kind: 'success' }
  | { kind: 'error'; message: string; fields?: Record<string, string> }

const fieldBase =
  'w-full border-0 border-b border-navy/30 bg-transparent px-0 py-3 text-base text-navy placeholder:text-navy/35 focus:border-navy focus:outline-none focus:ring-0'

export function GuestbookForm({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [state, setState] = useState<State>({ kind: 'idle' })
  const startedAt = useRef(Date.now())
  const formRef = useRef<HTMLFormElement>(null)
  const dark = tone === 'dark'

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState({ kind: 'loading' })
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        setState({ kind: 'error', message: json.error || 'Terjadi kesalahan.', fields: json.fields })
        return
      }
      formRef.current?.reset()
      setState({ kind: 'success' })
    } catch {
      setState({ kind: 'error', message: 'Tidak dapat terhubung. Periksa koneksi kamu.' })
    }
  }

  if (state.kind === 'success') {
    return (
      <div role="status" className={cn('paper p-8 text-navy md:p-10')}>
        <CheckCircle2 className="size-8 text-blue" aria-hidden />
        <p className="mt-4 font-serif text-3xl">Terima kasih atas pesanmu.</p>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          Pesan kamu sudah kami terima dan akan tampil setelah ditinjau oleh admin.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now()
            setState({ kind: 'idle' })
          }}
          className="mt-6 text-sm font-medium uppercase tracking-[0.2em] text-blue underline underline-offset-4"
        >
          Tulis pesan lain
        </button>
      </div>
    )
  }

  const fields = state.kind === 'error' ? state.fields : undefined

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="paper lined p-8 md:p-10">
      <p className="font-hand text-2xl text-blue">Tinggalkan jejakmu di sini</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="gb-name" className="text-[11px] font-medium uppercase tracking-[0.25em] text-navy/70">
            Nama
          </label>
          <input
            id="gb-name"
            name="name"
            required
            minLength={2}
            maxLength={60}
            autoComplete="name"
            placeholder="Nama kamu"
            aria-invalid={Boolean(fields?.name)}
            aria-describedby={fields?.name ? 'gb-name-err' : undefined}
            className={fieldBase}
          />
          {fields?.name && <p id="gb-name-err" className="mt-1 text-sm text-destructive">{fields.name}</p>}
        </div>
        <div>
          <label htmlFor="gb-status" className="text-[11px] font-medium uppercase tracking-[0.25em] text-navy/70">
            Status / Angkatan
          </label>
          <select
            id="gb-status"
            name="status"
            required
            defaultValue=""
            aria-invalid={Boolean(fields?.status)}
            aria-describedby={fields?.status ? 'gb-status-err' : undefined}
            className={cn(fieldBase, 'cursor-pointer')}
          >
            <option value="" disabled>
              Pilih status
            </option>
            {GUESTBOOK_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {fields?.status && <p id="gb-status-err" className="mt-1 text-sm text-destructive">{fields.status}</p>}
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="gb-message" className="text-[11px] font-medium uppercase tracking-[0.25em] text-navy/70">
          Pesan
        </label>
        <textarea
          id="gb-message"
          name="message"
          required
          minLength={5}
          maxLength={600}
          rows={4}
          placeholder="Tulis kesan, pesan, atau doa untuk kami..."
          aria-invalid={Boolean(fields?.message)}
          aria-describedby={fields?.message ? 'gb-message-err' : undefined}
          className={cn(fieldBase, 'resize-none leading-[32px]')}
        />
        {fields?.message && <p id="gb-message-err" className="mt-1 text-sm text-destructive">{fields.message}</p>}
      </div>

      <div className="absolute -left-[9999px]" aria-hidden>
        <label htmlFor="gb-website">Website</label>
        <input id="gb-website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {state.kind === 'error' && (
        <p role="alert" className="mt-6 border-l-2 border-destructive pl-3 text-sm text-destructive">
          {state.message}
        </p>
      )}

      <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className={cn('text-xs leading-relaxed', dark ? 'text-muted-foreground' : 'text-muted-foreground')}>
          Pesan akan ditinjau terlebih dahulu sebelum ditampilkan.
        </p>
        <button
          type="submit"
          disabled={state.kind === 'loading'}
          className="inline-flex items-center gap-3 bg-navy px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-blue disabled:opacity-60"
        >
          {state.kind === 'loading' && <Loader2 className="size-4 animate-spin" aria-hidden />}
          {state.kind === 'loading' ? 'Mengirim...' : 'Kirim Pesan'}
        </button>
      </div>
    </form>
  )
}
