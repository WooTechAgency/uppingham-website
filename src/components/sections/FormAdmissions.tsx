import { useTranslations } from 'next-intl';
import { Button, Heading, Select, Text } from '@/components/ui';

export function FormAdmissions() {
  const t = useTranslations('formAdmissions');

  const days = Array.from({ length: 31 }, (_, index) => {
    const value = String(index + 1).padStart(2, '0');
    return { value, label: value };
  });
  const months = Array.from({ length: 12 }, (_, index) => {
    const value = String(index + 1).padStart(2, '0');
    return { value, label: value };
  });
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 21 }, (_, index) => {
    const value = String(currentYear - index);
    return { value, label: value };
  });

  return (
    <section className="relative bg-primary py-[220px] text-white mt-25">
      <div className="container">
        <div className="flex flex-col items-center gap-[75px] py-[75px] z-20 bg-primary relative">
          <div className="flex flex-col items-center gap-8 text-center">
            <Heading as="h2" variant="h1" className="text-white">
              {t('heading')}
            </Heading>
            <Text as="p" variant="body">
              {t('description')}
            </Text>
          </div>
          <div className="flex flex-col items-center">
            <Heading
              as="h3"
              variant="h5"
              className="mb-[50px]  normal-case font-[400]"
            >
              <span dangerouslySetInnerHTML={{ __html: t('question') }} />
            </Heading>

            <div className="flex flex-wrap items-center justify-center gap-8 mb-8">
              <Select id="dob-day" label={t('day')} options={days} />
              <Select id="dob-month" label={t('month')} options={months} />
              <Select id="dob-year" label={t('year')} options={years} />
            </div>

            <Button
              href={t('ctaHref')}
              variant="primary"
              size="lg"
              className="w-full min-w-[300px] hover:bg-transparent hover:text-white hover:border-white"
            >
              {t('ctaLabel')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
