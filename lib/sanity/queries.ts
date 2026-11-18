const assistantFields = `
  _id,
  fullName,
  nickname,
  "slug": slug.current,
  "portraitUrl": portrait.asset->url,
  studyProgram,
  laboratory,
  position,
  servicePeriod,
  personalQuote,
  messageAndExperience,
  funFacts,
  displayOrder
`

export const assistantsQuery = `*[_type == "assistant" && defined(slug.current)] | order(displayOrder asc, fullName asc) { ${assistantFields} }`

export const assistantBySlugQuery = `*[_type == "assistant" && slug.current == $slug][0] { ${assistantFields} }`

export const assistantSlugsQuery = `*[_type == "assistant" && defined(slug.current)].slug.current`

export const laboratoriesQuery = `*[_type == "laboratory"] | order(displayOrder asc) {
  _id, name, description, "imageUrl": image.asset->url
}`

export const leadersQuery = `{
  "heads": *[_type == "laboratoryHead"] | order(displayOrder asc) {
    _id, fullName, "role": "Kepala Laboratorium", laboratory, "portraitUrl": portrait.asset->url, quote
  },
  "staff": *[_type == "laboratoryStaff"] | order(displayOrder asc) {
    _id, fullName, "role": "Laboran", "portraitUrl": portrait.asset->url, quote
  }
}`

export const galleryQuery = `*[_type == "galleryPhoto" && defined(image.asset)] | order(coalesce(date, _createdAt) desc) {
  _id,
  "imageUrl": image.asset->url,
  caption,
  "categorySlug": category->slug.current,
  "categoryTitle": category->title,
  date,
  location
}`

export const galleryCategoriesQuery = `*[_type == "galleryCategory"] | order(displayOrder asc) {
  "slug": slug.current, title, description
}`

export const memoriesQuery = `*[_type == "memoryQuote"] | order(displayOrder asc) {
  _id, name, quote, "portraitUrl": portrait.asset->url, laboratory
}`

export const storiesQuery = `*[_type == "story"] | order(displayOrder asc) { _id, title, body, tag }`

export const coordinatorLetterQuery = `*[_type == "coordinatorMessage"][0] { heading, body, signatureName, signatureRole }`

export const closingMessageQuery = `*[_type == "closingMessage"][0] { heading, body, signatureName, signatureRole }`

export const siteSettingsQuery = `{
  "settings": *[_type == "siteSettings"][0] {
    "logoUrl": logo.asset->url,
    "heroImageUrl": heroImage.asset->url,
    labIntro,
    peopleIntro,
    "groupPhotoAssistantsUrl": groupPhotoAssistants.asset->url,
    "groupPhotoLeadersUrl": groupPhotoLeaders.asset->url,
    "musicUrl": backgroundMusic.asset->url,
    finalLetter
  },
  "pdfAlbumUrl": *[_type == "pdfAlbum"][0].file.asset->url
}`

export const approvedGuestbookQuery = `*[_type == "guestbookEntry" && moderationStatus == "approved"] | order(submittedAt desc)[0...60] {
  _id, name, status, message, submittedAt
}`
