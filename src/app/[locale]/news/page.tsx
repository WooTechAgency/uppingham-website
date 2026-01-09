import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('news');
  return {
    title: content?.metadata?.title || 'News - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function NewsPage() {
  const content = getPageContent('news');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}

