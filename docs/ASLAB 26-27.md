
# PROJECT: A CHAPTER TO REMEMBER
## Digital Memory Album — Aslab FKOM Universitas Kuningan 2026–2027

Act as a senior UI/UX designer, creative director, frontend engineer, and full-stack developer.

Build a premium, immersive, responsive digital memory album website titled "A Chapter to Remember" for:

Asisten Laboratorium Fakultas Ilmu Komputer
Universitas Kuningan
Academic / Service Period: 2026–2027

This website is a digital yearbook and memory archive that documents the people, stories, experiences, and memories of the Asisten Laboratorium FKOM.

The website should feel like a combination of:
- A premium editorial magazine.
- A cinematic storytelling experience.
- A tasteful scrapbook and digital photobook.
- A modern interactive yearbook.

IMPORTANT:
Do not make this look like a generic corporate website, generic portfolio, or ordinary photo gallery.
The website must have a strong emotional identity, visual storytelling, and carefully designed typography.

The experience should feel personal, nostalgic, warm, elegant, and memorable while maintaining a professional university identity.

---

# 1. CORE DESIGN DIRECTION

## Visual Identity

Use a hybrid visual direction:

1. Editorial Magazine
   - Large expressive typography.
   - Strong typographic hierarchy.
   - Elegant spacing and editorial layouts.
   - Asymmetric compositions.
   - Magazine-like section introductions.

2. Cinematic Experience
   - Full-screen opening section.
   - Smooth scroll transitions.
   - Large photography.
   - Subtle parallax.
   - Emotional ending sequence.
   - Carefully timed visual reveals.

3. Scrapbook Elements
   - Polaroid photo frames.
   - Paper textures.
   - Handwritten annotations.
   - Tape and sticker accents.
   - Memo paper.
   - Slightly rotated photographs.
   - Collage compositions.

Keep scrapbook elements at medium intensity.
Do not overcrowd the interface with decorative objects.

## Color Palette

Primary colors:
- Deep Navy: #101D35
- Dark Navy: #172A46
- Blue: #315C91
- Soft Blue: #DCE8F5
- White: #FFFFFF
- Warm Paper: #F5F1E8

Use navy, white, and blue as the main identity.
Warm paper tones may be used for scrapbook and memory elements.

Maintain good text contrast and readability.

## Typography

Use a combination of:
- Elegant editorial serif font for large headlines.
- Modern sans-serif font for body text and interface.
- Handwritten-style font for nicknames, annotations, and scrapbook details.

Typography should feel sophisticated and editorial, not overly decorative.

## Layout Principles

- Generous whitespace.
- Strong visual hierarchy.
- Responsive grid system.
- Large photographs.
- Asymmetric editorial compositions.
- Consistent spacing.
- Subtle borders and shadows.
- Avoid excessive rounded cards.
- Avoid generic dashboard aesthetics on the public website.

---

# 2. WEBSITE STRUCTURE

Create the following pages:

1. Homepage (/)
2. Assistant Directory (/assistants)
3. Individual Assistant Profile (/assistants/[slug])
4. Photo Gallery (/gallery)
5. Guestbook (/guestbook)

The homepage is the main storytelling experience.

Individual assistant profiles and the gallery must have their own pages.

The public website must not require visitors to log in.

Sanity Studio will be used separately for content management.

---

# 3. HOMEPAGE STORYTELLING

The homepage must follow this exact six-part narrative sequence.

Do not add a chronological timeline section.
Do not create a section titled "A Journey to Remember".

## SECTION 01 — THE BEGINNING

Purpose:
Introduce the digital memory album with a premium and cinematic opening.

Design:
- Full-screen editorial book-cover composition.
- Deep navy background.
- Large title: "A Chapter to Remember".
- Subtitle: "Asisten Laboratorium Fakultas Ilmu Komputer Universitas Kuningan".
- Period: "2026–2027".
- Placeholder for the official organization logo.
- Atmospheric background image or layered photo composition.
- Subtle grain or paper texture.
- Elegant entrance animation.

Main button:
"Buka Album"

