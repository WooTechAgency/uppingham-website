'use client';

import * as React from 'react';
import { cn } from '@/lib/utils/cn';

export type VideoSectionProps = {
  videoSrc?: string;
  videoPoster?: string;
  className?: string;
};

export function VideoSection({
  videoSrc = '/videos/Uppingham-Vietnam-Introduction-Video.publer.com.mp4',
  videoPoster = '/videos/video-poster.jpg',
  className,
}: VideoSectionProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [width, setWidth] = React.useState(80);

  React.useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;

      // Calculate scroll progress (0 to 1)
      // Start expanding when section enters viewport (sectionTop < windowHeight)
      // Finish expanding when section is fully visible (sectionTop <= 0 && sectionBottom >= windowHeight)

      let scrollProgress = 0;

      if (sectionTop < windowHeight && sectionBottom > 0) {
        // Section is at least partially in viewport
        if (sectionTop <= 0 && sectionBottom >= windowHeight) {
          // Section is fully in viewport - progress = 1
          scrollProgress = 1;
        } else if (sectionTop > 0) {
          // Section is entering from bottom
          // Progress increases from 0 to 1 as sectionTop goes from windowHeight to 0
          scrollProgress = 1 - sectionTop / windowHeight;
        } else {
          // Section top is above viewport (sectionTop < 0)
          // If section bottom is still in viewport, keep progress at 1
          // Otherwise, progress decreases as section leaves
          if (sectionBottom >= windowHeight) {
            scrollProgress = 1;
          } else {
            // Section is leaving from top
            scrollProgress = sectionBottom / windowHeight;
          }
        }

        // Clamp progress between 0 and 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
      }

      // Width from 75% to 100% as user scrolls
      const minWidth = 75;
      const maxWidth = 100;
      const newWidth = minWidth + (maxWidth - minWidth) * scrollProgress;

      setWidth(newWidth);
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn('relative overflow-hidden z-20 ', className)}
    >
      <div className="container">
        <div
          className="bg-stone pt-[75px] mx-auto relative transition-all duration-300 ease-out will-change-[width]"
          style={{
            width: `${width}%`,
          }}
        >
          <div className="relative w-full">
            <video
              ref={videoRef}
              className="w-full h-auto rounded-lg"
              poster={videoPoster}
              playsInline
              muted
              loop
              autoPlay
            >
              <source src={videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
