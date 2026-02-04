'use client';

import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiMail } from 'react-icons/fi';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/leads', { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        if (data.leads) setLeads(data.leads);
        else if (data.error) toast.error(data.error);
      })
      .catch(() => toast.error('Failed to load leads'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Toaster />
      <div>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '24px' }}>Subscribe Leads</h1>

        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: 'var(--card-shadow)', overflow: 'hidden' }}>
          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>
          ) : leads.length === 0 ? (
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
                {leads.map((lead, i) => (
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
          )}
        </div>
      </div>
    </>
  );
}
