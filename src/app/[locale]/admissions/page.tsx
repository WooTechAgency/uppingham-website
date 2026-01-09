import { getPageContent } from '@/lib/data/pages';
import { BlockRenderer } from '@/components/page-blocks/BlockRenderer';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const content = getPageContent('admissions');
  return {
    title: content?.metadata?.title || 'Admissions - Uppingham Vietnam',
    description: content?.metadata?.description || '',
  };
}

export default function AdmissionsPage() {
  const content = getPageContent('admissions');

  if (!content) {
    return <div>Page not found</div>;
  }

  return <BlockRenderer sections={content.sections} />;
}

