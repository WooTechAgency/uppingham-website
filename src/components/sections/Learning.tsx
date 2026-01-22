'use client';

import * as React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

type Slide = {
  id: string;
  title: string;
  image: string;
};

export function Learning() {
  const t = useTranslations('learning');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  // TODO: Replace placeholder slides with final Figma copy when available.
  const slides: Slide[] = [
    {
      id: 'holistic-development',
      title: t('slides.holistic.title'),
      image: t('slides.holistic.image'),
    },
    {
      id: 'enrichment',
      title: t('slides.enrichment.title'),
      image: t('slides.enrichment.image'),
    },
    {
      id: 'global-awareness',
      title: t('slides.global.title'),
      image: t('slides.global.image'),
    },
    {
      id: 'character',
      title: t('slides.character.title'),
      image: t('slides.character.image'),
    },
    {
      id: 'holistic-development2',
      title: t('slides.holistic.title'),
      image: t('slides.holistic.image'),
    },
    {
      id: 'enrichment2',
      title: t('slides.enrichment.title'),
      image: t('slides.enrichment.image'),
    },
    {
      id: 'global-awareness2',
      title: t('slides.global.title'),
      image: t('slides.global.image'),
    },
    {
      id: 'character2',
      title: t('slides.character.title'),
      image: t('slides.character.image'),
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
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
      className="relative mt-25 pb-25 z-20"
      aria-label={t('sectionLabel')}
    >
      <div className="container">
        <div className="flex items-end justify-between gap-4">
          <div className="flex flex-col gap-4 lg:max-w-[50%]">
            <Text
              align="left"
              as="span"
              variant="smallHeading"
              className="mb-6"
            >
              {t('eyebrow')}
            </Text>
            <Heading as="h2" variant="h2" align="left" className="leading-[1]">
              {t('heading')}
            </Heading>
          </div>
          <div className="flex flex-col gap-4 lg:max-w-[50%]">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={!hasMultipleSlides || !canScrollPrev}
                aria-label={t('previousButton')}
                className={cn(
                  'hidden p-3 text-primary transition flex cursor-pointer disabled:cursor-not-allowed',
                )}
              >
                <span className="sr-only">{t('previousButton')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="14"
                  viewBox="0 0 28 14"
                  fill="none"
                >
                  <path
                    d="M27.0703 6.77588L2.07031 6.77588"
                    stroke={
                      hasMultipleSlides && canScrollPrev ? '#00003C' : '#DEDEC9'
                    }
                    strokeWidth="1.71429"
                  />
                  <path
                    d="M7.21094 0.605957L1.21094 6.60596L7.21094 12.606"
                    stroke={
                      hasMultipleSlides && canScrollPrev ? '#00003C' : '#DEDEC9'
                    }
                    strokeWidth="1.71429"
                  />
                </svg>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={!hasMultipleSlides || !canScrollNext}
                aria-label={t('nextButton')}
                className={cn(
                  'hidden p-3 text-primary transition hover:border-primary lg:flex cursor-pointer disabled:cursor-not-allowed ',
                )}
              >
                <span className="sr-only">{t('nextButton')}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="14"
                  viewBox="0 0 28 14"
                  fill="none"
                >
                  <path
                    d="M0 6.77588L25 6.77588"
                    stroke={
                      hasMultipleSlides && canScrollNext ? '#00003C' : '#DEDEC9'
                    }
                    strokeWidth="1.71429"
                  />
                  <path
                    d="M19.8594 0.605957L25.8594 6.60596L19.8594 12.606"
                    stroke={
                      hasMultipleSlides && canScrollNext ? '#00003C' : '#DEDEC9'
                    }
                    strokeWidth="1.71429"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-0">
        <div className="container">
          <div className="relative -mr-[calc((100vw-100%)/2)] bg-stone py-[75px] ">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex gap-[30px] mr-6">
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    className="flex flex-col justify-between gap-8 min-w-0 flex-[0_0_56%] sm:flex-[0_0_35%] lg:flex-[0_0_28%] pr-[30px] border-r border-dark-stone"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="w-full h-[1px] bg-dark-stone h-[1px]"></div>
                      <div className="relative aspect-[375/400] w-full overflow-hidden bg-white">
                        <Image
                          hoverZoom
                          src={slide.image}
                          alt={slide.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 80vw, 32vw"
                        />
                      </div>
                      <Heading
                        as="h4"
                        variant="h4"
                        align="left"
                        className="text-secondary uppercase "
                      >
                        <span
                          dangerouslySetInnerHTML={{ __html: slide.title }}
                        />
                      </Heading>
                    </div>
                    <div className="w-full h-[1px] bg-dark-stone h-[1px]"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
