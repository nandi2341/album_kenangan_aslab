import { Photo, PlaceholderBadge, SectionIntro } from '@/components/album/primitives'
import { cn } from '@/lib/utils'
import type { Laboratory } from '@/lib/types'

export function LaboratorySection({ labs, intro }: { labs: Laboratory[]; intro?: string }) {
  const [feature, ...rest] = labs
  return (
    <section id="laboratorium" aria-labelledby="lab-title" className="scroll-mt-16 bg-background py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionIntro
          number="02"
          kicker="Bab Kedua"
          title={
            <span id="lab-title">
              A Place Called <em className="text-blue">Laboratory</em>
            </span>
          }
        >
          <p>
            {intro ||
              '[Pengantar singkat tentang Asisten Laboratorium FKOM, peran organisasi, dan suasana laboratorium akan ditampilkan di sini. Teks ini dapat diubah melalui Site Settings di Sanity Studio.]'}
          </p>
        </SectionIntro>

        {feature && (
          <article className="mt-20 grid items-end gap-8 md:mt-28 md:grid-cols-12">
            <div className="relative aspect-[4/3] overflow-hidden md:col-span-8 md:aspect-[16/10]" data-reveal="image">
              <div className="absolute inset-[-8%]" data-parallax="0.12">
                <Photo src={feature.imageUrl} alt={`Suasana ${feature.name}`} sizes="(min-width: 768px) 66vw, 100vw" />
              </div>
            </div>
            <div className="md:col-span-4 md:pb-6" data-reveal>
              <LabLabel index={1} name={feature.name} />
              <p className="mt-5 text-pretty leading-relaxed text-muted-foreground">{feature.description}</p>
              {feature.placeholder && <PlaceholderBadge className="mt-4" />}
            </div>
          </article>
        )}

        <div className="mt-20 grid gap-x-10 gap-y-16 md:mt-28 md:grid-cols-2">
          {rest.map((lab, i) => (
            <article
              key={lab._id}
              className={cn('flex flex-col gap-6', i % 2 === 1 && 'md:mt-24')}
              data-reveal
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-muted" data-reveal="image">
                <Photo src={lab.imageUrl} alt={`Suasana ${lab.name}`} sizes="(min-width: 768px) 45vw, 100vw" />
              </div>
              <div className="flex gap-6">
                <LabLabel index={i + 2} name={lab.name} />
              </div>
              <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">{lab.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function LabLabel({ index, name }: { index: number; name: string }) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="text-xs font-medium tracking-[0.2em] text-blue">{String(index).padStart(2, '0')}</span>
      <h3 className="font-serif text-4xl leading-none text-navy md:text-5xl">{name}</h3>
    </div>
  )
}
