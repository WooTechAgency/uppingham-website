import { getPageContent } from '@/lib/data/pages';
// import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import {
  Admissions,
  Campus,
  ClassroomSlider,
  Education,
  DownloadProspectus,
  FormAdmissions,
  Headmaster,
  HeroSection,
  Learning,
  News,
  ScrollingText,
  VideoSection,
} from '@/components/sections';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';
import { Quicklink } from '@/components/ui/Quicklink';
import { Metadata } from 'next';
import { Locale } from '@/lib/i18n/config';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('home');
  return {
    title: content?.metadata?.title || 'Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  const menuItems = [
    {
      key: 'academicLife',
      href: `/${locale}/learning/academic-life`,
    },
    {
      key: 'internationalCurriculum',
      children: [
        {
          key: 'juniorSchool',
          href: `/${locale}/learning/curriculum/junior-school`,
        },
        {
          key: 'seniorSchool',
          href: `/${locale}/learning/curriculum/senior-school`,
        },
        {
          key: 'sixthForm',
          href: `/${locale}/learning/curriculum/sixth-form`,
        },
      ],
    },
    {
      key: 'bilingualCurriculum',
      href: `/${locale}/learning/bilingual-curriculum`,
    },
    {
      key: 'academicSupport',
      href: `/${locale}/learning/academic-support`,
    },
    {
      key: 'academicResults',
      href: `/${locale}/learning/academic-results`,
    },
    {
      key: 'calendarTimetable',
      href: `/${locale}/learning/calendar`,
    },
  ];
  // Option 1: Use page data with BlockRenderer (data-driven)
  // const content = getPageContent('home');
  // return <BlockRenderer sections={content.sections} />;

  // Option 2: Call sections directly (component-driven)
  return (
    <>
      <RedLineWrapper autoFillFirstFold={true} />
      <Quicklink menuTitle="Learning" menuItems={menuItems} />
      {/* <HeroImage /> */}

      <HeroSection />
      <VideoSection />
      <Headmaster />
      <ClassroomSlider />
      <Campus />
      <Admissions />
      <ScrollingText />
      <Education />
      <Learning />
      <News />
      <FormAdmissions />
      <DownloadProspectus />
    </>
  );
}
