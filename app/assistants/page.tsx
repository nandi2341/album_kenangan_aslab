import type { Metadata } from 'next'
import { SectionIntro } from '@/components/album/primitives'
import { AssistantDirectory } from '@/components/assistants/assistant-directory'
import { getAssistants } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Direktori Asisten',
  description: 'Kenali seluruh Asisten Laboratorium Fakultas Ilmu Komputer Universitas Kuningan periode 2026–2027.',
}

export default async function AssistantsPage() {
  const assistants = await getAssistants()
  const usingPlaceholders = assistants.some((a) => a.placeholder)

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <SectionIntro
        number={String(assistants.length).padStart(2, '0')}
        kicker="Direktori Asisten · 2026–2027"
        title={
          <>
            Wajah-wajah di balik <em className="text-blue">setiap praktikum</em>
          </>
        }
      >
        Koordinator, sekretaris, bendahara, dan para asisten dari tujuh laboratorium. Cari nama, atau saring berdasarkan
        program studi, laboratorium, dan jabatan.
        {usingPlaceholders && (
          <span className="mt-3 block font-hand text-xl text-blue">
            Data contoh ditampilkan sampai profil asli diisi melalui CMS.
          </span>
        )}
      </SectionIntro>
      <div className="mt-14">
        <AssistantDirectory assistants={assistants} />
      </div>
    </main>
  )
}
