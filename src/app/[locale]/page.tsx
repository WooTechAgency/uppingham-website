import { getPageContent } from '@/lib/data/pages';
// import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import {
  Admissions,
  Campus,
  ClassroomSlider,
  Education,
  Headmaster,
  HeroImage,
  HeroSection,
  Learning,
  News,
  ScrollingText,
  VideoSection,
} from '@/components/sections';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('home');
  return {
    title: content?.metadata?.title || 'Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function HomePage() {
  // Option 1: Use page data with BlockRenderer (data-driven)
  // const content = getPageContent('home');
  // return <BlockRenderer sections={content.sections} />;

  // Option 2: Call sections directly (component-driven)
  return (
    <>
      <RedLineWrapper autoFillFirstFold={true} />
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
    </>
  );
}
