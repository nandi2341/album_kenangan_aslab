'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'acr-music'

/**
 * Plays the CMS-provided track when available. Until licensed audio is uploaded,
 * a soft, original piano-like ambience is synthesized with the Web Audio API.
 */
function createAmbience() {
  const ctx = new AudioContext()
  const master = ctx.createGain()
  master.gain.value = 0
  master.connect(ctx.destination)

  const delay = ctx.createDelay()
  delay.delayTime.value = 0.45
  const feedback = ctx.createGain()
  feedback.gain.value = 0.35
  delay.connect(feedback).connect(delay)
  delay.connect(master)

  const chords = [
    [261.63, 329.63, 392.0, 493.88],
    [220.0, 261.63, 329.63, 392.0],
    [174.61, 220.0, 261.63, 329.63],
    [196.0, 246.94, 293.66, 392.0],
  ]
  let step = 0
  const playNote = (freq: number, at: number) => {
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = freq
    g.gain.setValueAtTime(0, at)
    g.gain.linearRampToValueAtTime(0.09, at + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, at + 3.2)
    osc.connect(g)
    g.connect(master)
    g.connect(delay)
    osc.start(at)
    osc.stop(at + 3.3)
  }
  const tick = () => {
    const chord = chords[Math.floor(step / 4) % chords.length]
    const t = ctx.currentTime + 0.05
    playNote(chord[step % 4], t)
    if (step % 4 === 0) playNote(chord[0] / 2, t)
    step++
  }
  const interval = window.setInterval(tick, 900)
  tick()
  master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 2)

  return {
    stop() {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.6)
      window.clearInterval(interval)
      window.setTimeout(() => ctx.close(), 700)
    },
  }
}

export function MusicToggle({ src, tone }: { src?: string; tone: 'light' | 'dark' }) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const synthRef = useRef<ReturnType<typeof createAmbience> | null>(null)

  const start = useCallback(async () => {
    try {
      if (src) {
        if (!audioRef.current) {
          audioRef.current = new Audio(src)
          audioRef.current.loop = true
          audioRef.current.volume = 0.5
        }
        await audioRef.current.play()
      } else if (!synthRef.current) {
        synthRef.current = createAmbience()
      }
      setPlaying(true)
      sessionStorage.setItem(STORAGE_KEY, 'on')
    } catch {
      setPlaying(false)
    }
  }, [src])

  const stop = useCallback(() => {
    audioRef.current?.pause()
    synthRef.current?.stop()
    synthRef.current = null
    setPlaying(false)
    sessionStorage.setItem(STORAGE_KEY, 'off')
  }, [])

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) !== 'on') return
    const resume = () => start()
    window.addEventListener('pointerdown', resume, { once: true })
    return () => window.removeEventListener('pointerdown', resume)
  }, [start])

  useEffect(() => () => stop(), [stop])

  return (
    <button
      type="button"
      onClick={() => (playing ? stop() : start())}
      aria-pressed={playing}
      className={cn(
        'inline-flex h-10 items-center gap-2 px-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors',
        tone === 'light' ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy',
      )}
    >
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden>
        {[0.6, 1, 0.75, 0.9].map((h, i) => (
          <span
            key={i}
            className={cn('w-[2px] origin-bottom bg-current', playing && 'animate-pulse')}
            style={{
              height: playing ? `${h * 100}%` : '25%',
              animationDelay: `${i * 0.15}s`,
              transition: 'height 400ms ease',
            }}
          />
        ))}
      </span>
      <span className="hidden sm:inline">{playing ? 'Musik Aktif' : 'Putar Musik'}</span>
      <span className="sr-only sm:hidden">{playing ? 'Matikan musik' : 'Putar musik latar'}</span>
    </button>
  )
}
