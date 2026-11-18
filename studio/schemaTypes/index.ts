import { defineArrayMember, defineField, defineType } from 'sanity'

const LABORATORIES = [
  'Lab Gambar',
  'Lab Fotografi',
  'Lab Multimedia',
  'Lab Pemrograman',
  'Lab RPL',
  'Lab Computer Vision',
  'Lab Sipil',
]

const PROGRAM_LAB_MAP: Record<string, string[]> = {
  DKV: ['Lab Gambar', 'Lab Fotografi'],
  SI: ['Lab Multimedia', 'Lab Computer Vision', 'Lab RPL'],
  TI: ['Lab Multimedia', 'Lab Pemrograman', 'Lab RPL'],
  TS: ['Lab Sipil', 'Lab Multimedia'],
}

const labOptions = LABORATORIES.map((l) => ({ title: l, value: l }))

const displayOrder = defineField({
  name: 'displayOrder',
  title: 'Urutan Tampil',
  type: 'number',
  description: 'Angka kecil tampil lebih dulu.',
  initialValue: 100,
})

const imageField = (name: string, title: string, required = false) =>
  defineField({
    name,
    title,
    type: 'image',
    options: { hotspot: true },
    validation: required ? (r) => r.required() : undefined,
  })

export const assistant = defineType({
  name: 'assistant',
  title: 'Asisten',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Nama Lengkap', type: 'string', validation: (r) => r.required().min(3).max(80) }),
    defineField({ name: 'nickname', title: 'Nama Panggilan', type: 'string', validation: (r) => r.max(30) }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'fullName', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    imageField('portrait', 'Foto Potret'),
    defineField({
      name: 'studyProgram',
      title: 'Program Studi',
      type: 'string',
      options: { list: Object.keys(PROGRAM_LAB_MAP), layout: 'radio', direction: 'horizontal' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'laboratory',
      title: 'Laboratorium',
      type: 'string',
      description:
        'Harus sesuai program studi. DKV: Gambar/Fotografi · SI: Multimedia/Computer Vision/RPL · TI: Multimedia/Pemrograman/RPL · TS: Sipil/Multimedia.',
      options: { list: labOptions },
      validation: (r) =>
        r.required().custom((lab, ctx) => {
          const program = (ctx.document as { studyProgram?: string } | undefined)?.studyProgram
          if (!program || !lab) return true
          const allowed = PROGRAM_LAB_MAP[program] ?? []
          return allowed.includes(lab as string) || `${program} hanya boleh memilih: ${allowed.join(', ')}.`
        }),
    }),
    defineField({
      name: 'position',
      title: 'Jabatan',
      type: 'string',
      options: { list: ['Koordinator', 'Sekretaris', 'Bendahara', 'Asisten Laboratorium'] },
      initialValue: 'Asisten Laboratorium',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'servicePeriod', title: 'Periode Jabatan', type: 'string', initialValue: '2026–2027', validation: (r) => r.required() }),
    defineField({ name: 'personalQuote', title: 'Kutipan Pribadi', type: 'text', rows: 2, validation: (r) => r.max(220) }),
    defineField({ name: 'messageAndExperience', title: 'Pesan & Pengalaman', type: 'text', rows: 8, validation: (r) => r.max(2000) }),
    defineField({
      name: 'funFacts',
      title: 'Fakta Seru',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Isi 2–3 fakta singkat.',
      validation: (r) => r.max(3),
    }),
    displayOrder,
  ],
  orderings: [{ title: 'Urutan Tampil', name: 'order', by: [{ field: 'displayOrder', direction: 'asc' }] }],
  preview: { select: { title: 'fullName', subtitle: 'laboratory', description: 'position', media: 'portrait' } },
})

export const laboratory = defineType({
  name: 'laboratory',
  title: 'Laboratorium',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama Laboratorium', type: 'string', options: { list: labOptions }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Deskripsi', type: 'text', rows: 4 }),
    imageField('image', 'Foto Laboratorium'),
    displayOrder,
  ],
  preview: { select: { title: 'name', media: 'image' } },
})

export const laboratoryHead = defineType({
  name: 'laboratoryHead',
  title: 'Kepala Laboratorium',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Nama Lengkap', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'laboratory', title: 'Laboratorium', type: 'string', options: { list: labOptions }, validation: (r) => r.required() }),
    imageField('portrait', 'Foto Potret'),
    defineField({ name: 'quote', title: 'Kutipan / Pesan Singkat', type: 'text', rows: 3 }),
    displayOrder,
  ],
  preview: { select: { title: 'fullName', subtitle: 'laboratory', media: 'portrait' } },
})

export const laboratoryStaff = defineType({
  name: 'laboratoryStaff',
  title: 'Laboran',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Nama Lengkap', type: 'string', validation: (r) => r.required() }),
    imageField('portrait', 'Foto Potret'),
    defineField({ name: 'quote', title: 'Kutipan / Pesan Singkat', type: 'text', rows: 3 }),
    displayOrder,
  ],
  preview: { select: { title: 'fullName', media: 'portrait' } },
})

export const galleryCategory = defineType({
  name: 'galleryCategory',
  title: 'Kategori Galeri',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'description', title: 'Deskripsi', type: 'text', rows: 2 }),
    displayOrder,
  ],
})

