'use client';

import { useState, useEffect, useCallback } from 'react';

const DEFAULT_REVIEWS = [
  { img: '/assets/review/1.png', name: 'Priya Sharma', role: 'Founder, Startup Hub', text: "The Bissgro team helped us launch our platform in record time.", bottom: 'Priya S., Founder' },
  { img: '/assets/review/3.png', name: 'Ankit Rawat', role: 'Marketing Director', text: "Professional, responsive, and highly skilled.", bottom: 'Ankit Rawat., Director' },
  { img: '/assets/review/2.png', name: 'Ayesha Khan', role: 'E-commerce Owner', text: "Working with Bissgro was a smooth experience.", bottom: 'Ayesha K., Business Owner' },
];

export default function ReviewSlider({ items = [], title }) {
  const REVIEWS = items?.length ? items.map((r) => ({ img: r.img || '/assets/logo.png', name: r.name || '', role: r.role || '', text: r.text || '', bottom: r.bottom || '' })) : DEFAULT_REVIEWS;
  const [idx, setIdx] = useState(0);
  const [resizeTick, setResizeTick] = useState(0);

  const goTo = useCallback((i) => {
    setIdx((prev) => {
      const total = REVIEWS.length;
      return (i + total) % total;
    });
  }, []);

  useEffect(() => {
    const track = document.getElementById('review-track');
    const slider = track?.parentElement;
    if (!track?.children?.length || !slider) return;

    const card = track.children[0];
    const cardStyle = getComputedStyle(card);
    const cardWidth = card.offsetWidth;
    const mr = parseFloat(cardStyle.marginRight) || 0;
    const ml = parseFloat(cardStyle.marginLeft) || 0;
    const totalCardWidth = cardWidth + ml + mr;
    const total = track.children.length;
    const sliderWidth = slider.offsetWidth;
    const contentWidth = totalCardWidth * total;

    let transformX;
    if (contentWidth < sliderWidth) {
      transformX = (sliderWidth - contentWidth) / 2;
    } else {
      const currentCardLeft = idx * totalCardWidth;
      const currentCardCenter = currentCardLeft + totalCardWidth / 2;
      const sliderCenter = sliderWidth / 2;
      transformX = sliderCenter - currentCardCenter;
      const maxX = 0;
      const minX = sliderWidth - contentWidth;
      transformX = Math.min(maxX, Math.max(minX, transformX));
    }
    track.style.transform = `translateX(${transformX}px)`;
  }, [idx, resizeTick]);

  useEffect(() => {
    const onResize = () => setResizeTick((t) => t + 1);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((prev) => (prev + 1) % REVIEWS.length);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="review" aria-labelledby="reviews-title">
      <h2 id="reviews-title">{title || 'What Our Clients Say'}</h2>
      <div className="review-slider">
        <div className="review-cards" id="review-track">
          {REVIEWS.map((r, i) => (
            <div key={i} className="review-card">
              <div className="review-top">
                <img src={r.img} alt={r.name} />
                <div>
                  <div style={{ fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: '13px', color: '#7b8086' }}>{r.role}</div>
                </div>
              </div>
              <div className="stars">★★★★★</div>
              <p>{r.text}</p>
              <div className="review-bottom">{r.bottom}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="dots" id="review-dots">
        {REVIEWS.map((_, i) => (
          <button key={i} type="button" className={`dot ${i === idx ? 'active' : ''}`} data-index={i} aria-label={`Slide ${i + 1}`} onClick={() => goTo(i)} />
        ))}
      </div>
    </section>
  );
}
