import type { GuestbookStatus, LaboratoryName, Position, StudyProgram } from './constants'

export type Assistant = {
  _id: string
  fullName: string
  nickname?: string
  slug: string
  portraitUrl?: string
  studyProgram: StudyProgram
  laboratory: LaboratoryName
  position: Position
  servicePeriod?: string
  personalQuote?: string
  messageAndExperience?: string
  funFacts?: string[]
  displayOrder?: number
  placeholder?: boolean
}

export type Laboratory = {
  _id: string
  name: LaboratoryName
  description?: string
  imageUrl?: string
  placeholder?: boolean
}

export type LabLeader = {
  _id: string
  fullName: string
  role: 'Kepala Laboratorium' | 'Laboran'
  laboratory?: LaboratoryName
  portraitUrl?: string
  quote?: string
  placeholder?: boolean
}

export type GalleryPhoto = {
  _id: string
  imageUrl?: string
  caption?: string
  categorySlug: string
  categoryTitle?: string
  date?: string
  location?: string
  placeholder?: boolean
}

export type MemoryQuote = {
  _id: string
  name: string
  quote: string
  portraitUrl?: string
  laboratory?: LaboratoryName
  placeholder?: boolean
}

export type Story = {
  _id: string
  title: string
  body: string
  tag?: string
  placeholder?: boolean
}

export type Letter = {
  heading?: string
  body: string
  signatureName?: string
  signatureRole?: string
  placeholder?: boolean
}

export type SiteSettings = {
  logoUrl?: string
  heroImageUrl?: string
  labIntro?: string
  peopleIntro?: string
  groupPhotoAssistantsUrl?: string
  groupPhotoLeadersUrl?: string
  musicUrl?: string
  pdfAlbumUrl?: string
  finalLetter?: string
}

export type GuestbookEntry = {
  _id: string
  name: string
  status: GuestbookStatus
  message: string
  submittedAt: string
}
