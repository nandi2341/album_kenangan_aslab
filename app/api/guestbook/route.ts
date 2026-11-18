import { NextResponse, type NextRequest } from 'next/server'
import { writeClient } from '@/lib/sanity/client'
import { GUESTBOOK_STATUSES, type GuestbookStatus } from '@/lib/constants'

const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 3
const MIN_FILL_MS = 3000
// Best-effort per-instance limiter; pair with Vercel Firewall rate limiting in production.
const hits = new Map<string, number[]>()

function rateLimited(ip: string) {
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent)
    return true
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return false
}

function sanitize(value: unknown, max: number) {
  if (typeof value !== 'string') return ''
  return value
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200F\u2028-\u202E]/g, '')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, max)
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Permintaan tidak valid.' }, { status: 400 })
  }

  // Honeypot and time-trap: silently accept so bots get no signal.
  const startedAt = Number(body.startedAt)
  if (body.website || !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: 'Terlalu banyak pesan dalam waktu singkat. Silakan coba lagi beberapa menit lagi.' },
      { status: 429 },
    )
  }

  const name = sanitize(body.name, 60)
  const message = sanitize(body.message, 600)
  const status = body.status as GuestbookStatus

  const errors: Record<string, string> = {}
  if (name.length < 2) errors.name = 'Nama minimal 2 karakter.'
  if (!GUESTBOOK_STATUSES.includes(status)) errors.status = 'Pilih status yang tersedia.'
  if (message.length < 5) errors.message = 'Pesan minimal 5 karakter.'
  if ((message.match(/https?:\/\//g) ?? []).length > 1) errors.message = 'Pesan tidak boleh berisi banyak tautan.'
  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Periksa kembali isian kamu.', fields: errors }, { status: 422 })
  }

  if (!writeClient) {
    return NextResponse.json(
      { error: 'Buku tamu belum terhubung ke CMS. Silakan coba lagi nanti.' },
      { status: 503 },
    )
  }

  try {
    await writeClient.create({
      _type: 'guestbookEntry',
      name,
      status,
      message,
      submittedAt: new Date().toISOString(),
      moderationStatus: 'pending',
    })
    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('[guestbook] create failed:', (error as Error).message)
    return NextResponse.json({ error: 'Pesan gagal dikirim. Silakan coba lagi.' }, { status: 500 })
  }
}
