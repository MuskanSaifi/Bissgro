'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      toast.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (res.ok) {
        toast.success('Blog deleted');
        fetchBlogs();
      } else {
        toast.error(data.error || 'Delete failed');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentStatus }),
      });

      if (res.ok) {
        toast.success(currentStatus ? 'Blog unpublished' : 'Blog published');
        fetchBlogs();
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px' }}>Manage Blogs</h1>
          <Link
            href="/admin/dashboard/create-blog"
            style={{
              padding: '12px 24px',
              background: 'var(--accent)',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            ➕ Create New
          </Link>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : blogs.length === 0 ? (
          <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>No blogs yet</p>
            <Link
              href="/admin/dashboard/create-blog"
              style={{
                padding: '12px 24px',
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
              }}
            >
              Create Your First Blog
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '20px' }}>
            {blogs.map((blog) => (
              <div
                key={blog._id}
                style={{
                  background: '#fff',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: 'var(--card-shadow)',
                  display: 'flex',
                  gap: '20px',
                }}
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                    <div>
                      <h3 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '5px' }}>{blog.title}</h3>
                      <p style={{ color: '#666', fontSize: '14px' }}>
                        {new Date(blog.createdAt).toLocaleDateString()} • {blog.views || 0} views
                      </p>
                    </div>
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 600,
                        background: blog.published ? '#4caf50' : '#ff9800',
                        color: '#fff',
                      }}
                    >
                      {blog.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <p style={{ color: '#666', marginBottom: '15px', lineHeight: 1.6 }}>{blog.excerpt || blog.content.substring(0, 150)}...</p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <Link
                      href={`/admin/dashboard/edit-blog/${blog._id}`}
                      style={{
                        padding: '8px 16px',
                        background: '#2196f3',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontSize: '14px',
                      }}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => togglePublish(blog._id, blog.published)}
                      style={{
                        padding: '8px 16px',
                        background: blog.published ? '#ff9800' : '#4caf50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      {blog.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      style={{
                        padding: '8px 16px',
                        background: '#f44336',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '14px',
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                    {blog.published && (
                      <Link
                        href={`/blog/${blog.slug}`}
                        target="_blank"
                        style={{
                          padding: '8px 16px',
                          background: '#9c27b0',
                          color: '#fff',
                          borderRadius: '6px',
                          textDecoration: 'none',
                          fontSize: '14px',
                        }}
                      >
                        View
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
