'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import SectionFields, { SECTION_TYPES } from '@/components/SectionFields';
import ImageUpload from '@/components/ImageUpload';

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const [page, setPage] = useState(null);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaImage, setMetaImage] = useState('');
  const [metaImagePublicId, setMetaImagePublicId] = useState('');
  const [sections, setSections] = useState([]);
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetch(`/api/pages/${params.id}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.page) {
          setPage(data.page);
          setSlug(data.page.slug);
          setTitle(data.page.title);
          setMetaTitle(data.page.metaTitle || '');
          setMetaDescription(data.page.metaDescription || '');
          setMetaKeywords(data.page.metaKeywords || '');
          setMetaImage(data.page.metaImage || '');
          setMetaImagePublicId(data.page.metaImagePublicId || '');
          setSections(data.page.sections || []);
          setPublished(data.page.published !== false);
        } else {
          toast.error('Page not found');
          router.push('/admin/dashboard/pages');
        }
      })
      .catch(() => {
        toast.error('Failed to load');
        router.push('/admin/dashboard/pages');
      })
      .finally(() => setFetching(false));
  }, [params.id, router]);

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
    setLoading(true);
    try {
      const res = await fetch(`/api/pages/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          metaTitle: metaTitle || undefined,
          metaDescription: metaDescription || undefined,
          metaKeywords: metaKeywords || undefined,
          metaImage: metaImage || undefined,
          metaImagePublicId: metaImagePublicId || undefined,
          sections: sections.map((sec, i) => ({ ...sec, order: i })),
          published,
        }),
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok) {
        toast.success('Page updated!');
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div>Loading...</div>;
  if (!page) return null;

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '24px' }}>Edit Page</h1>
        {page.isHome && <p style={{ marginBottom: '16px', color: '#d97436' }}>This is the Home page.</p>}

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>URL Slug</label>
            <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)} style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              Published
            </label>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ marginBottom: '12px' }}>SEO</h3>
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
              {loading ? 'Saving...' : 'Save'}
            </button>
            <Link href="/admin/dashboard/pages" style={{ padding: '12px 24px', background: '#666', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Cancel</Link>
            <a href={`/${slug}`} target="_blank" rel="noopener noreferrer" style={{ padding: '12px 24px', background: '#28a745', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>View Page</a>
          </div>
        </form>
      </div>
    </>
  );
}
