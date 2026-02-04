'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        toast.success('Thank you for subscribing!');
        setEmail('');
      } else {
        toast.error(data.error || 'Something went wrong');
      }
    } catch {
      toast.error('Subscription failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        aria-label="Email input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>{loading ? 'Subscribing...' : 'Subscribe'}</button>
    </form>
  );
}
