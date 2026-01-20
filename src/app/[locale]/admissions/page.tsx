import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';
import { RedLineWrapper } from '@/components/ui/RedLineWrapper';
import { HeroSection } from '@/components/sections/HeroSection';
import { HeroImage } from '@/components/sections/HeroImage';
import { VideoSection } from '@/components/sections/VideoSection';
import { Headmaster } from '@/components/sections/Headmaster';
import { ClassroomSlider } from '@/components/sections/ClassroomSlider';
import { Campus } from '@/components/sections/Campus';
import { Admissions } from '@/components/sections/Admissions';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('admissions');
  return {
    title: content?.metadata?.title || 'Admissions - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function AdmissionsPage() {
  // const content = getPageContent('admissions');

  // if (!content) {
  //   return <div>Page not found</div>;
  // }

  // return <BlockRenderer sections={content.sections} />;

  // Option 2: Call sections directly (component-driven)
  return (
    <>
      <RedLineWrapper autoFillFirstFold={true} />
      <HeroImage />
      {/* <HeroSection /> */}
      <Headmaster />
      <VideoSection />
     
      <ClassroomSlider />
      <Campus />
      <Admissions />
    </>
  );
}
