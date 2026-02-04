'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { FiFileText, FiHome, FiPlus, FiEye, FiMail } from 'react-icons/fi';

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, published: 0, drafts: 0 });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/blogs', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.blogs) {
          setStats({
            total: data.blogs.length,
            published: data.blogs.filter((b) => b.published).length,
            drafts: data.blogs.filter((b) => !b.published).length,
          });
        }
      })
      .catch(() => toast.error('Failed to load stats'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '30px' }}>Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Total Blogs</h3>
            <p style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>{loading ? '...' : stats.total}</p>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Published</h3>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#4caf50' }}>{loading ? '...' : stats.published}</p>
          </div>
          <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
            <h3 style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>Drafts</h3>
            <p style={{ fontSize: '32px', fontWeight: 700, color: '#ff9800' }}>{loading ? '...' : stats.drafts}</p>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Quick Actions</h2>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
            <Link
              href="/admin/dashboard/pages"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#9c27b0',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiFileText size={18} />
              Manage Pages
            </Link>
            <Link
              href="/admin/dashboard/home"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#795548',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiHome size={18} />
              Home Sections
            </Link>
            <Link
              href="/admin/dashboard/pages/create"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#673ab7',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiPlus size={18} />
              Create Page
            </Link>
            <Link
              href="/admin/dashboard/create-blog"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiPlus size={18} />
              Create Blog
            </Link>
            <Link
              href="/admin/dashboard/blogs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#2196f3',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiFileText size={18} />
              Manage Blogs
            </Link>
            <Link
              href="/blog"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#4caf50',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiEye size={18} />
              View Blog Page
            </Link>
            <Link
              href="/admin/dashboard/leads"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: '#e91e63',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              <FiMail size={18} />
              Subscribe Leads
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
