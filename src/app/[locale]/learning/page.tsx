import { HeroSection } from '@/components/sections/HeroSection';
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';
import { Quicklink } from '@/components/ui/Quicklink';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Learning - Uppingham Vietnam',
    description: 'Our learning approach',
  };
}

type LearningPageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function LearningPage({ params }: LearningPageProps) {
  const { locale } = await params;
  const menuItems = [
    { key: 'academicLife', href: `/${locale}/learning/academic-life` },
    {
      key: 'internationalCurriculum',
      href: `/${locale}/learning/international-curriculum`,
      children: [
        {
          key: 'juniorSchool',
          href: `/${locale}/learning/curriculum/junior-school`,
        },
        {
          key: 'seniorSchool',
          href: `/${locale}/learning/curriculum/senior-school`,
        },
        { key: 'sixthForm', href: `/${locale}/learning/curriculum/sixth-form` },
      ],
    },
    {
      key: 'bilingualCurriculum',
      href: `/${locale}/learning/bilingual-curriculum`,
    },
    { key: 'academicSupport', href: `/${locale}/learning/academic-support` },
    { key: 'academicResults', href: `/${locale}/learning/academic-results` },
    {
      key: 'calendarTimetable',
      href: `/${locale}/learning/calendar-timetable`,
    },
  ];

  return (
    <>
      <RedLineWrapper autoFillFirstFold={true} />
      <Quicklink menuTitle="Learning" menuItems={menuItems} />
      <HeroSection />
      {/* Add more sections as needed */}
    </>
  );
}
