'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import SectionFields, { SECTION_TYPES } from '@/components/SectionFields';
import ImageUpload from '@/components/ImageUpload';

export default function CreatePage() {
  const router = useRouter();
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaImage, setMetaImage] = useState('');
  const [metaImagePublicId, setMetaImagePublicId] = useState('');
  const [sections, setSections] = useState([]);
  const [published, setPublished] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [loading, setLoading] = useState(false);

  const addSection = (type) => {
    setSections((s) => [...s, { type, content: {}, order: s.length }]);
  };

  const removeSection = (i) => {
    setSections((s) => s.filter((_, idx) => idx !== i));
  };

  const updateSectionContent = (i, content) => {
    setSections((s) => {
      const n = [...s];
      n[i] = { ...n[i], content };
      return n;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    const s = slug.trim() || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setLoading(true);
    try {
      const res = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: s,
          title: title.trim(),
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
          metaKeywords: metaKeywords || undefined,
          metaImage: metaImage || undefined,
          metaImagePublicId: metaImagePublicId || undefined,
          sections: sections.map((sec, i) => ({ ...sec, order: i })),
          published,
          isHome,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Page created!');
        router.push('/admin/dashboard/pages');
      } else {
        toast.error(data.error || 'Failed to create');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '24px' }}>Create Page</h1>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>URL Slug *</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="best-seo-service-in-noida"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Will be: /{slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') || 'page-url'}</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Best SEO Service in Noida"
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Published
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={isHome} onChange={(e) => setIsHome(e.target.checked)} />
              Set as Home Page
            </label>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px' }}>SEO (optional)</h3>
            <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder="Meta Title" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Meta Description" rows={2} style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} placeholder="Meta Keywords" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Meta / OG Image</label>
            <ImageUpload value={metaImage} publicId={metaImagePublicId} onChange={({ url, publicId }) => { setMetaImage(url); setMetaImagePublicId(publicId); }} folder="pages" placeholder="Upload meta image for social sharing" />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px' }}>Sections</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
              {SECTION_TYPES.map((t) => (
                <button key={t.value} type="button" onClick={() => addSection(t.value)} style={{ padding: '8px 16px', background: '#f0f0f0', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' }}>
                  + {t.label}
                </button>
              ))}
            </div>
            {sections.map((sec, i) => (
              <div key={i} style={{ marginBottom: '16px', padding: '16px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>{SECTION_TYPES.find((t) => t.value === sec.type)?.label || sec.type}</strong>
                  <button type="button" onClick={() => removeSection(i)} style={{ color: '#f44336', background: 'none', border: 'none', cursor: 'pointer' }}>Remove</button>
                </div>
                <SectionFields section={sec} onChange={(c) => updateSectionContent(i, c)} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{ padding: '12px 24px', background: loading ? '#ccc' : 'var(--accent)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? 'Creating...' : 'Create Page'}
            </button>
            <Link href="/admin/dashboard/pages" style={{ padding: '12px 24px', background: '#666', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}
