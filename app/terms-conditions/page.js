export const metadata = {
  title: 'Terms & Conditions | Bissgro',
  description: 'Bissgro Terms & Conditions - Service terms, payment, and usage policy.',
};

const mainStyle = { padding: '80px 20px', maxWidth: 900, margin: '0 auto' };
const h1Style = { fontFamily: "'Playfair Display', serif", fontSize: 40, marginBottom: 30 };
const h2Style = { fontSize: 24, marginBottom: 15 };
const h3Style = { fontSize: 18, marginTop: 20, marginBottom: 10 };
const ulStyle = { lineHeight: 1.8 };

export default function TermsConditions() {
  return (
    <main style={mainStyle}>
      <h1 style={h1Style}>Terms & Conditions</h1>
      <p style={{ color: '#666', marginBottom: 40 }}><strong>Last Updated:</strong> January 24, 2026</p>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>1. Acceptance of Terms</h2>
        <p>By accessing and using Bissgro&apos;s website and services, you accept and agree to be bound by these Terms & Conditions.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>2. Services</h2>
        <p>Bissgro provides web development, app development, SEO services, and related digital solutions. Service descriptions, pricing, and deliverables are as specified on our website and in project agreements.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>3. Payment Terms</h2>
        <h3 style={h3Style}>3.1 Payment Options</h3>
        <ul style={ulStyle}>
          <li><strong>Full Payment:</strong> Complete payment upfront before project commencement</li>
          <li><strong>Custom Payment:</strong> Partial payment (minimum ₹1,000) with remaining balance as agreed</li>
        </ul>
        <h3 style={h3Style}>3.2 Payment Processing</h3>
        <p>All payments are processed securely through Razorpay.</p>
        <h3 style={h3Style}>3.3 Invoices</h3>
        <p>Upon successful payment, an invoice will be automatically generated and sent to your registered email and WhatsApp number.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>4. Project Timeline & Revisions</h2>
        <p>Project timelines are estimates. Revision rounds are as specified in each package. Additional revisions may incur extra charges.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>5. Client Responsibilities</h2>
        <p>Clients are responsible for providing accurate information, timely feedback, necessary materials, and payments as agreed.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>6. Intellectual Property</h2>
        <p>Upon full payment, clients receive ownership of final deliverables. Bissgro retains the right to showcase completed work in our portfolio unless otherwise agreed.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>7. Cancellation</h2>
        <p>Clients may cancel before work begins. Cancellation after work has started is subject to charges for work completed. See our Refund Policy for details.</p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={h2Style}>8. Contact</h2>
        <p><strong>Bissgro</strong><br />44, Block-H, Noida, Uttar Pradesh, India, 201301<br />Phone: +91 73039 81193<br />Email: info@bissgro.com</p>
      </section>
    </main>
  );
}
