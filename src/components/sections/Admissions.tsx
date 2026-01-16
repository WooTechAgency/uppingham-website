'use client';

import { useTranslations } from 'next-intl';
import { Heading } from '@/components/ui/Heading';
import { Image } from '@/components/ui/Image';
import { Text } from '@/components/ui/Text';
import { cn } from '@/lib/utils/cn';

export function Admissions() {
  const t = useTranslations('admissions');

  const stages = [
    {
      id: 'early-years',
      ageRange: t('earlyYears.ageRange'),
      name: t('earlyYears.name'),
      image: '/home/early-year.jpg',
      imageAlt: t('earlyYears.imageAlt'),
    },
    {
      id: 'primary',
      ageRange: t('primary.ageRange'),
      name: t('primary.name'),
      image: '/home/primary.jpg',
      imageAlt: t('primary.imageAlt'),
    },
    {
      id: 'secondary',
      ageRange: t('secondary.ageRange'),
      name: t('secondary.name'),
      image: '/home/secondary.jpg',
      imageAlt: t('secondary.imageAlt'),
    },
  ];

  return (
    // <section
    //   className=" bg-no-repeat bg-contain bg-bottom-center relative pt-25 pb-[275px] before:content-[''] before:absolute before:top-0 before:left-[50%] before:w-[1px] before:h-full before:bg-red before:z-[1] before:translate-x-[-50%]"
    //   style={{
    //     backgroundImage: 'url(/home/admissions-bg.png)',
    //     backgroundPosition: 'bottom center',
    //   }}
    // >
    <section
      className=" bg-no-repeat bg-contain bg-bottom-center relative p6-25 pb-[275px] "
      style={{
        backgroundImage: 'url(/home/admissions-bg.png)',
        backgroundPosition: 'bottom center',
      }}
    >
      <div className="container z-10 relative">
        <div className=" flex flex-col items-center gap-12 mt-25 py-[75px] bg-stone">
          {/* Small Heading */}
          <Text
            as="p"
            variant="body"
            align="center"
            className="text-secondary font-tag"
          >
            {t('heading')}
          </Text>

          {/* Main Slogan */}
          <Heading as="h2" variant="h2" align="center">
            {t('slogan')}
          </Heading>
        </div>

        {/* Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 pb-[75px] before:content-[''] before:absolute before:bottom-0 before:left-[50%] before:w-[1px] before:h-[75px] before:bg-stone before:z-[1] before:translate-x-[-50%]">
          {stages.map((stage) => (
            <div key={stage.id} className="relative">
              {/* Image Container */}
              <div className="relative w-full aspect-[52/80]">
                <Image
                  src={stage.image}
                  alt={stage.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Text Overlay */}
                <div className="flex flex-col justify-end items-center absolute h-[50%] bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-transparent p-[clamp(32px,2vw,60px)]">
                  <div className="flex items-center flex-col gap-3">
                    <Text
                      as="p"
                      variant="body"
                      align="left"
                      className="text-white font-tag"
                    >
                      {stage.ageRange}
                    </Text>
                    <Heading
                      as="h3"
                      variant="h3"
                      align="left"
                      className="text-white font-tt-norms uppercase"
                    >
                      {stage.name}
                    </Heading>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
