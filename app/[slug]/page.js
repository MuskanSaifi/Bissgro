import { notFound } from 'next/navigation';
import SectionRenderer from '@/components/SectionRenderer';
import Link from 'next/link';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bissgro.com';

const RESERVED = [
  'blog',
  'admin',
  'api',
  'contact-us',
  'about-us',
  'plans',
  'privacy-policy',
  'refund-policy',
  'shipping-policy',
  'terms-conditions',
  'duns-number',
];

async function getPage(slug) {
  try {
    const res = await fetch(
      `${BASE_URL}/api/pages?slug=${encodeURIComponent(slug)}`,
      { cache: 'no-store' }
    );

    if (!res.ok) {
      console.error('Failed to fetch page');
      return null;
    }

    const data = await res.json();
    return data.page || null;
  } catch (error) {
    console.error('Error fetching page:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;

  if (RESERVED.includes(slug)) return {};

  const page = await getPage(slug);

  if (!page) {
    return { title: 'Page Not Found | Bissgro' };
  }

  const canonicalUrl = `${BASE_URL}/${slug}`;

  return {
    title: page.metaTitle || `${page.title} | Bissgro`,
    description: page.metaDescription || page.title,
    keywords: page.metaKeywords || undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    robots: {
      index: true,
      follow: true,
    },

    authors: [{ name: 'Bissgro' }],

    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.title,
      url: canonicalUrl,
      siteName: 'Bissgro',
      type: 'website',
      images: page.metaImage
        ? [
            {
              url: page.metaImage,
              width: 1200,
              height: 630,
              alt: page.title,
            },
          ]
        : [],
    },

    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle || page.title,
      description: page.metaDescription || page.title,
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

  const sorted = [...(page.sections || [])].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  const isServicePage =
    typeof slug === 'string' &&
    (slug.includes('-in-noida') ||
      slug.includes('company') ||
      slug.includes('services'));

  return (
    <div
      className={isServicePage ? 'page-type-service' : ''}
      style={{ paddingTop: '90px', minHeight: '100vh' }}
    >
      {sorted.length === 0 ? (
        <section className="container py-5">
          <h1>{page.title}</h1>
          <p>This page has no content yet.</p>
          <Link href="/">← Back to Home</Link>
        </section>
      ) : (
        sorted.map((section, i) => (
          <SectionRenderer
            key={section._id || i}
            section={section}
          />
        ))
      )}
    </div>
  );
}