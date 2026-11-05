'use client';

import { useRef } from 'react';

import { gsap, MOTION_OK, SplitText, useGSAP } from '@/components/gsap/register';

type Props = React.HTMLAttributes<HTMLHeadingElement> & { children: string };

// Nama diketik huruf demi huruf seperti mesin ketik, sekali saat halaman dibuka.
// Sebelum JS jalan, CSS ([data-typewriter] di global.css) menyembunyikan judul supaya
// tidak berkedip, dan otomatis menampilkannya lagi setelah 1,5 detik kalau JS gagal.
export function TypewriterHeading({ children, ...props }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | undefined;
        let cancelled = false;
        document.fonts.ready.then(() => {
          if (cancelled) return;
          split = SplitText.create(el, { type: 'words,chars', aria: 'auto' });
          gsap.set(el, { visibility: 'visible', animation: 'none' });
          gsap.from(split.chars, { autoAlpha: 0, duration: 0.01, stagger: 0.07, ease: 'none', delay: 0.1 });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <h1 ref={ref} data-typewriter="" {...props}>
      {children}
    </h1>
  );
}
