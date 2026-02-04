'use client';

import { useState, useEffect } from 'react';
import Script from 'next/script';

const RAZORPAY_KEY = 'rzp_test_S7f24Va8pdX661';

function generateInvoice(paymentResponse, orderData) {
  const invoiceNumber = 'INV-' + Date.now();
  const date = new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });
  return { invoiceNumber, date, paymentId: paymentResponse.razorpay_payment_id, orderId: paymentResponse.razorpay_order_id, signature: paymentResponse.razorpay_signature, ...orderData };
}

function sendInvoiceViaWhatsApp(invoice) {
  const message = `✅ *Payment Successful!*\n\n*Invoice Number:* ${invoice.invoiceNumber}\n*Payment ID:* ${invoice.paymentId}\n*Date:* ${invoice.date}\n\n*Order Details:*\nPlan: ${invoice.plan}\nService: ${invoice.service.toUpperCase()}\nAmount Paid: ₹${invoice.amount.toLocaleString('en-IN')}\nPayment Type: ${invoice.paymentType === 'full' ? 'Full Payment' : 'Custom Payment'}\n\n*Customer Details:*\nName: ${invoice.name}\nEmail: ${invoice.email}\nPhone: ${invoice.phone}\n\nThank you for choosing Bissgro! Our team will contact you shortly.`;
  const url = `https://wa.me/${invoice.phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

export default function CheckoutModal({ open, onClose, plan, price, service, monthly }) {
  const [paymentType, setPaymentType] = useState('full');
  const [customAmount, setCustomAmount] = useState('');
  const [summaryTotal, setSummaryTotal] = useState(price);
  const [summaryPaymentType, setSummaryPaymentType] = useState('Full Payment');
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSummaryTotal(price);
    setSummaryPaymentType('Full Payment');
    setPaymentType('full');
    setCustomAmount('');
  }, [open, plan, price, service, monthly]);

  useEffect(() => {
    if (paymentType === 'custom') {
      const amt = parseInt(customAmount) || 0;
      if (amt >= 1000) {
        setSummaryTotal(amt);
        setSummaryPaymentType(`Custom (₹${amt.toLocaleString('en-IN')})`);
      } else {
        setSummaryTotal(price);
        setSummaryPaymentType('Custom Payment');
      }
    } else {
      setSummaryTotal(price);
      setSummaryPaymentType('Full Payment');
    }
  }, [paymentType, customAmount, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof window === 'undefined' || !window.Razorpay) {
      alert('Payment gateway not loaded. Please refresh and try again.');
      return;
    }
    if (!RAZORPAY_KEY || RAZORPAY_KEY === 'YOUR_KEY_ID') {
      alert('Payment gateway not configured. Add your Razorpay Key ID.');
      return;
    }
    const form = e.target;
    const name = (form.querySelector('[name="clientName"]')?.value || '').trim();
    const email = (form.querySelector('[name="clientEmail"]')?.value || '').trim();
    const phone = String(form.querySelector('[name="clientPhone"]')?.value || '').replace(/\s/g, '');
    const address = (form.querySelector('[name="clientAddress"]')?.value || '').trim();
    if (!name || !email || !phone) {
      alert('Please fill all required fields.');
      return;
    }
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      alert('Please enter a valid 10-digit phone number.');
      return;
    }
    let amount = price;
    if (paymentType === 'custom') {
      const amt = parseInt(customAmount);
      if (amt < 1000) {
        alert('Custom amount must be at least ₹1,000');
        return;
      }
      amount = amt;
    }
    const orderData = { name, email, phone, address, plan, service, amount, paymentType, isMonthly: !!monthly };
    try {
      const options = {
        key: RAZORPAY_KEY,
        amount: String(amount * 100),
        currency: 'INR',
        name: 'Bissgro',
        description: `${plan} - ${(service || '').toUpperCase()}`,
        image: typeof window !== 'undefined' ? new URL('/assets/logo.png', window.location.origin).href : '',
        prefill: { name, email, contact: phone },
        notes: { plan, service, payment_type: paymentType, address },
        theme: { color: '#d97436' },
        handler(res) {
          const invoice = generateInvoice(res, orderData);
          sendInvoiceViaWhatsApp(invoice);
          localStorage.setItem(`invoice_${invoice.invoiceNumber}`, JSON.stringify(invoice));
          onClose();
          alert(`Payment Successful! 🎉\n\nInvoice: ${invoice.invoiceNumber}\nAmount: ₹${invoice.amount.toLocaleString('en-IN')}\n\nInvoice sent to ${orderData.email} & ${orderData.phone}. Our team will contact you shortly!`);
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert('Payment initialization failed. Please try again.');
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [open]);

  if (!open) return null;

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" onLoad={() => setScriptLoaded(true)} />
      <div className="checkout-modal" style={{ display: 'flex' }} onClick={(ev) => ev.target?.classList?.contains('checkout-modal') && onClose()}>
        <div className="checkout-modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="checkout-header">
            <h3>Complete Your Purchase</h3>
            <button type="button" className="checkout-close" onClick={onClose} aria-label="Close">&times;</button>
          </div>
          <div className="checkout-body">
            <div className="order-summary">
              <h4>Order Summary</h4>
              <div className="summary-item">
                <span id="summary-plan">{plan}</span>
                <span id="summary-price">₹{price.toLocaleString('en-IN')}{monthly ? '/month' : ''}</span>
              </div>
              <div className="summary-item">
                <span>Payment Type</span>
                <span id="summary-payment-type">{summaryPaymentType}</span>
              </div>
              <div className="summary-item total">
                <span>Total Amount</span>
                <span id="summary-total">₹{summaryTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <form id="checkoutForm" onSubmit={handleSubmit}>
              <h4>Your Details</h4>
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="clientName" required placeholder="Enter your full name" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="clientEmail" required placeholder="your@email.com" />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" name="clientPhone" required placeholder="9876543210" pattern="[0-9]{10}" />
              </div>
              <div className="form-group">
                <label>Address</label>
                <textarea name="clientAddress" rows={3} placeholder="Your complete address" />
              </div>

              <h4>Payment Option</h4>
              <div className="payment-options">
                <label className="payment-option">
                  <input type="radio" name="paymentType" value="full" checked={paymentType === 'full'} onChange={() => setPaymentType('full')} />
                  <span>Full Payment</span>
                </label>
                <label className="payment-option">
                  <input type="radio" name="paymentType" value="custom" checked={paymentType === 'custom'} onChange={() => setPaymentType('custom')} />
                  <span>Custom Payment</span>
                </label>
              </div>

              {paymentType === 'custom' && (
                <div className="form-group">
                  <label>Enter Custom Amount (Minimum ₹1,000)</label>
                  <input type="number" min={1000} placeholder="Enter amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} />
                </div>
              )}

              <div className="terms-check">
                <label>
                  <input type="checkbox" name="agreeTerms" required />
                  <span>
                    I agree to the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>, <a href="/terms-conditions" target="_blank" rel="noopener noreferrer">Terms & Conditions</a>, <a href="/refund-policy" target="_blank" rel="noopener noreferrer">Refund Policy</a>, and <a href="/shipping-policy" target="_blank" rel="noopener noreferrer">Shipping Policy</a>
                  </span>
                </label>
              </div>

              <button type="submit" className="btn-pay">Proceed to Payment</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
