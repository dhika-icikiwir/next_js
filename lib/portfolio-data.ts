/**
 * Semua isi portofolio ada di file ini.
 * Ubah teks, tautan, atau daftar di bawah ini, halaman akan ikut berubah.
 */

export const profile = {
  name: 'Adhika Dipta',
  initials: 'AD',
  role: 'Siswa XII Rekayasa Perangkat Lunak',
  school: 'SMK Hikmah YAPIS Jayapura',
  internship: 'Pengadilan Militer V-22 Jayapura',
  location: 'Jayapura, Papua',
  // Gambar di kotak pas foto. Upload file ke public/profile.jpg.
  // Selama file belum ada, kotak otomatis menampilkan inisial.
  photo: '/profile.jpg',
  photoAlt: 'Kucing putih berbaret, berkacamata, dan bersyal sambil memegang cangkir kopi',
  tagline:
    'Pelajar RPL yang senang membangun website modern dengan Next.js, sekaligus belajar dunia kerja nyata lewat magang di lingkungan peradilan militer.',
  about: [
    'Halo! Saya Adhika Dipta, siswa kelas XII jurusan Rekayasa Perangkat Lunak (RPL) di SMK Hikmah YAPIS Jayapura. Saya tertarik pada pengembangan web, terutama membuat tampilan yang rapi, cepat, dan mudah digunakan.',
    'Saat ini saya menjalani magang (Praktik Kerja Lapangan) di Pengadilan Militer V-22 Jayapura. Di sana saya belajar disiplin, tanggung jawab, dan bagaimana teknologi membantu pekerjaan administrasi di sebuah instansi.',
  ],
  email: 'dhikadipta81@gmail.com',
  github: 'https://github.com/dhika-icikiwir',
  githubUsername: 'dhika-icikiwir',
};

export type TimelineItem = {
  title: string;
  place: string;
  period: string;
  description: string;
  points?: string[];
};

export const experience: TimelineItem[] = [
  {
    title: 'Magang / Praktik Kerja Lapangan (PKL)',
    place: 'Pengadilan Militer V-22 Jayapura',
    period: '2026 - sekarang',
    description:
      'Menjalani program magang sebagai bagian dari kurikulum SMK, membantu pekerjaan administrasi dan teknologi informasi di kantor.',
    points: [
      'Membantu input dan pengolahan data administrasi menggunakan komputer.',
      'Membantu pengarsipan dan penataan dokumen kantor.',
      'Membantu perawatan dasar perangkat komputer, printer, dan jaringan.',
      'Belajar etika kerja, kedisiplinan, dan pelayanan di lingkungan instansi militer.',
    ],
  },
];

export const education: TimelineItem[] = [
  {
    title: 'Rekayasa Perangkat Lunak (RPL)',
    place: 'SMK Hikmah YAPIS Jayapura',
    period: '2024 - 2027',
    description:
      'Saat ini duduk di kelas XII. Mempelajari pemrograman web, basis data, pemrograman berorientasi objek, dan dasar-dasar rekayasa perangkat lunak.',
  },
];

export const skillGroups = [
  {
    title: 'Frontend',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'shadcn/ui'],
  },
  {
    title: 'Backend & Database',
    skills: ['PHP', 'MySQL', 'PostgreSQL', 'REST API'],
  },
  {
    title: 'Tools',
    skills: ['Git & GitHub', 'VS Code', 'Vercel', 'Figma', 'Microsoft Office'],
  },
  {
    title: 'Soft Skill',
    skills: ['Disiplin', 'Kerja sama tim', 'Komunikasi', 'Mau belajar hal baru'],
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  repo?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    title: 'Dashboard Invoice (Acme)',
    description:
      'Aplikasi dashboard keuangan dari kursus resmi Next.js App Router: menampilkan ringkasan pendapatan, invoice terbaru, dan data pelanggan dari database PostgreSQL.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    repo: 'https://github.com/dhika-icikiwir/next_js',
  },
  {
    title: 'Website Portofolio Pribadi',
    description:
      'Website yang sedang kamu lihat sekarang. Dibangun dengan Next.js, komponen shadcn/ui, serta animasi Magic UI dan GSAP. Mendukung mode gelap, responsif di HP, dan di-deploy di Vercel.',
    tags: ['Next.js', 'shadcn/ui', 'Magic UI', 'Vercel'],
    repo: 'https://github.com/dhika-icikiwir/next_js',
  },
];

export const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#pengalaman', label: 'Pengalaman' },
  { href: '#keahlian', label: 'Keahlian' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#kontak', label: 'Kontak' },
];
