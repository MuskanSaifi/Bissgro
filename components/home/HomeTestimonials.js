'use client';

import { useState, useEffect } from 'react';

const REVIEWS = [
  {
    img: '/assets/review/1.png',
    name: 'Priya Sharma',
    role: 'Founder, Startup Hub',
    text: 'The Bissgro team helped us launch our platform in record time. Professional, responsive, and highly skilled — highly recommended!',
  },
  {
    img: '/assets/review/3.png',
    name: 'Ankit Rawat',
    role: 'Marketing Director',
    text: 'Our website traffic increased by 200% after their SEO work. They truly understand digital growth and deliver real results.',
  },
  {
    img: '/assets/review/2.png',
    name: 'Ayesha Khan',
    role: 'E-commerce Owner',
    text: 'Working with Bissgro was a smooth experience from start to finish. Our e-commerce store looks amazing and converts well.',
  },
];

export default function HomeTestimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="home-section home-section-alt" aria-labelledby="home-reviews-title">
      <div className="home-container home-center">
        <span className="home-tag">Testimonials</span>
        <h2 id="home-reviews-title" className="home-heading">
          What Our <span className="highlight">Clients Say</span>
        </h2>
        <p className="home-subtitle">
          Don&apos;t just take our word for it — hear from businesses we&apos;ve helped grow.
        </p>
      </div>
      <div className="home-container">
        <div className="home-testimonials-grid">
          {REVIEWS.map((r, i) => (
            <div
              key={r.name}
              className="home-testimonial-card"
              style={{ opacity: i === active ? 1 : 0.85, transform: i === active ? 'scale(1.02)' : 'scale(1)', transition: 'all 0.3s' }}
            >
              <div className="quote-icon">
                <i className="fas fa-quote-left" />
              </div>
              <p>&ldquo;{r.text}&rdquo;</p>
              <div className="home-testimonial-footer">
                <img src={r.img} alt={r.name} />
                <div>
                  <div className="name">{r.name}</div>
                  <div className="role">{r.role}</div>
                </div>
                <div className="stars">★★★★★</div>
              </div>
            </div>
          ))}
        </div>
        <div className="home-testimonial-dots">
          {REVIEWS.map((_, i) => (
            <button
              key={i}
              type="button"
              className={i === active ? 'active' : ''}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
