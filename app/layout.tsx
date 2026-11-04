import type { Metadata, Viewport } from 'next';
import '@/app/ui/global.css';
import { inter, jakarta, lusitana } from '@/app/ui/fonts';
import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Adhika Dipta | Portofolio',
  description:
    'Portofolio Adhika Dipta, siswa XII RPL SMK Hikmah YAPIS Jayapura yang magang di Pengadilan Militer V-22 Jayapura.',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ee' },
    { media: '(prefers-color-scheme: dark)', color: '#11140e' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${lusitana.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
