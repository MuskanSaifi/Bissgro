export const metadata = {
  title: 'Shipping & Delivery Policy | Bissgro',
  description: 'Bissgro Shipping & Delivery Policy - How we deliver digital services and projects.',
};

const mainStyle = { padding: '80px 20px', maxWidth: 900, margin: '0 auto' };
const h1Style = { fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 30 };
const h2Style = { fontSize: 24, marginBottom: 15 };
const h3Style = { fontSize: 18, marginTop: 20, marginBottom: 10 };
const ulStyle = { lineHeight: 1.8 };

export default function ShippingPolicy() {
  return (
    <main style={mainStyle}>
      <h1 style={h1Style}>Shipping & Delivery Policy</h1>
      <p style={{ color: '#666', marginBottom: 40 }}><strong>Last Updated:</strong> January 24, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>1. Overview</h2>
        <p>Bissgro provides digital services (web, app, SEO). There is no physical shipping. This policy outlines how we deliver services and projects.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>2. Service Delivery Methods</h2>
        <h3 style={h3Style}>2.1 Web Development</h3>
        <p>Websites are delivered via live URL, source code (FTP/cloud/email), admin credentials, and documentation.</p>
        <h3 style={h3Style}>2.2 App Development</h3>
        <p>Apps are delivered via App Store/Play Store links, APK/IPA files, source code, and deployment guides.</p>
        <h3 style={h3Style}>2.3 SEO Services</h3>
        <p>SEO is delivered via monthly reports, dashboard access (Analytics, Search Console), and optimized content.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>3. Delivery Timeline</h2>
        <ul style={ulStyle}>
          <li><strong>Basic Website:</strong> 7-14 business days</li>
          <li><strong>Business Website:</strong> 14-21 business days</li>
          <li><strong>E-commerce:</strong> 21-45 business days</li>
          <li><strong>Enterprise:</strong> 45-90 business days</li>
          <li><strong>Mobile Apps:</strong> 30-90 business days</li>
          <li><strong>SEO:</strong> Ongoing monthly deliverables</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>4. Delivery Process</h2>
        <p>Project Kickoff → Development Phase → Review & Revisions → Final Delivery → Post-Delivery Support.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>5. Digital Deliverables</h2>
        <p>All deliverables via email, cloud storage, FTP/SFTP, Git, or live URLs and credentials.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>6. Contact</h2>
        <p><strong>Bissgro</strong><br />44, Block-H, Noida, Uttar Pradesh, India, 201301<br />Phone: +91 73039 81193<br />Email: info@bissgro.com<br />WhatsApp: <a href="https://wa.me/917303981193" target="_blank" rel="noopener noreferrer">+91 73039 81193</a></p>
      </section>
    </main>
  );
}
