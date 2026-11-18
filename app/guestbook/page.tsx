import type { Metadata } from 'next'
import { SectionIntro } from '@/components/album/primitives'
import { GuestbookForm } from '@/components/guestbook/guestbook-form'
import { GuestbookList } from '@/components/guestbook/guestbook-list'
import { getApprovedGuestbook } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Buku Tamu',
  description: 'Tinggalkan pesan dan kesan untuk Asisten Laboratorium FKOM Universitas Kuningan.',
}

export default async function GuestbookPage() {
  const entries = await getApprovedGuestbook()

  return (
    <main className="mx-auto max-w-7xl px-5 pb-28 pt-32 md:px-8 md:pt-40">
      <SectionIntro
        number={String(entries.length).padStart(2, '0')}
        kicker="Buku Tamu"
        title={
          <>
            Kata-kata yang <em className="text-blue">ditinggalkan</em>
          </>
        }
      >
        Setiap pesan dibaca dan ditinjau oleh admin sebelum ditampilkan di halaman ini.
      </SectionIntro>

      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <div className="lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
          <GuestbookForm />
        </div>
        <div className="lg:col-span-7">
          <GuestbookList entries={entries} />
        </div>
      </div>
    </main>
  )
}