Interaction:
When clicked, smoothly transition or scroll into the next section.

The opening should feel like opening a special yearbook.

## SECTION 02 — A PLACE CALLED LABORATORY

Purpose:
Introduce the laboratories and the environment where memories were created.

Content:
- Short Indonesian introduction about Aslab FKOM.
- Background and role of the laboratory assistant organization.
- Atmosphere of the laboratories.
- Photos of laboratory rooms, equipment, workstations, and daily activities.

Display the seven laboratories:

1. Lab Gambar
2. Lab Fotografi
3. Lab Multimedia
4. Lab Pemrograman
5. Lab RPL
6. Lab Computer Vision
7. Lab Sipil

Design:
- Editorial magazine layout.
- Large image compositions.
- Alternating image and text blocks.
- Subtle parallax.
- Laboratory name labels.

Laboratory content must be manageable through Sanity CMS.

Do not invent laboratory history or descriptions.
Use editable placeholder content until the administrator provides the actual information.

## SECTION 03 — THE PEOPLE BEHIND THE LAB

Purpose:
Introduce the people who make the laboratories meaningful.

Main visual:
A prominent group photograph composition.

Include:
- Group photo of the assistants.
- Group photo of laboratory heads and laboratory staff when available.
- Introduction text in Indonesian.
- Visual transition from the group photo to the assistant directory.

Create a clear CTA:
"Kenali Mereka"

This CTA navigates to /assistants.

Also include a dedicated editorial area for laboratory leadership.

### Laboratory Heads and Laboratory Staff

Laboratory heads and laboratory staff must appear on the homepage only.

Do not create individual profile pages for them.

Data fields:
1. Formal portrait.
2. Full name.
3. Position:
   - Kepala Laboratorium
   - Laboran
4. Laboratory name (only for laboratory heads).
5. Short quote or welcome message.

Presentation:
- Laboratory head: elegant editorial quote with formal portrait.
- Laboran: dignified supporting visual, possibly integrated into a group collage.

Do not make their presentation feel less important than the assistants.

### Coordinator's Welcome Message

Create a dedicated visual element for the assistant coordinator's welcome message.

Design:
- Digital letter or memo.
- Clipboard or paper-like layout.
- Warm and personal Indonesian writing.
- Digital signature.
- Subtle paper-opening animation.

The welcome message must be editable through Sanity CMS.

## SECTION 04 — MOMENTS WE SHARED

Purpose:
Show shared experiences through photographs.

Design:
Create a hybrid photo composition combining:
- Pinterest-style image grid.
- Masonry layout.
- Polaroid photo frames.
- Slightly tilted photos.
- Scrapbook-inspired collage.

Use thematic categories, not chronological event sequences.

Initial gallery categories:

1. Behind the Scenes
   Candid, funny, informal, and spontaneous moments.

2. Formasi Lengkap & Mini Group
   Full-group photos and small-group photographs.

3. Sudut Favorit Laboratorium
   Laboratory atmosphere, equipment, whiteboards, and assistants working.

Each photo should support:
- Image.
- Caption.
- Category.
- Optional date.
- Optional location.

Include a CTA:
"Lihat Semua Kenangan"

Navigate to /gallery.

Gallery content must be dynamically loaded from Sanity.

Do not fabricate photos or captions.

Use attractive placeholders when real photos are unavailable.

## SECTION 05 — OUR LITTLE STORIES

Purpose:
Preserve the small stories and meaningful details that make the organization memorable.

This section has two main elements.

### A. Behind-the-Scenes Stories

Show short Indonesian stories about:
- Funny experiences.
- Daily laboratory activities.
- Unexpected moments.
- Friendship.
- Challenges.
- Small victories.

Use editorial text cards and memo-paper visual elements.

Content must be managed through Sanity.

### B. Wall of Memories

Create an interactive wall containing short quotes and memories from the assistants.

Design:
- A visual wall of paper notes.
- Different but harmonious note rotations.
- Handwritten-style accents.
- Subtle hover interactions.
- Randomized or editorial arrangement.

Each memory contains:
- Assistant name.
- Quote or short memory.
- Optional portrait.
- Optional laboratory.

