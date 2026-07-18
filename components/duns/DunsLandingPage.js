import ContactForm from '@/components/ContactForm';
import DunsFaq from './DunsFaq';

const WA =
  'https://wa.me/919625945041?text=Hi%2C%20I%20want%20to%20get%20a%20DUNS%20Number';

const HERO_STATS = [
  { value: '10,000+', label: 'Happy Clients' },
  { value: '120+', label: 'Countries Served' },
  { value: '95%', label: 'Success Rate' },
  { value: '48 Hrs', label: 'Avg. Delivery' },
];

const BENEFITS = [
  {
    icon: 'fas fa-clock',
    title: 'Get It Fast',
    desc: 'Receive your DUNS Number within 48 hours with our fast-track process.',
  },
  {
    icon: 'fas fa-globe',
    title: 'Global Recognition',
    desc: 'Accepted worldwide by leading marketplaces, organizations and government entities.',
  },
  {
    icon: 'fas fa-file-alt',
    title: 'Easy & Simple',
    desc: 'Hassle-free process with minimal documentation and step-by-step guidance.',
  },
  {
    icon: 'fas fa-headset',
    title: 'Expert Support',
    desc: 'Our experts assist you at every step — from application to final delivery.',
  },
];

const MARKETPLACES = [
  { icon: 'fab fa-amazon', name: 'Amazon' },
  { icon: 'fas fa-store', name: 'Walmart' },
  { icon: 'fab fa-google-play', name: 'Google Play' },
  { icon: 'fab fa-apple', name: 'App Store' },
  { icon: 'fab fa-shopify', name: 'Shopify' },
  { icon: 'fas fa-ellipsis-h', name: '& More' },
];

const WHY_FEATURES = [
  {
    icon: 'fas fa-check-circle',
    title: 'Official & Authorized Source',
    desc: 'Trusted process for legitimate DUNS Number registration.',
  },
  {
    icon: 'fas fa-shield-alt',
    title: 'Secure & Confidential',
    desc: 'Your business data stays protected at every step.',
  },
  {
    icon: 'fas fa-tags',
    title: 'Affordable Pricing',
    desc: 'Premium service at competitive, transparent rates.',
  },
  {
    icon: 'fas fa-undo',
    title: '100% Money Back Guarantee',
    desc: 'Full confidence with our satisfaction guarantee.',
  },
  {
    icon: 'fas fa-user-tie',
    title: 'Dedicated Expert Support',
    desc: 'Guidance from start until your DUNS is delivered.',
  },
  {
    icon: 'fas fa-bolt',
    title: 'Fast-Track Delivery',
    desc: 'Most applications completed in as little as 48 hours.',
  },
];

const STEPS = [
  {
    num: '01',
    icon: 'fas fa-edit',
    title: 'Submit Your Details',
    desc: 'Fill in the simple form with your business information.',
  },
  {
    num: '02',
    icon: 'fas fa-cogs',
    title: 'We Process Your Request',
    desc: 'Our team verifies and processes your application carefully.',
  },
  {
    num: '03',
    icon: 'fas fa-check-double',
    title: 'Receive Your DUNS Number',
    desc: 'Get your DUNS Number delivered in as little as 48 hours.',
  },
];

const STATS = [
  { icon: 'fas fa-smile', value: '10,000+', label: 'Happy Clients' },
  { icon: 'fas fa-globe-americas', value: '120+', label: 'Countries Served' },
  { icon: 'fas fa-chart-line', value: '95%', label: 'Success Rate' },
  { icon: 'fas fa-clock', value: '48 Hrs', label: 'Average Delivery' },
  { icon: 'fas fa-shield-alt', value: '100%', label: 'Secure Process' },
  { icon: 'fas fa-headset', value: '24/7', label: 'Support' },
];

