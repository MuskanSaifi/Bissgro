'use client';

import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SERVICES = [
  { id: 'web', label: 'Web Development' },
  { id: 'app', label: 'App Development' },
  { id: 'seo', label: 'SEO Services' },
];

export default function ManagePlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeService, setActiveService] = useState('web');
  const [editingId, setEditingId] = useState(null);

  const [service, setService] = useState('web');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [priceText, setPriceText] = useState('');
  const [monthly, setMonthly] = useState(false);
  const [featured, setFeatured] = useState(false);
  const [order, setOrder] = useState('');
  const [featuresText, setFeaturesText] = useState('');

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/plans', { credentials: 'include' });
      const data = await res.json();
      if (res.ok && Array.isArray(data.plans)) {
        setPlans(data.plans);
      } else {
        toast.error(data.error || 'Failed to load plans');
      }
    } catch (e) {
      toast.error('Failed to load plans');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setService('web');
    setName('');
    setPrice('');
    setPriceText('');
    setMonthly(false);
    setFeatured(false);
    setOrder('');
    setFeaturesText('');
  };

  const handleEdit = (plan) => {
    setEditingId(plan._id);
    setService(plan.service);
    setName(plan.name);
    setPrice(String(plan.price ?? ''));
    setPriceText(plan.priceText || '');
    setMonthly(!!plan.monthly);
    setFeatured(!!plan.featured);
    setOrder(plan.order != null ? String(plan.order) : '');
    setFeaturesText((plan.features || []).join('\n'));
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this plan?')) return;
    try {
      const res = await fetch(`/api/plans/${id}`, { method: 'DELETE', credentials: 'include' });
      const data = await res.json();
      if (res.ok) {
        toast.success('Plan deleted');
        setPlans((prev) => prev.filter((p) => p._id !== id));
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
    if (!name.trim() || !price) {
      toast.error('Name and numeric price are required');
      return;
    }
    const payload = {
      service,
      name: name.trim(),
      price: Number(price),
      priceText: priceText.trim() || undefined,
      monthly,
      featured,
      order: order ? Number(order) : 0,
      features: featuresText
        .split('\n')
        .map((f) => f.trim())
        .filter(Boolean),
    };

    setSaving(true);
    try {
      const url = editingId ? `/api/plans/${editingId}` : '/api/plans';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'Save failed');
        return;
      }
      toast.success(editingId ? 'Plan updated' : 'Plan created');
      await fetchPlans();
      resetForm();
    } catch {
      toast.error('Save failed');
    } finally {
      setSaving(false);
    }
  };

  const filteredPlans = plans
    .filter((p) => p.service === activeService)
    .sort((a, b) => {
      if (a.featured === b.featured) return (a.order || 0) - (b.order || 0);
      return a.featured ? -1 : 1;
    });

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '24px' }}>Manage Pricing Plans</h1>

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
          <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>{editingId ? 'Edit Plan' : 'Create New Plan'}</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
            <div style={{ flex: '1 1 160px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
              >
                {SERVICES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ flex: '2 1 260px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Plan Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                placeholder="e.g. Business Website"
                required
              />
            </div>
            <div style={{ flex: '1 1 140px' }}>
              <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Base Price (₹)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                min={0}
                required
              />
              <p style={{ fontSize: '11px', color: '#777', marginTop: '4px' }}>Used for checkout / minimum price.</p>
            </div>
            <div style={{ flex: '1 1 120px' }}>
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

          <div style={{ display: 'flex', gap: '20px', marginBottom: '16px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={monthly} onChange={(e) => setMonthly(e.target.checked)} />
              <span>Monthly pricing</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
              <span>Mark as featured</span>
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Price Label / Range (optional)</label>
            <input
              type="text"
              value={priceText}
              onChange={(e) => setPriceText(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', marginBottom: '10px' }}
              placeholder="e.g. Price Range: ₹5,000 – ₹8,000 (one-time)"
            />
            <label style={{ display: 'block', marginBottom: '6px', fontWeight: 600, fontSize: '14px' }}>Features (one per line)</label>
            <textarea
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              rows={5}
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px' }}
              placeholder="Single-page website (static)&#10;Mobile responsive design&#10;Contact form integration"
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
              {saving ? 'Saving...' : editingId ? 'Update Plan' : 'Create Plan'}
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
          {SERVICES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActiveService(s.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '999px',
                border: '1px solid #ddd',
                background: activeService === s.id ? 'var(--accent)' : '#fff',
                color: activeService === s.id ? '#fff' : '#333',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading plans...</p>
        ) : filteredPlans.length === 0 ? (
          <p style={{ color: '#666' }}>No plans for this service yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px' }}>
            {filteredPlans.map((p) => (
              <div
                key={p._id}
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  boxShadow: 'var(--card-shadow)',
                  padding: '20px',
                  position: 'relative',
                }}
              >
                {p.featured && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      padding: '4px 10px',
                      borderRadius: '999px',
                      background: 'var(--accent)',
                      color: '#fff',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    Featured
                  </span>
                )}
                <h3 style={{ fontSize: '18px', marginBottom: '6px', fontWeight: 600 }}>{p.name}</h3>
                <p style={{ margin: 0, fontSize: '16px', fontWeight: 700, color: 'var(--accent)' }}>
                  {p.priceText
                    ? p.priceText
                    : `₹${Number(p.price).toLocaleString('en-IN')}${p.monthly ? ' / month' : ''}`}
                </p>
                <p style={{ marginTop: '4px', marginBottom: '10px', fontSize: '13px', color: '#777' }}>
                  Order: {p.order ?? 0} • {p.service.toUpperCase()}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', color: '#555' }}>
                  {(p.features || []).map((f, i) => (
                    <li key={i} style={{ padding: '4px 0', borderBottom: i === (p.features || []).length - 1 ? 'none' : '1px solid #f0f0f0' }}>
                      {f}
                    </li>
                  ))}
                </ul>
                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
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
            ))}
          </div>
        )}
      </div>
    </>
  );
}

