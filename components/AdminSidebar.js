'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) setUser(data.user);
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      toast.success('Logged out');
      router.push('/admin/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  const menuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/dashboard/pages', label: 'Pages', icon: '📄' },
    { href: '/admin/dashboard/home', label: 'Home Sections', icon: '🏠' },
    { href: '/admin/dashboard/blogs', label: 'Blogs', icon: '📝' },
    { href: '/admin/dashboard/create-blog', label: 'Create Blog', icon: '➕' },
  ];

  return (
    <aside
      style={{
        width: '250px',
        background: '#fff',
        borderRight: '1px solid #eee',
        minHeight: '100vh',
        padding: '20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflowY: 'auto',
      }}
    >
      <div style={{ marginBottom: '30px' }}>
        <Link href="/admin/dashboard" style={{ textDecoration: 'none', color: 'var(--text)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '5px' }}>Bissgro Admin</h2>
        </Link>
        {user && <p style={{ color: '#666', fontSize: '14px' }}>Welcome, {user.username}</p>}
      </div>

      <nav>
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              marginBottom: '8px',
              borderRadius: '8px',
              textDecoration: 'none',
              color: pathname === item.href ? '#fff' : 'var(--text)',
              background: pathname === item.href ? 'var(--accent)' : 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #eee' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '12px',
            background: '#f44336',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
