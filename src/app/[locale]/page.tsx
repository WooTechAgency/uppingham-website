import { getPageContent } from '@/lib/data/pages';
// import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { HeroImage } from '@/components/sections/HeroImage';
import { HeroSection } from '@/components/sections/HeroSection';
import { Headmaster } from '@/components/sections/Headmaster';
import { VideoSection } from '@/components/sections/VideoSection';
import { Campus } from '@/components/sections/Campus';
import { Admissions } from '@/components/sections/Admissions';
import { ClassroomSlider } from '@/components/sections/ClassroomSlider';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';
import { ScrollingText } from '@/components/sections/ScrollingText';

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
     
    </>
  );
}
