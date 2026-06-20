'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'web', label: 'Web Development' },
  { id: 'app', label: 'App Development' },
  { id: 'seo', label: 'SEO' },
  { id: 'graphic', label: 'Graphic Design' },
];

const DEFAULT_PROJECTS = [
  { title: 'Corporate Website', category: 'Web Development', type: 'web', image: '' },
  { title: 'E-commerce Website', category: 'Web Development', type: 'web', image: '' },
  { title: 'Food Delivery App', category: 'App Development', type: 'app', image: '' },
  { title: 'SEO Campaign', category: 'SEO', type: 'seo', image: '' },
  { title: 'Brand Identity', category: 'Graphic Design', type: 'graphic', image: '' },
];

const TYPE_MAP = { web: 'web', app: 'app', seo: 'seo', graphic: 'graphic' };

export default function HomePortfolio() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.projects?.length) {
          setProjects(
            data.projects.map((p) => ({
              title: p.title || p.name || 'Project',
              category: p.category || (p.type === 'web' ? 'Web Development' : 'App Development'),
              type: TYPE_MAP[p.type] || p.type || 'web',
              image: p.image || p.thumbnail || '',
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeFilter === 'all'
      ? projects.slice(0, 5)
      : projects.filter((p) => p.type === activeFilter).slice(0, 5);

  const display = filtered.length ? filtered : DEFAULT_PROJECTS.slice(0, 5);

  return (
    <section id="portfolio" className="home-section" aria-labelledby="home-portfolio-title">
      <div className="home-container home-center">
        <span className="home-tag">Portfolio</span>
        <h2 id="home-portfolio-title" className="home-heading">
          Recent <span className="highlight">Projects</span>
        </h2>
        <p className="home-subtitle">
          Explore some of our latest work across web, app, SEO, and design.
        </p>
      </div>
      <div className="home-container">
        <div className="home-portfolio-filters">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`home-filter-btn ${activeFilter === f.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="home-portfolio-grid">
          {display.map((p, i) => (
            <div key={`${p.title}-${i}`} className="home-portfolio-card">
              <div className="home-portfolio-thumb">
                {p.image ? (
                  <img src={p.image} alt={p.title} />
                ) : (
                  <i className="fas fa-image" />
                )}
              </div>
              <div className="home-portfolio-body">
                <h3>{p.title}</h3>
                <span>{p.category}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="home-portfolio-cta">
          <Link href="/portfolio" className="btn-home-primary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
