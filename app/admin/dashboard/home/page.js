'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import SectionFields, { SECTION_TYPES } from '@/components/SectionFields';

export default function HomeEditor() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch('/api/pages', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const home = data.pages?.find((p) => p.isHome || p.slug === 'home');
        if (home) {
          setPage(home);
          setSections(home.sections || []);
        } else {
          setPage(null);
          setSections([
            { type: 'hero', content: {}, order: 0 },
            { type: 'services', content: {}, order: 1 },
            { type: 'about', content: {}, order: 2 },
            { type: 'tech', content: {}, order: 3 },
            { type: 'testimonials', content: {}, order: 4 },
            { type: 'contact', content: {}, order: 5 },
            { type: 'newsletter', content: {}, order: 6 },
          ]);
        }
      })
      .catch(() => toast.error('Failed to load'))
      .finally(() => setFetching(false));
  }, []);

  const addSection = (type) => setSections((s) => [...s, { type, content: {}, order: s.length }]);
  const removeSection = (i) => setSections((s) => s.filter((_, idx) => idx !== i));
  const updateSectionContent = (i, content) => {
    setSections((s) => { const n = [...s]; n[i] = { ...n[i], content }; return n; });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (page) {
        const res = await fetch(`/api/pages/${page._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sections: sections.map((s, i) => ({ ...s, order: i })) }),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) toast.success('Home page updated!');
        else toast.error(data.error || 'Update failed');
      } else {
        const res = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: 'home',
            title: 'Home',
            sections: sections.map((s, i) => ({ ...s, order: i })),
            published: true,
            isHome: true,
          }),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          toast.success('Home page created!');
          setPage(data.page);
        } else toast.error(data.error || 'Create failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading...</div>;

  return (
    <>
      <Toaster />
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px' }}>Home Page Sections</h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', background: '#28a745', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>View Home</a>
            <button onClick={handleSave} disabled={loading} style={{ padding: '12px 24px', background: loading ? '#ccc' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {SECTION_TYPES.map((t) => (
              <button key={t.value} type="button" onClick={() => addSection(t.value)} style={{ padding: '8px 16px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                + {t.label}
              </button>
            ))}
          </div>
          {sections.map((sec, i) => (
            <div key={i} style={{ marginBottom: '20px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <strong>{SECTION_TYPES.find((t) => t.value === sec.type)?.label || sec.type}</strong>
                <button type="button" onClick={() => removeSection(i)} style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
              </div>
              <SectionFields section={sec} onChange={(c) => updateSectionContent(i, c)} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
