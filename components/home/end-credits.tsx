import { POSITIONS } from '@/lib/constants'
import type { Assistant } from '@/lib/types'

export function EndCredits({ assistants }: { assistants: Assistant[] }) {
  const leads = POSITIONS.filter((p) => p !== 'Asisten Laboratorium')
    .map((role) => ({ role, people: assistants.filter((a) => a.position === role) }))
    .filter((g) => g.people.length)
  const crew = assistants.filter((a) => a.position === 'Asisten Laboratorium')

  return (
    <div className="mx-auto mt-28 max-w-2xl text-center" aria-label="Kredit penutup">
      <p className="text-[11px] uppercase tracking-[0.4em] text-soft-blue/70" data-reveal>
        Dipersembahkan oleh
      </p>
      <p className="mt-4 font-serif text-4xl italic md:text-5xl" data-reveal>
        Asisten Laboratorium FKOM
      </p>

      <dl className="mt-16 space-y-10">
        {leads.map((g) => (
          <div key={g.role} data-reveal>
            <dt className="text-[11px] uppercase tracking-[0.35em] text-white/45">{g.role}</dt>
            {g.people.map((p) => (
              <dd key={p._id} className="mt-2 font-serif text-2xl">
                {p.fullName}
              </dd>
            ))}
          </div>
        ))}
        <div data-reveal>
          <dt className="text-[11px] uppercase tracking-[0.35em] text-white/45">Asisten Laboratorium</dt>
          <dd className="mt-4 grid grid-cols-1 gap-x-10 gap-y-2 font-serif text-xl text-white/85 sm:grid-cols-2">
            {crew.map((p) => (
              <span key={p._id}>{p.fullName}</span>
            ))}
          </dd>
        </div>
      </dl>

      <p className="mt-24 font-hand text-4xl text-soft-blue" data-reveal>
        Terima kasih, dan sampai jumpa lagi.
      </p>
      <p className="mt-4 text-[11px] uppercase tracking-[0.4em] text-white/40" data-reveal>
        Fin · 2026–2027
      </p>
    </div>
  )
}
