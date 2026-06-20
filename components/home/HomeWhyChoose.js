const FEATURES = [
  { icon: 'fas fa-bullseye', title: 'Result Driven Strategies', desc: 'Data-backed approaches that deliver measurable growth.' },
  { icon: 'fas fa-user-tie', title: 'Experienced Professionals', desc: 'Skilled team with years of industry expertise.' },
  { icon: 'fas fa-tags', title: 'Affordable Pricing', desc: 'Premium quality services at competitive rates.' },
  { icon: 'fas fa-handshake', title: 'Transparent Process', desc: 'Clear communication at every step of the project.' },
  { icon: 'fas fa-headset', title: '24/7 Support Available', desc: 'Round-the-clock assistance whenever you need us.' },
  { icon: 'fas fa-clock', title: 'On-time Delivery', desc: 'We respect deadlines and deliver on schedule.' },
];

export default function HomeWhyChoose() {
  return (
    <section className="home-section" aria-labelledby="home-why-title">
      <div className="home-container">
        <div className="home-why-grid">
          <div className="home-why-visual">
            <img
              src="/assets/rocket.png"
              alt="Launch your business with proven digital strategies"
              className="home-why-rocket-img"
            />
          </div>
          <div>
            <span className="home-tag">Why Choose Us</span>
            <h2 id="home-why-title" className="home-heading">
              We Focus On What Matters Most – <span className="highlight">Your Growth</span>
            </h2>
            <p className="home-subtitle left">
              We combine creativity, technology, and strategy to deliver solutions that help your
              business stand out and succeed online.
            </p>
            <div className="home-why-features">
              {FEATURES.map((f) => (
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
  );
}
