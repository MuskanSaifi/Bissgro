import SectionRenderer from './SectionRenderer';

async function getHomePage() {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/pages?home=true`, { cache: 'no-store' });
    const data = await res.json();
    return data.page;
  } catch (error) {
    console.error('Error fetching home:', error);
    return null;
  }
}

export default async function DynamicHome() {
  const page = await getHomePage();

  if (!page?.sections?.length) {
    const defaultSections = [
      { type: 'hero', order: 0, content: {} },
      { type: 'services', order: 1, content: {} },
      { type: 'about', order: 2, content: {} },
      { type: 'tech', order: 3, content: {} },
      { type: 'testimonials', order: 4, content: {} },
      { type: 'contact', order: 5, content: {} },
      { type: 'newsletter', order: 6, content: {} },
    ];
    return (
      <>
        {defaultSections.sort((a, b) => a.order - b.order).map((s, i) => (
          <SectionRenderer key={i} section={s} />
        ))}
      </>
    );
  }

  const sorted = [...page.sections].sort((a, b) => (a.order || 0) - (b.order || 0));
  return (
    <>
      {sorted.map((section, i) => (
        <SectionRenderer key={section._id || i} section={section} />
      ))}
    </>
  );
}
