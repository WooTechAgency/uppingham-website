import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('community');
  return {
    title: content?.metadata?.title || 'Community - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function CommunityPage() {
  const content = getPageContent('community');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}
