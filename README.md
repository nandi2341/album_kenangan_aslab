# A Chapter to Remember
### Digital Memory Album — Asisten Laboratorium FKOM Universitas Kuningan 2026–2027

Website album kenangan dan arsip digital interaktif untuk **Asisten Laboratorium Fakultas Ilmu Komputer Universitas Kuningan** masa bakti **2026–2027**. 

Menggabungkan estetika **Editorial Magazine**, pengalaman sinematik (**Cinematic Storytelling**), dan detail buku tempel (**Scrapbook & Photobook**) untuk menghadirkan pengalaman yang hangat, nostalgia, elegan, dan profesional.

---

## 🌟 Fitur Utama

1. **Homepage Sinematik (6 Bab Sekuensial)**
   - **Bab 01 — The Beginning**: Sampul buku kenangan layar penuh dengan animasi buka album.
   - **Bab 02 — A Place Called Laboratory**: Eksplorasi 7 laboratorium (Lab Gambar, Fotografi, Multimedia, Pemrograman, RPL, Computer Vision, Sipil).
   - **Bab 03 — The People Behind the Lab**: Foto formasi lengkap, surat sambutan koordinator, dan profil pimpinan laboratorium (Kepala Lab & Laboran).
   - **Bab 04 — Moments We Shared**: Galeri polaroid tematik (*Behind the Scenes*, *Formasi Lengkap*, *Sudut Favorit Lab*).
   - **Bab 05 — Our Little Stories**: Cerita editorial di balik layar dan Dinding Kenangan (*Wall of Memories*).
   - **Bab 06 — Until We Meet Again**: Pesan penutup, animasi 3D amplop surat kenangan, buku tamu publik dengan moderasi, dan tombol unduh album PDF.

2. **Direktori Asisten Interaktif (`/assistants`)**
   - Menampilkan ~21 profil asisten (Koordinator, Sekretaris, Bendahara, Asisten Lab).
   - Fitur pencarian *live* berdasarkan nama/panggilan.
   - Filter bertingkat: Program Studi (DKV, SI, TI, TS) yang secara dinamis menyaring pilihan Laboratorium yang valid.

3. **Halaman Profil Asisten (`/assistants/[slug]`)**
   - Bingkai foto Polaroid miring (*tilted polaroid*) dengan tulisan tangan.
   - Menampilkan 10 atribut resmi sesuai dokumen (Nama Lengkap, Panggilan, Prodi, Lab, Jabatan, Periode, Kutipan Pribadi, Pesan & Pengalaman, serta *Fun Facts* berstiker).

4. **Galeri Kenangan (`/gallery`)**
   - Tampilan grid polaroid / masonry dengan filter kategori foto.

5. **Buku Tamu Publik dengan Moderasi (`/guestbook` & `/api/guestbook`)**
   - Pengunjung dapat mengirim pesan tanpa harus login.
   - Proteksi anti-spam server-side: honeypot bot, time-trap, in-memory rate limiting, dan teks sanitasi.
   - Status awal setiap pesan otomatis **`pending`**, hanya pesan yang disetujui (*approved*) oleh admin via Sanity Studio yang tampil ke publik.

6. **Audio Ambience & Aksesibilitas**
   - Pemutar audio berlisensi dari CMS atau harmonisasi synthesizer piano Web Audio API otomatis.
   - Tanpa *autoplay* bersuara (menghormati kenyamanan pengguna).
   - Dukungan penuh `prefers-reduced-motion` untuk aksesibilitas gerakan.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server & Client Components)
- **Library**: [React 19](https://react.dev/)
- **Bahasa**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi**: [GSAP 3](https://gsap.com/) & ScrollTrigger
- **Headless CMS**: [Sanity.io](https://www.sanity.io/) (`@sanity/client`, Sanity Studio v4)
- **Ikon**: [Lucide React](https://lucide.dev/)

---

## 🚀 Memulai Proyek Secara Lokal

### Prasyarat
- Node.js versi 20+ (disarankan v24)
- Corepack (`corepack enable` atau jalankan via `corepack pnpm`)

### 1. Instalasi Dependensi
```bash
corepack pnpm install
```

### 2. Konfigurasi Lingkungan (`.env.local`)
Salin file template `.env.example`:
```bash
copy .env.example .env.local
```

Isi variabel environment berikut:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=3ljc5pq3
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_VERSION=2025-01-01
SANITY_API_WRITE_TOKEN=skX4T5376... (Token Editor dari Sanity)

SANITY_STUDIO_PROJECT_ID=3ljc5pq3
SANITY_STUDIO_DATASET=production
```

> **Catatan Resilient**: Jika variabel Sanity dikosongkan, website tetap dapat dijalankan secara utuh menggunakan *mock data placeholder* berkualitas tinggi di `lib/placeholders.ts`.

### 3. Menjalankan Server Pengembang
```bash
corepack pnpm dev
```
Buka [http://localhost:3000](http://localhost:3000) di browser.

### 4. Menjalankan Sanity Studio (Dashboard Admin)
Untuk mengelola konten, mengisi profil asisten, mengunggah foto, dan memoderasi buku tamu:
```bash
cd studio
corepack pnpm install
corepack pnpm dev
```
Buka dashboard admin Sanity di [http://localhost:3333](http://localhost:3333).

---

## ☁️ Panduan Deployment ke Vercel

1. **Push ke GitHub**:
   Inisialisasi git dan buat commit awal:
   ```bash
   git init
   git add .
   git commit -m "feat: digital memory album initial release"
   git branch -M main
   git remote add origin <URL_REPOSITORY_GITHUB_ANDA>
   git push -u origin main
   ```

2. **Deploy di Vercel**:
   - Masuk ke [https://vercel.com](https://vercel.com) dan impor repository GitHub proyek ini.
   - Framework preset: **Next.js**.
   - Masukkan **Environment Variables** di Vercel Dashboard (sesuai `.env.local`):
     - `NEXT_PUBLIC_SITE_URL`: URL domain Vercel / domain universitas Anda
     - `NEXT_PUBLIC_SANITY_PROJECT_ID`
     - `NEXT_PUBLIC_SANITY_DATASET`
     - `SANITY_API_WRITE_TOKEN`
   - Klik **Deploy**.

3. **CORS Sanity Cloud**:
   - Masuk ke dashboard Sanity Manage ([https://sanity.io/manage](https://sanity.io/manage)) > Project Anda > **API** > **CORS Origins**.
   - Tambahkan URL Vercel produksi Anda (misal: `https://album-aslab.vercel.app`) dan centang **Allow credentials**.

---

## 📄 Lisensi & Hak Cipta
Didedikasikan untuk Asisten Laboratorium Fakultas Ilmu Komputer, Universitas Kuningan.  
Periode Pengabdian: **2026–2027**.
