'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import { Highlighter } from '@/components/magicui/highlighter';

// Garis bawah kuningan seperti coretan pena di dokumen. rough-notation menulis warna
// langsung ke atribut SVG, jadi nilainya hex, bukan variabel CSS.
const BRASS = { light: '#886220', dark: '#d4a954' };

export function InternHighlight({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <span className="inline-block">{children}</span>;

  return (
    <Highlighter
      key={resolvedTheme}
      action="underline"
      color={resolvedTheme === 'dark' ? BRASS.dark : BRASS.light}
      strokeWidth={2.5}
      animationDuration={900}
      iterations={1}
      padding={1}
    >
      {children}
    </Highlighter>
  );
}
