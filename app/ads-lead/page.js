'use client';

import { useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FiArrowLeft, FiArrowRight, FiCheckCircle, FiInfo, FiLoader } from 'react-icons/fi';

const steps = [
  { id: 'contact', title: 'Contact details', optional: false },
  { id: 'requirement', title: 'App requirement', optional: true },
  { id: 'filters', title: 'Budget & timeline', optional: true },
  { id: 'business', title: 'Business context', optional: true },
];

const inputStyle = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: '10px',
  border: '1px solid #e6e6e6',
  outline: 'none',
  background: '#fff',
};

const labelStyle = { fontSize: 13, color: '#444', marginBottom: 6, fontWeight: 600 };

function onlyDigits(v) {
  return String(v || '').replace(/\D/g, '');
}

export default function AdsLeadPage() {
  const [stepIdx, setStepIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [skipped, setSkipped] = useState(() => new Set());

  const [form, setForm] = useState({
    source: 'ads',
    contact: {
      fullName: '',
      mobile: '',
      whatsappSame: true,
      email: '',
      city: '',
      state: '',
    },
    requirement: {
      appGoal: '',
      appType: '',
      category: '',
      description: '',
    },
    filters: {
      budgetINR: '',
      timeline: '',
      readyToStart: false,
    },
    businessContext: {
      businessType: '',
      hasGST: false,
      decisionMaker: true,
    },
    extras: {
      needsBackend: false,
      needsDesign: false,
      publishToStore: true,
    },
    meta: {},
  });

  const step = steps[stepIdx];
  const progress = useMemo(() => Math.round(((stepIdx + 1) / steps.length) * 100), [stepIdx]);

  const setField = (path, value) => {
    setForm((prev) => {
      const next = structuredClone(prev);
      const parts = path.split('.');
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) cur = cur[parts[i]];
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const validateContact = () => {
    const name = form.contact.fullName.trim();
    const mob = onlyDigits(form.contact.mobile);
    if (!name) return 'Please enter your full name';
    if (mob.length < 10) return 'Please enter a valid 10-digit mobile number';
    return null;
  };

  const goNext = () => {
    if (step.id === 'contact') {
      const err = validateContact();
      if (err) return toast.error(err);
    }
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const goBack = () => setStepIdx((i) => Math.max(i - 1, 0));

  const skipStep = () => {
    setSkipped((prev) => new Set(prev).add(step.id));
    setStepIdx((i) => Math.min(i + 1, steps.length - 1));
  };

  const onSubmit = async () => {
    const err = validateContact();
    if (err) return toast.error(err);

    setSubmitting(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const payload = {
        ...form,
        contact: {
          ...form.contact,
          mobile: onlyDigits(form.contact.mobile),
        },
        meta: {
          utmSource: params.get('utm_source') || undefined,
          utmMedium: params.get('utm_medium') || undefined,
          utmCampaign: params.get('utm_campaign') || undefined,
          utmContent: params.get('utm_content') || undefined,
          utmTerm: params.get('utm_term') || undefined,
          landingPage: window.location.href,
        },
      };

      const res = await fetch('/api/ads-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed');

      toast.success('Thanks! We received your details.');
      setStepIdx(0);
      setSkipped(new Set());
      setForm((prev) => ({
        ...prev,
        contact: { fullName: '', mobile: '', whatsappSame: true, email: '', city: '', state: '' },
        requirement: { appGoal: '', appType: '', category: '', description: '' },
        filters: { budgetINR: '', timeline: '', readyToStart: false },
        businessContext: { businessType: '', hasGST: false, decisionMaker: true },
        extras: { needsBackend: false, needsDesign: false, publishToStore: true },
      }));
    } catch (e) {
      toast.error(e?.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div
        style={{
          minHeight: 'calc(100vh - 120px)',
          padding: '40px 16px',
          background: 'linear-gradient(180deg, #fff 0%, #f7f7fb 100%)',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', alignItems: 'stretch' }}>
            <div
              style={{
                flex: '1 1 320px',
                background: '#111827',
                color: '#fff',
                borderRadius: 16,
                padding: 22,
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 12, opacity: 0.75, letterSpacing: 0.4 }}>Bissgro</div>
                  <h1 style={{ margin: '6px 0 0', fontSize: 26, lineHeight: 1.1, fontWeight: 800 }}>
                    Get a free app estimate
                  </h1>
                </div>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.10)',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 800,
                  }}
                >
                  {progress}%
                </div>
              </div>

              <div style={{ marginTop: 14, fontSize: 13, opacity: 0.85, lineHeight: 1.55 }}>
                <FiInfo style={{ marginRight: 8, position: 'relative', top: 2 }} />
                Minimum details: <b>Name + Mobile</b>. बाकी fields आप skip कर सकते हैं.
              </div>

              <div style={{ marginTop: 18, display: 'grid', gap: 10 }}>
                {steps.map((s, idx) => {
                  const active = idx === stepIdx;
                  const done = idx < stepIdx;
                  const wasSkipped = skipped.has(s.id);
                  return (
                    <button
                      key={s.id}
                      onClick={() => setStepIdx(idx)}
                      style={{
                        textAlign: 'left',
                        border: '1px solid rgba(255,255,255,0.12)',
                        background: active ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                        color: '#fff',
                        padding: '12px 12px',
                        borderRadius: 12,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 9,
                          display: 'grid',
                          placeItems: 'center',
                          background: done ? 'rgba(16,185,129,0.22)' : 'rgba(255,255,255,0.10)',
                          border: '1px solid rgba(255,255,255,0.14)',
                          flexShrink: 0,
                        }}
                      >
                        {done ? <FiCheckCircle /> : idx + 1}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{s.title}</div>
                        <div style={{ fontSize: 12, opacity: 0.75 }}>
                          {s.optional ? (wasSkipped ? 'Skipped' : 'Optional') : 'Required'}
                        </div>
                      </div>
                      <FiArrowRight style={{ opacity: active ? 1 : 0.35 }} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              style={{
                flex: '2 1 520px',
                background: '#fff',
                borderRadius: 16,
                padding: 22,
                boxShadow: '0 10px 30px rgba(0,0,0,0.06)',
                border: '1px solid #eee',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    Step {stepIdx + 1} of {steps.length}
                  </div>
                  <h2 style={{ margin: '6px 0 0', fontSize: 22, fontWeight: 800 }}>{step.title}</h2>
                </div>
                {step.optional && (
                  <button
                    onClick={skipStep}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 10,
                      border: '1px dashed #d7d7d7',
                      background: '#fafafa',
                      cursor: 'pointer',
                      fontWeight: 700,
                      color: '#333',
                    }}
                  >
                    Skip for now
                  </button>
                )}
              </div>

              <div style={{ marginTop: 18 }}>
                {step.id === 'contact' && (
                  <div style={{ display: 'grid', gap: 14 }}>
                    <div>
                      <div style={labelStyle}>Full name *</div>
                      <input
                        value={form.contact.fullName}
                        onChange={(e) => setField('contact.fullName', e.target.value)}
                        style={inputStyle}
                        placeholder="e.g. Nazim Khan"
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={labelStyle}>Mobile (WhatsApp) *</div>
                        <input
                          value={form.contact.mobile}
                          onChange={(e) => setField('contact.mobile', e.target.value)}
                          style={inputStyle}
                          placeholder="10-digit number"
                          inputMode="numeric"
                        />
                        <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                          We’ll contact you on WhatsApp/call within working hours.
                        </div>
                      </div>
                      <div>
                        <div style={labelStyle}>Email (optional)</div>
                        <input
                          value={form.contact.email}
                          onChange={(e) => setField('contact.email', e.target.value)}
                          style={inputStyle}
                          placeholder="name@example.com"
                        />
                      </div>
                    </div>

                    <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={form.contact.whatsappSame}
                        onChange={(e) => setField('contact.whatsappSame', e.target.checked)}
                      />
                      <span style={{ fontSize: 13, color: '#333' }}>WhatsApp number same as mobile</span>
                    </label>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={labelStyle}>City (optional)</div>
                        <input
                          value={form.contact.city}
                          onChange={(e) => setField('contact.city', e.target.value)}
                          style={inputStyle}
                          placeholder="e.g. Mumbai"
                        />
                      </div>
                      <div>
                        <div style={labelStyle}>State (optional)</div>
                        <input
                          value={form.contact.state}
                          onChange={(e) => setField('contact.state', e.target.value)}
                          style={inputStyle}
                          placeholder="e.g. Maharashtra"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step.id === 'requirement' && (
                  <div style={{ display: 'grid', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={labelStyle}>App goal (optional)</div>
                        <select
                          value={form.requirement.appGoal}
                          onChange={(e) => setField('requirement.appGoal', e.target.value)}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="business">Business</option>
                          <option value="startup">Startup</option>
                          <option value="internal">Internal use</option>
                          <option value="idea">Idea stage</option>
                        </select>
                      </div>
                      <div>
                        <div style={labelStyle}>App type (optional)</div>
                        <select
                          value={form.requirement.appType}
                          onChange={(e) => setField('requirement.appType', e.target.value)}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="android">Android</option>
                          <option value="ios">iOS</option>
                          <option value="both">Android + iOS</option>
                          <option value="web">Web app</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <div style={labelStyle}>Category (optional)</div>
                      <select
                        value={form.requirement.category}
                        onChange={(e) => setField('requirement.category', e.target.value)}
                        style={inputStyle}
                      >
                        <option value="">Select</option>
                        <option value="ecommerce">Ecommerce</option>
                        <option value="crm">CRM</option>
                        <option value="booking">Booking</option>
                        <option value="custom">Custom</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <div style={labelStyle}>Short description (optional)</div>
                      <textarea
                        value={form.requirement.description}
                        onChange={(e) => setField('requirement.description', e.target.value)}
                        style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }}
                        placeholder="What do you want to build? Any reference apps / features?"
                      />
                      <div style={{ marginTop: 8, fontSize: 12, color: '#666' }}>
                        Tip: 2–3 lines is enough. You can skip if you’re not sure.
                      </div>
                    </div>
                  </div>
                )}

                {step.id === 'filters' && (
                  <div style={{ display: 'grid', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <div style={labelStyle}>Budget (optional)</div>
                        <select
                          value={form.filters.budgetINR}
                          onChange={(e) => setField('filters.budgetINR', e.target.value)}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="<25k">&lt; 25k</option>
                          <option value="25k-75k">25k – 75k</option>
                          <option value="75k-2L">75k – 2L</option>
                          <option value="2L-5L">2L – 5L</option>
                          <option value="5L+">5L+</option>
                        </select>
                      </div>
                      <div>
                        <div style={labelStyle}>Timeline (optional)</div>
                        <select
                          value={form.filters.timeline}
                          onChange={(e) => setField('filters.timeline', e.target.value)}
                          style={inputStyle}
                        >
                          <option value="">Select</option>
                          <option value="asap">ASAP</option>
                          <option value="1month">~ 1 month</option>
                          <option value="2-3months">2–3 months</option>
                          <option value="flexible">Flexible</option>
                        </select>
                      </div>
                    </div>
                    <label style={{ display: 'flex', gap: 10, alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={form.filters.readyToStart}
                        onChange={(e) => setField('filters.readyToStart', e.target.checked)}
                      />
                      <span style={{ fontSize: 13, color: '#333' }}>Ready to start soon</span>
                    </label>
                  </div>
                )}

                {step.id === 'business' && (
                  <div style={{ display: 'grid', gap: 14 }}>
                    <div
                      style={{
                        marginTop: 8,
                        padding: 14,
                        borderRadius: 12,
                        border: '1px solid #eee',
                        background: '#fafafa',
                        color: '#333',
                        fontSize: 13,
                        lineHeight: 1.55,
                      }}
                    >
                      Submit करने के बाद हमारी team आपको WhatsApp/Call करेगी और next steps share करेगी.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                <button
                  onClick={goBack}
                  disabled={stepIdx === 0 || submitting}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1px solid #eee',
                    background: '#fff',
                    cursor: stepIdx === 0 ? 'not-allowed' : 'pointer',
                    fontWeight: 800,
                    color: '#111',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    opacity: stepIdx === 0 ? 0.5 : 1,
                  }}
                >
                  <FiArrowLeft /> Back
                </button>

                {stepIdx < steps.length - 1 ? (
                  <button
                    onClick={goNext}
                    disabled={submitting}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: 'none',
                      background: 'var(--accent)',
                      cursor: 'pointer',
                      fontWeight: 900,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    Next <FiArrowRight />
                  </button>
                ) : (
                  <button
                    onClick={onSubmit}
                    disabled={submitting}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 12,
                      border: 'none',
                      background: submitting ? '#0f766e' : '#10b981',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontWeight: 900,
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      minWidth: 150,
                      justifyContent: 'center',
                    }}
                  >
                    {submitting ? (
                      <>
                        <FiLoader /> Submitting…
                      </>
                    ) : (
                      <>
                        Submit <FiCheckCircle />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

