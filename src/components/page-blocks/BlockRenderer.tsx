import { HeroSection } from '@/components/sections/HeroSection';
import type { PageSection } from '@/types/page';

type BlockRendererProps = {
  sections: PageSection[];
};

// Map section types to components
const sectionComponents: Record<
  string,
  React.ComponentType<Record<string, unknown>>
> = {
  hero: HeroSection,
  // Add more section components here as they are created
  // text: TextSection,
  // image: ImageSection,
  // features: FeaturesSection,
  // etc.
};

export function BlockRenderer({ sections }: BlockRendererProps) {
  return (
    <>
      {sections.map((section) => {
        const Component = sectionComponents[section.type];

        if (!Component) {
          console.warn(`Unknown section type: ${section.type}`);
          return null;
        }

        return <Component key={section.id} {...(section.props || {})} />;
      })}
    </>
  );
}
