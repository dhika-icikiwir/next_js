'use client';

// Diadaptasi dari Magic UI (MIT, lihat LICENSE): https://magicui.design/docs/components/scroll-progress
// Perubahan: warna memakai token tema, bukan gradien bawaan.

import { motion, useScroll, type MotionProps } from 'motion/react';

import { cn } from '@/lib/utils';

interface ScrollProgressProps extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps> {
  ref?: React.Ref<HTMLDivElement>;
}

export function ScrollProgress({ className, ref, ...props }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn('fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-brass', className)}
      style={{ scaleX: scrollYProgress }}
      {...props}
    />
  );
}
