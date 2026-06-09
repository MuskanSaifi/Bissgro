// components/SectionRenderer.js
import Link from 'next/link';
import ContactForm from './ContactForm';
import NewsletterForm from './NewsletterForm';
import ReviewSlider from './ReviewSlider';

const defaultServices = [
  { icon: '#2563eb', img: '/assets/services/WEB.jpg', title: 'Web Development', desc: 'Beautiful, responsive websites.', linkText: 'Web Development', linkUrl: '/web-development-company-in-noida' },
  { icon: '#ea580c', img: '/assets/services/APP.jpg', title: 'App Development', desc: 'Native & cross-platform apps for iOS and Android.', linkText: 'App Development', linkUrl: '#' },
  { icon: '#16a34a', img: '/assets/services/SEO.jpg', title: 'Search Engine Optimization', desc: 'Improve your visibility and grow organic traffic.', linkText: 'SEO', linkUrl: '/best-seo-services-in-noida' },
  { icon: '#7c3aed', img: '/assets/services/SMO.jpg', title: 'Social Media Optimization', desc: 'Engaging content and social growth strategies.', linkText: 'SMO', linkUrl: '#' },
];

const defaultTech = [
  { img: '/assets/tech-stack/js.png', title: 'Javascript', desc: 'Frontend & Node.js expertise.' },
  { img: '/assets/tech-stack/reactNative.png', title: 'React', desc: 'Modern SPA & component design.' },
  { img: '/assets/tech-stack/node.png', title: 'Node.js', desc: 'APIs, servers & real-time apps.' },
  { img: '/assets/tech-stack/php.png', title: 'PHP', desc: 'Legacy & CMS integrations.' },
  { img: '/assets/tech-stack/sql.png', title: 'SQL', desc: 'Database management.' },
  { img: '/assets/tech-stack/git.png', title: 'Git', desc: 'Version control.' },
  { img: '/assets/tech-stack/mongo.png', title: 'MongoDB', desc: 'NoSQL database for scalability.' },
  { img: '/assets/tech-stack/next.png', title: 'Next.js', desc: 'Server-side rendering & SEO.' },
  { img: '/assets/tech-stack/reactNative.png', title: 'React Native', desc: 'Cross-platform mobile apps.' },
];


