import type { PageContent } from '@/types/page';

// Mock data for pages - will be replaced with API calls later
export const pageData: Record<string, PageContent> = {
  home: {
    sections: [
      {
        type: 'hero',
        id: 'hero-1',
        props: {},
      },
    ],
    metadata: {
      title: 'Uppingham Vietnam - Where Tomorrow\'s Leaders Are Made',
      description: 'Rooted in over four centuries of excellence, Uppingham empowers young people to thrive.',
    },
  },
  about: {
    sections: [
      {
        type: 'hero',
        id: 'about-hero',
        props: {},
      },
      // Add more sections as needed
    ],
    metadata: {
      title: 'About Us - Uppingham Vietnam',
      description: 'Learn about Uppingham Vietnam',
    },
  },
  learning: {
    sections: [
      {
        type: 'hero',
        id: 'learning-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Learning - Uppingham Vietnam',
      description: 'Our learning approach',
    },
  },
  life: {
    sections: [
      {
        type: 'hero',
        id: 'life-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Life at Uppingham - Uppingham Vietnam',
      description: 'Life at Uppingham',
    },
  },
  campuses: {
    sections: [
      {
        type: 'hero',
        id: 'campuses-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Our Campuses - Uppingham Vietnam',
      description: 'Explore our campuses',
    },
  },
  admissions: {
    sections: [
      {
        type: 'hero',
        id: 'admissions-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Admissions - Uppingham Vietnam',
      description: 'Start your admission journey',
    },
  },
  community: {
    sections: [
      {
        type: 'hero',
        id: 'community-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Community - Uppingham Vietnam',
      description: 'Our community',
    },
  },
  news: {
    sections: [
      {
        type: 'hero',
        id: 'news-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'News - Uppingham Vietnam',
      description: 'Latest news and updates',
    },
  },
  contact: {
    sections: [
      {
        type: 'hero',
        id: 'contact-hero',
        props: {},
      },
    ],
    metadata: {
      title: 'Contact Us - Uppingham Vietnam',
      description: 'Get in touch with us',
    },
  },
};

export function getPageContent(slug: string): PageContent | null {
  return pageData[slug] || null;
}

