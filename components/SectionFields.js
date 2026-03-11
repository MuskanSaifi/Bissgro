// components/SectionFields.js
'use client';

import ImageUpload from './ImageUpload';
import RichTextEditor from './RichTextEditor';

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
  const addItem = () => onChange({ ...c, items: [...(c.items || []), { title: '', desc: '', img: '', imgPublicId: '', icon: '', linkText: '', linkUrl: '' }] });
  const addTestimonialItem = () => onChange({ ...c, items: [...(c.items || []), { name: '', role: '', text: '', bottom: '', img: '', imgPublicId: '' }] });
  const removeItem = (idx) => onChange({ ...c, items: (c.items || []).filter((_, i) => i !== idx) });
  const updateTestimonialItemImage = (idx, { url, publicId }) => {
    const items = c.items || [];
    const n = [...items];
    n[idx] = { ...n[idx], img: url, imgPublicId: publicId };
    onChange({ ...c, items: n });
  };

  const updateImage = (key, { url, publicId }) => {
    onChange({ ...c, [key]: url, [key + 'PublicId']: publicId });
  };

  const updateItemImage = (idx, { url, publicId }) => {
    const items = c.items || [];
    const n = [...items];
    n[idx] = { ...n[idx], img: url, imgPublicId: publicId };
    onChange({ ...c, items: n });
  };

  switch (section.type) {
    case 'hero':
      return (
        <>
          <select
            value={c.layout || 'default'}
            onChange={(e) => update('layout', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          >
            <option value="default">Default (Home-style)</option>
            <option value="service">Service Page Layout</option>
          </select>
          <input placeholder="Main title (e.g. Top Web Development Company in Noida —)" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Highlight line (orange, e.g. Build Fast, Secure & Scalable Websites)" value={c.highlight || ''} onChange={(e) => update('highlight', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <textarea placeholder="Description" value={c.description || ''} onChange={(e) => update('description', e.target.value)} rows={3} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Primary CTA Text (e.g. Get Free Consultation)" value={c.ctaText || ''} onChange={(e) => update('ctaText', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Primary CTA Link" value={c.ctaLink || ''} onChange={(e) => update('ctaLink', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Secondary CTA Text (e.g. Request a Quote)" value={c.secondaryCtaText || ''} onChange={(e) => update('secondaryCtaText', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Secondary CTA Link" value={c.secondaryCtaLink || ''} onChange={(e) => update('secondaryCtaLink', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Trusted by text (e.g. Trusted by 200+ Companies)" value={c.trustedByText || ''} onChange={(e) => update('trustedByText', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <textarea placeholder="Trusted by logo URLs (one per line)" value={Array.isArray(c.trustedByLogos) ? c.trustedByLogos.join('\n') : (c.trustedByLogos || '')} onChange={(e) => update('trustedByLogos', e.target.value.trim().split(/\n/).filter(Boolean))} rows={3} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Hero Image</label>
          <ImageUpload value={c.image} publicId={c.imagePublicId} onChange={updateImage.bind(null, 'image')} folder="pages" placeholder="Upload hero image" />
        </>
      );
    case 'services':
    case 'features':
      return (
        <>
          <select
            value={c.layout || 'default'}
            onChange={(e) => update('layout', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          >
            <option value="default">Default Layout</option>
            <option value="service">Service Page Layout</option>
          </select>
          <input placeholder="Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <input placeholder="Subtitle" value={c.subtitle || ''} onChange={(e) => update('subtitle', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <button type="button" onClick={addItem} style={{ marginBottom: '8px' }}>+ Add Item</button>
          {(c.items || []).map((item, i) => (
            <div key={i} style={{ marginBottom: '12px', padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
              <input placeholder="Title" value={item.title || ''} onChange={(e) => updateItem(i, 'title', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Description" value={item.desc || ''} onChange={(e) => updateItem(i, 'desc', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Image</label>
              <ImageUpload value={item.img} publicId={item.imgPublicId} onChange={(v) => updateItemImage(i, v)} folder="pages" placeholder="Upload image" style={{ marginBottom: '8px' }} />
              <input placeholder="Icon color / Button color (e.g. #9f4a2f)" value={item.icon || ''} onChange={(e) => updateItem(i, 'icon', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Button text (e.g. Web Development)" value={item.linkText || ''} onChange={(e) => updateItem(i, 'linkText', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Button link URL" value={item.linkUrl || ''} onChange={(e) => updateItem(i, 'linkUrl', e.target.value)} style={{ width: '100%', padding: '6px' }} />
              <button type="button" onClick={() => removeItem(i)} style={{ marginTop: '8px', color: '#f44336' }}>Remove Item</button>
            </div>
          ))}
        </>
      );
    case 'about':
      return (
        <>
          <select
            value={c.layout || 'default'}
            onChange={(e) => update('layout', e.target.value)}
            style={{ width: '100%', padding: '8px', marginBottom: '8px' }}
          >
            <option value="default">Default Layout</option>
            <option value="service">Service Page Layout</option>
          </select>
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
          <input placeholder="Button Link" value={c.buttonLink || ''} onChange={(e) => update('buttonLink', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '12px' }} />
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Background Images (3)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <label style={{ fontSize: '12px', color: '#666' }}>Image {i + 1}</label>
                <ImageUpload value={c.images?.[i]} publicId={c.imagesPublicIds?.[i]} onChange={({ url, publicId }) => {
                  const imgs = [...(c.images || ['', '', ''])];
                  const ids = [...(c.imagesPublicIds || ['', '', ''])];
                  imgs[i] = url; ids[i] = publicId;
                  onChange({ ...c, images: imgs, imagesPublicIds: ids });
                }} folder="pages" placeholder={`Image ${i + 1}`} />
              </div>
            ))}
          </div>
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
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontWeight: 600, fontSize: '14px' }}>Content (Rich Text)</span>
          <RichTextEditor
            value={c.content || ''}
            onChange={(val) => update('content', val)}
            placeholder="Write page content here... Use headings, lists, links and images."
            minHeight={220}
            folder="pages"
          />
        </div>
      );
    case 'newsletter':
      return (
        <>
          <input placeholder="Title (HTML ok)" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 600 }}>Background Images (3)</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <label style={{ fontSize: '12px', color: '#666' }}>Image {i + 1}</label>
                <ImageUpload value={c.images?.[i]} publicId={c.imagesPublicIds?.[i]} onChange={({ url, publicId }) => {
                  const imgs = [...(c.images || ['', '', ''])];
                  const ids = [...(c.imagesPublicIds || ['', '', ''])];
                  imgs[i] = url; ids[i] = publicId;
                  onChange({ ...c, images: imgs, imagesPublicIds: ids });
                }} folder="pages" placeholder={`Image ${i + 1}`} />
              </div>
            ))}
          </div>
        </>
      );
    case 'testimonials':
      return (
        <>
          <input placeholder="Section Title" value={c.title || ''} onChange={(e) => update('title', e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '8px' }} />
          <button type="button" onClick={addTestimonialItem} style={{ marginBottom: '8px' }}>+ Add Testimonial</button>
          {(c.items || []).map((item, i) => (
            <div key={i} style={{ marginBottom: '12px', padding: '12px', background: '#fff', borderRadius: '8px', border: '1px solid #eee' }}>
              <input placeholder="Name" value={item.name || ''} onChange={(e) => updateItem(i, 'name', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Role" value={item.role || ''} onChange={(e) => updateItem(i, 'role', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <textarea placeholder="Quote/Testimonial text" value={item.text || ''} onChange={(e) => updateItem(i, 'text', e.target.value)} rows={3} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <input placeholder="Bottom text (e.g. Priya S., Founder)" value={item.bottom || ''} onChange={(e) => updateItem(i, 'bottom', e.target.value)} style={{ width: '100%', padding: '6px', marginBottom: '4px' }} />
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>Photo</label>
              <ImageUpload value={item.img} publicId={item.imgPublicId} onChange={(v) => updateTestimonialItemImage(i, v)} folder="pages" placeholder="Upload photo" style={{ marginBottom: '8px' }} />
              <button type="button" onClick={() => removeItem(i)} style={{ color: '#f44336' }}>Remove</button>
            </div>
          ))}
        </>
      );
    default:
      return null;
  }
}
