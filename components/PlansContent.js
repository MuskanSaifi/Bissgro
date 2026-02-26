'use client';

import { useEffect, useState } from 'react';
import CheckoutModal from './CheckoutModal';

const TABS = [
  { id: 'web', label: 'Web Development' },
  { id: 'app', label: 'App Development' },
  { id: 'seo', label: 'SEO Services' },
];

// Fallback static data used only when no plans exist in DB yet
const WEB_PLANS_FALLBACK = [
  { name: 'Basic Website', price: 10000, featured: false, features: ['Single-page website (static)', 'Mobile responsive design', 'Contact form integration', 'Free SSL integration', 'Basic SEO setup', '1 round of revisions', 'Website Maintenance (3 Months)'] },
  { name: 'Business Website', price: 20000, featured: false, features: ['Up to 5 pages', 'CMS integration', 'SEO-friendly structure', 'Social media integration', 'Google Maps integration', 'Contact form', '2 rounds of revisions', 'Basic speed optimization', 'Website Maintenance (6 Months)'] },
  { name: 'E-commerce Website', price: 70000, featured: true, features: ['Custom UI/UX design', 'Unlimited pages', 'E-commerce functionality', 'Advanced SEO setup', 'Speed optimization', 'Live Chat / Chatbot', 'Google Analytics setup', 'Blog with categories', 'Multi-language support', 'Website Maintenance (1 Year)'] },
  { name: 'Enterprise Solution', price: 150000, featured: false, features: ['Everything in E-commerce', 'Custom features & integrations', 'Advanced security', 'Dedicated hosting', 'Email marketing integration', 'Dedicated account manager', 'Priority support', 'Website Maintenance (1 Year)'] },
];

const APP_PLANS_FALLBACK = [
  { name: 'Basic App', price: 50000, featured: false, features: ['Single platform (iOS or Android)', 'Basic UI/UX design', 'Core features', 'App Store submission', '3 months support'] },
  { name: 'Cross-Platform App', price: 80000, featured: true, features: ['iOS + Android', 'Custom UI/UX design', 'Advanced features', 'Backend integration', 'Push notifications', 'App Store + Play Store', '6 months support'] },
  { name: 'Enterprise App', price: 150000, featured: false, features: ['iOS + Android + Web', 'Premium UI/UX design', 'Custom backend', 'Payment gateway', 'Real-time features', 'Analytics integration', '1 year support'] },
];

const SEO_PLANS_FALLBACK = [
  { name: 'Basic SEO', price: 5000, monthly: true, featured: false, features: ['On-page SEO optimization', 'Keyword research', 'Meta tags optimization', 'Monthly report', '5 keywords targeting'] },
  { name: 'Advanced SEO', price: 10000, monthly: true, featured: true, features: ['Everything in Basic', 'Off-page SEO', 'Link building', 'Content optimization', '15 keywords targeting', 'Weekly reports', 'Google Analytics setup'] },
  { name: 'Premium SEO', price: 20000, monthly: true, featured: false, features: ['Everything in Advanced', 'Technical SEO audit', 'Competitor analysis', 'Unlimited keywords', 'Daily monitoring', 'Dedicated SEO manager', 'Priority support'] },
];

export default function PlansContent() {
  const [tab, setTab] = useState('web');
  const [modalOpen, setModalOpen] = useState(false);
  const [checkout, setCheckout] = useState({ plan: '', price: 0, service: 'web', monthly: false });
  const [plans, setPlans] = useState({
    web: WEB_PLANS_FALLBACK,
    app: APP_PLANS_FALLBACK,
    seo: SEO_PLANS_FALLBACK,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch('/api/plans');
        const data = await res.json();
        if (res.ok && Array.isArray(data.plans) && data.plans.length) {
          const grouped = { web: [], app: [], seo: [] };
          data.plans.forEach((p) => {
            if (!grouped[p.service]) return;
            grouped[p.service].push(p);
          });
          // Ensure featured plans come first in each group
          Object.keys(grouped).forEach((key) => {
            grouped[key] = grouped[key].sort((a, b) => {
              if (a.featured === b.featured) return (a.order || 0) - (b.order || 0);
              return a.featured ? -1 : 1;
            });
          });
          setPlans(grouped);
        }
      } catch (e) {
        // keep fallback plans on error
        console.error('Failed to load plans', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const openCheckout = (planName, price, service, monthly = false) => {
    setCheckout({ plan: planName, price, service, monthly });
    setModalOpen(true);
  };

  return (
    <>
      <section className="pricing-section">
        <div className="container">
          <h2>Our Pricing Plans</h2>
          <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>Choose the perfect plan for your business needs</p>

          <div className="service-tabs">
            {TABS.map((t) => (
              <button key={t.id} type="button" className={`tab-btn ${tab === t.id ? 'active' : ''}`} data-tab={t.id} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'web' && (
            <div id="web-tab" className="tab-content active">
              <div className="pricing-cards">
                {plans.web.map((p) => (
                  <div key={p._id || p.name} className={`card ${p.featured ? 'featured' : ''}`}>
                    {p.featured && <div className="badge">Popular</div>}
                    <h3>{p.name}</h3>
                    <div className="price">
                      {p.priceText
                        ? p.priceText
                        : `₹${Number(p.price).toLocaleString('en-IN')}`}
                    </div>
                    <ul className="features">
                      {(p.features || []).map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn-plan" onClick={() => openCheckout(p.name, Number(p.price), 'web')}>Buy Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'app' && (
            <div id="app-tab" className="tab-content active">
              <div className="pricing-cards">
                {plans.app.map((p) => (
                  <div key={p._id || p.name} className={`card ${p.featured ? 'featured' : ''}`}>
                    {p.featured && <div className="badge">Popular</div>}
                    <h3>{p.name}</h3>
                    <div className="price">
                      {p.priceText
                        ? p.priceText
                        : `₹${Number(p.price).toLocaleString('en-IN')}`}
                    </div>
                    <ul className="features">
                      {(p.features || []).map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn-plan" onClick={() => openCheckout(p.name, Number(p.price), 'app')}>Buy Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'seo' && (
            <div id="seo-tab" className="tab-content active">
              <div className="pricing-cards">
                {plans.seo.map((p) => (
                  <div key={p._id || p.name} className={`card ${p.featured ? 'featured' : ''}`}>
                    {p.featured && <div className="badge">Popular</div>}
                    <h3>{p.name}</h3>
                    <div className="price">
                      {p.priceText
                        ? p.priceText
                        : <>
                            ₹{Number(p.price).toLocaleString('en-IN')}
                            {(p.monthly ?? true) && <span className="period">/month</span>}
                          </>}
                    </div>
                    <ul className="features">
                      {(p.features || []).map((f, j) => (
                        <li key={j}>{f}</li>
                      ))}
                    </ul>
                    <button type="button" className="btn-plan" onClick={() => openCheckout(p.name, Number(p.price), 'seo', p.monthly ?? true)}>Buy Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <CheckoutModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        plan={checkout.plan}
        price={checkout.price}
        service={checkout.service}
        monthly={checkout.monthly}
      />
    </>
  );
}
