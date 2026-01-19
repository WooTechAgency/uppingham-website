'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';
import { RedLine } from '../ui/RedLine';

export function HeroSection() {
  const t = useTranslations('hero');
  const locale = useLocale();

  return (
    <section className="relative flex items-center justify-between z-20">
      <div className="container">
        <div className="h-full flex flex-col items-center justify-between gap-[clamp(80px,8vh,138px)] pt-[clamp(80px,8vh,138px)]">
          <RedLine />
          {/* Line 1: from top to above heading (stops before "WHERE TOMORROW'S LEADERS ARE MADE") */}
          {/* <div className="w-[1px] flex-1 min-h-[clamp(80px,8vh,138px)] bg-red mx-auto relative z-10" /> */}
          {/* Main Heading */}
          <div className="text-center relative flex flex-col items-center gap-6 z-20 bg-stone py-[50px] bg-stone">
            <Heading
              as="h1"
              variant={locale === 'vi' ? 'h2' : 'h1'}
              align="center"
            >
              <span dangerouslySetInnerHTML={{ __html: t('heading') }} />
            </Heading>
            <Button
              href="/admissions"
              variant="primary"
              size="lg"
              className="min-w-[300px]"
            >
              {t('ctaButton')}
            </Button>
          </div>

          {/* Line 2: from below button to bottom (between button and tagline text) */}
          {/* <div className="w-[1px] flex-1 min-h-[clamp(80px,8vh,138px)] bg-red mx-auto relative z-10" /> */}

          {/* Descriptive Text Section */}
          <div className="w-full max-w-4xl px-4 gap-4 flex flex-col pt-[50px] z-20 bg-stone ">
            {/* Tagline */}
            <Text
              as="p"
              variant="body"
              align="center"
              className={cn('text-secondary text-xl font-tt-norms font-[450]')}
            >
              {t('tagline')}
            </Text>

            {/* Description */}
            <Text
              as="p"
              variant="body"
              align="center"
              className={cn(
                'text-primary text-xl font-tt-norms font-[400] leading-relaxed'
              )}
            >
              {t('description')}
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}
