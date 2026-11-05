'use client';

import { useRef } from 'react';

import { gsap, MOTION_OK, SplitText, useGSAP } from '@/components/gsap/register';

type Props = React.HTMLAttributes<HTMLHeadingElement> & { children: string };

// Nama diketik huruf demi huruf dengan kursor ketik, sekali saat halaman dibuka.
// Tempo dibuat tidak rata seperti orang mengetik, dengan jeda di antara kata. Kursor berkedip
// sebentar sebelum dan sesudah mengetik lalu hilang, jadi seluruh animasi selesai dalam ~4 detik.
// Sebelum JS jalan, CSS ([data-typewriter] di global.css) menyembunyikan judul supaya tidak
// berkedip, dan otomatis menampilkannya lagi setelah 1,5 detik kalau JS gagal.
export function TypewriterHeading({ children, ...props }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current;
      const el = headingRef.current;
      const caret = caretRef.current;
      if (!wrap || !el || !caret) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        let split: SplitText | undefined;
        let cancelled = false;

        document.fonts.ready.then(() => {
          if (cancelled) return;
          split = SplitText.create(el, { type: 'words,chars', aria: 'auto' });
          const chars = split.chars as HTMLElement[];

          // Posisi kursor di kiri atau kanan sebuah huruf, relatif ke pembungkus.
          const at = (char: HTMLElement, side: 'left' | 'right') => {
            const r = char.getBoundingClientRect();
            const w = wrap.getBoundingClientRect();
            return {
              x: (side === 'left' ? r.left : r.right) - w.left,
              y: r.top - w.top + r.height * 0.12,
              height: r.height * 0.78,
            };
          };

          gsap.set(chars, { autoAlpha: 0 });
          gsap.set(el, { visibility: 'visible', animation: 'none' });

          const tl = gsap.timeline({ delay: 0.3 });
          tl.set(caret, { autoAlpha: 1, ...at(chars[0], 'left') });
          tl.to(caret, { opacity: 0, duration: 0.25, repeat: 1, yoyo: true, ease: 'steps(1)' });

          chars.forEach((char, i) => {
            const newWord = i > 0 && char.parentElement !== chars[i - 1].parentElement;
            const pause = newWord ? 0.28 : gsap.utils.random(0.07, 0.15);
            tl.set(char, { autoAlpha: 1 }, `+=${pause}`);
            tl.set(caret, { opacity: 1, x: () => at(char, 'right').x, y: () => at(char, 'right').y }, '<');
          });

          tl.to(caret, { opacity: 0, duration: 0.4, repeat: 3, yoyo: true, ease: 'steps(1)' }, '+=0.2');
          tl.to(caret, { autoAlpha: 0, duration: 0.2 });
        });

        return () => {
          cancelled = true;
          split?.revert();
        };
      });
      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  return (
    <div ref={wrapRef} className="relative">
      <h1 ref={headingRef} data-typewriter="" {...props}>
        {children}
      </h1>
      <span
        ref={caretRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 w-[3px] rounded-sm bg-primary opacity-0"
      />
    </div>
  );
}
