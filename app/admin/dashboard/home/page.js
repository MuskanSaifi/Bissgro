'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import SectionFields, { SECTION_TYPES } from '@/components/SectionFields';
import SectionRenderer from '@/components/SectionRenderer';
import { FiEye, FiEdit2, FiRefreshCw } from 'react-icons/fi';

export default function HomeEditor() {
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const loadHomePage = () => {
    setFetching(true);
    fetch('/api/pages?home=true', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        const home = data.page;
        if (home) {
          setPage(home);
          setSections(JSON.parse(JSON.stringify(home.sections || [])));
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
  };

  useEffect(() => {
    loadHomePage();
  }, []);

  const [showPreview, setShowPreview] = useState(true);
  const addSection = (type) => setSections((s) => [...s, { type, content: {}, order: s.length }]);
  const removeSection = (i) => setSections((s) => s.filter((_, idx) => idx !== i));
  const updateSectionContent = (i, content) => {
    setSections((s) => { const n = [...s]; n[i] = { ...n[i], content }; return n; });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const sectionsToSave = sections.map((s, i) => ({
        type: s.type,
        content: JSON.parse(JSON.stringify(s.content || {})),
        order: i,
      }));
      if (page) {
        const res = await fetch(`/api/pages/${page._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sections: sectionsToSave }),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          toast.success('Home page updated!');
          const updated = data.page || page;
          setPage(updated);
          setSections(JSON.parse(JSON.stringify(updated.sections || sectionsToSave)));
        } else {
          toast.error(data.error || 'Update failed');
        }
      } else {
        const res = await fetch('/api/pages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: 'home',
            title: 'Home',
            sections: sectionsToSave,
            published: true,
            isHome: true,
          }),
          credentials: 'include',
        });
        const data = await res.json();
        if (res.ok) {
          toast.success('Home page created!');
          const created = data.page;
          setPage(created);
          setSections(JSON.parse(JSON.stringify(created?.sections || sectionsToSave)));
        } else {
          toast.error(data.error || 'Create failed');
        }
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
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                background: showPreview ? '#333' : '#6c757d',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {showPreview ? <FiEdit2 size={18} /> : <FiEye size={18} />}
              {showPreview ? 'Edit' : 'Preview'}
            </button>
            <button
              type="button"
              onClick={() => { loadHomePage(); toast.success('Reloaded from saved'); }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              <FiRefreshCw size={18} />
              Reload
            </button>
            <a href="/" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', background: '#28a745', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>View Home</a>
            <button onClick={handleSave} disabled={loading} style={{ padding: '12px 24px', background: loading ? '#ccc' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: showPreview ? '1fr 1fr' : '1fr', gap: '24px' }}>
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
          {showPreview && (
            <div style={{ background: '#fff', padding: '24px', borderRadius: '12px', boxShadow: 'var(--card-shadow)', position: 'sticky', top: '24px', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
              <h3 style={{ marginBottom: '16px', fontSize: '18px' }}>Live Preview</h3>
              {sections.length === 0 ? (
                <p style={{ color: '#999', textAlign: 'center', padding: '40px' }}>Add sections to see preview</p>
              ) : (
                [...sections].sort((a, b) => (a.order || 0) - (b.order || 0)).map((sec, i) => (
                  <div key={i} style={{ marginBottom: '24px' }}>
                    <SectionRenderer section={sec} />
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
