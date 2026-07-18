'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'What is a DUNS Number?',
    a: 'A DUNS Number is a unique nine-digit identifier used worldwide to verify your business. It is required by many global marketplaces, banks, and government agencies.',
  },
  {
    q: 'How long does it take to get a DUNS Number?',
    a: 'With our fast-track process, most clients receive their DUNS Number within 48 hours after submitting complete business details.',
  },
  {
    q: 'Why do I need a DUNS Number for Amazon or Walmart?',
    a: 'Marketplaces like Amazon, Walmart, Google Play and App Store often require a DUNS Number to verify your business identity before you can sell or publish.',
  },
  {
    q: 'What documents do I need?',
    a: 'Typically you need basic business registration details, address proof, and authorized contact information. Our team guides you on the exact requirements.',
  },
  {
    q: 'Is the process secure?',
    a: 'Yes. We follow a secure and confidential process. Your business information is handled carefully and used only for DUNS registration.',
  },
];

export default function DunsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="home-section" aria-labelledby="duns-faq-title">
      <div className="home-container home-center">
        <span className="home-tag">FAQ</span>
        <h2 id="duns-faq-title" className="home-heading">
          Frequently Asked <span className="highlight">Questions</span>
        </h2>
        <p className="home-subtitle">
          Everything you need to know about getting your DUNS Number with Bissgro.
        </p>
      </div>
      <div className="home-container">
        <div className="home-faq-list">
          {FAQS.map((faq, i) => (
            <div
              key={faq.q}
              className={`home-faq-item ${openIndex === i ? 'open' : ''}`}
            >
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
