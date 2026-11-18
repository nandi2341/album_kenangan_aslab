import { Photo, PlaceholderBadge, SectionIntro } from '@/components/album/primitives'
import { cn } from '@/lib/utils'
import type { MemoryQuote, Story } from '@/lib/types'

const NOTE_STYLES = [
  { rotate: -3, bg: 'bg-[#fffdf6]' },
  { rotate: 2, bg: 'bg-soft-blue' },
  { rotate: -1.5, bg: 'bg-[#f3efe4]' },
  { rotate: 3, bg: 'bg-white' },
  { rotate: -2.5, bg: 'bg-soft-blue' },
  { rotate: 1.5, bg: 'bg-[#fffdf6]' },
  { rotate: -1, bg: 'bg-white' },
  { rotate: 2.5, bg: 'bg-[#f3efe4]' },
]

export function StoriesSection({ stories, memories }: { stories: Story[]; memories: MemoryQuote[] }) {
  const isPlaceholder = stories.some((s) => s.placeholder)
  return (
    <section aria-labelledby="stories-title" className="bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          number="05"
          kicker="Bab Kelima"
          title={
            <span id="stories-title">
              Our Little <em className="text-blue">Stories</em>
            </span>
          }
        >
          <p>Cerita kecil dari balik meja praktikum: yang lucu, yang melelahkan, dan yang diam-diam membuat kami tumbuh.</p>
        </SectionIntro>

        <div className="mt-16 grid gap-px border border-border bg-border md:mt-24 md:grid-cols-2">
          {stories.map((story, i) => (
            <article key={story._id} className="group relative bg-background p-8 md:p-12" data-reveal data-delay={(i % 2) * 0.1}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-blue">
                  {story.tag || 'Cerita'}
                </span>
                <span className="font-serif text-sm italic text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="mt-6 text-balance font-serif text-3xl leading-tight text-navy md:text-4xl">{story.title}</h3>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground first-letter:float-left first-letter:mr-2 first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.85] first-letter:text-navy">
                {story.body}
              </p>
            </article>
          ))}
        </div>
        {isPlaceholder && <PlaceholderBadge className="mt-4" />}

        <div className="mt-28 md:mt-40">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end" data-reveal>
            <h3 className="font-serif text-5xl leading-none text-navy md:text-6xl">
              Wall of <em className="text-blue">Memories</em>
            </h3>
            <p className="max-w-sm font-hand text-2xl leading-snug text-navy/70">
              catatan-catatan kecil yang kami tempel sebelum pamit
            </p>
          </div>

          <div className="paper mt-12 rounded-sm px-4 py-12 sm:px-10 md:py-16">
            <ul className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {memories.map((m, i) => {
                const style = NOTE_STYLES[i % NOTE_STYLES.length]
                return (
                  <li
                    key={m._id}
                    data-reveal="polaroid"
                    data-rotate={style.rotate}
                    className={cn(i % 4 === 1 && 'lg:mt-10', i % 4 === 3 && 'lg:mt-6')}
                  >
                    <figure
                      style={{ rotate: `${style.rotate}deg` }}
                      className={cn(
                        'relative flex min-h-56 flex-col justify-between p-6 shadow-[0_10px_25px_-12px_rgba(16,29,53,0.35)] transition-all duration-300 hover:-translate-y-1 hover:!rotate-0 hover:shadow-[0_18px_35px_-14px_rgba(16,29,53,0.45)]',
                        style.bg,
                      )}
                    >
                      <span
                        className="absolute -top-2.5 left-1/2 size-5 -translate-x-1/2 rounded-full bg-blue shadow-[inset_-2px_-2px_0_rgba(0,0,0,0.2)]"
                        aria-hidden
                      />
                      <blockquote className="font-hand text-2xl leading-snug text-navy">{m.quote}</blockquote>
                      <figcaption className="mt-6 flex items-center gap-3 border-t border-navy/10 pt-4">
                        {m.portraitUrl && (
                          <span className="relative size-9 shrink-0 overflow-hidden rounded-full">
                            <Photo src={m.portraitUrl} alt="" sizes="36px" />
                          </span>
                        )}
                        <span>
                          <span className="block text-sm font-medium text-navy">{m.name}</span>
                          {m.laboratory && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{m.laboratory}</span>
                          )}
                        </span>
                      </figcaption>
                    </figure>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
