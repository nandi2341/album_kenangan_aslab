# Implementation Plan: A Chapter to Remember
Digital Memory Album — Aslab FKOM Universitas Kuningan 2026–2027

Dokumen ini melacak kemajuan implementasi dan penyempurnaan proyek album kenangan digital sesuai spesifikasi `docs/ASLAB 26-27.md`. Setiap langkah yang selesai dikerjakan akan ditandai dengan tanda centang `[x]`.

---

## 📋 Daftar Rencana Eksekusi

- [x] **Step 1: Instalasi Dependensi & Verifikasi Build Workspace**
  - [x] Jalankan instalasi seluruh dependensi proyek (`corepack pnpm install`).
  - [x] Jalankan pengujian tipe TypeScript (`pnpm tsc --noEmit` atau typecheck).
  - [x] Jalankan uji build produksi (`pnpm run build`) untuk mendeteksi potensi error kompilasi, style Next.js 16/Tailwind v4, atau masalah SSR/Client components.
  - [x] Perbaiki segala isu atau peringatan error yang ditemukan saat build.

- [x] **Step 2: Konfigurasi Environment & Template `.env.example`**
  - [x] Buat file `.env.example` yang mencantumkan variabel publik (`NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `NEXT_PUBLIC_SITE_URL`).
  - [x] Cantumkan variabel privat/server token (`SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`).
  - [x] Cantumkan variabel untuk Sanity Studio (`SANITY_STUDIO_PROJECT_ID`, `SANITY_STUDIO_DATASET`).
  - [x] Buat dokumentasi singkat mengenai cara mengisi variabel tersebut.

- [x] **Step 3: Uji Responsivitas & Pemolesan Komponen Interaktif (Desktop & Mobile)**
  - [x] Periksa dan uji interaksi animasi amplop kenangan (`EnvelopeInteraction`) di desktop dan mobile agar tidak ada pergeseran layout/overflow.
  - [x] Uji filter direktori asisten dan pencarian nama di `AssistantDirectory` pada berbagai ukuran layar.
  - [x] Uji pemutar musik latar (`MusicToggle`) untuk memastikan sintesis audio Web Audio API berjalan tanpa error ketika belum ada audio file dari CMS.
  - [x] Pastikan seluruh transisi scroll GSAP (`components/scroll-animations.tsx`) menghormati preferensi `prefers-reduced-motion`.

- [x] **Step 4: Pengujian & Validasi Sanity Studio & API Buku Tamu**
  - [x] Periksa konfigurasi dependensi dan build di subdirektori `studio/`.
  - [x] Pastikan validasi aturan prodi vs laboratorium pada schema asisten (`studio/schemaTypes/index.ts`) konsisten dengan ketentuan dokumen.
  - [x] Uji endpoint API buku tamu (`app/api/guestbook/route.ts`) untuk respon sukses, sanitasi input, rate limiting, dan penanganan saat CMS belum aktif (*graceful 503*).

- [x] **Step 5: Audit Aksesibilitas, Metadata SEO & Dokumentasi Deployment**
  - [x] Verifikasi metadata Open Graph, semantic tags HTML, alt-text gambar, dan kontras warna sesuai standar aksesibilitas WCAG.
  - [x] Buat file petunjuk penggunaan dan *deployment* (`README.md` atau panduan peluncuran) untuk deployment ke Vercel dan Sanity Studio.
  - [x] Final walk-through dan evaluasi terhadap kesesuaian 15 poin aturan `docs/ASLAB 26-27.md`.

---
*Status Terakhir Diperbarui: 18 November 2026*
