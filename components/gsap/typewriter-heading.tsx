'use client';

import { useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';

import { cn } from '@/lib/utils';
import { gsap, MOTION_OK, useGSAP } from '@/components/gsap/register';

type Props = Omit<React.HTMLAttributes<HTMLHeadingElement>, 'children'> & {
  /** Nama, selalu menjadi nama aksesibel judul dan teks pertama yang diketik. */
  name: string;
  /** Peran yang bergantian diketik setelah nama. */
  roles: string[];
};

const TYPE = 0.1;
const WORD_GAP = 0.18;
const DELETE = 0.06;

// Judul utama yang bergantian mengetik nama lalu peran-peran, masing-masing ditahan sebentar
// dan dihapus pelan-pelan, berulang terus (permintaan pemilik). Karena bergerak lebih dari
// 5 detik, ada tombol jeda (antislop R-39). Pembaca layar membaca nama dan semua peran sekali
// lewat teks sr-only, bukan huruf yang berubah-ubah.
// Sebelum JS jalan, CSS ([data-typewriter] di global.css) menyembunyikan judul supaya tidak
// berkedip, dan menampilkannya lagi setelah 1,5 detik kalau JS gagal. Tanpa JS atau saat pengguna
// memilih "kurangi gerakan", nama tampil diam dan tombol jeda disembunyikan.
export function TypewriterHeading({ name, roles, className, ...props }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const caretRef = useRef<HTMLSpanElement>(null);
  const loopRef = useRef<gsap.core.Timeline | null>(null);
  const [animated, setAnimated] = useState(false);
  const [paused, setPaused] = useState(false);

  useGSAP(
    () => {
      const heading = headingRef.current;
      const text = textRef.current;
      const caret = caretRef.current;
      if (!heading || !text || !caret) return;

      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const phrases = [name, ...roles];
        const show = (value: string) => () => {
          text.textContent = value;
        };

        text.textContent = '';
        gsap.set(heading, { visibility: 'visible', animation: 'none' });
        gsap.set(caret, { autoAlpha: 1 });

        const loop = gsap.timeline({ repeat: -1, delay: 0.3 });
        loop.to(caret, { opacity: 0, duration: 0.25, repeat: 1, yoyo: true, ease: 'steps(1)' });

        phrases.forEach((phrase) => {
          // Ketik huruf demi huruf, dengan jeda sedikit lebih lama setelah spasi.
          for (let n = 1; n <= phrase.length; n++) {
            const gap = phrase[n - 2] === ' ' ? WORD_GAP : TYPE;
            loop.call(show(phrase.slice(0, n)), undefined, `+=${gap}`);
          }
          // Tahan sambil kursor berkedip, lalu hapus pelan-pelan dari belakang.
          loop.to(caret, { opacity: 0, duration: 0.4, repeat: 3, yoyo: true, ease: 'steps(1)' }, '+=0.2');
          for (let n = phrase.length - 1; n >= 0; n--) {
            loop.call(show(phrase.slice(0, n)), undefined, `+=${DELETE}`);
          }
          loop.to({}, { duration: 0.4 });
        });

        loopRef.current = loop;
        setAnimated(true);

        return () => {
          loop.kill();
          loopRef.current = null;
          text.textContent = name;
          setAnimated(false);
          setPaused(false);
        };
      });
      return () => mm.revert();
    },
    { scope: wrapRef, dependencies: [name, roles.join('|')] },
  );

  const togglePause = () => {
    const loop = loopRef.current;
    if (!loop) return;
    loop.paused(!paused);
    setPaused(!paused);
  };

  return (
    <div ref={wrapRef} className="flex items-start gap-2">
      <h1 ref={headingRef} data-typewriter="" className={cn('min-w-0 flex-1', className)} {...props}>
        <span className="sr-only">
          {name}, {roles.join(', ')}
        </span>
        <span aria-hidden="true">
          <span ref={textRef}>{name}</span>
          <span
            ref={caretRef}
            className="invisible ml-1 inline-block h-[0.8em] w-[3px] translate-y-[0.06em] rounded-sm bg-primary opacity-0"
          />
        </span>
      </h1>
      {animated && (
        <button
          type="button"
          onClick={togglePause}
          aria-pressed={paused}
          aria-label={paused ? 'Lanjutkan animasi judul' : 'Jeda animasi judul'}
          title={paused ? 'Lanjutkan animasi judul' : 'Jeda animasi judul'}
          className="mt-2 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:bg-secondary"
        >
          {paused ? <Play aria-hidden="true" className="h-4 w-4" /> : <Pause aria-hidden="true" className="h-4 w-4" />}
        </button>
      )}
    </div>
  );
}
