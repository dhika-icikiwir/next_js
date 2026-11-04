'use client';

// Diadaptasi dari Magic UI (MIT, lihat LICENSE): https://magicui.design/docs/components/animated-theme-toggler
// Perubahan: hanya efek lingkaran, dikendalikan next-themes, label bahasa Indonesia,
// dan langsung ganti tema tanpa animasi saat pengguna memilih "kurangi gerakan".

import { useCallback, useEffect, useRef, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<'button'> {
  duration?: number;
}

export function AnimatedThemeToggler({ className, duration = 450, ...props }: AnimatedThemeTogglerProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const busyRef = useRef(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === 'dark';

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button || busyRef.current) return;

    const next = isDark ? 'light' : 'dark';
    const apply = () => {
      document.documentElement.classList.toggle('dark', next === 'dark');
      setTheme(next);
    };

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof document.startViewTransition !== 'function') {
      apply();
      return;
    }

    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
    const toRadius = (r: number) => `${(r / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;
    const at = `${(x / vw) * 100}% ${(y / vh) * 100}%`;

    busyRef.current = true;
    const transition = document.startViewTransition(() => flushSync(apply));
    transition.finished.finally(() => {
      busyRef.current = false;
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0% at ${at})`, `circle(${toRadius(maxRadius)} at ${at})`] },
          { duration, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
        );
      })
      .catch(() => {});
  }, [isDark, setTheme, duration]);

  const label = isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap';

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(className)}
      {...props}
    >
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </button>
  );
}
