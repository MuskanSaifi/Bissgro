'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiEye, FiMail, FiSmartphone, FiX } from 'react-icons/fi';

export default function LeadsPage() {
  const [tab, setTab] = useState('subscribe'); // subscribe | ads

  const [subscribeLeads, setSubscribeLeads] = useState([]);
  const [adsLeads, setAdsLeads] = useState([]);

  const [loadingSubscribe, setLoadingSubscribe] = useState(true);
  const [loadingAds, setLoadingAds] = useState(true);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch('/api/leads', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setSubscribeLeads(data.leads);
        else if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error('Failed to load leads'))
      .finally(() => setLoadingSubscribe(false));

    fetch('/api/ads-leads', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setAdsLeads(data.leads);
        else if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error('Failed to load ads leads'))
      .finally(() => setLoadingAds(false));
  }, []);

  const badge = (text, tone) => {
    const tones = {
      gray: { bg: '#f3f4f6', fg: '#111827' },
      green: { bg: '#ecfdf5', fg: '#065f46' },
      yellow: { bg: '#fffbeb', fg: '#92400e' },
      red: { bg: '#fef2f2', fg: '#991b1b' },
      blue: { bg: '#eff6ff', fg: '#1d4ed8' },
      purple: { bg: '#f5f3ff', fg: '#5b21b6' },
    };
    const t = tones[tone] || tones.gray;
    return (
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          padding: '4px 10px',
          borderRadius: 999,
          background: t.bg,
          color: t.fg,
          fontSize: 12,
          fontWeight: 800,
          border: '1px solid rgba(0,0,0,0.06)',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
    );
  };

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '14px' }}>Leads</h1>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 18 }}>
          <button
            onClick={() => setTab('subscribe')}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #eee',
              background: tab === 'subscribe' ? 'var(--accent)' : '#fff',
              color: tab === 'subscribe' ? '#fff' : '#111',
              cursor: 'pointer',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FiMail /> Subscribe Leads ({subscribeLeads.length})
          </button>
          <button
            onClick={() => setTab('ads')}
            style={{
              padding: '10px 14px',
              borderRadius: 10,
              border: '1px solid #eee',
              background: tab === 'ads' ? 'var(--accent)' : '#fff',
              color: tab === 'ads' ? '#fff' : '#111',
              cursor: 'pointer',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FiSmartphone /> Ads Leads ({adsLeads.length})
          </button>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
          {tab === 'subscribe' ? (
            loadingSubscribe ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
            ) : subscribeLeads.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
                <FiMail size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
                <p>No newsletter subscribers yet.</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '16px', textAlign: 'left' }}>#</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Email</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Source</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribeLeads.map((lead, i) => (
                    <tr key={lead._id} style={{ borderTop: '1px solid #eee' }}>
                      <td style={{ padding: '16px' }}>{i + 1}</td>
                      <td style={{ padding: '16px' }}>{lead.email}</td>
                      <td style={{ padding: '16px' }}>{lead.source || 'newsletter'}</td>
                      <td style={{ padding: '16px', color: '#666' }}>
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          ) : loadingAds ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
          ) : adsLeads.length === 0 ? (
            <div style={{ padding: '60px 20px', textAlign: 'center', color: '#666' }}>
              <FiSmartphone size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
              <p>No ads leads yet.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980 }}>
                <thead>
                  <tr style={{ background: '#f8f9fa' }}>
                    <th style={{ padding: '16px', textAlign: 'left' }}>#</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Mobile</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>City/State</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>App</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Budget</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Timeline</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Priority</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Score</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Date</th>
                    <th style={{ padding: '16px', textAlign: 'left' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adsLeads.map((lead, i) => {
                    const loc = [lead?.contact?.city, lead?.contact?.state].filter(Boolean).join(', ') || '—';
                    const pr = lead?.priority || 'low';
                    const prTone = pr === 'high' ? 'red' : pr === 'medium' ? 'yellow' : 'gray';
                    return (
                      <tr key={lead._id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '16px' }}>{i + 1}</td>
                        <td style={{ padding: '16px', fontWeight: 800 }}>{lead?.contact?.fullName || '—'}</td>
                        <td style={{ padding: '16px' }}>{lead?.contact?.mobile || '—'}</td>
                        <td style={{ padding: '16px', color: '#555' }}>{loc}</td>
                        <td style={{ padding: '16px' }}>
                          {lead?.requirement?.appType ? badge(lead.requirement.appType, 'blue') : '—'}
                        </td>
                        <td style={{ padding: '16px' }}>{lead?.filters?.budgetINR ? badge(lead.filters.budgetINR, 'purple') : '—'}</td>
                        <td style={{ padding: '16px' }}>{lead?.filters?.timeline ? badge(lead.filters.timeline, 'gray') : '—'}</td>
                        <td style={{ padding: '16px' }}>{badge(pr, prTone)}</td>
                        <td style={{ padding: '16px', fontWeight: 900 }}>{Number(lead?.leadScore || 0)}</td>
                        <td style={{ padding: '16px', color: '#666' }}>
                          {new Date(lead.createdAt).toLocaleDateString('en-IN', { dateStyle: 'medium' })}
                        </td>
                        <td style={{ padding: '16px' }}>
                          <button
                            onClick={() => setSelected(lead)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: 10,
                              border: '1px solid #eee',
                              background: '#fff',
                              cursor: 'pointer',
                              fontWeight: 900,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 8,
                            }}
                          >
                            <FiEye /> View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
            display: 'grid',
            placeItems: 'center',
            padding: 18,
            zIndex: 50,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(920px, 100%)',
              background: '#fff',
              borderRadius: 14,
              boxShadow: '0 20px 60px rgba(0,0,0,0.18)',
              overflow: 'hidden',
              border: '1px solid #eee',
            }}
          >
            <div
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid #eee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <div style={{ fontWeight: 900 }}>
                {selected?.contact?.fullName || 'Lead'}{' '}
                <span style={{ color: '#666', fontWeight: 700 }}>({selected?._id})</span>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 10,
                  border: '1px solid #eee',
                  background: '#fff',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                <FiX />
              </button>
            </div>
            <div style={{ padding: 16 }}>
              <pre
                style={{
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  background: '#0b1020',
                  color: '#e5e7eb',
                  borderRadius: 12,
                  padding: 14,
                  fontSize: 12,
                  lineHeight: 1.55,
                  maxHeight: '70vh',
                  overflow: 'auto',
                }}
              >
                {JSON.stringify(selected, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
