'use client';

import { useRef } from 'react';

import { gsap, MOTION_OK, useGSAP } from '@/components/gsap/register';

// Garis linimasa di sisi kiri yang tergambar mengikuti scroll, supaya urutan waktu
// pengalaman dan pendidikan terbaca sebagai satu alur.
export function TimelineRail({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '[data-rail-progress]',
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top 75%', end: 'bottom 60%', scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="relative pl-6 md:pl-10">
      <div aria-hidden="true" className="absolute bottom-0 left-[3px] top-0 w-px bg-border" />
      <div
        aria-hidden="true"
        data-rail-progress=""
        className="absolute bottom-0 left-[2px] top-0 w-[3px] origin-top rounded-full bg-primary"
      />
      {children}
    </div>
  );
}
