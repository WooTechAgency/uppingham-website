'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Fade from 'embla-carousel-fade';
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
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);

  // TODO: Replace placeholder slides with final Figma copy when available.
  const slides: Slide[] = [
    {
      id: 'early-foundations',
      title: t('slides.earlyFoundations.title'),
      description: t('slides.earlyFoundations.description'),
      image: t('slides.earlyFoundations.image'),
      imageAlt: t('slides.earlyFoundations.imageAlt'),
    },
    {
      id: 'senior-foundations',
      title: t('slides.seniorFoundations.title'),
      description: t('slides.seniorFoundations.description'),
      image: t('slides.seniorFoundations.image'),
      imageAlt: t('slides.seniorFoundations.imageAlt'),
    },
  ];

  const hasMultipleSlides = slides.length > 1;

  const handlePrevious = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const handleNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const handleSelect = React.useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) {
      return;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    handleSelect();
    emblaApi.on('select', handleSelect);
    emblaApi.on('reInit', handleSelect);

    return () => {
      emblaApi.off('select', handleSelect);
      emblaApi.off('reInit', handleSelect);
    };
  }, [emblaApi, handleSelect]);

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

        <div className="relative">
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

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-0 flex-[0_0_100%] px-0"
                >
                  <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                    </div>

                    <div className="flex flex-col gap-4 text-center lg:text-left">
                      <Heading
                        as="h3"
                        variant="h4"
                        align="left"
                        className="text-secondary"
                      >
                        {slide.title}
                      </Heading>
                      <Text
                        as="p"
                        variant="body"
                        align="left"
                        className="text-primary"
                      >
                        {slide.description}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {hasMultipleSlides ? (
            <div className="mt-8 flex items-center justify-center gap-3 lg:justify-start">
              {scrollSnaps.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(index)}
                  aria-label={t('slideButton', { index: index + 1 })}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full border border-primary transition',
                    index === selectedIndex
                      ? 'bg-primary'
                      : 'bg-transparent hover:border-primary/70'
                  )}
                />
              ))}
            </div>
          ) : null}

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