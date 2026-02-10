import SectionRenderer from '@/components/SectionRenderer';

const STATIC_HOME_SECTIONS = [
  { type: 'hero', order: 0, content: {} },
  { type: 'services', order: 1, content: {} },
  { type: 'about', order: 2, content: {} },
  { type: 'tech', order: 3, content: {} },
  { type: 'testimonials', order: 4, content: {} },
  { type: 'contact', order: 5, content: {} },
  { type: 'newsletter', order: 6, content: {} },
];

export default function Home() {
  const sections = [...STATIC_HOME_SECTIONS].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      {sections.map((section, i) => (
        <SectionRenderer key={section._id || i} section={section} />
      ))}
    </>
  );
}
