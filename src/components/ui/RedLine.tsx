'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

type RedLineProps = {
  className?: string;
};

export function RedLine({ className }: RedLineProps) {
  const [lineHeight, setLineHeight] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const updateLineHeight = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Calculate total scrollable height
      const totalScrollableHeight = documentHeight - windowHeight;

      // Calculate scroll progress (0 to 1)
      const scrollProgress =
        totalScrollableHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / totalScrollableHeight))
          : 0;

      // Line height grows from 0 to 100% as user scrolls
      const currentHeight = scrollProgress * 100;

      setLineHeight(currentHeight);
    };

    // Initial calculation
    updateLineHeight();

    // Throttle scroll events for performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateLineHeight();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateLineHeight, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateLineHeight);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full pointer-events-none z-10 red-line',
        className
      )}
      style={{
        clipPath: `inset(0 0 ${100 - lineHeight}% 0)`,
      }}
    >
      <div className="w-full h-full bg-red" />
    </div>
  );
}
