import Link from 'next/link';

const PLANS = [
  {
    name: 'Starter',
    price: '₹9,999',
    period: '/month',
    features: ['Basic Website (5 Pages)', 'Mobile Responsive', 'SEO Setup', '1 Month Support', 'Social Media Integration'],
    featured: false,
  },
  {
    name: 'Professional',
    price: '₹24,999',
    period: '/month',
    features: ['Custom Website (15 Pages)', 'Advanced SEO', 'Google My Business', '3 Months Support', 'Content Management', 'Analytics Dashboard'],
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: ' pricing',
    features: ['Unlimited Pages', 'E-commerce Integration', 'Dedicated Manager', 'Priority Support 24/7', 'Custom Integrations', 'Monthly Reports'],
    featured: false,
  },
];

export default function HomePricing() {
  return (
    <section className="home-section" aria-labelledby="home-pricing-title">
      <div className="home-container home-center">
        <span className="home-tag">Pricing</span>
        <h2 id="home-pricing-title" className="home-heading">
          Choose Your <span className="highlight">Growth Plan</span>
        </h2>
        <p className="home-subtitle">
          Flexible packages designed to fit businesses of every size and budget.
        </p>
      </div>
      <div className="home-container">
        <div className="home-pricing-grid">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`home-pricing-card ${plan.featured ? 'featured' : ''}`}>
              <h3>{plan.name}</h3>
              <div className="price">
                {plan.price}
                <span>{plan.period}</span>
              </div>
              <ul>
                {plan.features.map((f) => (
                  <li key={f}>
                    <i className="fas fa-check-circle" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/plans" className="btn-home-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
