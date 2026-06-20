export default function HomeCta() {
  return (
    <section className="home-cta-banner" aria-label="Call to action">
      <div className="home-container">
        <div className="home-cta-inner">
          <div>
            <h2>Ready to Grow Your Business?</h2>
            <p>Let&apos;s discuss how we can help you achieve your digital goals.</p>
          </div>
          <div className="home-cta-actions">
            <a
              href="https://wa.me/917303981193?text=Hello%20I%20want%20a%20free%20quote"
              className="btn-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Free Quote
            </a>
            <a href="tel:+917303981193" className="btn-outline-white">
              <i className="fas fa-phone-alt" /> Call Us Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
