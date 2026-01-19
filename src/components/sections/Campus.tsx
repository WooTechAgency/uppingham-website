'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

export function Campus() {
  const t = useTranslations('campus');

  const campuses = [
    {
      id: 'hung-yen',
      name: t('hungYen.name'),
      opening: t('hungYen.opening'),
      image: '/home/campus-hungyen.jpg',
      imageAlt: t('hungYen.imageAlt'),
      href: t('hungYen.href'),
    },
    {
      id: 'dong-nai',
      name: t('dongNai.name'),
      opening: t('dongNai.opening'),
      image: '/home/campus-dongnai.jpg',
      imageAlt: t('dongNai.imageAlt'),
      href: t('dongNai.href'),
    },
  ];

  return (
    <section className="relative py-25">
       {/* before:content-[''] before:absolute before:top-0 before:left-[50%] before:w-[1px] before:h-full before:bg-red before:z-[21] before:translate-x-[-50%] */}
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 2xl:gap-30 items-center">
          {campuses.map((campus, index) => (
            <div key={campus.id} className={cn('relative flex flex-col')}>
              {/* Image */}
              <div className="relative w-full aspect-[78/50] mb-[clamp(32px,2vw,50px)]">
                <Image
                  src={campus.image}
                  alt={campus.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-5">
                {/* Title */}
                <Heading as="h3" variant="h3" align="left">
                  {campus.name}
                </Heading>

                {/* Opening Year */}
                <Text
                  as="p"
                  variant="body"
                  align="left"
                  className="text-primary"
                >
                  {campus.opening}
                </Text>

                {/* CTA Button */}
                <div className="mt-2">
                  <Button
                    href={campus.href}
                    variant="primary"
                    size="lg"
                    className="min-w-[300px]"
                  >
                    {t('discoverButton')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
