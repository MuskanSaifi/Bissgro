import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'Contact Us | Bissgro - Get in Touch',
  description: 'Have questions or need assistance? Contact Bissgro today. Our team is ready to help you with web development, digital solutions, and more.',
  openGraph: { title: 'Contact Us | Bissgro', url: 'https://www.bissgro.com/contact' },
};

export default function ContactUs() {
  return (
    <main>
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-form-box">
            <h2>Let&apos;s Connect</h2>
            <p>Have a project in mind? Drop us a message and we&apos;ll get back to you quickly.</p>
            <ContactForm />
          </div>
          <div className="contact-info-box">
            <div className="contact-illustration">
              <img src="/assets/contact.png" className="img-fluid px-5" alt="Contact" />
            </div>
            <ul className="info-list">
              <li><i className="fas fa-map-marker-alt"></i> 44, Block-H, Noida, Uttar Pradesh, India, 201301</li>
              <li><i className="fas fa-phone"></i> +91 73039 81193</li>
              <li><i className="fas fa-envelope"></i> info@bissgro.com</li>
            </ul>
            <div className="social-icons">
              <a href="https://www.facebook.com/share/1B17ghvWih/?mibextid=wwXIfr"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/bissgro?igsh=YW5sYmRsZHRjMWxh&utm_source=qr"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/917303981193?text=Hello%20I%20am%20interested%20in%20your%20services" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