export const galleryPhoto = defineType({
  name: 'galleryPhoto',
  title: 'Foto Galeri',
  type: 'document',
  fields: [
    imageField('image', 'Foto', true),
    defineField({ name: 'caption', title: 'Keterangan', type: 'string', description: 'Juga dipakai sebagai teks alternatif.', validation: (r) => r.required().max(140) }),
    defineField({ name: 'category', title: 'Kategori', type: 'reference', to: [{ type: 'galleryCategory' }], validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Tanggal', type: 'date' }),
    defineField({ name: 'location', title: 'Lokasi', type: 'string' }),
  ],
  preview: { select: { title: 'caption', subtitle: 'category.title', media: 'image' } },
})

export const memoryQuote = defineType({
  name: 'memoryQuote',
  title: 'Kutipan Dinding Kenangan',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nama', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'quote', title: 'Kutipan', type: 'text', rows: 3, validation: (r) => r.required().max(240) }),
    imageField('portrait', 'Foto (opsional)'),
    defineField({ name: 'laboratory', title: 'Laboratorium', type: 'string', options: { list: labOptions } }),
    displayOrder,
  ],
  preview: { select: { title: 'name', subtitle: 'quote', media: 'portrait' } },
})

export const story = defineType({
  name: 'story',
  title: 'Cerita di Balik Layar',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'tag', title: 'Label', type: 'string', description: 'Mis. "Lembur", "Praktikum", "Kocak".' }),
    defineField({ name: 'body', title: 'Isi Cerita', type: 'text', rows: 6, validation: (r) => r.required() }),
    displayOrder,
  ],
})

const letterFields = [
  defineField({ name: 'heading', title: 'Judul', type: 'string' }),
  defineField({ name: 'body', title: 'Isi Surat', type: 'text', rows: 10, description: 'Pisahkan paragraf dengan baris kosong.', validation: (r) => r.required() }),
  defineField({ name: 'signatureName', title: 'Nama Penanda Tangan', type: 'string' }),
  defineField({ name: 'signatureRole', title: 'Jabatan Penanda Tangan', type: 'string' }),
]

export const coordinatorMessage = defineType({ name: 'coordinatorMessage', title: 'Sambutan Koordinator', type: 'document', fields: letterFields })
export const closingMessage = defineType({ name: 'closingMessage', title: 'Pesan Penutup', type: 'document', fields: letterFields })

export const guestbookEntry = defineType({
  name: 'guestbookEntry',
  title: 'Buku Tamu',
  type: 'document',
  fields: [
    defineField({
      name: 'moderationStatus',
      title: 'Status Moderasi',
      type: 'string',
      description: 'Hanya pesan "approved" yang tampil di website.',
      options: {
        list: [
          { title: 'Menunggu (pending)', value: 'pending' },
          { title: 'Disetujui (approved)', value: 'approved' },
          { title: 'Ditolak (rejected)', value: 'rejected' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'pending',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'name', title: 'Nama', type: 'string', readOnly: true }),
    defineField({ name: 'status', title: 'Status Pengirim', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Pesan', type: 'text', rows: 5, readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Dikirim', type: 'datetime', readOnly: true }),
  ],
  orderings: [{ title: 'Terbaru', name: 'newest', by: [{ field: 'submittedAt', direction: 'desc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'message', mod: 'moderationStatus' },
    prepare: ({ title, subtitle, mod }) => ({ title: `[${mod}] ${title}`, subtitle }),
  },
})

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Pengaturan Situs',
  type: 'document',
  fields: [
    imageField('logo', 'Logo Asisten Laboratorium'),
    imageField('heroImage', 'Foto Hero'),
    defineField({ name: 'labIntro', title: 'Pengantar Laboratorium', type: 'text', rows: 3 }),
    defineField({ name: 'peopleIntro', title: 'Pengantar Orang-orang', type: 'text', rows: 3 }),
    imageField('groupPhotoAssistants', 'Foto Bersama Asisten'),
    imageField('groupPhotoLeaders', 'Foto Bersama Kepala Lab & Laboran'),
    defineField({ name: 'backgroundMusic', title: 'Musik Latar (MP3)', type: 'file', options: { accept: 'audio/mpeg' } }),
    defineField({ name: 'finalLetter', title: 'Surat Terakhir (Amplop)', type: 'text', rows: 6 }),
  ],
})

export const pdfAlbum = defineType({
  name: 'pdfAlbum',
  title: 'Album PDF',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Judul', type: 'string', initialValue: 'Album Versi Cetak' }),
    defineField({ name: 'file', title: 'Berkas PDF', type: 'file', options: { accept: 'application/pdf' } }),
  ],
})

export const SINGLETONS = ['siteSettings', 'coordinatorMessage', 'closingMessage', 'pdfAlbum']

export const schemaTypes = [
  assistant,
  laboratory,
  laboratoryHead,
  laboratoryStaff,
  galleryCategory,
  galleryPhoto,
  memoryQuote,
  story,
  coordinatorMessage,
  closingMessage,
  guestbookEntry,
  siteSettings,
  pdfAlbum,
]
