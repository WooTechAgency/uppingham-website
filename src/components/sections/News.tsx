'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';

type NewsItem = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export function News() {
  const t = useTranslations('news');

  // TODO: Replace placeholder content with final Figma copy.
  const items: NewsItem[] = [
    {
      id: 'term-start',
      date: t('items.termStart.date'),
      title: t('items.termStart.title'),
      description: t('items.termStart.description'),
      image: t('items.termStart.image'),
      imageAlt: t('items.termStart.imageAlt'),
    },
    {
      id: 'student-exhibition',
      date: t('items.studentExhibition.date'),
      title: t('items.studentExhibition.title'),
      description: t('items.studentExhibition.description'),
      image: t('items.studentExhibition.image'),
      imageAlt: t('items.studentExhibition.imageAlt'),
    },
    {
      id: 'sports-morning',
      date: t('items.sportsMorning.date'),
      title: t('items.sportsMorning.title'),
      description: t('items.sportsMorning.description'),
      image: t('items.sportsMorning.image'),
      imageAlt: t('items.sportsMorning.imageAlt'),
    },
    {
      id: 'outdoor-learning',
      date: t('items.outdoorLearning.date'),
      title: t('items.outdoorLearning.title'),
      description: t('items.outdoorLearning.description'),
      image: t('items.outdoorLearning.image'),
      imageAlt: t('items.outdoorLearning.imageAlt'),
    },
  ];

  return (
    <section className="relative " aria-label={t('sectionLabel')}>
      <div className="container py-25 bg-stone z-20 relative">
        <div className="flex flex-col items-center gap-4 text-center">
          <Text
            as="span"
            variant="smallHeading"
            className="text-secondary mb-6"
          >
            {t('eyebrow')}
          </Text>
          <Heading as="h2" variant="h2">
            {t('heading')}
          </Heading>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between gap-8 pr-[30px] border-r border-dark-stone"
            >
              <div className="flex flex-col gap-8">
                <div className="w-full h-[1px] bg-dark-stone h-[1px]"></div>
                <div className="relative aspect-[375/400] w-full overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    hoverZoom
                  />
                </div>
                <Text
                  as="span"
                  variant="menuFooter"
                  align="left"
                  className="text-primary/70"
                >
                  {item.date}
                </Text>
                <Heading
                  as="h3"
                  variant="h4"
                  align="left"
                  className="text-secondary"
                >
                  {item.title}
                </Heading>
                <Text
                  as="p"
                  variant="menuFooter"
                  align="left"
                  className="text-primary"
                >
                  {item.description}
                </Text>
              </div>

              <div className="w-full h-[1px] bg-dark-stone h-[1px]"></div>
            </article>
          ))}
        </div>

        <div className="mt-[75px] flex justify-center">
          <Button
            href={t('ctaHref')}
            variant="primary"
            size="lg"
            className="min-w-[300px]"
          >
            {t('ctaLabel')}
          </Button>
        </div>
      </div>
    </section>
  );
}
