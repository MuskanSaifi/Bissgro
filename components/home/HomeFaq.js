'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'How long does it take to build a website?',
    a: 'A standard business website typically takes 2–4 weeks. Complex projects like e-commerce or custom web apps may take 6–12 weeks depending on scope.',
  },
  {
    q: 'Do you provide ongoing support after launch?',
    a: 'Yes! We offer maintenance packages and 24/7 support to keep your website secure, updated, and performing at its best.',
  },
  {
    q: 'What is included in your SEO services?',
    a: 'Our SEO packages include keyword research, on-page optimization, technical SEO, content strategy, link building, and monthly performance reports.',
  },
  {
    q: 'Can you redesign my existing website?',
    a: 'Absolutely. We specialize in website redesigns that improve user experience, speed, mobile responsiveness, and conversion rates.',
  },
  {
    q: 'Do you work with businesses outside India?',
    a: 'Yes, we work with clients globally. Our team is experienced in remote collaboration and delivers projects across time zones.',
  },
];

export default function HomeFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="home-section" aria-labelledby="home-faq-title">
      <div className="home-container home-center">
        <span className="home-tag">FAQ</span>
        <h2 id="home-faq-title" className="home-heading">
          Frequently Asked <span className="highlight">Questions</span>
        </h2>
        <p className="home-subtitle">
          Got questions? We&apos;ve got answers. Here are the most common ones we hear.
        </p>
      </div>
      <div className="home-container">
        <div className="home-faq-list">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className={`home-faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                type="button"
                className="home-faq-question"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <i className="fas fa-chevron-down" />
              </button>
              <div className="home-faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
