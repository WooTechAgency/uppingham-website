import { HeroSection } from '@/components/sections/HeroSection';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About Us - Uppingham Vietnam',
    description: 'Learn about Uppingham Vietnam',
  };
}

export default function AboutPage() {
  // Call sections directly - no need for page data
  return (
    <>
      <HeroSection />
      {/* Add more sections as needed */}
      {/* <TextSection /> */}
      {/* <ImageSection /> */}
    </>
  );
}
