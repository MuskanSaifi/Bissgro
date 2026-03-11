'use client';

import { useEffect, useState } from 'react';

const TABS = [
  { id: 'app', label: 'App' },
  { id: 'web', label: 'Web' },
];

export default function PortfolioContent() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('app');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects) setProjects(data.projects);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = projects.filter((p) => p.type === activeTab);

  return (
    <main className="main-content" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 className="page-title" style={{ marginBottom: '12px' }}>
            Our Projects
          </h1>
          <p style={{ color: 'var(--text-light)', maxWidth: '560px', margin: '0 auto' }}>
            Explore the apps and websites we have built for our clients.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className="portfolio-tab"
              style={{
                padding: '12px 28px',
                borderRadius: '999px',
                border: '2px solid',
                borderColor: activeTab === t.id ? 'var(--accent)' : '#ddd',
                background: activeTab === t.id ? 'var(--accent)' : 'transparent',
                color: activeTab === t.id ? '#fff' : 'var(--text)',
                fontWeight: 600,
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Loading projects...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>
            No {activeTab} projects to show yet.
          </p>
        ) : (
          <div
            className="portfolio-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '28px',
            }}
          >
            {filtered.map((p) => (
              <article
                key={p._id}
                className="portfolio-card"
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
              >
                <a
                  href={p.link || '#'}
                  target={p.link ? '_blank' : undefined}
                  rel={p.link ? 'noopener noreferrer' : undefined}
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                >
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: 'linear-gradient(135deg, #f5f5f5 0%, #eee 100%)',
                      position: 'relative',
                    }}
                  >
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#999',
                          fontSize: '48px',
                        }}
                      >
                        {p.type === 'app' ? '📱' : '🌐'}
                      </div>
                    )}
                    {p.link && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: '12px',
                          right: '12px',
                          padding: '6px 12px',
                          background: 'var(--accent)',
                          color: '#fff',
                          fontSize: '12px',
                          fontWeight: 600,
                          borderRadius: '8px',
                        }}
                      >
                        View →
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '24px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 600,
                        margin: 0,
                        color: 'var(--text)',
                        marginBottom: '8px',
                      }}
                    >
                      {p.title}
                    </h3>
                    <span
                      style={{
                        fontSize: '13px',
                        color: 'var(--accent)',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}
                    >
                      {p.type === 'app' ? 'Mobile App' : 'Website'}
                    </span>
                  </div>
                </a>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
