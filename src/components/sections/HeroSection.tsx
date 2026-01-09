'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Button } from '@/components/ui/Button';
import { Text } from '@/components/ui/Text';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils/cn';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative bg-white min-h-screen flex items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Vertical line accents - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px pointer-events-none z-0">
        {/* Top line - from top to above heading (stops before heading) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px bg-[#FF9E94] opacity-60"
          style={{ height: '30vh', maxHeight: '300px' }}
        />
        {/* Bottom line - from below button to bottom (starts after button) */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-[#FF9E94] opacity-60"
          style={{ height: '30vh', maxHeight: '300px' }}
        />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="flex flex-col items-center gap-8 md:gap-12">
          {/* Main Heading */}
          <div className="text-center space-y-2 md:space-y-4 px-4">
            <Heading
              as="h1"
              variant="h1"
              align="center"
              className="text-[#00003C]"
            >
              {t('headingLine1')}
            </Heading>
            <Heading
              as="h1"
              variant="h1"
              align="center"
              className="text-[#00003C]"
            >
              {t('headingLine2')}
            </Heading>
          </div>

          {/* CTA Button */}
          <div className="relative z-10">
            <Button
              href="/admissions"
              variant="primary"
              size="lg"
              className="min-w-[300px]"
            >
              {t('ctaButton')}
            </Button>
          </div>

          {/* Descriptive Text Section */}
          <div className="mt-16 md:mt-24 w-full max-w-4xl space-y-4 px-4 text-left">
            {/* Tagline */}
            <Text
              as="p"
              variant="body"
              align="left"
              className={cn(
                'text-[#E13246] text-lg md:text-xl font-tt-norms font-[450]'
              )}
            >
              {t('tagline')}
            </Text>

            {/* Description */}
            <Text
              as="p"
              variant="body"
              align="left"
              className={cn(
                'text-[#00003C] text-base md:text-lg font-tt-norms font-[400] leading-relaxed'
              )}
            >
              {t('description')}
            </Text>
          </div>
        </div>
      </Container>
    </section>
  );
}
