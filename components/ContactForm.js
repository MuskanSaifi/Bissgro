'use client';

import { useRef } from 'react';

export default function ContactForm() {
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const name = form.querySelector('#name')?.value || '';
    const email = form.querySelector('#email')?.value || '';
    const phone = form.querySelector('#phone')?.value || '';
    const message = form.querySelector('#message')?.value || '';
    const text = `Hello, I have an enquiry.%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
    window.open(`https://wa.me/917303981193?text=${text}`, '_blank');
  };

  return (
    <form ref={formRef} className="contact-form" id="whatsappForm" onSubmit={handleSubmit}>
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input type="text" id="name" placeholder="Your Name" required />
      </div>
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input type="email" id="email" placeholder="Your Email" required />
      </div>
      <div className="input-group">
        <i className="fas fa-phone"></i>
        <input type="tel" id="phone" placeholder="Your Phone Number" required />
      </div>
      <div className="input-group">
        <i className="fas fa-comment"></i>
        <textarea id="message" placeholder="Your Message" required></textarea>
      </div>
      <button type="submit">Send via WhatsApp</button>
    </form>
  );
}
