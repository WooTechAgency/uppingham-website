export type SectionType =
  | 'hero'
  | 'text'
  | 'image'
  | 'features'
  | 'testimonials'
  | 'cta'
  | 'gallery'
  | 'accordion'
  | 'stats'
  | 'timeline';

export type PageSection = {
  type: SectionType;
  id: string;
  props?: Record<string, unknown>;
};

export type PageContent = {
  sections: PageSection[];
  metadata?: {
    title?: string;
    description?: string;
  };
};

