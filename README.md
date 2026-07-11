# 🚀 Abudan — Personal Portfolio

Selamat datang di repositori _personal portfolio_ saya! Website ini menampilkan perjalanan saya sebagai seorang _Software Engineer_, keahlian yang saya miliki, serta berbagai proyek yang telah saya buat.

🌍 **Live Demo:** [portfolio-abudan.vercel.app](https://portfolio-abudan.vercel.app) _(Ganti dengan link Vercel asli Anda nanti)_

## ✨ Fitur Utama

- **UI Modern & Responsif:** Dibangun dengan Tailwind CSS v4, menampilkan efek _glassmorphism_, gradasi dinamis, dan animasi mikro yang detail.
- **Proyek Dinamis (MDX):** Semua data proyek dikelola menggunakan file Markdown (`.mdx`) sederhana di dalam folder `content/projects/`. Tidak perlu _database_!
- **Animasi Halus:** Menggunakan Framer Motion dengan dukungan penuh untuk aksesibilitas (`prefers-reduced-motion`).
- **Mode Gelap/Terang:** Pergantian tema yang mulus dan otomatis menyesuaikan preferensi sistem pengguna.
- **Formulir Kontak Anti-Spam:** Terintegrasi dengan Cloudflare Turnstile untuk mencegah masuknya _bot_ atau _spam_.
- **Optimasi SEO:** Dilengkapi dengan _Open Graph_ (OG) image dinamis, _auto-generated_ `robots.txt`, dan struktur metadata yang lengkap.

## 🛠️ Tech Stack (Teknologi)

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Bahasa:** TypeScript
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animasi:** [Framer Motion](https://www.framer.com/motion/)
- **Ikon:** [Lucide React](https://lucide.dev/)
- **Konten:** `next-mdx-remote`
- **Keamanan:** Cloudflare Turnstile

## 💻 Cara Menjalankan Secara Lokal

Untuk menjalankan proyek ini di komputer Anda, ikuti langkah-langkah berikut:

1. **Clone repository ini**

   ```bash
   git clone https://github.com/username-anda/portfolio-abudan.git
   cd portfolio-abudan
   ```

2. **Install semua dependencies**

   ```bash
   npm install
   ```

3. **Atur Environment Variables (Opsional)**
   Jika Anda ingin menguji integrasi form kontak (Turnstile) secara lokal, buat file `.env.local` di folder utama:

   ```env
   NEXT_PUBLIC_TURNSTILE_SITE_KEY=site_key_anda
   TURNSTILE_SECRET_KEY=secret_key_anda
   ```

   _(Jika tidak diisi, form kontak akan menggunakan kunci tes bawaan sehingga tidak akan error saat di-run lokal)._

4. **Jalankan _development server_**

   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di _browser_ Anda.

## 📝 Cara Menambahkan Proyek Baru

Menambahkan proyek ke website ini sangatlah mudah berkat arsitektur MDX. Anda tidak perlu menyentuh kode React sama sekali!

1. Buka folder `content/projects/`.
2. Buat file baru dengan ekstensi `.mdx`, contohnya: `aplikasi-baru.mdx`.
3. Tambahkan informasi (_metadata/frontmatter_) berikut di baris paling atas file:

```yaml
---
title: "Aplikasi Baru Saya"
slug: "aplikasi-baru"
category: "Web App"
role: "Fullstack Developer"
techStack: ["React", "Next.js", "Tailwind"]
timeline: "Agustus 2026"
status: "Completed"
shortDescription: "Deskripsi singkat 2-kalimat mengenai proyek ini."
problem: "Masalah apa yang ingin diselesaikan oleh aplikasi ini?"
solution: "Bagaimana cara aplikasi ini menyelesaikannya?"
features: ["Fitur 1", "Fitur 2"]
challenges: "Apa saja kesulitan teknisnya?"
lessonsLearned: "Apa yang Anda pelajari dari proyek ini?"
order: 5
featured: true
thumbnail: "/images/gambar-aplikasi.png"
---
```

4. Anda bisa menulis cerita atau detail teknis tambahan menggunakan format tulisan _Markdown_ biasa di bawah garis `---` tersebut. Proyek ini akan otomatis muncul di website Anda!

## 📜 Lisensi

Proyek ini bersifat _open-source_ dan tersedia di bawah [Lisensi MIT](LICENSE).
