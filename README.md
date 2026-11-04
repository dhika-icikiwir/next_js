# Portofolio Adhika Dipta

Website portofolio Adhika Dipta, siswa XII RPL SMK Hikmah YAPIS Jayapura yang sedang magang di Pengadilan Militer V-22 Jayapura. Dibuat dengan Next.js, Tailwind CSS, shadcn/ui, dan animasi dari [Magic UI](https://magicui.design) (MIT, disalin dan disesuaikan di `components/magicui`).

## Menjalankan di komputer

```bash
pnpm install
pnpm dev
```

Buka http://localhost:3000.

## Mengubah isi

Semua teks (biodata, pengalaman, keahlian, proyek, kontak) ada di `lib/portfolio-data.ts`.
Untuk memasang foto, taruh file di `public/` (mis. `public/profile.jpg`) lalu isi `photo: '/profile.jpg'`.

## Deploy ke Vercel

1. Masuk ke https://vercel.com dengan akun GitHub.
2. Klik **Add New → Project**, pilih repo `next_js`, lalu **Import**.
3. Biarkan pengaturan bawaan (Framework: Next.js, Install: `pnpm install`, Build: `next build`), klik **Deploy**.
4. Setelah selesai, Vercel memberi alamat seperti `https://nama-proyek.vercel.app`.

Halaman portofolio tidak butuh environment variable. Halaman `/dashboard` (proyek kursus) baru berfungsi kalau `POSTGRES_URL` diisi di **Settings → Environment Variables**.

## Skill antislop untuk Claude Code

Folder `.claude/skills/` berisi skill [antislop](https://github.com/miqdadbadjuber/anti-slop) (lisensi MIT). Saat membuka repo ini di Claude Code, panggil dengan:

- `/antislop`: aturan inti (selalu dipakai)
- `/antislop-ui`, `/antislop-copywriting`, `/antislop-layoutmobile`, `/antislop-human`, `/antislop-code`: skill pendamping
