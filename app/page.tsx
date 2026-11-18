import { HeroSection } from '@/components/home/hero-section'
import { LaboratorySection } from '@/components/home/laboratory-section'
import { PeopleSection } from '@/components/home/people-section'
import { MomentsSection } from '@/components/home/moments-section'
import { StoriesSection } from '@/components/home/stories-section'
import { ClosingSection } from '@/components/home/closing-section'
import {
  getApprovedGuestbook,
  getAssistants,
  getClosingMessage,
  getCoordinatorLetter,
  getGallery,
  getGalleryCategories,
  getLaboratories,
  getLeaders,
  getMemories,
  getSiteSettings,
  getStories,
} from '@/lib/content'
import { placeholderFinalLetter } from '@/lib/placeholders'

export default async function HomePage() {
  const [settings, labs, leaders, letter, photos, categories, stories, memories, closing, entries, assistants] =
    await Promise.all([
      getSiteSettings(),
      getLaboratories(),
      getLeaders(),
      getCoordinatorLetter(),
      getGallery(),
      getGalleryCategories(),
      getStories(),
      getMemories(),
      getClosingMessage(),
      getApprovedGuestbook(),
      getAssistants(),
    ])

  return (
    <main>
      <HeroSection logoUrl={settings.logoUrl} heroImageUrl={settings.heroImageUrl} />
      <LaboratorySection labs={labs} intro={settings.labIntro} />
      <PeopleSection
        intro={settings.peopleIntro}
        groupPhotoAssistantsUrl={settings.groupPhotoAssistantsUrl}
        groupPhotoLeadersUrl={settings.groupPhotoLeadersUrl}
        heads={leaders.heads}
        staff={leaders.staff}
        letter={letter}
      />
      <MomentsSection photos={photos} categories={categories} />
      <StoriesSection stories={stories} memories={memories} />
      <ClosingSection
        closing={closing}
        finalLetter={settings.finalLetter || placeholderFinalLetter}
        entries={entries}
        pdfUrl={settings.pdfAlbumUrl}
        assistants={assistants}
      />
    </main>
  )
}
