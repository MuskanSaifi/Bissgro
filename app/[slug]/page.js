import { notFound } from 'next/navigation';
import SectionRenderer from '@/components/SectionRenderer';
import Link from 'next/link';

const RESERVED = ['blog', 'admin', 'api', 'contact-us', 'about-us', 'plans', 'privacy-policy', 'refund-policy', 'shipping-policy', 'terms-conditions'];

async function getPage(slug) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${base}/api/pages?slug=${encodeURIComponent(slug)}`, { cache: 'no-store' });
    const data = await res.json();
    return data.page || null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  if (RESERVED.includes(slug)) return {};
  const page = await getPage(slug);
  if (!page) return { title: 'Page Not Found | Bissgro' };
  return {
    title: page.metaTitle || `${page.title} | Bissgro`,
    description: page.metaDescription || page.title,
    keywords: page.metaKeywords,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription,
      images: page.metaImage ? [page.metaImage] : [],
    },
  };
}

export default async function DynamicPage({ params }) {
  const { slug } = params;

  if (RESERVED.includes(slug)) {
    notFound();
  }

  const page = await getPage(slug);
  if (!page) notFound();

  const sorted = [...(page.sections || [])].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      {sorted.length === 0 ? (
        <section className="container py-5">
          <h1>{page.title}</h1>
          <p>This page has no content yet.</p>
          <Link href="/">← Back to Home</Link>
        </section>
      ) : (
        sorted.map((section, i) => (
          <SectionRenderer key={section._id || i} section={section} />
        ))
      )}
    </div>
  );
}
