// Payment and Checkout Handling
// ═══════════════════════════════════════════════════════════════
// RAZORPAY CONFIG – Add your keys here later
// Get Key ID from: https://dashboard.razorpay.com/app/keys
// Use Test Mode keys for testing, Live keys for production
// ═══════════════════════════════════════════════════════════════
const RAZORPAY_CONFIG = {
  key: 'rzp_test_S7f24Va8pdX661',  // Razorpay Key ID (Test Mode)
  // callback_url: 'https://yourdomain.com/payment-callback',  // Optional: redirect after payment
};

let currentPlan = null;
let currentPrice = 0;
let currentService = null;
let isMonthly = false;

// Service Tabs
document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      
      // Remove active from all
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));
      
      // Add active to clicked
      btn.classList.add('active');
      document.getElementById(`${tab}-tab`).classList.add('active');
    });
  });
});

// Open Checkout Modal
function openCheckout(planName, price, service, monthly = false) {
  currentPlan = planName;
  currentPrice = price;
  currentService = service;
  isMonthly = monthly;

  document.getElementById('summary-plan').textContent = planName;
  document.getElementById('summary-price').textContent = `₹${price.toLocaleString('en-IN')}${monthly ? '/month' : ''}`;
  document.getElementById('summary-payment-type').textContent = 'Full Payment';
  document.getElementById('summary-total').textContent = `₹${price.toLocaleString('en-IN')}`;

  document.getElementById('checkoutModal').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Close Checkout Modal
function closeCheckout() {
  document.getElementById('checkoutModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  document.getElementById('checkoutForm').reset();
  document.getElementById('customPaymentDiv').style.display = 'none';
  document.querySelector('input[name="paymentType"][value="full"]').checked = true;
}

// Update Payment Summary
function updatePaymentSummary() {
  const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
  const customAmountInput = document.getElementById('customAmount');
  const customPaymentDiv = document.getElementById('customPaymentDiv');
  const summaryPaymentType = document.getElementById('summary-payment-type');
  const summaryTotal = document.getElementById('summary-total');

  if (paymentType === 'custom') {
    customPaymentDiv.style.display = 'block';
    const customAmount = parseInt(customAmountInput.value) || 0;
    if (customAmount >= 1000) {
      summaryPaymentType.textContent = `Custom (₹${customAmount.toLocaleString('en-IN')})`;
      summaryTotal.textContent = `₹${customAmount.toLocaleString('en-IN')}`;
    } else {
      summaryPaymentType.textContent = 'Custom Payment';
      summaryTotal.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;
    }
  } else {
    customPaymentDiv.style.display = 'none';
    summaryPaymentType.textContent = 'Full Payment';
    summaryTotal.textContent = `₹${currentPrice.toLocaleString('en-IN')}`;
  }
}

// Handle Checkout Form Submission
async function handleCheckout(event) {
  event.preventDefault();

  const name = document.getElementById('clientName').value;
  const email = document.getElementById('clientEmail').value;
  const phone = document.getElementById('clientPhone').value;
  const address = document.getElementById('clientAddress').value;
  const paymentType = document.querySelector('input[name="paymentType"]:checked').value;
  
  let amount = currentPrice;
  if (paymentType === 'custom') {
    const customAmount = parseInt(document.getElementById('customAmount').value);
    if (customAmount < 1000) {
      alert('Custom amount must be at least ₹1,000');
      return;
    }
    amount = customAmount;
  }

  // Validate phone number
  if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  if (!RAZORPAY_CONFIG.key || RAZORPAY_CONFIG.key === 'YOUR_KEY_ID') {
    alert('Payment gateway not configured. Add your Razorpay Key ID in payment.js → RAZORPAY_CONFIG.key');
    return;
  }

  // Razorpay Checkout – same structure as Razorpay Docs
  // https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/checkout-form
  try {
    var options = {
      key: RAZORPAY_CONFIG.key,                    // Enter the Key ID generated from the Dashboard
      amount: String(amount * 100),                // Amount is in currency subunits (paise for INR)
      currency: 'INR',
      name: 'Bissgro',                             // Your business name
      description: `${currentPlan} - ${currentService.toUpperCase()}`,
      image: new URL('assets/logo.png', window.location.href).href,
      // order_id: 'order_xxx',                     // From Step 1 (Create Order on server). Omit for instant payment.
      // callback_url: RAZORPAY_CONFIG.callback_url,
      prefill: {
        name: name,                                // Customer's name
        email: email,
        contact: phone                             // Phone for better conversion
      },
      notes: {
        plan: currentPlan,
        service: currentService,
        payment_type: paymentType,
        address: address
      },
      theme: { color: '#d97436' }
    };

    options.handler = function(response) {
      handlePaymentSuccess(response, {
        name, email, phone, address,
        plan: currentPlan,
        service: currentService,
        amount, paymentType, isMonthly
      });
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.error('Payment error:', error);
    alert('Payment initialization failed. Please try again.');
  }
}

// Handle Successful Payment
function handlePaymentSuccess(paymentResponse, orderData) {
  // Generate Invoice
  const invoice = generateInvoice(paymentResponse, orderData);
  
  // Send invoice via WhatsApp
  sendInvoiceViaWhatsApp(orderData, invoice);
  
  // Send invoice via Email (using mailto as fallback, in production use backend)
  sendInvoiceViaEmail(orderData, invoice);
  
  // Show success message
  closeCheckout();
  showSuccessMessage(orderData, invoice);
}

// Generate Invoice
function generateInvoice(paymentResponse, orderData) {
  const invoiceNumber = 'INV-' + Date.now();
  const date = new Date().toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const invoice = {
    invoiceNumber,
    date,
    paymentId: paymentResponse.razorpay_payment_id,
    orderId: paymentResponse.razorpay_order_id,
    signature: paymentResponse.razorpay_signature,
    ...orderData
  };

  return invoice;
}

// Send Invoice via WhatsApp
function sendInvoiceViaWhatsApp(orderData, invoice) {
  const message = `✅ *Payment Successful!*\n\n` +
    `*Invoice Number:* ${invoice.invoiceNumber}\n` +
    `*Payment ID:* ${invoice.paymentId}\n` +
    `*Date:* ${invoice.date}\n\n` +
    `*Order Details:*\n` +
    `Plan: ${invoice.plan}\n` +
    `Service: ${invoice.service.toUpperCase()}\n` +
    `Amount Paid: ₹${invoice.amount.toLocaleString('en-IN')}\n` +
    `Payment Type: ${invoice.paymentType === 'full' ? 'Full Payment' : 'Custom Payment'}\n\n` +
    `*Customer Details:*\n` +
    `Name: ${invoice.name}\n` +
    `Email: ${invoice.email}\n` +
    `Phone: ${invoice.phone}\n\n` +
    `Thank you for choosing Bissgro! Our team will contact you shortly.\n\n` +
    `View full invoice: ${window.location.origin}/invoice.html?inv=${invoice.invoiceNumber}`;

  const whatsappUrl = `https://wa.me/${invoice.phone}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Send Invoice via Email
function sendInvoiceViaEmail(orderData, invoice) {
  const subject = `Invoice ${invoice.invoiceNumber} - Payment Confirmation`;
  const body = `Dear ${invoice.name},\n\n` +
    `Thank you for your payment!\n\n` +
    `Invoice Number: ${invoice.invoiceNumber}\n` +
    `Payment ID: ${invoice.paymentId}\n` +
    `Date: ${invoice.date}\n\n` +
    `Order Details:\n` +
    `Plan: ${invoice.plan}\n` +
    `Service: ${invoice.service.toUpperCase()}\n` +
    `Amount Paid: ₹${invoice.amount.toLocaleString('en-IN')}\n` +
    `Payment Type: ${invoice.paymentType === 'full' ? 'Full Payment' : 'Custom Payment'}\n\n` +
    `Our team will contact you shortly to proceed with your project.\n\n` +
    `Best regards,\n` +
    `Bissgro Team\n` +
    `Phone: +91 73039 81193\n` +
    `Email: info@bissgro.com`;

  // In production, use backend API to send email
  // For now, using mailto as fallback
  const mailtoLink = `mailto:${invoice.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Store invoice in localStorage for email service to pick up
  localStorage.setItem(`invoice_${invoice.invoiceNumber}`, JSON.stringify(invoice));
  
  // Note: In production, you should call your backend API here
  // Example: fetch('/api/send-invoice', { method: 'POST', body: JSON.stringify(invoice) })
  
  console.log('Invoice data stored. Backend should send email:', invoice);
}

// Show Success Message
function showSuccessMessage(orderData, invoice) {
  const message = `Payment Successful! 🎉\n\n` +
    `Invoice Number: ${invoice.invoiceNumber}\n` +
    `Amount: ₹${invoice.amount.toLocaleString('en-IN')}\n\n` +
    `Invoice has been sent to:\n` +
    `📧 ${orderData.email}\n` +
    `📱 ${orderData.phone}\n\n` +
    `Our team will contact you shortly!`;

  alert(message);
  
  // Optionally redirect to thank you page
  // window.location.href = `./thank-you.html?inv=${invoice.invoiceNumber}`;
}

// Close modal when clicking outside
window.onclick = function(event) {
  const modal = document.getElementById('checkoutModal');
  if (event.target === modal) {
    closeCheckout();
  }
}
