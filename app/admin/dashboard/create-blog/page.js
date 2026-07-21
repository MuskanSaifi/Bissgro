'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import RichTextEditor from '@/components/RichTextEditor';

export default function CreateBlog() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  const [contentImagePublicIds, setContentImagePublicIds] = useState([]);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [metaImage, setMetaImage] = useState('');
  const [canonicalUrl, setCanonicalUrl] = useState('');
  const [focusKeyword, setFocusKeyword] = useState('');
  const [robots, setRobots] = useState('index,follow');
  const [published, setPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'blog');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        setImage(data.url);
        setImagePublicId(data.publicId);
        toast.success('Image uploaded successfully');
      } else {
        setImage('');
        setImagePublicId('');
        toast.error(`Image upload failed: ${data.error || res.status}. Try again.`, { duration: 6000 });
      }
    } catch (error) {
      setImage('');
      setImagePublicId('');
      toast.error('Image upload failed (network error). Try again.', { duration: 6000 });
    } finally {
      setUploading(false);
    }
  };

  const handleContentImageUploaded = (publicId) => {
    if (publicId) {
      setContentImagePublicIds((prev) => [...prev, publicId]);
      toast.success('Image added to content');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plainContent = content.replace(/<[^>]*>/g, '').trim();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (!plainContent) {
      toast.error('Content is required');
      return;
    }
    if (uploading) {
      toast.error('Image is still uploading, please wait...');
      return;
    }
    if (!image) {
      toast.error('Featured image is missing - upload may have failed. Please re-select the image.', { duration: 6000 });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          slug,
          content,
          excerpt,
          image,
          imagePublicId,
          contentImagePublicIds,
          metaTitle,
          metaDescription,
          metaKeywords,
          metaImage,
          canonicalUrl,
          focusKeyword,
          robots,
          published,
        }),
        credentials: 'include',
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Blog created successfully!');
        router.push('/admin/dashboard/blogs');
      } else {
        toast.error(data.error || 'Failed to create blog');
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '30px' }}>Create New Blog</h1>

        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px' }}
              placeholder="Blog title"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Custom Blog URL</label>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
              <span style={{ padding: '12px', background: '#f5f5f5', color: '#666', whiteSpace: 'nowrap' }}>/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+/, ''))}
                placeholder="custom-blog-page-url"
                style={{ width: '100%', padding: '12px', border: 'none', outline: 'none', fontSize: '15px' }}
              />
            </div>
            <p style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>
              Optional. Leave blank to generate it from the title.
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Content *</label>
            <RichTextEditor
              value={content}
              onChange={setContent}
              onImageUploaded={handleContentImageUploaded}
              placeholder="Write your blog content... Use toolbar for headings (H1-H4), bold, italic, lists, and images."
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Excerpt</label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '15px' }}
              placeholder="Short description (optional)"
            />
            <p style={{ color: '#666', fontSize: '12px', marginTop: '5px' }}>Leave empty to auto-generate from content</p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Featured Image *</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} style={{ marginBottom: '10px' }} />
            {uploading && <p style={{ color: '#666' }}>Uploading...</p>}
            {image && (
              <div style={{ marginTop: '10px' }}>
                <img src={image} alt="Preview" style={{ maxWidth: '300px', borderRadius: '8px' }} />
              </div>
            )}
          </div>

          <div style={{ marginBottom: '24px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '16px', fontWeight: 600 }}>SEO Settings</h3>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Meta Title</label>
              <input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} maxLength={60}
                placeholder="SEO title (50-60 chars recommended)"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{metaTitle.length}/60</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Meta Description</label>
              <textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} rows={2} maxLength={160}
                placeholder="SEO description (150-160 chars recommended)"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
              <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{metaDescription.length}/160</p>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Meta Keywords</label>
              <input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)}
                placeholder="keyword1, keyword2, keyword3"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Focus Keyword</label>
              <input type="text" value={focusKeyword} onChange={(e) => setFocusKeyword(e.target.value)}
                placeholder="Primary keyword for this post"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>OG/Social Image URL</label>
              <input type="url" value={metaImage} onChange={(e) => setMetaImage(e.target.value)}
                placeholder="Leave empty to use featured image"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Canonical URL</label>
              <input type="url" value={canonicalUrl} onChange={(e) => setCanonicalUrl(e.target.value)}
                placeholder="Preferred URL if content exists elsewhere"
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 500, fontSize: '14px' }}>Robots</label>
              <select value={robots} onChange={(e) => setRobots(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}>
                <option value="index,follow">Index, Follow</option>
                <option value="noindex,follow">No Index, Follow</option>
                <option value="index,nofollow">Index, No Follow</option>
                <option value="noindex,nofollow">No Index, No Follow</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} />
              <span>Publish immediately</span>
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={loading || uploading}
              style={{
                padding: '12px 24px',
                background: loading ? '#ccc' : 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Creating...' : 'Create Blog'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              style={{
                padding: '12px 24px',
                background: '#666',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
