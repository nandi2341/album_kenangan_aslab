'use client'

import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { LABORATORIES, POSITIONS, PROGRAM_LAB_MAP, STUDY_PROGRAMS, STUDY_PROGRAM_LABELS } from '@/lib/constants'
import type { Assistant } from '@/lib/types'
import { AssistantCard } from './assistant-card'

const selectClass =
  'w-full cursor-pointer appearance-none border-0 border-b border-navy/25 bg-transparent py-2.5 pr-6 text-sm text-navy focus:border-navy focus:outline-none focus:ring-0'

export function AssistantDirectory({ assistants }: { assistants: Assistant[] }) {
  const [query, setQuery] = useState('')
  const [program, setProgram] = useState('')
  const [lab, setLab] = useState('')
  const [position, setPosition] = useState('')

  const labOptions = program ? PROGRAM_LAB_MAP[program as keyof typeof PROGRAM_LAB_MAP] : LABORATORIES

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return assistants.filter(
      (a) =>
        (!q || a.fullName.toLowerCase().includes(q) || a.nickname?.toLowerCase().includes(q)) &&
        (!program || a.studyProgram === program) &&
        (!lab || a.laboratory === lab) &&
        (!position || a.position === position),
    )
  }, [assistants, query, program, lab, position])

  const active = Boolean(query || program || lab || position)
  const reset = () => {
    setQuery('')
    setProgram('')
    setLab('')
    setPosition('')
  }

  return (
    <div>
      <div
        role="search"
        className="sticky top-16 z-30 -mx-5 border-y border-navy/10 bg-background/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8"
      >
        <div className="grid gap-4 md:grid-cols-12 md:items-end">
          <div className="relative md:col-span-3">
            <label htmlFor="dir-search" className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
              Cari nama
            </label>
            <Search className="pointer-events-none absolute bottom-3 left-0 size-4 text-navy/40" aria-hidden />
            <input
              id="dir-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nama atau panggilan..."
              className="w-full border-0 border-b border-navy/25 bg-transparent py-2.5 pl-6 text-sm text-navy placeholder:text-navy/35 focus:border-navy focus:outline-none focus:ring-0"
            />
          </div>
          <FilterSelect
            id="dir-program"
            label="Program studi"
            value={program}
            onChange={(v) => {
              setProgram(v)
              if (v && lab && !PROGRAM_LAB_MAP[v as keyof typeof PROGRAM_LAB_MAP].includes(lab as never)) setLab('')
            }}
            options={STUDY_PROGRAMS.map((p) => ({ value: p, label: `${p} — ${STUDY_PROGRAM_LABELS[p]}` }))}
          />
          <FilterSelect
            id="dir-lab"
            label="Laboratorium"
            value={lab}
            onChange={setLab}
            options={labOptions.map((l) => ({ value: l, label: l }))}
          />
          <FilterSelect
            id="dir-position"
            label="Jabatan"
            value={position}
            onChange={setPosition}
            options={POSITIONS.map((p) => ({ value: p, label: p }))}
          />
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <p aria-live="polite">
            Menampilkan <span className="font-medium text-navy">{filtered.length}</span> dari {assistants.length} asisten
          </p>
          {active && (
            <button type="button" onClick={reset} className="inline-flex items-center gap-1 font-medium text-blue hover:underline">
              <X className="size-3.5" aria-hidden />
              Hapus filter
            </button>
          )}
        </div>
      </div>

      {filtered.length ? (
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-8">
          {filtered.map((a, i) => (
            <li key={a._id}>
              <AssistantCard assistant={a} index={i} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="paper mt-12 p-12 text-center">
          <p className="font-serif text-2xl italic text-navy">Tidak ada asisten yang cocok.</p>
          <button type="button" onClick={reset} className="mt-4 text-sm font-medium uppercase tracking-[0.2em] text-blue underline underline-offset-4">
            Tampilkan semua
          </button>
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <div className="relative md:col-span-3">
      <label htmlFor={id} className="text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectClass}>
        <option value="">Semua</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute bottom-3 right-0 text-xs text-navy/40" aria-hidden>
        {'\u25BE'}
      </span>
    </div>
  )
}
