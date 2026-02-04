import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getBlog(slug) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`, {
      cache: 'no-store',
    });
    const data = await res.json();
    const blog = data.blogs?.find((b) => b.slug === slug && b.published);
    return blog || null;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const blog = await getBlog(params.slug);
  if (!blog) {
    return { title: 'Blog Not Found | Bissgro' };
  }
  const title = blog.metaTitle || `${blog.title} | Bissgro Blog`;
  const description = blog.metaDescription || blog.excerpt || blog.content.replace(/<[^>]*>/g, '').substring(0, 160);
  const ogImage = blog.metaImage || blog.image;
  const metadata = {
    title,
    description,
    keywords: blog.metaKeywords || undefined,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.metaTitle || blog.title,
      description,
      images: [ogImage],
    },
  };
  if (blog.robots) {
    metadata.robots = blog.robots === 'noindex,nofollow' ? 'noindex, nofollow' : blog.robots.replace(/,/g, ', ');
  }
  if (blog.canonicalUrl) {
    metadata.alternates = { canonical: blog.canonicalUrl };
  }
  return metadata;
}

export default async function BlogPost({ params }) {
  const blog = await getBlog(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
        <article style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
          <Link href="/blog" style={{ color: 'var(--accent)', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
            ← Back to Blog
          </Link>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', marginBottom: '20px', lineHeight: 1.2 }}>
            {blog.title}
          </h1>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '30px', color: '#666', fontSize: '14px' }}>
            <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{blog.views || 0} views</span>
            {blog.author?.username && (
              <>
                <span>•</span>
                <span>By {blog.author.username}</span>
              </>
            )}
          </div>

          <img
            src={blog.image}
            alt={blog.title}
            style={{ width: '100%', borderRadius: '12px', marginBottom: '40px', boxShadow: 'var(--card-shadow)' }}
          />

          <div
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: 'var(--text)',
            }}
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </article>
    </div>
  );
}