export default function SectionRenderer({ section }) {
  if (!section) return null;
  const { type, content } = section;
  const c = content || {};

  switch (type) {
    case 'hero': {
      const layout = c.layout || 'default';
      const isServiceHero = layout === 'service';
      const heroClassName = isServiceHero ? 'hero hero-service container' : 'hero container';
      const trustedByLogos = Array.isArray(c.trustedByLogos) ? c.trustedByLogos : (c.trustedByLogos ? String(c.trustedByLogos).split(/\n/).filter(Boolean) : []);
      const hasTrustedBy = isServiceHero && (c.trustedByText || trustedByLogos.length > 0);

      return (
        <section className={heroClassName} aria-label="Hero">
          <div className="hero-left">
            <h1 className="hero-title">
              {isServiceHero ? (
                <>
                  {c.title || 'Top Web Development Company in Noida —'}
                  {c.highlight && <span className="hero-highlight">{c.highlight}</span>}
                </>
              ) : (
                <span dangerouslySetInnerHTML={{ __html: c.title || "We build your<br /><span>brand's digital presence</span>" }} />
              )}
            </h1>
            <p className="hero-desc">{c.description || 'From custom website development to SEO and digital marketing.'}</p>
            <div className="hero-actions">
              <a className="btn-dark" href={c.ctaLink || '#'}>{c.ctaText || 'Get Free Consultation'}</a>
              <a className="btn-book" href={c.secondaryCtaLink || 'https://wa.me/919540111126'} target="_blank" rel="noopener noreferrer">
                {c.secondaryCtaText || 'Request a Quote'}
              </a>
            </div>
            {hasTrustedBy && (
              <div className="hero-trusted">
                {c.trustedByText && <p className="hero-trusted-text">{c.trustedByText}</p>}
                {trustedByLogos.length > 0 && (
                  <div className="hero-trusted-logos">
                    {trustedByLogos.map((url, i) => (
                      <img key={i} src={url.trim()} alt="" className="hero-trusted-logo" />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="hero-right">
            <div className="hero-card hero-visual">
              <img src={c.image || '/assets/banner/banner.jpeg'} alt="Hero" className="img-fluid" />
            </div>
          </div>
        </section>
      );
    }

    case 'services': {
      const services = c.items?.length ? c.items : defaultServices;
      const layout = c.layout || 'default';
      const sectionClass = layout === 'service' ? 'services services-service' : 'services';
      const isWhatWeDoStyle = layout === 'default';
      const isServicePageStyle = layout === 'service';
      return (
        <section className={sectionClass} aria-labelledby="services-title">
          <div className="inner">
            <h2 id="services-title">{c.title || 'Our Services'}</h2>
            <p>{c.subtitle || 'We provide a variety of services to grow your business.'}</p>
          </div>
          <div className={`container cards-grid ${isWhatWeDoStyle ? 'cards-grid-what-we-do' : ''} ${isServicePageStyle ? 'cards-grid-service-image-top' : ''}`}>
            {services.map((s, i) => (
              <div key={i} className={`service-card ${isWhatWeDoStyle ? 'service-card-what-we-do' : ''} ${isServicePageStyle ? 'service-card-image-top' : ''}`}>
                {isWhatWeDoStyle ? (
                  <>
                    <div className="service-card-image">
                      <img src={s.img || '/assets/logo.png'} alt={s.title || ''} />
                    </div>
                    <div className="service-card-body">
                      <h3>{s.title || 'Item'}</h3>
                      <p>{s.desc || ''}</p>
                      <a
                        className="service-card-btn"
                        href={s.linkUrl || '#'}
                        style={{ background: s.icon || 'var(--accent)' }}
                      >
                        {s.linkText || s.title || 'Learn more'}
                      </a>
                    </div>
                  </>
                ) : isServicePageStyle ? (
                  <>
                    <div className="service-card-image">
                      <img src={s.img || '/assets/logo.png'} alt={s.title || ''} />
                    </div>
                    <div className="service-card-body">
                      <h3>{s.title || 'Item'}</h3>
                      <p>{s.desc || ''}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="icon" style={{ background: s.icon || '#d97436' }}>
                      <img src={s.img || '/assets/logo.png'} alt={s.title || ''} className="img-fluid" />
                    </div>
                    <h3>{s.title || 'Item'}</h3>
                    <p>{s.desc || ''}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      );
    }

 case 'about': {
  const layout = c.layout || 'default';
  const sectionClass = layout === 'service' ? 'about about-service container' : 'about container';
  return (
    <section className={sectionClass} aria-labelledby="about-title">
      <div className="about-left">
        <h2 id="about-title">{c.title || 'About us'}</h2>
        <div
          dangerouslySetInnerHTML={{
            __html:
              (c.content || "").replace(/\n/g, "<br />") ||
              `
              <p>At BissGro, we specialize in delivering innovative business solutions tailored for startups and growing enterprises. Our mission is to empower businesses with modern strategies, digital solutions, and expert support.</p>
              <p>With years of experience, we ensure high-quality services, transparency, and results that help you scale faster. From branding to tech, we've got you covered.</p>
              `,
          }}
        />
      </div>

      <div className="about-right">
        <div className="about-image-card">
          <img
            src={c.image || "/assets/about.png"}
            alt="About BissGro"
          />
        </div>
      </div>
    </section>
  );
}


    case 'tech':
      const tech = c.items?.length ? c.items : defaultTech;
      return (
        <section className="tech" aria-labelledby="tech-title">
          <h2 id="tech-title">{c.title || 'Our Tech'}</h2>
          <div className="tech-row container">
            {tech.map((t, i) => (
              <div key={i} className="tech-card">
                <div className="tech-bubble">
                  <img src={t.img || '/assets/logo.png'} alt={t.title || ''} className="img-fluid" />
                </div>
                <h4>{t.title || 'Item'}</h4>
                <p>{t.desc || ''}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'testimonials':
      return <ReviewSlider items={c.items} title={c.title} />;

    case 'cta':
      return (
        <section className="newsletter" style={c.images?.filter(Boolean).length ? { position: 'relative', overflow: 'hidden' } : {}}>
          {c.images?.filter(Boolean).length > 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0, opacity: 0.15, pointerEvents: 'none' }}>
              {c.images.filter(Boolean).slice(0, 3).map((src, i) => (
                <div key={i} style={{ flex: 1, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              ))}
            </div>
          )}
          <div className="panel" style={{ position: 'relative', zIndex: 1 }}>
            <h3>{c.title || "Let's Work Together"}</h3>
            <p>{c.description || ''}</p>
            <a className="btn-book" href={c.buttonLink || 'https://wa.me/919540111126'} target="_blank" rel="noopener noreferrer">
              {c.buttonText || 'Contact Us'}
            </a>
          </div>
        </section>
      );

    case 'contact':
      return (
        <section className="contact-section">
          <div className="contact-container">
            <div className="contact-form-box">
              <h2>{c.title || "Let's Connect"}</h2>
              <p>{c.description || 'Have a project in mind? Drop us a message.'}</p>
              <ContactForm />
            </div>
            <div className="contact-info-box">
              <div className="contact-illustration">
                <img src="/assets/contact.png" className="img-fluid px-5" alt="Contact" />
              </div>
              <ul className="info-list">
                <li><i className="fas fa-map-marker-alt"></i> {c.address || '44, Block-H, Noida, Uttar Pradesh, India, 201301'}</li>
                <li><i className="fas fa-phone"></i> {c.phone || '+91 95401 11126'}</li>
                <li><i className="fas fa-envelope"></i> {c.email || 'info@bissgro.com'}</li>
              </ul>
            </div>
          </div>
        </section>
      );

    case 'newsletter':
      return (
        <section className="newsletter" style={c.images?.filter(Boolean).length ? { position: 'relative', overflow: 'hidden' } : {}}>
          {c.images?.filter(Boolean).length > 0 && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 0, opacity: 0.15, pointerEvents: 'none' }}>
              {c.images.filter(Boolean).slice(0, 3).map((src, i) => (
                <div key={i} style={{ flex: 1, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              ))}
            </div>
          )}
          <div className="panel" style={{ position: 'relative', zIndex: 1 }}>
            <h3 dangerouslySetInnerHTML={{ __html: c.title || 'Get Our Promo Code by<br /> Subscribing To our Newsletter' }} />
            <NewsletterForm />
          </div>
        </section>
      );

    case 'html':
      return (
        <section className="container py-5" dangerouslySetInnerHTML={{ __html: c.content || '' }} />
      );

    case 'features': {
      const features = c.items || [];
      const layout = c.layout || 'default';
      const sectionClass = layout === 'service' ? 'services services-service' : 'services';
      return (
        <section className={sectionClass} aria-labelledby="features-title">
          <div className="inner">
            <h2 id="features-title">{c.title || 'Features'}</h2>
            <p>{c.subtitle || ''}</p>
          </div>
          <div className="container cards-grid">
            {features.map((f, i) => (
              <div key={i} className="service-card">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      );
    }

    default:
      return null;
  }
}
