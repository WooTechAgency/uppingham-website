import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('life');
  return {
    title: content?.metadata?.title || 'Life - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function LifePage() {
  const content = getPageContent('life');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}

