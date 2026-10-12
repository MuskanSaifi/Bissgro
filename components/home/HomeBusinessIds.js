import Link from 'next/link';

const MSME_WA =
  'https://wa.me/919625945041?text=Hi%2C%20I%20want%20MSME%20registration';

export default function HomeBusinessIds() {
  return (
    <section className="home-biz-ids" aria-labelledby="home-biz-ids-title">
      <div className="home-container">
        <div className="home-biz-ids-inner">
          <div className="home-biz-ids-copy">
            <span className="home-biz-badge">Also Available</span>
            <h2 id="home-biz-ids-title">
              We also provide <span>DUNS Number</span> &amp; <span>MSME</span>
            </h2>
            <p>
              Get your business verified for global marketplaces and Indian government
              schemes — DUNS registration and MSME (Udyam) support under one roof.
            </p>
          </div>
          <div className="home-biz-ids-cards">
            <Link href="/duns-number" className="home-biz-card">
              <span className="home-biz-card-tag">Highlighted</span>
              <i className="fas fa-id-card" />
              <h3>DUNS Number</h3>
              <p>Fast registration for Amazon, Walmart, Google Play and global business verification.</p>
              <span className="home-biz-card-link">Get DUNS Number <i className="fas fa-arrow-right" /></span>
            </Link>
            <a href={MSME_WA} className="home-biz-card home-biz-card-msme" target="_blank" rel="noopener noreferrer">
              <span className="home-biz-card-tag">Highlighted</span>
              <i className="fas fa-certificate" />
              <h3>MSME Registration</h3>
              <p>Udyam / MSME registration support so your business can access schemes, tenders and benefits.</p>
              <span className="home-biz-card-link">Apply for MSME <i className="fas fa-arrow-right" /></span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
