import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

type HeroImageProps = {
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
  eyebrow?: string;
  heading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  headingAs?: 'h1' | 'h2';
  headingVariant?: 'h1' | 'h2';
};

export function HeroImage({
  className,
  imageSrc,
  imageAlt,
  eyebrow,
  heading,
  ctaLabel,
  ctaHref,
  headingAs = 'h1',
  headingVariant = 'h1',
}: HeroImageProps) {
  const t = useTranslations('heroImage');

  const resolvedImageSrc = imageSrc ?? t('imageSrc');
  const resolvedImageAlt = imageAlt ?? t('imageAlt');
  const resolvedEyebrow = eyebrow ?? t('eyebrow');
  const resolvedHeading = heading ?? t('heading');
  const resolvedCtaLabel = ctaLabel ?? t('ctaLabel');
  const resolvedCtaHref = ctaHref ?? t('ctaHref');
  const showCta = Boolean(resolvedCtaLabel && resolvedCtaHref);

  return (
    <section className={cn(' relative z-20 overflow-hidden', className)}>
      <div className="container relative">
        <div className="relative w-full">
          {/* Background image */}
          <div className="absolute inset-0 ">
            <Image
              src={resolvedImageSrc}
              alt={resolvedImageAlt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" /> */}
          </div>
          {/* Content */}
          <div className="relative z-10 flex w-full flex-col items-center justify-center gap-0 text-center ratio-1680/886">
            {/* Line 1: from top to above heading (stops before "WHERE TOMORROW'S LEADERS ARE MADE") */}
            <div className="w-[1px] flex-1 min-h-[clamp(80px,8vh,138px)]  bg-red mx-auto relative z-10 animate-redline" /> 
            <div className="wrap-conttent-hero relative py-[50px]">
              <Heading
                as="h3"
                variant="h5"
                className="text-white mb-5 font-tag normal-case"
              >
                {resolvedEyebrow}
              </Heading>
              <Heading
                as={headingAs}
                variant={headingVariant}
                align="center"
                className="text-white mb-[50px]"
              >
                {resolvedHeading}
              </Heading>
              {showCta ? (
                <Button href={resolvedCtaHref} variant="primary" size="lg" className="min-w-[300px] hover:border-white hover:bg-transparent hover:text-white"> 
                  {resolvedCtaLabel}
                </Button>
              ) : null}
            </div>
            {/* Line 2: from heading to bottom (between button and tagline text) */}
            <div className="w-[1px] flex-1 min-h-[clamp(80px,8vh,138px)] bg-red mx-auto relative z-10 animate-redline-delay" /> 
          </div>
        </div>
      </div>
        
      
    </section>
  );
}