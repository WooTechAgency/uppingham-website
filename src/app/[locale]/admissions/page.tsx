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
import { Locale } from '@/lib/i18n/config';
import { Quicklink } from '@/components/ui/Quicklink';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('admissions');
  return {
    title: content?.metadata?.title || 'Admissions - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default async function AdmissionsPage({ params }: AdmissionsPageProps) {
  const { locale } = await params;
  // const content = getPageContent('admissions');
  const menuItems = [
    { key: 'contactUs', href: `/${locale}/contact` },
    { key: 'careers', href: `/${locale}/careers` },
  ];

  // if (!content) {
  //   return <div>Page not found</div>;
  // }

  // return <BlockRenderer sections={content.sections} />;

  // Option 2: Call sections directly (component-driven)
  return (
    <>
      <RedLineWrapper autoFillFirstFold={true} />
      <Quicklink menuTitle="Contact" menuItems={menuItems} />
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