The administrator populates the memories through Sanity CMS.

Do not allow anonymous visitors to directly publish content into this wall.

## SECTION 06 — UNTIL WE MEET AGAIN

Purpose:
Create a warm, emotional, and memorable ending.

This section contains four elements.

### A. Closing Message

Create a meaningful Indonesian closing message about:
- Togetherness.
- Learning.
- Friendship.
- Memories.
- Gratitude.
- New beginnings.

The message must be editable through Sanity CMS.

### B. Animated Memory Envelope

Create a large envelope illustration near the end of the page.

Interaction:
- The envelope is initially closed.
- When clicked, the envelope flap opens.
- A letter slowly emerges.
- The letter displays the final memory message.
- Use smooth, elegant animation.

Keep the interaction intuitive and responsive.

### C. Guestbook

Provide a guestbook where visitors can leave a message.

Fields:
1. Name.
2. Status / Angkatan.
3. Message.

Status dropdown options:
- Praktikan
- Dosen
- Alumni
- Asisten Laboratorium
- Lainnya

Guestbook rules:
- Visitors do not need an account.
- All submissions must initially have "pending" status.
- Only approved messages can appear publicly.
- Admins can approve, reject, or delete submissions through Sanity Studio.
- Never display pending messages.
- Provide loading, success, and error states.
- Validate all inputs on the server.
- Implement basic spam protection and rate limiting.
- Sanitize user-submitted text.
- Do not expose Sanity write tokens in client-side code.

Display approved guestbook messages in a beautiful editorial layout.

### D. PDF Album Download

Add a button:

"Unduh Album Versi Cetak (PDF)"

The PDF will be uploaded manually through Sanity CMS.

The website should retrieve the PDF asset from Sanity and provide a download link.

Do not attempt to automatically convert the website into a PDF.

If no PDF is uploaded, hide the download button or display a graceful unavailable state.

---

# 4. ASSISTANT DIRECTORY

Create a dedicated page at:

/assistants

Purpose:
Display all assistant members in a visually attractive and searchable directory.

There are approximately 21 assistant members.

The count includes:
- Koordinator.
- Sekretaris.
- Bendahara.
- Asisten Laboratorium.

The coordinator is included in the 21 assistants, not in the separate group of laboratory heads and laboratory staff.

## Laboratory Categories

There are exactly seven laboratories:

1. Lab Gambar
2. Lab Fotografi
3. Lab Multimedia
4. Lab Pemrograman
5. Lab RPL
6. Lab Computer Vision
7. Lab Sipil

## Study Program and Laboratory Mapping

Every assistant has both a study program attribute and a laboratory attribute.

The mapping is:

DKV:
- Lab Gambar
- Lab Fotografi

SI:
- Lab Multimedia
- Lab Computer Vision
- Lab RPL

TI:
- Lab Multimedia
- Lab Pemrograman
- Lab RPL

TS:
- Lab Sipil
- Lab Multimedia

Important:
The laboratory selection must depend on the selected study program.

For example:
When an administrator selects DKV, only Lab Gambar and Lab Fotografi should be selectable.

Implement this dependency in the CMS form validation or input component.

Do not allow invalid study program and laboratory combinations.

## Assistant Card Design

Each assistant card should contain:
- Portrait image.
- Full name.
- Nickname.
- Position.
- Study program.
- Laboratory.
- Link to profile.

Use a combination of:
- Editorial portrait cards.
- Polaroid accents.
- Subtle hover movement.
- Elegant image transitions.

Do not make the cards overly decorative.

## Filtering

Provide filters for:
- Study program.
- Laboratory.
- Position.

Add a search field for assistant names.

All filters must work.

Data must come from Sanity.

---

# 5. INDIVIDUAL ASSISTANT PROFILE

Create a dynamic profile page:

/assistants/[slug]

Each assistant profile has exactly these ten official content fields:

1. Full Name.
2. Nickname.
3. Portrait Photo.
4. Study Program / Department.
5. Laboratory.
6. Position.
7. Service Period.
8. Personal Quote.
9. Message and Experience.
10. Fun Facts.

