import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';

export function DownloadProspectus() {
  const t = useTranslations('downloadProspectus');

  return (
    <section className="relative bg-secondary text-white py-25">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 items-center lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-20 lg:gap-18">
          <div className="flex flex-col gap-8 justify-between ">
            <div className="flex flex-col gap-8">
              <Heading as="h2" variant="h2" align="left">
                <span dangerouslySetInnerHTML={{ __html: t('heading') }} />
              </Heading>
              <Text as="p" variant="body" align="left" className="mb-[18px]">
                {t('description')}
              </Text>
              <div>
                <Button
                  href={t('ctaHref')}
                  variant="white"
                  size="lg"
                  className=" min-w-[300px]"
                >
                  {t('ctaLabel')}
                </Button>
              </div>
            </div>
            <Text
              as="p"
              variant="menuFooter"
              align="left"
              className="text-white/80"
            >
              {t.rich('helpText', {
                u: (chunks) => <u>{chunks}</u>,
              })}
            </Text>
          </div>
          <div className="relative aspect-[746/604] w-full overflow-hidden bg-white/5">
            <Image
              src={t('image')}
              alt={t('imageAlt')}
              fill
              className="object-cover w-full h-full"
              sizes="(max-width: 1024px) 100vw, (max-width: 2000px) 50vw, 900px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
