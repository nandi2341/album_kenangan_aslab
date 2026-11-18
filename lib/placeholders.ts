import { LABORATORIES, type LaboratoryName, type Position, type StudyProgram } from './constants'
import type {
  Assistant,
  GalleryPhoto,
  LabLeader,
  Laboratory,
  Letter,
  MemoryQuote,
  Story,
} from './types'

const LAB_IMAGES: Partial<Record<LaboratoryName, string>> = {
  'Lab Gambar': '/images/lab-studio.png',
  'Lab Fotografi': '/images/lab-studio.png',
  'Lab Pemrograman': '/images/lab-workstation.png',
  'Lab RPL': '/images/lab-whiteboard.png',
  'Lab Multimedia': '/images/hero-lab.png',
  'Lab Computer Vision': '/images/lab-workstation.png',
  'Lab Sipil': '/images/lab-whiteboard.png',
}

export const placeholderLaboratories: Laboratory[] = LABORATORIES.map((name, i) => ({
  _id: `ph-lab-${i}`,
  name,
  description:
    '[Deskripsi laboratorium belum diisi. Administrator dapat menuliskan suasana, fungsi, dan cerita singkat laboratorium ini melalui Sanity Studio.]',
  imageUrl: LAB_IMAGES[name],
  placeholder: true,
}))

const combos: Array<[StudyProgram, LaboratoryName, Position]> = [
  ['TI', 'Lab Pemrograman', 'Koordinator'],
  ['SI', 'Lab RPL', 'Sekretaris'],
  ['SI', 'Lab Multimedia', 'Bendahara'],
  ['DKV', 'Lab Gambar', 'Asisten Laboratorium'],
  ['DKV', 'Lab Fotografi', 'Asisten Laboratorium'],
  ['DKV', 'Lab Gambar', 'Asisten Laboratorium'],
  ['DKV', 'Lab Fotografi', 'Asisten Laboratorium'],
  ['TI', 'Lab Multimedia', 'Asisten Laboratorium'],
  ['TI', 'Lab Pemrograman', 'Asisten Laboratorium'],
  ['TI', 'Lab RPL', 'Asisten Laboratorium'],
  ['TI', 'Lab Pemrograman', 'Asisten Laboratorium'],
  ['SI', 'Lab Computer Vision', 'Asisten Laboratorium'],
  ['SI', 'Lab Computer Vision', 'Asisten Laboratorium'],
  ['SI', 'Lab RPL', 'Asisten Laboratorium'],
  ['SI', 'Lab Multimedia', 'Asisten Laboratorium'],
  ['TS', 'Lab Sipil', 'Asisten Laboratorium'],
  ['TS', 'Lab Sipil', 'Asisten Laboratorium'],
  ['TS', 'Lab Multimedia', 'Asisten Laboratorium'],
  ['TI', 'Lab Multimedia', 'Asisten Laboratorium'],
  ['TI', 'Lab RPL', 'Asisten Laboratorium'],
  ['TS', 'Lab Sipil', 'Asisten Laboratorium'],
]

export const placeholderAssistants: Assistant[] = combos.map(([studyProgram, laboratory, position], i) => {
  const n = String(i + 1).padStart(2, '0')
  return {
    _id: `ph-asst-${n}`,
    fullName: `Nama Asisten ${n}`,
    nickname: `Panggilan ${n}`,
    slug: `asisten-${n}`,
    studyProgram,
    laboratory,
    position,
    servicePeriod: '2026–2027',
    personalQuote: '[Kutipan pribadi akan ditampilkan di sini setelah diisi melalui CMS.]',
    messageAndExperience:
      '[Pesan dan pengalaman selama menjadi asisten laboratorium akan ditampilkan di sini. Konten ini diisi oleh administrator melalui Sanity Studio.]',
    funFacts: ['[Fun fact pertama]', '[Fun fact kedua]', '[Fun fact ketiga]'],
    displayOrder: i + 1,
    placeholder: true,
  }
})

export const placeholderLeaders: { heads: LabLeader[]; staff: LabLeader[] } = {
  heads: [
    {
      _id: 'ph-head-1',
      fullName: '[Nama Kepala Laboratorium]',
      role: 'Kepala Laboratorium',
      laboratory: 'Lab Pemrograman',
      quote: '[Pesan sambutan dari Kepala Laboratorium akan ditampilkan di sini.]',
      placeholder: true,
    },
    {
      _id: 'ph-head-2',
      fullName: '[Nama Kepala Laboratorium]',
      role: 'Kepala Laboratorium',
      laboratory: 'Lab Gambar',
      quote: '[Pesan sambutan dari Kepala Laboratorium akan ditampilkan di sini.]',
      placeholder: true,
    },
  ],
  staff: [1, 2, 3].map((i) => ({
    _id: `ph-staff-${i}`,
    fullName: '[Nama Laboran]',
    role: 'Laboran' as const,
    quote: '[Pesan singkat dari Laboran.]',
    placeholder: true,
  })),
}

const galleryImages = [
  '/images/lab-workstation.png',
  '/images/hero-lab.png',
  '/images/lab-whiteboard.png',
  '/images/lab-studio.png',
]
const categorySlugs = ['behind-the-scenes', 'formasi-lengkap', 'sudut-favorit']

export const placeholderGallery: GalleryPhoto[] = Array.from({ length: 12 }, (_, i) => ({
  _id: `ph-photo-${i}`,
  imageUrl: i % 3 === 1 ? undefined : galleryImages[i % galleryImages.length],
  caption: '[Keterangan foto]',
  categorySlug: categorySlugs[i % categorySlugs.length],
  placeholder: true,
}))

export const placeholderMemories: MemoryQuote[] = Array.from({ length: 8 }, (_, i) => ({
  _id: `ph-memory-${i}`,
  name: `[Nama Asisten]`,
  quote: '[Satu kenangan singkat atau kutipan dari asisten akan ditempel di sini.]',
  laboratory: LABORATORIES[i % LABORATORIES.length],
  placeholder: true,
}))

export const placeholderStories: Story[] = [
  { tag: 'Cerita Lucu', title: '[Judul cerita lucu]' },
  { tag: 'Keseharian', title: '[Judul cerita keseharian di lab]' },
  { tag: 'Tantangan', title: '[Judul cerita tentang tantangan]' },
  { tag: 'Kemenangan Kecil', title: '[Judul cerita kemenangan kecil]' },
].map((s, i) => ({
  _id: `ph-story-${i}`,
  ...s,
  body: '[Cerita singkat dari balik layar laboratorium akan ditulis di sini oleh administrator melalui Sanity Studio.]',
  placeholder: true,
}))

export const placeholderCoordinatorLetter: Letter = {
  heading: 'Surat dari Koordinator',
  body: '[Pesan sambutan dari Koordinator Asisten Laboratorium akan ditampilkan di sini.\n\nTuliskan sambutan yang hangat dan personal untuk seluruh pembaca album ini melalui Sanity Studio.]',
  signatureName: '[Nama Koordinator]',
  signatureRole: 'Koordinator Asisten Laboratorium',
  placeholder: true,
}

export const placeholderClosingMessage: Letter = {
  heading: 'Sampai Jumpa Lagi',
  body: '[Pesan penutup tentang kebersamaan, pembelajaran, persahabatan, kenangan, rasa syukur, dan awal yang baru akan ditampilkan di sini. Pesan ini dapat diubah melalui Sanity Studio.]',
  placeholder: true,
}

export const placeholderFinalLetter =
  '[Pesan kenangan terakhir akan muncul di dalam amplop ini. Administrator dapat menuliskannya melalui Sanity Studio pada Site Settings.]'
