export const SITE = {
  title: 'A Chapter to Remember',
  organization: 'Asisten Laboratorium Fakultas Ilmu Komputer',
  university: 'Universitas Kuningan',
  period: '2026–2027',
}

export const LABORATORIES = [
  'Lab Gambar',
  'Lab Fotografi',
  'Lab Multimedia',
  'Lab Pemrograman',
  'Lab RPL',
  'Lab Computer Vision',
  'Lab Sipil',
] as const

export type LaboratoryName = (typeof LABORATORIES)[number]

export const STUDY_PROGRAMS = ['DKV', 'SI', 'TI', 'TS'] as const
export type StudyProgram = (typeof STUDY_PROGRAMS)[number]

export const STUDY_PROGRAM_LABELS: Record<StudyProgram, string> = {
  DKV: 'Desain Komunikasi Visual',
  SI: 'Sistem Informasi',
  TI: 'Teknik Informatika',
  TS: 'Teknik Sipil',
}

export const PROGRAM_LAB_MAP: Record<StudyProgram, LaboratoryName[]> = {
  DKV: ['Lab Gambar', 'Lab Fotografi'],
  SI: ['Lab Multimedia', 'Lab Computer Vision', 'Lab RPL'],
  TI: ['Lab Multimedia', 'Lab Pemrograman', 'Lab RPL'],
  TS: ['Lab Sipil', 'Lab Multimedia'],
}

export const POSITIONS = ['Koordinator', 'Sekretaris', 'Bendahara', 'Asisten Laboratorium'] as const
export type Position = (typeof POSITIONS)[number]

export const GUESTBOOK_STATUSES = [
  'Praktikan',
  'Dosen',
  'Alumni',
  'Asisten Laboratorium',
  'Lainnya',
] as const
export type GuestbookStatus = (typeof GUESTBOOK_STATUSES)[number]

export const GALLERY_CATEGORIES = [
  {
    slug: 'behind-the-scenes',
    title: 'Behind the Scenes',
    description: 'Momen candid, lucu, santai, dan spontan.',
  },
  {
    slug: 'formasi-lengkap',
    title: 'Formasi Lengkap & Mini Group',
    description: 'Foto bersama formasi lengkap dan kelompok kecil.',
  },
  {
    slug: 'sudut-favorit',
    title: 'Sudut Favorit Laboratorium',
    description: 'Suasana laboratorium, peralatan, papan tulis, dan asisten yang bekerja.',
  },
]
