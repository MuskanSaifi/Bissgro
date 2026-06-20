'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const WHATSAPP_URL = 'https://wa.me/917303981193?text=Hello%20I%20want%20a%20free%20quote';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const navLink = (href, label, exact = false) => {
    const active = exact ? pathname === href : pathname.startsWith(href) && href !== '/';
    const isActiveHome = exact && pathname === '/';
    return (
      <Link
        href={href}
        className={isActiveHome || active ? 'active' : ''}
        onClick={closeMenu}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className={`site-header ${isHome ? 'home-header' : ''}`} role="banner">
      <div className="header-inner">
        <div className="logo">
          <Link href="/">
            <img src="/assets/logo.png" alt="Bissgro Logo" className="site-logo-img" height={40} />
          </Link>
        </div>

        <button
          className="hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
          type="button"
        >
          <i className={`fas fa-${menuOpen ? 'times' : 'bars'}`} />
        </button>

        <nav className={`main-nav ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Main">
          {isHome && navLink('/', 'Home', true)}
          {navLink('/about-us', 'About Us')}
          <div ref={dropdownRef} className={`dropdown ${servicesOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="nav-link dropdown-trigger"
              onClick={(e) => {
                e.stopPropagation();
                setServicesOpen(!servicesOpen);
              }}
              aria-expanded={servicesOpen}
            >
              Services ▾
            </button>
            <div className="dropdown-content" onClick={(e) => e.stopPropagation()}>
              <Link href="/web-development-company-in-noida" onClick={closeMenu}>Website Development</Link>
              <Link href="/best-seo-services-in-noida" onClick={closeMenu}>SEO Service</Link>
              <Link href="/plans" onClick={closeMenu}>Our Packages</Link>
              <a href="#" onClick={closeMenu}>Graphics Service</a>
            </div>
          </div>
          <Link href="/portfolio" onClick={closeMenu}>Portfolio</Link>
          {isHome && (
            <a href="#portfolio" onClick={closeMenu}>Case Studies</a>
          )}
          <Link href="/blog" onClick={closeMenu}>Blog</Link>
          <Link href="/contact-us" onClick={closeMenu}>Contact Us</Link>
        </nav>

        <a
          className={isHome ? 'btn-quote' : 'btn-book'}
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {isHome ? 'Get Free Quote' : 'Contact Us'}
        </a>
      </div>
    </header>
  );
}
