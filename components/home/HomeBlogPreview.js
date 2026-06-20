'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const PLACEHOLDER_BLOGS = [
  {
    _id: '1',
    slug: '#',
    title: '10 SEO Tips to Boost Your Website Rankings in 2026',
    excerpt: 'Learn proven strategies to improve your search engine visibility and drive more organic traffic.',
    createdAt: new Date().toISOString(),
    image: '',
  },
  {
    _id: '2',
    slug: '#',
    title: 'Why Every Business Needs a Mobile-Responsive Website',
    excerpt: 'Discover how mobile-first design impacts user experience, SEO, and conversion rates.',
    createdAt: new Date().toISOString(),
    image: '',
  },
  {
    _id: '3',
    slug: '#',
    title: 'The Complete Guide to Google My Business Optimization',
    excerpt: 'Maximize your local search presence with these GMB best practices and tips.',
    createdAt: new Date().toISOString(),
    image: '',
  },
];

export default function HomeBlogPreview() {
  const [blogs, setBlogs] = useState(PLACEHOLDER_BLOGS);

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs?.length) {
          setBlogs(data.blogs.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="home-section home-section-alt" aria-labelledby="home-blog-title">
      <div className="home-container home-center">
        <span className="home-tag">Blog</span>
        <h2 id="home-blog-title" className="home-heading">
          Latest <span className="highlight">Insights</span>
        </h2>
        <p className="home-subtitle">
          Stay updated with the latest trends, tips, and news from the digital world.
        </p>
      </div>
      <div className="home-container">
        <div className="home-blog-grid">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug}`} className="home-blog-card">
              <div className="home-blog-thumb">
                {blog.image ? (
                  <img src={blog.image} alt={blog.title} />
                ) : (
                  <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
                    <i className="fas fa-newspaper" style={{ fontSize: 48, color: '#2563eb', opacity: 0.4 }} />
                  </div>
                )}
              </div>
              <div className="home-blog-body">
                <div className="home-blog-date">
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt || ''}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="home-portfolio-cta" style={{ marginTop: 36 }}>
          <Link href="/blog" className="btn-home-outline">
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
