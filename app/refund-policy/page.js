export const metadata = {
  title: 'Refund Policy | Bissgro',
  description: 'Bissgro Refund Policy - Eligibility, process, and contact for refunds.',
};

const mainStyle = { padding: '80px 20px', maxWidth: 900, margin: '0 auto' };
const h1Style = { fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 30 };
const h2Style = { fontSize: 24, marginBottom: 15 };
const h3Style = { fontSize: 18, marginTop: 20, marginBottom: 10 };
const ulStyle = { lineHeight: 1.8 };

export default function RefundPolicy() {
  return (
    <main style={mainStyle}>
      <h1 style={h1Style}>Refund Policy</h1>
      <p style={{ color: '#666', marginBottom: 40 }}><strong>Last Updated:</strong> January 24, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>1. Overview</h2>
        <p>At Bissgro, we strive to deliver high-quality services. This Refund Policy outlines when refunds may be issued.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>2. Refund Eligibility</h2>
        <h3 style={h3Style}>2.1 Before Project Commencement</h3>
        <p>If you cancel before we begin work, you are eligible for a <strong>full refund</strong>. Refunds processed within 7-10 business days.</p>
        <h3 style={h3Style}>2.2 After Project Commencement</h3>
        <p>If you cancel after work has begun, you will be charged for work completed. The remaining balance will be refunded.</p>
        <h3 style={h3Style}>2.3 Service Quality Issues</h3>
        <p>We will work with you to address concerns. If issues cannot be resolved after reasonable revisions, a partial or full refund may be considered.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>3. Non-Refundable</h2>
        <p>Generally non-refundable: completed work, third-party services/licenses, domain/hosting fees, custom payments used for completed work.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>4. Refund Process</h2>
        <p>To request a refund, contact us via email (info@bissgro.com), phone (+91 73039 81193), or <a href="https://wa.me/917303981193" target="_blank" rel="noopener noreferrer">WhatsApp</a>. Include your order/invoice number and reason. Refunds are processed to the original payment method within 7-10 business days.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>5. Monthly Services (SEO)</h2>
        <p>You may cancel monthly subscriptions at any time. No refunds for the current billing period. Services continue until end of paid period.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>6. Contact</h2>
        <p><strong>Bissgro</strong><br />44, Block-H, Noida, Uttar Pradesh, India, 201301<br />Phone: +91 73039 81193<br />Email: info@bissgro.com<br />WhatsApp: <a href="https://wa.me/917303981193" target="_blank" rel="noopener noreferrer">+91 73039 81193</a></p>
      </section>
    </main>
  );
}