Study program options:
- DKV
- SI
- TI
- TS

Position options:
- Koordinator
- Sekretaris
- Bendahara
- Asisten Laboratorium

Service period:
2026–2027

Use the following profile design:

### Portrait Area
- Large portrait photo.
- Tilted Polaroid frame.
- Nickname below the photo.
- Handwritten-style typography.

### Personal Information
- Full name.
- Study program.
- Laboratory.
- Position.
- Service period.

Use clean editorial typography.

### Personal Quote
Display the personal quote as a large editorial blockquote.

### Message and Experience
Present the message or experience in a memo-paper visual style.

### Fun Facts
Display 2–3 fun facts using small sticker-like icon bullets.

Use a consistent profile structure with subtle individual visual variations.

If a field is missing, gracefully hide it or show a neutral placeholder.
Never invent personal information.

---

# 6. SANITY CMS ARCHITECTURE

Use Sanity as the headless CMS.

Create a structured content model for:

1. Assistant.
2. Laboratory.
3. Laboratory Head.
4. Laboratory Staff / Laboran.
5. Gallery Photo.
6. Gallery Category.
7. Memory Wall Quote.
8. Behind-the-Scenes Story.
9. Coordinator Welcome Message.
10. Closing Message.
11. Guestbook Entry.
12. Site Settings.
13. PDF Album Asset.

## Assistant Schema

Fields:
- fullName
- nickname
- slug
- portrait
- studyProgram
- laboratory
- position
- servicePeriod
- personalQuote
- messageAndExperience
- funFacts
- displayOrder

Use suitable validation and required fields.

Set servicePeriod default to 2026–2027.

Validate study program and laboratory compatibility.

## Guestbook Schema

Fields:
- name
- status
- message
- moderationStatus
- submittedAt

Moderation status:
- pending
- approved
- rejected

Default moderation status:
pending

Only approved entries may be queried by the public website.

## Content Management

Create an intuitive Sanity Studio interface.

Use clear field labels and descriptions.

Organize content types logically.

Support multiple administrators through Sanity project access management.

Do not build a custom public admin dashboard unless necessary.

Sanity Studio is the content management interface.

---

# 7. TECHNICAL ARCHITECTURE

Preferred stack:

- Next.js with App Router.
- React.
- TypeScript.
- Tailwind CSS.
- GSAP.
- Sanity CMS.
- GitHub.
- Vercel deployment.

Use reusable components and a clean project structure.

Recommended components:
- HeroSection
- EditorialSection
- LaboratorySection
- GroupPhotoSection
- AssistantCard
- AssistantDirectory
- PolaroidGallery
- MemoryWall
- CoordinatorLetter
- EnvelopeInteraction
- GuestbookForm
- GuestbookList
- PDFDownloadButton
- Footer

Use Sanity client for content fetching.

Use server components where appropriate.

Use client components only for interactive features.

Implement appropriate revalidation or webhook-based cache invalidation so CMS updates can appear on the website without requiring unnecessary full redeployments.

Keep Sanity credentials and write tokens on the server.

Create environment variable placeholders in .env.example.

Do not hardcode private credentials.

---

# 8. ANIMATION AND INTERACTION

Use GSAP for high-quality animation.

The animations should feel cinematic but remain subtle.

Implement:

1. Hero title entrance.
2. Smooth section reveals.
3. Scroll-triggered image reveals.
4. Subtle parallax.
5. Polaroid movement.
6. Paper and scrapbook micro-interactions.
7. Envelope-opening interaction.
8. Section transitions.
9. End-credit-inspired closing sequence.

Use ScrollTrigger where appropriate.

Performance requirements:
- Avoid excessive animation.
- Avoid large continuous motion.
- Respect prefers-reduced-motion.
- Avoid blocking page interactions.
- Ensure animations work on mobile.
- Optimize image loading.
- Use lazy loading for offscreen images.

Do not use animation merely for decoration.
Every animation should support the storytelling experience.

---

# 9. BACKGROUND MUSIC

Use warm lo-fi or emotional piano ambience.

