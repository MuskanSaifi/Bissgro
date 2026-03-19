import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', marginBottom: '20px' }}>Blog Not Found</h1>
        <p style={{ color: '#666', marginBottom: '30px', fontSize: '18px' }}>The blog post you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/blog"
          style={{
            padding: '12px 24px',
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
