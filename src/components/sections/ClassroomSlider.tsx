'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

type Slide = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function ClassroomSlider() {
  const t = useTranslations('classroomSlider');
  const [activeIndex, setActiveIndex] = React.useState(0);

  // TODO: Add remaining slides once Figma provides the full set.
  const slides: Slide[] = [
    {
      id: 'early-foundations',
      title: t('slides.earlyFoundations.title'),
      description: t('slides.earlyFoundations.description'),
      image: t('slides.earlyFoundations.image'),
      imageAlt: t('slides.earlyFoundations.imageAlt'),
    },
  ];

  const hasMultipleSlides = slides.length > 1;
  const activeSlide = slides[activeIndex];

  const handlePrevious = () => {
    if (!hasMultipleSlides) {
      return;
    }
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    if (!hasMultipleSlides) {
      return;
    }
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <section
      className="relative "
      aria-label={t('sectionLabel')}
      style={{
        backgroundImage: 'url(/home/admissions-bg.png)',
        backgroundPosition: 'bottom center',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container relative z-20 flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center z-20 bg-stone py-25">
          <Text
            as="span"
            variant="menuFooter"
            className="text-secondary uppercase tracking-[0.2em]"
          >
            {t('sectionLabel')}
          </Text>
          <Heading as="h2" variant="h2">
            {t('heading')}
          </Heading>
        </div>

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={!hasMultipleSlides}
            aria-label={t('previousButton')}
            className={cn(
              'absolute left-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-primary/30 bg-stone p-3 text-primary transition hover:border-primary lg:flex',
              !hasMultipleSlides && 'cursor-not-allowed opacity-40'
            )}
          >
            <span className="sr-only">{t('previousButton')}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M15 5l-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
            <Image
              src={activeSlide.image}
              alt={activeSlide.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          <div className="flex flex-col gap-4 text-center lg:text-left">
            <Heading as="h3" variant="h4" align="left" className="text-secondary">
              {activeSlide.title}
            </Heading>
            <Text as="p" variant="body" align="left" className="text-primary">
              {activeSlide.description}
            </Text>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!hasMultipleSlides}
            aria-label={t('nextButton')}
            className={cn(
              'absolute right-0 top-1/2 z-30 hidden -translate-y-1/2 rounded-full border border-primary/30 bg-stone p-3 text-primary transition hover:border-primary lg:flex',
              !hasMultipleSlides && 'cursor-not-allowed opacity-40'
            )}
          >
            <span className="sr-only">{t('nextButton')}</span>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}