Requirements:
- Music must not autoplay with sound.
- Provide a visible music toggle.
- Visitors can turn music on or off.
- Display a subtle music indicator.
- Remember the current preference during the active browsing session if practical.
- Provide a placeholder audio asset until the administrator supplies properly licensed audio.

Use only audio that is original, public-domain, or properly licensed.

Do not embed copyrighted commercial music without permission.

---

# 10. RESPONSIVE DESIGN

The website must work beautifully on:

- Desktop.
- Laptop.
- Tablet.
- Mobile.

Mobile design is especially important.

Requirements:
- Responsive typography.
- Mobile-friendly navigation.
- Touch-friendly interactions.
- Responsive Polaroid and masonry layouts.
- No horizontal overflow.
- Optimized image sizes.
- Good readability on small screens.

Avoid simply shrinking the desktop design.
Adapt compositions thoughtfully for mobile.

---

# 11. ACCESSIBILITY AND PERFORMANCE

Implement:
- Semantic HTML.
- Accessible navigation.
- Keyboard-friendly controls.
- Alt text for meaningful images.
- Proper contrast.
- Visible focus states.
- Reduced motion support.
- Optimized images.
- Appropriate metadata.
- Open Graph metadata.
- Loading and error states.

Aim for excellent Core Web Vitals.

Avoid unnecessary dependencies.

---

# 12. DEPLOYMENT

Use GitHub as the source repository.

Deploy the website to Vercel first.

Use the default Vercel subdomain during development.

The website may later use an official university domain if available and authorized.

The architecture must support connecting a custom domain without changing the website's core code.

Document the required environment variables and deployment steps.

---

# 13. CONTENT AND PLACEHOLDER RULES

The following information may not be available yet:
- Official logo.
- Assistant portraits.
- Assistant names.
- Group photos.
- Laboratory photos.
- Laboratory head names.
- Laboran names.
- Personal quotes.
- Messages and experiences.
- Memory wall entries.
- Welcome message.
- Closing message.
- PDF album.
- Background music.

Use clearly identifiable placeholders.

Do not invent real people, names, quotes, organizational history, or photographs.

Make it easy to replace placeholders with real content through Sanity.

---

# 14. FINAL DESIGN QUALITY REQUIREMENTS

The final result must:

- Feel like a premium digital yearbook.
- Have a memorable first impression.
- Have an emotional storytelling flow.
- Use strong editorial typography.
- Use photography as a central visual element.
- Combine cinematic visuals with scrapbook details.
- Feel warm, personal, elegant, and professional.
- Avoid generic template aesthetics.
- Avoid excessive gradients and glassmorphism.
- Avoid unnecessary dashboard-style cards.
- Maintain consistent design language across pages.

Prioritize visual quality and storytelling over adding unnecessary features.

The homepage should be especially polished.

---

# 15. DEVELOPMENT EXECUTION STRATEGY

Do not attempt to build everything as one unstructured component.

Develop the project in clear stages:

Stage 1:
- Establish design system.
- Build responsive homepage.
- Implement all six storytelling sections.
- Use placeholder content.

Stage 2:
- Build assistant directory.
- Build individual assistant profile pages.
- Implement filters and search.

Stage 3:
- Build photo gallery.
- Build Wall of Memories.
- Build guestbook interface.

Stage 4:
- Integrate Sanity CMS.
- Implement schemas and data fetching.
- Implement server-side guestbook submission and moderation.

Stage 5:
- Add GSAP interactions.
- Add envelope animation.
- Add background music controls.
- Add PDF download integration.

Stage 6:
- Responsive refinement.
- Accessibility.
- Performance optimization.
- Deployment preparation.

Start by creating a visually impressive and functional frontend with realistic placeholder content.

Do not claim that CMS integration, moderation, or deployment is complete unless the corresponding functionality is actually implemented.

When a backend integration requires credentials or external setup, provide clear instructions and environment variable placeholders.

The most important priority is to create a visually outstanding digital memory album that tells the story of Aslab FKOM Universitas Kuningan for the 2026–2027 period.

The result should feel like a special book of memories that people will enjoy revisiting years later.
