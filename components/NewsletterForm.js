'use client';

export default function NewsletterForm() {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="Enter your email" aria-label="Email input" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
