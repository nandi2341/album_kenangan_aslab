import { defineConfig } from 'sanity'
import { structureTool, type StructureBuilder } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { SINGLETONS, schemaTypes } from './schemaTypes'

const singleton = (S: StructureBuilder, type: string, title: string) =>
  S.listItem().title(title).id(type).child(S.document().schemaType(type).documentId(type))

export default defineConfig({
  name: 'album-aslab-fkom',
  title: 'Album Asisten Lab FKOM',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Konten')
          .items([
            S.listItem()
              .title('Orang-orang')
              .child(
                S.list()
                  .title('Orang-orang')
                  .items([
                    S.documentTypeListItem('assistant').title('Asisten'),
                    S.documentTypeListItem('laboratoryHead').title('Kepala Laboratorium'),
                    S.documentTypeListItem('laboratoryStaff').title('Laboran'),
                  ]),
              ),
            S.documentTypeListItem('laboratory').title('Laboratorium'),
            S.divider(),
            S.documentTypeListItem('galleryPhoto').title('Foto Galeri'),
            S.documentTypeListItem('galleryCategory').title('Kategori Galeri'),
            S.documentTypeListItem('memoryQuote').title('Dinding Kenangan'),
            S.documentTypeListItem('story').title('Cerita di Balik Layar'),
            S.divider(),
            singleton(S, 'coordinatorMessage', 'Sambutan Koordinator'),
            singleton(S, 'closingMessage', 'Pesan Penutup'),
            S.divider(),
            S.listItem()
              .title('Buku Tamu — Menunggu')
              .child(S.documentList().title('Menunggu moderasi').filter('_type == "guestbookEntry" && moderationStatus == "pending"')),
            S.documentTypeListItem('guestbookEntry').title('Buku Tamu — Semua'),
            S.divider(),
            singleton(S, 'siteSettings', 'Pengaturan Situs'),
            singleton(S, 'pdfAlbum', 'Album PDF'),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter(({ schemaType }) => !SINGLETONS.includes(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      SINGLETONS.includes(schemaType)
        ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : actions,
  },
})
