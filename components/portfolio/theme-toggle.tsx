import { AnimatedThemeToggler } from '@/components/magicui/animated-theme-toggler';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  return <AnimatedThemeToggler className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }), 'h-11 w-11')} />;
}
