'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function ImageUpload({
  value = '',
  publicId = '',
  onChange,
  folder = 'pages',
  placeholder = 'Upload image',
  style = {},
}) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      const data = await res.json();
      if (res.ok && data.url) {
        onChange({ url: data.url, publicId: data.publicId || '' });
        toast.success('Image uploaded');
      } else {
        toast.error(data.error || 'Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = () => {
    onChange({ url: '', publicId: '' });
  };

  return (
    <div style={{ marginBottom: '8px', ...style }}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      {value ? (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <img
              src={value}
              alt="Preview"
              style={{
                width: '120px',
                height: '80px',
                objectFit: 'cover',
                borderRadius: '8px',
                border: '1px solid #ddd',
              }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={uploading}
              style={{
                padding: '6px 12px',
                background: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontSize: '13px',
              }}
            >
              {uploading ? 'Uploading...' : 'Change'}
            </button>
            <button
              type="button"
              onClick={handleRemove}
              style={{
                padding: '6px 12px',
                background: '#f44336',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
              }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          style={{
            width: '100%',
            padding: '12px',
            border: '2px dashed #ddd',
            borderRadius: '8px',
            background: '#fafafa',
            cursor: uploading ? 'not-allowed' : 'pointer',
            color: '#666',
            fontSize: '14px',
          }}
        >
          {uploading ? 'Uploading...' : (placeholder || 'Click to upload image')}
        </button>
      )}
    </div>
  );
}
