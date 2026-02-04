export const metadata = {
  title: 'Privacy Policy | Bissgro',
  description: 'Bissgro Privacy Policy - How we collect, use, and protect your information.',
};

const mainStyle = { padding: '80px 20px', maxWidth: 900, margin: '0 auto' };
const h1Style = { fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 30 };
const h2Style = { fontSize: 24, marginBottom: 15 };
const h3Style = { fontSize: 18, marginTop: 20, marginBottom: 10 };
const ulStyle = { lineHeight: 1.8 };

export default function PrivacyPolicy() {
  return (
    <main style={mainStyle}>
      <h1 style={h1Style}>Privacy Policy</h1>
      <p style={{ color: '#666', marginBottom: 40 }}><strong>Last Updated:</strong> January 24, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>1. Introduction</h2>
        <p>Bissgro (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>2. Information We Collect</h2>
        <h3 style={h3Style}>2.1 Personal Information</h3>
        <p>We may collect personal information that you provide directly to us, including:</p>
        <ul style={ulStyle}>
          <li>Name and contact information (email address, phone number)</li>
          <li>Billing address and payment information</li>
          <li>Business information and project requirements</li>
          <li>Communication preferences</li>
        </ul>
        <h3 style={h3Style}>2.2 Automatically Collected Information</h3>
        <p>When you visit our website, we may automatically collect IP address, browser type, device information, pages visited, and referring addresses.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>3. How We Use Your Information</h2>
        <p>We use the information to provide and improve our services, process payments, communicate with you, send marketing (with consent), respond to inquiries, detect fraud, and comply with legal obligations.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>4. Payment Information</h2>
        <p>We use Razorpay as our payment gateway. Your payment information is processed securely through Razorpay and is not stored on our servers.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>5. Information Sharing</h2>
        <p>We do not sell, trade, or rent your personal information. We may share it only with service providers, when required by law, or with your explicit consent.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>6. Data Security</h2>
        <p>We implement appropriate measures to protect your personal information. No method of transmission over the Internet is 100% secure.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>7. Your Rights</h2>
        <p>You have the right to access, correct, or delete your information, opt-out of marketing, and withdraw consent.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>8. Cookies</h2>
        <p>We use cookies to enhance your experience. You can disable cookies through your browser settings.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>9. Contact</h2>
        <p><strong>Bissgro</strong><br />44, Block-H, Noida, Uttar Pradesh, India, 201301<br />Phone: +91 73039 81193<br />Email: info@bissgro.com<br />WhatsApp: <a href="https://wa.me/917303981193" target="_blank" rel="noopener noreferrer">+91 73039 81193</a></p>
      </section>
    </main>
  );
}
