'use client';

import ImageUpload from './ImageUpload';

const SECTION_TYPES = [
  { value: 'hero', label: 'Hero Banner' },
  { value: 'services', label: 'Services' },
  { value: 'about', label: 'About' },
  { value: 'tech', label: 'Tech Stack' },
  { value: 'testimonials', label: 'Testimonials' },
  { value: 'cta', label: 'Call to Action' },
  { value: 'contact', label: 'Contact Form' },
  { value: 'newsletter', label: 'Newsletter' },
  { value: 'html', label: 'Custom HTML' },
  { value: 'features', label: 'Features' },
];

export { SECTION_TYPES };

export default function SectionFields({ section, onChange }) {
  const c = section.content || {};
  const update = (key, val) => onChange({ ...c, [key]: val });
  const updateItem = (idx, key, val) => {
    const items = c.items || [];
    const n = [...items];
    n[idx] = { ...n[idx], [key]: val };
    onChange({ ...c, items: n });
  };
  const addItem = () => onChange({ ...c, items: [...(c.items || []), { title: '', desc: '', img: '', imgPublicId: '', icon: '' }] });
  const removeItem = (idx) => onChange({ ...c, items: (c.items || []).filter((_, i) => i !== idx) });

  const updateImage = (key, { url, publicId }) => {
    onChange({ ...c, [key]: url, [key + 'PublicId']: publicId });
  };

  const updateItemImage = (idx, { url, publicId }) => {
    updateItem(idx, 'img', url);
    updateItem(idx, 'imgPublicId', publicId);
  };

  switch (section.type) {
    case 'hero':
      return (
        <>
          <input placeholder="Title (HTML ok)" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Description" value={c.description || ''} onChange={(e) => update('description', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Image</label>
          <ImageUpload value={c.image} publicId={c.imagePublicId} onChange={updateImage.bind(null, 'image')} folder="pages" placeholder="Upload hero image" />
          <input placeholder="CTA Text" value={c.ctaText || ''} onChange={(e) => update('ctaText', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="CTA Link" value={c.ctaLink || ''} onChange={(e) => update('ctaLink', e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </>
      );
    case 'services':
    case 'features':
      return (
        <>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Subtitle" value={c.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <button type="button" onClick={addItem} style={{ marginBottom: '8px' }}>+ Add Item</button>
          {(c.items || []).map((item, i) => (
            <div key={i} style={{ marginBottom: '12px', padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
              <input placeholder="Title" value={item.title || ''} onChange={(e) => updateItem(i, 'title', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Description" value={item.desc || ''} onChange={(e) => updateItem(i, 'desc', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Image</label>
              <ImageUpload value={item.img} publicId={item.imgPublicId} onChange={(v) => updateItemImage(i, v)} folder="pages" placeholder="Upload image" style={{ marginBottom: '8px' }} />
              <input placeholder="Icon color (e.g. #9f4a2f)" value={item.icon || ''} onChange={(e) => updateItem(i, 'icon', e.target.value)} style={{ width: '100%', padding: '6px' }} />
              <button type="button" onClick={() => removeItem(i)} style={{ marginTop: '8px', color: '#f44336' }}>Remove Item</button>
            </div>
          ))}
        </>
      );
    case 'about':
      return (
        <>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <textarea placeholder="Content" value={c.content || ''} onChange={(e) => update('content', e.target.value)} rows={4} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Image</label>
          <ImageUpload value={c.image} publicId={c.imagePublicId} onChange={updateImage.bind(null, 'image')} folder="pages" placeholder="Upload about image" />
        </>
      );
    case 'tech':
      return (
        <>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <button type="button" onClick={addItem} style={{ marginBottom: '8px' }}>+ Add Item</button>
          {(c.items || []).map((item, i) => (
            <div key={i} style={{ marginBottom: '12px', padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
              <input placeholder="Title" value={item.title || ''} onChange={(e) => updateItem(i, 'title', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Description" value={item.desc || ''} onChange={(e) => updateItem(i, 'desc', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Image</label>
              <ImageUpload value={item.img} publicId={item.imgPublicId} onChange={(v) => updateItemImage(i, v)} folder="pages" placeholder="Upload tech icon" style={{ marginBottom: '8px' }} />
              <button type="button" onClick={() => removeItem(i)} style={{ marginTop: '8px', color: '#f44336' }}>Remove Item</button>
            </div>
          ))}
        </>
      );
    case 'cta':
      return (
        <>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Description" value={c.description || ''} onChange={(e) => update('description', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Button Text" value={c.buttonText || ''} onChange={(e) => update('buttonText', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Button Link" value={c.buttonLink || ''} onChange={(e) => update('buttonLink', e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </>
      );
    case 'contact':
      return (
        <>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Address" value={c.address || ''} onChange={(e) => update('address', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Phone" value={c.phone || ''} onChange={(e) => update('phone', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Email" value={c.email || ''} onChange={(e) => update('email', e.target.value)} style={{ width: '100%', padding: '8px' }} />
        </>
      );
    case 'html':
      return <textarea placeholder="HTML" value={c.content || ''} onChange={(e) => update('content', e.target.value)} rows={6} style={{ width: '100%', padding: '8px' }} />;
    case 'newsletter':
      return <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px' }} />;
    default:
      return null;
  }
}
