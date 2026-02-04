import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="footer-grid">
        <div className="brand-block">
          <img src="/assets/logo.png" alt="Bissgro logo" />
          <p>44, Block-H, Noida, Uttar Pradesh, India, 201301</p>
          <div className="footer-follow-legal">
            <h4>FOLLOW US</h4>
            <div className="socials d-flex">
              <a href="https://www.facebook.com/share/1B17ghvWih/?mibextid=wwXIfr" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com/bissgro?igsh=YW5sYmRsZHRjMWxh&utm_source=qr" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://wa.me/917303981193?text=Hello%20I%20am%20interested%20in%20your%20services" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
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
            <li><Link href="/about-us">About us</Link></li>
            <li><Link href="/contact-us">Contact us</Link></li>
            <li><a href="#">Portfolio</a></li>
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
