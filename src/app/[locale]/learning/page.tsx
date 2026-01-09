import { HeroSection } from '@/components/sections/HeroSection';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Learning - Uppingham Vietnam',
    description: 'Our learning approach',
  };
}

export default function LearningPage() {
  return (
    <>
      <HeroSection />
      {/* Add more sections as needed */}
    </>
  );
}

