'use client';

import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import { gsap, MOTION_OK, SplitText, useGSAP } from '@/components/gsap/register';

type Props = React.HTMLAttributes<HTMLHeadingElement> & { children: string };

// Nama diketik huruf demi huruf dengan kursor, ditahan sebentar, dihapus pelan-pelan,
// lalu diketik lagi, berulang terus (permintaan pemilik). Karena bergerak lebih dari 5 detik,
// ada tombol jeda (antislop R-39). Pembaca layar tetap membaca "Adhika Dipta" utuh lewat
// aria-label dari SplitText, bukan huruf yang muncul dan hilang.
// Sebelum JS jalan, CSS ([data-typewriter] di global.css) menyembunyikan judul supaya tidak
// berkedip, dan otomatis menampilkannya lagi setelah 1,5 detik kalau JS gagal. Saat pengguna
// memilih "kurangi gerakan", nama tampil diam dan tombol jeda disembunyikan.
export function TypewriterHeading({ children, ...props }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const [animated, setAnimated] = useState(false);
  const [paused, setPaused] = useState(false);

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
            };
          };
          const caretAfter = (i: number) => (i < 0 ? at(chars[0], 'left') : at(chars[i], 'right'));

          gsap.set(chars, { autoAlpha: 0 });
          gsap.set(el, { visibility: 'visible', animation: 'none' });
          const first = chars[0].getBoundingClientRect();
          gsap.set(caret, { autoAlpha: 1, height: first.height * 0.78, ...at(chars[0], 'left') });

          const loop = gsap.timeline({ repeat: -1, delay: 0.3 });

          // Kedip sebentar dengan layar kosong, lalu mengetik.
          loop.to(caret, { opacity: 0, duration: 0.25, repeat: 1, yoyo: true, ease: 'steps(1)' });
          chars.forEach((char, i) => {
            const newWord = i > 0 && char.parentElement !== chars[i - 1].parentElement;
            loop.set(char, { autoAlpha: 1 }, `+=${newWord ? 0.28 : 0.11}`);
            loop.set(caret, { opacity: 1, x: () => caretAfter(i).x, y: () => caretAfter(i).y }, '<');
          });

          // Tahan nama utuh sambil kursor berkedip, lalu hapus pelan-pelan dari belakang.
          loop.to(caret, { opacity: 0, duration: 0.4, repeat: 3, yoyo: true, ease: 'steps(1)' }, '+=0.2');
          for (let i = chars.length - 1; i >= 0; i--) {
            loop.set(chars[i], { autoAlpha: 0 }, `+=${i === chars.length - 1 ? 0.3 : 0.08}`);
            loop.set(caret, { opacity: 1, x: () => caretAfter(i - 1).x, y: () => caretAfter(i - 1).y }, '<');
          }
          loop.to({}, { duration: 0.5 });

          loopRef.current = loop;
          setAnimated(true);
          window.addEventListener('resize', onResize);
        });

        // Posisi kursor dihitung ulang kalau ukuran layar berubah di tengah putaran.
        const onResize = () => loopRef.current?.invalidate();

        return () => {
          cancelled = true;
          window.removeEventListener('resize', onResize);
          loopRef.current?.kill();
          loopRef.current = null;
          split?.revert();
          setAnimated(false);
          setPaused(false);
        };
      });
      return () => mm.revert();
    },
    { scope: wrapRef },
  );

  const togglePause = () => {
    const loop = loopRef.current;
    if (!loop) return;
    loop.paused(!paused);
    setPaused(!paused);
  };

  return (
    <div ref={wrapRef} className="relative flex items-center gap-2">
      <h1 ref={headingRef} data-typewriter="" {...props}>
        {children}
      </h1>
      <span
        ref={caretRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 w-[3px] rounded-sm bg-primary opacity-0"
      />
      {animated && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          aria-label={paused ? 'Lanjutkan animasi nama' : 'Jeda animasi nama'}
          title={paused ? 'Lanjutkan animasi nama' : 'Jeda animasi nama'}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:bg-secondary"
        >
          {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
