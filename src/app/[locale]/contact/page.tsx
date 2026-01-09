import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('contact');
  return {
    title: content?.metadata?.title || 'Contact - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function ContactPage() {
  const content = getPageContent('contact');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}

