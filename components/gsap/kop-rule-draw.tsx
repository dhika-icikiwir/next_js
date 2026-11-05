'use client';

import { useRef } from 'react';

import { cn } from '@/lib/utils';
import { gsap, MOTION_OK, useGSAP } from '@/components/gsap/register';

// Garis kop surat yang tergambar dari kiri ke kanan saat surat kontak terlihat.
export function KopRuleDraw({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.from(ref.current, {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.9,
          delay: 0.25,
          ease: 'power2.out',
          scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return <div ref={ref} aria-hidden="true" className={cn('kop-rule', className)} />;
}
