'use client';

import { useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(
  async () => {
    if (typeof window !== 'undefined') {
      const Quill = (await import('quill')).default;
      const Image = Quill.import('formats/image');
      if (Image) Image.sanitize = (url) => url;
    }
    const mod = await import('react-quill');
    return mod.default;
  },
  { ssr: false }
);

export default function RichTextEditor({ value, onChange, onImageUploaded, placeholder, minHeight = 280 }) {
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const savedRangeRef = useRef(null);

  const imageHandler = useCallback(() => {
    const quill = quillRef.current?.getEditor?.();
    if (quill) {
      const sel = quill.getSelection(true);
      savedRangeRef.current = sel || { index: Math.max(0, quill.getLength() - 1) };
    }
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file?.type.startsWith('image/')) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', 'blog-content');

      try {
        const res = await fetch('/api/upload', { method: 'POST', body: formData, credentials: 'include' });
        const data = await res.json();

        if (res.ok && data.url) {
          const quill = quillRef.current?.getEditor?.();
          if (quill) {
            const range = savedRangeRef.current || { index: Math.max(0, quill.getLength() - 1) };
            const index = range.index;

            quill.insertEmbed(index, 'image', data.url);
            quill.setSelection(index + 1);
            const html = quill.root.innerHTML;
            onChange(html);
          }
          onImageUploaded?.(data.publicId);
        }
      } catch (err) {
        console.error('Image upload failed', err);
      }
      e.target.value = '';
    },
    [onChange, onImageUploaded]
  );

  const modules = useCallback(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: { image: imageHandler },
      },
    }),
    [imageHandler]
  );

  const formats = [
    'header',
    'bold', 'italic', 'underline',
    'list', 'bullet',
    'link', 'image',
  ];

  return (
    <div className="rich-text-editor">
      <style jsx global>{`
        .ql-editor img { max-width: 100%; height: auto; display: block !important; }
      `}</style>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules()}
        formats={formats}
        placeholder={placeholder}
        style={{ minHeight }}
      />
    </div>
  );
}
