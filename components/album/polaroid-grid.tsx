import { Photo } from './primitives'
import type { GalleryPhoto } from '@/lib/types'

const ROTATIONS = [-2.5, 1.8, -1.2, 2.6, -1.8, 1.2, -2.2, 2]
const ASPECTS = ['aspect-[4/5]', 'aspect-square', 'aspect-[3/4]', 'aspect-[4/3]', 'aspect-[4/5]', 'aspect-[5/4]']

export function PolaroidGrid({ photos, sizes }: { photos: GalleryPhoto[]; sizes?: string }) {
  return (
    <ul className="columns-2 gap-4 sm:gap-8 md:columns-3 lg:columns-4 [&>li]:mb-8 sm:[&>li]:mb-12">
      {photos.map((photo, i) => {
        const rotate = ROTATIONS[i % ROTATIONS.length]
        const meta = [photo.date && new Date(photo.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }), photo.location]
          .filter(Boolean)
          .join(' · ')
        return (
          <li key={photo._id} className="break-inside-avoid">
            <figure
              data-reveal="polaroid"
              data-rotate={rotate}
              style={{ rotate: `${rotate}deg` }}
              className="polaroid relative !p-2 !pb-10 transition-transform duration-500 hover:z-10 hover:!rotate-0 hover:scale-[1.03] sm:!p-3 sm:!pb-12"
            >
              {i % 3 === 0 && <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-3" aria-hidden />}
              <div className={`relative overflow-hidden bg-muted ${ASPECTS[i % ASPECTS.length]}`}>
                <Photo
                  src={photo.imageUrl}
                  alt={photo.caption && !photo.placeholder ? photo.caption : 'Foto kenangan asisten laboratorium'}
                  sizes={sizes || '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw'}
                />
              </div>
              <figcaption className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3">
                <span className="line-clamp-1 font-hand text-lg leading-tight text-navy/85 sm:text-xl">
                  {photo.caption}
                </span>
                {meta && <span className="sr-only">{meta}</span>}
              </figcaption>
            </figure>
          </li>
        )
      })}
    </ul>
  )
}
