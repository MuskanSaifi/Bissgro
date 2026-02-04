'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardAuthGuard({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then((res) => {
        if (!res.ok) {
          router.replace('/admin/login');
        } else {
          setIsChecking(false);
        }
      })
      .catch(() => {
        router.replace('/admin/login');
      });
  }, [router]);

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--muted)',
      }}>
        <p style={{ color: '#666' }}>Loading...</p>
      </div>
    );
  }

  return children;
}
