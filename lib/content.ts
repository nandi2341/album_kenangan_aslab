import 'server-only'
import { GALLERY_CATEGORIES } from './constants'
import {
  placeholderAssistants,
  placeholderClosingMessage,
  placeholderCoordinatorLetter,
  placeholderGallery,
  placeholderLaboratories,
  placeholderLeaders,
  placeholderMemories,
  placeholderStories,
} from './placeholders'
import { sanityFetch } from './sanity/client'
import * as q from './sanity/queries'
import type {
  Assistant,
  GalleryPhoto,
  GuestbookEntry,
  LabLeader,
  Laboratory,
  Letter,
  MemoryQuote,
  SiteSettings,
  Story,
} from './types'

function orPlaceholder<T>(items: T[] | null, fallback: T[]): T[] {
  return items && items.length > 0 ? items : fallback
}

export async function getAssistants(): Promise<Assistant[]> {
  return orPlaceholder(await sanityFetch<Assistant[]>(q.assistantsQuery), placeholderAssistants)
}

export async function getAssistant(slug: string): Promise<Assistant | null> {
  const fromCms = await sanityFetch<Assistant | null>(q.assistantBySlugQuery, { slug })
  if (fromCms) return fromCms
  const all = await getAssistants()
  return all.find((a) => a.slug === slug) ?? null
}

export async function getLaboratories(): Promise<Laboratory[]> {
  return orPlaceholder(await sanityFetch<Laboratory[]>(q.laboratoriesQuery), placeholderLaboratories)
}

export async function getLeaders(): Promise<{ heads: LabLeader[]; staff: LabLeader[] }> {
  const data = await sanityFetch<{ heads: LabLeader[]; staff: LabLeader[] }>(q.leadersQuery)
  return {
    heads: orPlaceholder(data?.heads ?? null, placeholderLeaders.heads),
    staff: orPlaceholder(data?.staff ?? null, placeholderLeaders.staff),
  }
}

export async function getGallery(): Promise<GalleryPhoto[]> {
  return orPlaceholder(await sanityFetch<GalleryPhoto[]>(q.galleryQuery), placeholderGallery)
}

export async function getGalleryCategories() {
  return orPlaceholder(
    await sanityFetch<typeof GALLERY_CATEGORIES>(q.galleryCategoriesQuery),
    GALLERY_CATEGORIES,
  )
}

export async function getMemories(): Promise<MemoryQuote[]> {
  return orPlaceholder(await sanityFetch<MemoryQuote[]>(q.memoriesQuery), placeholderMemories)
}

export async function getStories(): Promise<Story[]> {
  return orPlaceholder(await sanityFetch<Story[]>(q.storiesQuery), placeholderStories)
}

export async function getCoordinatorLetter(): Promise<Letter> {
  return (await sanityFetch<Letter>(q.coordinatorLetterQuery)) ?? placeholderCoordinatorLetter
}

export async function getClosingMessage(): Promise<Letter> {
  return (await sanityFetch<Letter>(q.closingMessageQuery)) ?? placeholderClosingMessage
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<{ settings: SiteSettings | null; pdfAlbumUrl?: string }>(
    q.siteSettingsQuery,
  )
  return { ...(data?.settings ?? {}), pdfAlbumUrl: data?.pdfAlbumUrl ?? undefined }
}

export async function getApprovedGuestbook(): Promise<GuestbookEntry[]> {
  return (await sanityFetch<GuestbookEntry[]>(q.approvedGuestbookQuery)) ?? []
}
