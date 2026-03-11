'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageUpload from '@/components/ImageUpload';
import { FiBriefcase } from 'react-icons/fi';

const TYPES = [
  { id: 'app', label: 'App' },
  { id: 'web', label: 'Web' },
];

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeType, setActiveType] = useState('app');
  const [editingId, setEditingId] = useState(null);

  const [type, setType] = useState('app');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [imagePublicId, setImagePublicId] = useState('');
  const [link, setLink] = useState('');
  const [order, setOrder] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/projects', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && Array.isArray(data.projects)) {
        setProjects(data.projects);
      } else {
        toast.error(data.error || 'Failed to load projects');
      }
    } catch (e) {
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setType('app');
    setTitle('');
    setImage('');
    setImagePublicId('');
    setLink('');
    setOrder('');
  };

  const handleEdit = (p) => {
    setEditingId(p._id);
    setType(p.type);
    setTitle(p.title || '');
    setImage(p.image || '');
    setImagePublicId(p.imagePublicId || '');
    setLink(p.link || '');
    setOrder(p.order != null ? String(p.order) : '');
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        toast.success('Project deleted');
        setProjects((prev) => prev.filter((p) => p._id !== id));
        if (editingId === id) resetForm();
      } else {
        toast.error(data.error || 'Delete failed');
      }
    } catch {
      toast.error('Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }
    const payload = {
      type,
      title: title.trim(),
      image,
      imagePublicId,
      link: link.trim(),
      order: order ? Number(order) : 0,
    };

    setSaving(true);
    try {
      const url = editingId ? `/api/projects/${editingId}` : '/api/projects';
      const method = editingId ? 'PUT' : 'POST';
      const body = editingId ? { ...payload, deleteOldImage: false } : payload;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Save failed');
        return;
      }
      toast.success(editingId ? 'Project updated' : 'Project created');
      await fetchProjects();
      resetForm();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const filteredProjects = projects
    .filter((p) => p.type === activeType)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '24px' }}>Our Projects</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: 'var(--card-shadow)',
            marginBottom: '28px',
          }}
        >
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>{editingId ? 'Edit Project' : 'Add New Project'}</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                {TYPES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: '2 1 260px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                placeholder="e.g. E-Commerce App"
                required
              />
            </div>
            <div style={{ flex: '2 1 260px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Link (optional)</label>
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                placeholder="https://..."
              />
            </div>
            <div style={{ flex: '1 1 80px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Order</label>
              <input
                type="number"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                min={0}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Project Image</label>
            <ImageUpload
              folder="projects"
              value={image}
              publicId={imagePublicId}
              onChange={({ url, publicId }) => {
                setImage(url);
                setImagePublicId(publicId);
              }}
              placeholder="Upload project image"
            />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '10px 22px',
                background: saving ? '#ccc' : 'var(--accent)',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : editingId ? 'Update Project' : 'Add Project'}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                style={{
                  padding: '10px 22px',
                  background: '#666',
                  color: '#fff',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        <div style={{ marginBottom: '16px', display: 'flex', gap: '8px' }}>
          {TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveType(t.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid #ddd',
                background: activeType === t.id ? 'var(--accent)' : '#fff',
                color: activeType === t.id ? '#fff' : '#333',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p style={{ color: '#666' }}>No {activeType} projects yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '18px' }}>
            {filteredProjects.map((p) => (
              <div
                key={p._id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: 'var(--card-shadow)',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {p.image ? (
                  <div style={{ aspectRatio: '16/10', background: '#f0f0f0' }}>
                    <img
                      src={p.image}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      aspectRatio: '16/10',
                      background: '#eee',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FiBriefcase size={40} color="#999" />
                  </div>
                )}
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '16px', marginBottom: '4px', fontWeight: 600 }}>{p.title}</h3>
                  {p.link && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '13px', color: 'var(--accent)', wordBreak: 'break-all' }}
                    >
                      {p.link}
                    </a>
                  )}
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(p)}
                      style={{
                        flex: 1,
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#2196f3',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p._id)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '8px',
                        border: 'none',
                        background: '#f44336',
                        color: '#fff',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
