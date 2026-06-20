import Link from 'next/link';

const SERVICES = [
  {
    icon: 'fas fa-laptop-code',
    title: 'Web Development',
    desc: 'Custom, responsive websites that convert visitors into customers.',
    link: '/web-development-company-in-noida',
  },
  {
    icon: 'fas fa-mobile-alt',
    title: 'App Development',
    desc: 'Native & cross-platform mobile apps for iOS and Android.',
    link: '#',
  },
  {
    icon: 'fas fa-search',
    title: 'SEO',
    desc: 'Boost your search rankings and drive organic traffic to your site.',
    link: '/best-seo-services-in-noida',
  },
  {
    icon: 'fas fa-hashtag',
    title: 'SMO',
    desc: 'Engaging social media strategies to grow your brand presence.',
    link: '#',
  },
  {
    icon: 'fas fa-map-marker-alt',
    title: 'GMB',
    desc: 'Google My Business optimization for local visibility.',
    link: '#',
  },
  {
    icon: 'fas fa-star',
    title: 'Google Review',
    desc: 'Build trust with authentic Google reviews and reputation management.',
    link: '#',
  },
  {
    icon: 'fas fa-certificate',
    title: 'GMB Certificate',
    desc: 'Get verified and stand out with GMB certification services.',
    link: '#',
  },
  {
    icon: 'fas fa-palette',
    title: 'Graphic Designing',
    desc: 'Eye-catching visuals, logos, and brand identity design.',
    link: '#',
  },
];

export default function HomeServices() {
  return (
    <section id="services" className="home-section home-section-alt" aria-labelledby="home-services-title">
      <div className="home-container home-center">
        <span className="home-tag">Our Services</span>
        <h2 id="home-services-title" className="home-heading">
          Complete <span className="highlight">Digital Solutions</span> Under One Roof
        </h2>
        <p className="home-subtitle">
          We offer end-to-end digital services to help your business thrive in the online world.
        </p>
      </div>
      <div className="home-container">
        <div className="home-services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="home-service-card">
              <div className="home-service-icon">
                <i className={s.icon} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <Link href={s.link} className="learn-more">
                Learn More <i className="fas fa-arrow-right" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
