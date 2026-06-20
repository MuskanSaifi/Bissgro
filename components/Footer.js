'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

function HomeFooterNewsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <form className="footer-newsletter-form" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" aria-label="Subscribe">
        <i className="fas fa-paper-plane" />
      </button>
      {status === 'success' && <span style={{ fontSize: 12, color: '#4ade80' }}>Subscribed!</span>}
    </form>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) {
    return (
      <footer className="site-footer home-footer" role="contentinfo">
        <div className="footer-grid">
          <div className="brand-block">
            <Link href="/">
              <img src="/assets/logo.png" alt="Bissgro Logo" className="footer-logo-img" height={44} />
            </Link>
            <p>
              We are a full-service digital agency helping businesses grow online with web
              development, SEO, and marketing solutions.
            </p>
            <div className="socials d-flex">
              <a href="https://www.facebook.com/share/1B17ghvWih/?mibextid=wwXIfr" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/bissgro?igsh=YW5sYmRsZHRjMWxh&utm_source=qr" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="#" aria-label="YouTube">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about-us">About Us</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact-us">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Our Services</h4>
            <ul>
              <li><Link href="/web-development-company-in-noida">Web Development</Link></li>
              <li><a href="#">App Development</a></li>
              <li><Link href="/best-seo-services-in-noida">SEO</Link></li>
              <li><a href="#">SMO</a></li>
              <li><a href="#">Graphic Designing</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <i className="fas fa-map-marker-alt" />
              <span>44, Block-H, Sector-63, Noida, Uttar Pradesh, India, 201301</span>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-phone" />
              <a href="tel:+917303981193">+91 73039 81193</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-envelope" />
              <a href="mailto:info@bissgro.com">info@bissgro.com</a>
            </div>
            <div className="footer-contact-item">
              <i className="fas fa-globe" />
              <a href="https://www.bissgro.com">www.bissgro.com</a>
            </div>
          </div>

          <div className="footer-col footer-newsletter">
            <h4>Newsletter</h4>
            <p>Subscribe to get the latest updates, tips, and offers delivered to your inbox.</p>
            <HomeFooterNewsletter />
          </div>
        </div>

        <div className="footer-bottom">
          <div>© {new Date().getFullYear()} Blissgro. All Rights Reserved.</div>
          <div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-conditions">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-grid">
        <div className="brand-block">
          <img src="/assets/logo.png" alt="Bissgro logo" />
          <p>44, Block-H, Sector-63, Noida, Uttar Pradesh, India, 201301</p>
          <div className="footer-follow-legal">
            <h4>FOLLOW US</h4>
            <div className="socials d-flex">
              <a href="https://www.facebook.com/share/1B17ghvWih/?mibextid=wwXIfr" aria-label="Facebook">
                <i className="fab fa-facebook-f" />
              </a>
              <a href="https://www.instagram.com/bissgro?igsh=YW5sYmRsZHRjMWxh&utm_source=qr" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter" />
              </a>
              <a href="https://wa.me/917303981193?text=Hello%20I%20am%20interested%20in%20your%20services" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp" />
              </a>
            </div>
          </div>
          <div className="footer-opening-hours">
            <div className="footer-hours-label">OPENING HOURS</div>
            <div className="footer-hours-text">Monday - Friday<br />8:00 am to 9:00 pm</div>
          </div>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><Link href="/">Menu</Link></li>
            <li><Link href="/blog">Blogs</Link></li>
            <li><Link href="/about-us">About us</Link></li>
            <li><Link href="/contact-us">Contact us</Link></li>
            <li><Link href="/portfolio">Portfolio</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><a href="#">Complate Growth Plan</a></li>
            <li><a href="#">Website Development Service</a></li>
            <li><a href="#">SEO Service</a></li>
            <li><a href="#">Graphics Service</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <ul className="footer-legal-links">
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms-conditions">Terms & Conditions</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="m-auto">© 2022 Bissgro. All Right Reserved.</div>
      </div>
    </footer>
  );
}
