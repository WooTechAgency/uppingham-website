import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { HeroSection } from '@/components/sections/HeroSection';
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
      <HeroSection />
      {/* Add more sections directly here */}
      {/* <TextSection /> */}
      {/* <FeaturesSection /> */}
    </>
  );
}