export default function DunsLandingPage() {
  return (
    <div className="home-page">
      {/* Hero */}
      <section className="home-hero" aria-label="DUNS Number hero">
        <div className="home-container">
          <div className="home-hero-grid">
            <div>
              <span className="home-tag">DUNS Number Registration</span>
              <h1 className="home-hero-title">
                Get Your DUNS Number in{' '}
                <span className="highlight">48 Hours</span>
              </h1>
              <p className="home-hero-desc">
                The essential DUNS Number for global marketplaces and business
                growth. Fast, simple and reliable service you can trust.
              </p>
              <div className="home-hero-actions">
                <a
                  href={WA}
                  className="btn-home-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Your DUNS Number
                </a>
                <a href="tel:+919625945041" className="btn-home-outline">
                  <i className="fas fa-phone-alt" /> Talk to Expert
                </a>
              </div>
              <div className="home-hero-stats">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="home-hero-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-hero-visual">
              <div className="home-hero-visual-main">
                <img
                  src="/assets/banner/banner.png"
                  alt="Get your DUNS Number with Bissgro"
                />
                <div className="home-hero-badge b1">
                  <i className="fas fa-bolt" /> Fast Track
                </div>
                <div className="home-hero-badge b2">
                  <i className="fas fa-shield-alt" /> 100% Secure
                </div>
                <div className="home-hero-badge b3">
                  <i className="fab fa-amazon" /> Amazon Ready
                </div>
                <div className="home-hero-badge b4">
                  <i className="fas fa-clock" /> 48 Hrs Delivery
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section
        id="benefits"
        className="home-section home-section-alt"
        aria-labelledby="duns-benefits-title"
      >
        <div className="home-container home-center">
          <span className="home-tag">Why Choose Us</span>
          <h2 id="duns-benefits-title" className="home-heading">
            Why Businesses Choose Our{' '}
            <span className="highlight">DUNS Service</span>
          </h2>
          <p className="home-subtitle">
            Everything you need to get marketplace-ready — without the hassle.
          </p>
        </div>
        <div className="home-container">
          <div className="home-services-grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="home-service-card">
                <div className="home-service-icon">
                  <i className={b.icon} />
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplaces */}
      <section className="home-logos-slider" aria-label="Required for marketplaces">
        <div className="home-container home-center" style={{ marginBottom: 24 }}>
          <span className="home-tag">Global Marketplaces</span>
          <h2 className="home-heading" style={{ fontSize: '1.75rem' }}>
            Required for <span className="highlight">Business Growth</span>
          </h2>
        </div>
        <div className="home-container" style={{ overflow: 'hidden' }}>
          <div className="home-logos-track">
            {[...MARKETPLACES, ...MARKETPLACES].map((m, i) => (
              <div key={`${m.name}-${i}`} className="home-logo-item">
                <i className={m.icon} />
                {m.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="home-section" aria-labelledby="duns-why-title">
        <div className="home-container">
          <div className="home-why-grid">
            <div className="home-why-visual">
              <img
                src="/assets/rocket.png"
                alt="Grow globally with your DUNS Number"
                className="home-why-rocket-img"
              />
            </div>
            <div>
              <span className="home-tag">Why Bissgro</span>
              <h2 id="duns-why-title" className="home-heading">
                Why Choose <span className="highlight">Bissgro?</span>
              </h2>
              <p className="home-subtitle left">
                We help businesses get their DUNS Number quickly so they can sell
                on Amazon, Walmart, Google Play, App Store and grow globally.
              </p>
              <div className="home-why-features">
                {WHY_FEATURES.map((f) => (
                  <div key={f.title} className="home-why-feature">
                    <i className={f.icon} />
                    <div>
                      <h4>{f.title}</h4>
                      <p>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="home-stats-bar" aria-label="Key statistics">
        <div className="home-container">
          <div className="home-stats-grid">
            {STATS.map((s) => (
              <div key={s.label} className="home-stat-item">
                <i className={s.icon} />
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        className="home-section home-section-alt"
        aria-labelledby="duns-process-title"
      >
        <div className="home-container home-center">
          <span className="home-tag">How It Works</span>
          <h2 id="duns-process-title" className="home-heading">
            Get Your DUNS in <span className="highlight">3 Simple Steps</span>
          </h2>
          <p className="home-subtitle">
            A clear, transparent process from application to delivery.
          </p>
          <div className="home-process-steps duns-process-steps">
            {STEPS.map((step) => (
              <div key={step.num} className="home-process-step">
                <div className="home-process-num">{step.num}</div>
                <div className="home-process-icon">
                  <i className={step.icon} />
                </div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <DunsFaq />

      {/* CTA */}
      <section className="home-cta-banner" aria-label="Call to action">
        <div className="home-container">
          <div className="home-cta-inner">
            <div>
              <h2>Start Your Global Journey Today!</h2>
              <p>
                Get Your DUNS Number with Bissgro — fast, simple and reliable.
              </p>
            </div>
            <div className="home-cta-actions">
              <a
                href={WA}
                className="btn-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started Now
              </a>
              <a href="tel:+919625945041" className="btn-outline-white">
                <i className="fas fa-phone-alt" /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-form-box">
            <h2>Still Have Questions? Contact Us</h2>
            <p>Ready for your DUNS Number? Drop us a message.</p>
            <ContactForm />
          </div>
          <div className="contact-info-box">
            <div className="contact-illustration">
              <img
                src="/assets/contact.png"
                className="img-fluid px-5"
                alt="Contact Bissgro"
              />
            </div>
            <ul className="info-list">
              <li>
                <i className="fas fa-map-marker-alt" /> 44, Block-H, Sector-63,
                Noida, Uttar Pradesh, India, 201301
              </li>
              <li>
                <i className="fas fa-phone" />{' '}
                <a href="tel:+919625945041">+91 96259 45041</a>
              </li>
              <li>
                <i className="fas fa-envelope" />{' '}
                <a href="mailto:info@bissgro.com">info@bissgro.com</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
