import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('campuses');
  return {
    title: content?.metadata?.title || 'Our Campuses - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function CampusesPage() {
  const content = getPageContent('campuses');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}

