'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Text } from '@/components/ui/Text';
import { Button } from '@/components/ui/Button';
import { Image } from '@/components/ui/Image';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';

export function Headmaster() {
  const t = useTranslations('headmaster');

  return (
    <section className="relative pt-50 pb-25 before:content-[''] before:absolute before:top-0 before:left-[50%] before:w-[1px] before:h-full before:bg-red before:z-[21] before:translate-x-[-50%]">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 2xl:gap-30 items-center">
          {/* Left Column - Image */}
          <div className="relative w-full aspect-[780/874]">
            <Image
              src={'/home/headmaster.jpg'}
              alt={t('imageAlt')}
              fill
              className="object-cover w-full h-full"
              sizes=""
            />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col gap-12">
            {/* Heading */}
            <Heading as="h2" variant="h2" align="left">
              {t('heading')}
            </Heading>

            {/* Tagline */}
            <Heading
              as="h3"
              variant="h3"
              align="left"
              className={cn('font-tag normal-case text-red')}
            >
              {t('tagline')}
            </Heading>

            {/* Paragraph 1 */}
            <Text as="p" variant="body" align="left">
              {t('paragraph1')}
            </Text>

            {/* Paragraph 2 */}
            <Text as="p" variant="body" align="left">
              {t('paragraph2')}
            </Text>

            {/* CTA Button */}
            <div className="mt-4">
              <Button
                href={t('ctaButtonHref')}
                variant="primary"
                size="lg"
                className="min-w-[300px]"
              >
                {t('ctaButton')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
