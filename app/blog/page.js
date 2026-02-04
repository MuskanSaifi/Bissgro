import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs`, {
      cache: 'no-store',
    });
    const data = await res.json();
    return data.blogs || [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export const metadata = {
  title: 'Blog | Bissgro - Latest Articles & Insights',
  description: 'Read our latest blog posts about web development, app development, SEO, and digital marketing tips.',
};

export default async function BlogPage() {
  const blogs = await getBlogs();

  return (
    <>
      <Header />
      <main style={{ paddingTop: '90px', minHeight: '100vh' }}>
        <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '20px', textAlign: 'center' }}>Our Blog</h1>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '50px', fontSize: '18px' }}>Latest articles, insights, and updates</p>

          {blogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <p style={{ color: '#666', fontSize: '18px' }}>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/blog/${blog.slug}`}
                  style={{
                    background: '#fff',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: 'var(--card-shadow)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    display: 'block',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(15,20,30,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                  }}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '24px' }}>
                    <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '10px', color: 'var(--text)' }}>{blog.title}</h2>
                    <p style={{ color: '#666', marginBottom: '15px', lineHeight: 1.6 }}>{blog.excerpt || blog.content.substring(0, 120)}...</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: '#999' }}>
                      <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      <span>{blog.views || 0} views</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
