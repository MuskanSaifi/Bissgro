'use client';

import Link from 'next/link';
import { useState } from 'react';

const WHATSAPP_URL = 'https://wa.me/917303981193?text=Hello%20I%20want%20to%20know%20more%20about%20your%20services';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [ariaExpanded, setAriaExpanded] = useState('false');

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setAriaExpanded(!menuOpen ? 'true' : 'false');
  };

  return (
    <header className="site-header" role="banner">
      <div className="header-inner">
        <div className="logo">
          <Link href="/">
            <img src="/assets/logo.png" alt="Bissgro Logo" height={36} width={120} />
          </Link>
        </div>

        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={ariaExpanded}
          onClick={toggleMenu}
        >
          <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`}></i>
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Main">
          <div className="dropdown">
            <a href="#">Services ▾</a>
            <div className="dropdown-content">
              <a href="#">Complate Growth Plan</a>
              <a href="#">Website Development Service</a>
              <a href="#">SEO Service</a>
              <a href="#">Graphics Service</a>
            </div>
          </div>
          <a href="#">Portfolio</a>
          <Link href="/plans">Our Packages</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about-us">About</Link>
          <Link href="/contact-us">Contact</Link>
        </nav>

        <a className="btn-book" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          Contact Us
        </a>
      </div>
    </header>
  );
}
