# DESIGN.md: Portofolio Adhika Dipta

Arah desain untuk halaman portofolio (`app/page.tsx`). Dibaca sebelum skill `/antislop`.

**Design Read:** portofolio pribadi siswa SMK untuk guru penilai, pembimbing magang, dan calon pemberi kerja, dengan bahasa visual "dokumen resmi" (lembar biodata, kop surat) yang diambil dari pengalaman magang di instansi.

Dial: ENERGY 2 / RHYTHM 2 / MOTION 2

## Alasan setiap keputusan (R-31)

- **Warna:** kertas hangat (`--background`) + hijau tentara (`--primary`) karena tempat magangnya peradilan militer; kuningan (`--brass`) jadi satu-satunya aksen, hanya untuk garis kop surat.
- **Tipografi:** Lusitana (serif) untuk judul supaya terasa seperti surat resmi; Plus Jakarta Sans untuk teks karena huruf ini dirancang untuk identitas kota Jakarta, cocok untuk siswa Indonesia.
- **Motif identitas:** garis ganda kop surat (`.kop-rule`) dan lembar biodata dengan kotak "pas foto 3×4", seperti formulir sekolah.
- **Layout:** tiap section punya komposisi berbeda (biodata 2 kolom, tentang judul-kiri/teks-kanan, timeline baris tabel, keahlian 2 kolom, proyek utama besar + kecil, kontak berbentuk surat).
- **Shadow:** hanya di lembar biodata dan surat kontak, karena keduanya "kertas" yang diletakkan di atas halaman.
- **Ikon:** hanya Mail dan GitHub di tombol kontak (menjelaskan tujuan tombol), plus ikon kontrol (menu, tema, tutup).
- **Gerak (Magic UI, `components/magicui`):** semua efek mati saat `prefers-reduced-motion`.
  - *Blur Fade:* isi tiap bagian muncul sekali saat di-scroll, supaya mata mengikuti urutan baca. Tidak dipakai di judul utama agar halaman tetap cepat tampil.
  - *Highlighter:* garis bawah kuningan seperti coretan pena di nama tempat magang, satu-satunya penekanan di hero.
  - *Scroll Progress:* garis kuningan di atas layar, kelanjutan motif kop surat, menunjukkan posisi baca di halaman panjang.
  - *Magic Card:* sorotan halus hijau-kuningan di kartu proyek, menandai kartu yang bisa diklik.
  - *Animated Theme Toggler:* lingkaran yang melebar dari tombol tema, sebagai umpan balik saat tema berganti.
- **Gerak (GSAP, `components/gsap`):** juga mati saat `prefers-reduced-motion`.
  - *Judul mesin ketik:* judul utama bergantian mengetik "Adhika Dipta", "Siswa XII RPL", dan "Frontend Developer" (daftar di `profile.headlineRoles`). Tiap teks ditahan lalu dihapus pelan-pelan, berulang terus atas permintaan pemilik (pengecualian tercatat untuk R-19). Sesuai R-39 ada tombol jeda yang posisinya tetap. Tinggi judul dikunci (2 baris di HP, 1 baris mulai 640px) supaya isi di bawahnya tidak melompat. Pembaca layar membaca nama dan semua peran sekali.
  - *Garis linimasa (ScrollTrigger, scrub):* garis hijau di kiri Pengalaman & Pendidikan tergambar mengikuti scroll, supaya urutan waktu terbaca sebagai satu alur. Garis ini membawa informasi (urutan), bukan hiasan.
  - *Kop surat (ScrollTrigger):* garis kop di surat kontak tergambar dari kiri ke kanan sekali saat terlihat.
  - Tidak dipakai: efek berulang tanpa henti (border beam, marquee, sparkles), karena tidak punya fungsi. Parallax dan pin section juga tidak dipakai karena berat di HP.
- **Tema:** terang dan gelap sama-sama didukung lewat tombol di navbar.

## Placeholder yang perlu diganti pemilik

- Periode dan tugas magang, tahun sekolah: cek ulang di `lib/portfolio-data.ts`.
