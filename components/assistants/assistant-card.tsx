import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Photo } from '@/components/album/primitives'
import type { Assistant } from '@/lib/types'

const TILTS = ['-rotate-1', 'rotate-1', 'rotate-0', '-rotate-[0.5deg]', 'rotate-[0.75deg]']

export function AssistantCard({ assistant, index }: { assistant: Assistant; index: number }) {
  const highlighted = assistant.position !== 'Asisten Laboratorium'
  return (
    <Link
      href={`/assistants/${assistant.slug}`}
      className="group block focus-visible:outline-none"
      aria-label={`Lihat profil ${assistant.fullName}`}
    >
      <article className={`polaroid !p-3 !pb-5 transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:rotate-0 group-focus-visible:ring-2 group-focus-visible:ring-blue ${TILTS[index % TILTS.length]}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-soft-blue">
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Photo
              src={assistant.portraitUrl}
              alt={`Potret ${assistant.fullName}`}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              portrait
            />
          </div>
          {highlighted && (
            <span className="absolute left-2 top-2 bg-navy px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              {assistant.position}
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-serif text-xl leading-tight text-navy">{assistant.fullName}</h3>
            {assistant.nickname && <p className="font-hand text-xl leading-tight text-blue">{assistant.nickname}</p>}
          </div>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-navy/40 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy"
            aria-hidden
          />
        </div>
        <dl className="mt-3 flex flex-wrap gap-x-3 gap-y-1 border-t border-navy/10 pt-3 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
          <div>
            <dt className="sr-only">Program studi</dt>
            <dd>{assistant.studyProgram}</dd>
          </div>
          <span aria-hidden>·</span>
          <div>
            <dt className="sr-only">Laboratorium</dt>
            <dd>{assistant.laboratory}</dd>
          </div>
          {!highlighted && (
            <>
              <span aria-hidden>·</span>
              <div>
                <dt className="sr-only">Jabatan</dt>
                <dd>Asisten</dd>
              </div>
            </>
          )}
        </dl>
      </article>
    </Link>
  )
}
