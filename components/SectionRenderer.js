import Link from 'next/link';
import ContactForm from './ContactForm';
import NewsletterForm from './NewsletterForm';
import ReviewSlider from './ReviewSlider';

const defaultServices = [
  { icon: '#9f4a2f', img: '/assets/services/Group 20.png', title: 'Web Development', desc: 'Beautiful, responsive websites.' },
  { icon: '#e87e1f', img: '/assets/services/Group 21.png', title: 'App Development', desc: 'Native & cross-platform apps for iOS and Android.' },
  { icon: '#e87e1f', img: '/assets/services/Group 22.png', title: 'SEO (Search Engine Optimization)', desc: 'Improve your visibility and grow organic traffic.' },
  { icon: '#e87e1f', img: '/assets/services/Group 23.png', title: 'SMO (Social Media Optimization)', desc: 'Engaging content and social growth strategies.' },
  { icon: '#e87e1f', img: '/assets/services/Group 24.png', title: 'Logo Design', desc: 'Professional identities that stand out.' },
  { icon: '#e87e1f', img: '/assets/services/Group 25.png', title: 'Content Writing', desc: 'Compelling copy for websites, blogs and ads.' },
  { icon: '#e87e1f', img: '/assets/services/Group 26.png', title: 'Meta Ads / Google Ads', desc: 'Performance-focused ad campaigns.' },
  { icon: '#e87e1f', img: '/assets/services/Group 27.png', title: 'Video Editing', desc: 'High-quality editing for brand videos.' },
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
    case 'hero':
      return (
        <section className="hero container" aria-label="Hero">
          <div className="hero-left">
            <h1 className="hero-title" dangerouslySetInnerHTML={{ __html: c.title || "We build your<br /><span>brand's digital presence</span>" }} />
            <p className="hero-desc">{c.description || 'From custom website development to SEO and digital marketing.'}</p>
            <div className="hero-actions">
              <a className="btn-dark" href={c.ctaLink || '#'}>{c.ctaText || 'Explore Services'}</a>
              <a className="btn-book" href={c.secondaryCtaLink || 'https://wa.me/917303981193'} target="_blank" rel="noopener noreferrer">
                {c.secondaryCtaText || 'Request a Quote'}
              </a>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-card">
              <img src={c.image || '/assets/banner/banner.jpeg'} alt="Hero" className="img-fluid" />
            </div>
          </div>
        </section>
      );

    case 'services':
      const services = c.items?.length ? c.items : defaultServices;
      return (
        <section className="services" aria-labelledby="services-title">
          <div className="inner">
            <h2 id="services-title">{c.title || 'Our Services'}</h2>
            <p>{c.subtitle || 'We provide a variety of services to grow your business.'}</p>
          </div>
          <div className="container cards-grid">
            {services.map((s, i) => (
              <div key={i} className="service-card">
                <div className="icon" style={{ background: s.icon || '#d97436' }}>
                  <img src={s.img || '/assets/logo.png'} alt={s.title || ''} className="img-fluid" />
                </div>
                <h3>{s.title || 'Item'}</h3>
                <p>{s.desc || ''}</p>
              </div>
            ))}
          </div>
        </section>
      );

    case 'about':
      return (
        <section className="about container" aria-labelledby="about-title">
          <div className="left">
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
          <div className="right">
            <div className="avatar">
              <img src={c.image || '/assets/about.png'} alt="About" />
            </div>
          </div>
        </section>
      );

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
            <a className="btn-book" href={c.buttonLink || 'https://wa.me/917303981193'} target="_blank" rel="noopener noreferrer">
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
                <li><i className="fas fa-phone"></i> {c.phone || '+91 73039 81193'}</li>
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

    case 'features':
      const features = c.items || [];
      return (
        <section className="services" aria-labelledby="features-title">
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

    default:
      return null;
  }
}
