'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Image } from '@/components/ui/Image';
import { cn } from '@/lib/utils/cn';

type ScrollingTextProps = {
  className?: string;
  backgroundSrc?: string;
  backgroundAlt?: string;
};

export function ScrollingText({
  className,
  backgroundSrc,
  backgroundAlt,
}: ScrollingTextProps) {
  const t = useTranslations('scrollingText');
  const text = t('text');
  const resolvedBackgroundSrc = backgroundSrc ?? t('backgroundImage');
  const resolvedBackgroundAlt = backgroundAlt ?? t('backgroundAlt');

  return (
    <section className={cn('relative w-full aspect-[1920/1080] overflow-hidden z-20', className)}>
      <Image
          src={resolvedBackgroundSrc}
          alt={resolvedBackgroundAlt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      <div className="absolute inset-0 bg-black/35" />
      <div className="container h-full">
        <div className="relative flex items-center justify-center h-full w-full max-w-[72%] lg:max-w-[60%] mx-auto">
            <div className="w-full text-center">
              {text.split(' ').map((word, wordIndex) => (
                <span
                  key={`${word}-${wordIndex}`}
                  className="inline-flex whitespace-nowrap"
                >
                  {word.split('').map((char, charIndex) => (
                    <span
                      key={`${word}-${char}-${charIndex}`}
                      className="inline-block animate-fadeinup-char text-white uppercase text-[clamp(24px,2vw,36px)] leading-[1.38]"
                      style={{
                        animationDelay: `${(wordIndex * 10 + charIndex) * 30}ms`,
                      }}
                    >
                      {char}
                    </span>
                  ))}
                  <span
                    aria-hidden="true"
                    className="inline-block animate-fadeinup-char text-white uppercase text-[clamp(24px,2vw,36px)] leading-[1.38]"
                    style={{
                      animationDelay: `${(wordIndex * 10 + word.length) * 30}ms`,
                    }}
                  >
                    &nbsp;
                  </span>
                </span>
              ))}
            </div>
        </div>
      </div>
      
    </section>
  );
}