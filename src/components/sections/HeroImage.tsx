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
    <section className={cn(' overflow-hidden', className)}>
      <div className="container">
        <div className="relative">
          <div className="absolute inset-0">
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

          <div className="container relative z-10 flex min-h-[clamp(360px,60vh,640px)] flex-col items-center justify-center gap-6 py-25 text-center">
            <Text
              as="span"
              variant="menuFooter"
              className="text-white uppercase tracking-[0.2em]"
            >
              {resolvedEyebrow}
            </Text>
            <Heading
              as={headingAs}
              variant={headingVariant}
              align="center"
              className="text-white"
            >
              {resolvedHeading}
            </Heading>
            {showCta ? (
              <Button href={resolvedCtaHref} variant="primary" size="lg" className="min-w-[300px]"> 
                {resolvedCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>
        
      </div>
    </section>
  );
}