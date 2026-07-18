import Link from 'next/link';

const STATS = [
  { value: '100+', label: 'Happy Clients' },
  { value: '250+', label: 'Projects Completed' },
  { value: '5+', label: 'Years Experience' },
  { value: '4.9★', label: 'Google Rating' },
];

export default function HomeHero() {
  return (
    <section className="home-hero" aria-label="Hero">
      <div className="home-container">
        <div className="home-hero-grid">
          <div>
            <span className="home-tag">Digital Solutions for Modern Businesses</span>
            <h1 className="home-hero-title">
              We Build Digital Solutions That <span className="highlight">Drive Real Growth</span>
            </h1>
            <p className="home-hero-desc">
              From stunning websites to powerful SEO strategies — we help businesses grow online
              with result-driven digital solutions tailored to your goals.
            </p>
            <div className="home-hero-actions">
              <Link href="#services" className="btn-home-primary">
                Explore Our Services
              </Link>
              <a
                href="https://wa.me/919625945041?text=Hello%20I%20want%20to%20talk%20to%20an%20expert"
                className="btn-home-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-phone-alt" /> Talk to Expert
              </a>
            </div>
            <div className="home-hero-stats">
              {STATS.map((s) => (
                <div key={s.label} className="home-hero-stat">
                  <strong>{s.value}</strong>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="home-hero-visual">
            <div className="home-hero-visual-main">
              <img src="/assets/banner/banner.png" alt="Digital solutions illustration" />
              <div className="home-hero-badge b1">
                <i className="fas fa-code" /> Web Development
              </div>
              <div className="home-hero-badge b2">
                <i className="fas fa-search" /> SEO &amp; Ranking
              </div>
              <div className="home-hero-badge b3">
                <i className="fas fa-share-alt" /> Social Media Marketing
              </div>
              <div className="home-hero-badge b4">
                <i className="fas fa-star" /> Google Review <span className="stars">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
