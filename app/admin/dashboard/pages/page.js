'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { FiPlus } from 'react-icons/fi';

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/pages', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.pages) setPages(data.pages);
        else if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error('Failed to load pages'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/pages/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        toast.success('Page deleted');
        setPages((p) => p.filter((x) => x._id !== id));
      } else {
        toast.error(data.error || 'Delete failed');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Toaster />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px' }}>Pages</h1>
          <Link
            href="/admin/dashboard/pages/create"
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
            Create Page
          </Link>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
          {pages.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
              <p>No pages yet.</p>
              <Link href="/admin/dashboard/pages/create" style={{ color: 'var(--accent)', textDecoration: 'none' }}>
                Create your first page
              </Link>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa' }}>
                  <th style={{ padding: '16px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '16px', textAlign: 'left' }}>URL</th>
                  <th style={{ padding: '16px' }}>Status</th>
                  <th style={{ padding: '16px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pages.map((p) => (
                  <tr key={p._id} style={{ borderTop: '1px solid #eee' }}>
                    <td style={{ padding: '16px' }}>
                      {p.title}
                      {p.isHome && <span style={{ marginLeft: '8px', background: '#d97436', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>Home</span>}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <a href={`/${p.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                        /{p.slug}
                      </a>
                    </td>
                    <td style={{ padding: '16px' }}>{p.published ? 'Published' : 'Draft'}</td>
                    <td style={{ padding: '16px' }}>
                      <Link href={`/admin/dashboard/pages/edit/${p._id}`} style={{ marginRight: '12px', color: 'var(--accent)', textDecoration: 'none' }}>
                        Edit
                      </Link>
                      {!p.isHome && (
                        <button
                          onClick={() => handleDelete(p._id, p.title)}
                          style={{ background: 'none', border: 'none', color: '#f44336', cursor: 'pointer' }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
