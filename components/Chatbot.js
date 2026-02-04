'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const WHATSAPP_LEAD = 'https://wa.me/917303981193';

function addStrong(str) {
  return str.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [leadData, setLeadData] = useState({
    service: null, subService: null, websiteType: null, seo: null, appType: null, name: null, phone: null, email: null,
  });
  const [step, setStep] = useState('welcome');
  const [isCollectingInfo, setIsCollectingInfo] = useState(false);
  const [infoStep, setInfoStep] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const addBot = (text, quickReplies = null) => {
    setMessages((m) => [...m, { type: 'bot', text, quickReplies }]);
  };
  const addUser = (text) => {
    setMessages((m) => [...m, { type: 'user', text }]);
  };

  const startLeadFlow = () => {
    setStep('service');
    addBot("Hello! 👋 Welcome to Bissgro!\n\nI'm here to help you get started. Which service are you interested in?", [
      'Web Development', 'App Development', 'SEO Service', 'Other Services',
    ]);
  };

  const handleServiceSelection = (service) => {
    setLeadData((d) => ({ ...d, service }));
    addUser(service);
    setTimeout(() => {
      if (service === 'Web Development') {
        setStep('websiteType');
        addBot('Great choice! What type of website do you need?', [
          'E-commerce Website', 'Business Website', 'Portfolio Website', 'Blog Website', 'Custom Website',
        ]);
      } else if (service === 'App Development') {
        setStep('appType');
        addBot('Excellent! What type of app are you looking for?', [
          'iOS App', 'Android App', 'Cross-platform App', 'Hybrid App',
        ]);
      } else {
        setStep('info');
        setIsCollectingInfo(true);
        setInfoStep('name');
        addBot("Perfect! To proceed, I'll need some information from you.\n\n**What's your name?** (Type below and press Enter)");
      }
    }, 500);
  };

  const handleWebsiteType = (type) => {
    setLeadData((d) => ({ ...d, websiteType: type }));
    addUser(type);
    setTimeout(() => {
      setStep('seo');
      addBot('Perfect! Would you like SEO (Search Engine Optimization) services as well?', [
        'Yes, I need SEO', 'No, just website',
      ]);
    }, 500);
  };

  const handleSEO = (choice) => {
    setLeadData((d) => ({ ...d, seo: choice === 'Yes, I need SEO' ? 'Yes' : 'No' }));
    addUser(choice);
    setTimeout(() => {
      setStep('info');
      setIsCollectingInfo(true);
      setInfoStep('name');
      addBot("Perfect! To proceed, I'll need some information from you.\n\n**What's your name?** (Type below and press Enter)");
    }, 500);
  };

  const handleAppType = (type) => {
    setLeadData((d) => ({ ...d, appType: type }));
    addUser(type);
    setTimeout(() => {
      setStep('info');
      setIsCollectingInfo(true);
      setInfoStep('name');
      addBot("Perfect! To proceed, I'll need some information from you.\n\n**What's your name?** (Type below and press Enter)");
    }, 500);
  };

  const askPhone = () => {
    setInfoStep('phone');
    addBot("Thanks! **What's your phone number?** (e.g. 9876543210)");
  };
  const askEmail = () => {
    setInfoStep('email');
    addBot('Great! **And your email address?**');
  };

  const formatLeadMessage = () => {
    const d = leadData;
    let msg = '🆕 *NEW LEAD FROM WEBSITE CHATBOT*\n\n━━━━━━━━━━━━━━━━━━━━\n\n';
    msg += `👤 *Name:* ${d.name}\n📞 *Phone:* ${d.phone}\n📧 *Email:* ${d.email}\n\n━━━━━━━━━━━━━━━━━━━━\n\n📋 *Service Details:*\n\n• *Service:* ${d.service}\n`;
    if (d.websiteType) msg += `• *Website Type:* ${d.websiteType}\n`;
    if (d.seo) msg += `• *SEO Required:* ${d.seo}\n`;
    if (d.appType) msg += `• *App Type:* ${d.appType}\n`;
    msg += '\n━━━━━━━━━━━━━━━━━━━━\n✅ Ready to follow up!';
    return msg;
  };

  const submitLead = () => {
    addBot("Thank you! 🎉\n\nI'm sending your information to our team. You'll be contacted shortly!");
    setTimeout(() => {
      const url = `${WHATSAPP_LEAD}?text=${encodeURIComponent(formatLeadMessage())}`;
      window.open(url, '_blank');
      setTimeout(() => {
        setLeadData({ service: null, subService: null, websiteType: null, seo: null, appType: null, name: null, phone: null, email: null });
        setStep('welcome');
        setIsCollectingInfo(false);
        setInfoStep(null);
        addBot('Is there anything else I can help you with?', ['Start New Inquiry', 'View Pricing', 'Contact Info']);
      }, 2000);
    }, 1000);
  };

  const handleQuickReply = (reply) => {
    if (step === 'service') handleServiceSelection(reply);
    else if (step === 'websiteType') handleWebsiteType(reply);
    else if (step === 'seo') handleSEO(reply);
    else if (step === 'appType') handleAppType(reply);
    else if (reply === 'Start New Inquiry') {
      setMessages([]);
      startLeadFlow();
    } else if (reply === 'View Pricing') {
      window.location.href = '/plans';
    } else if (reply === 'Contact Info') {
      addBot('📍 Address: 44, Block-H, Noida, Uttar Pradesh, India, 201301\n📞 Phone: +91 73039 81193\n📧 Email: info@bissgro.com');
    } else {
      handleUserInput(reply);
    }
  };

  const handleUserInput = (text) => {
    const trimmed = (text || '').trim();
    if (!trimmed) return;

    if (isCollectingInfo && infoStep) {
      if (infoStep === 'name') {
        setLeadData((d) => ({ ...d, name: trimmed }));
        addUser(trimmed);
        setTimeout(askPhone, 400);
      } else if (infoStep === 'phone') {
        setLeadData((d) => ({ ...d, phone: trimmed.replace(/\s/g, '') }));
        addUser(trimmed);
        setTimeout(askEmail, 400);
      } else if (infoStep === 'email') {
        setLeadData((d) => ({ ...d, email: trimmed }));
        addUser(trimmed);
        setTimeout(submitLead, 400);
      }
      return;
    }

    const lower = trimmed.toLowerCase();
    addUser(trimmed);

    setTimeout(() => {
      if (step === 'service') {
        if (lower.includes('web') || lower.includes('website')) handleServiceSelection('Web Development');
        else if (lower.includes('app') || lower.includes('application')) handleServiceSelection('App Development');
        else if (lower.includes('seo')) handleServiceSelection('SEO Service');
        else addBot('Please select one of the options above to continue.', ['Web Development', 'App Development', 'SEO Service', 'Other Services']);
      } else if (step === 'websiteType') handleWebsiteType(trimmed);
      else if (step === 'seo') {
        if (lower.includes('yes') || lower.includes('need') || lower.includes('want')) handleSEO('Yes, I need SEO');
        else handleSEO('No, just website');
      } else if (step === 'appType') handleAppType(trimmed);
      else if (lower.includes('start new') || lower.includes('new inquiry')) {
        setMessages([]);
        startLeadFlow();
      } else if (lower.includes('pricing') || lower.includes('price')) {
        addBot("Check out our pricing page for all package details!", ['View Pricing']);
      } else if (lower.includes('contact')) {
        addBot('📍 Address: 44, Block-H, Noida, Uttar Pradesh, India, 201301\n📞 Phone: +91 73039 81193\n📧 Email: info@bissgro.com');
      } else {
        addBot("I'm here to help you get started! Please select a service option above.", ['Web Development', 'App Development', 'SEO Service']);
      }
    }, 500);
  };

  const onOpen = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 100);
    if (messages.length === 0) startLeadFlow();
  };

  const onSend = () => {
    if (input.trim()) {
      handleUserInput(input);
      setInput('');
    }
  };

  return (
    <div className="chatbot-container">
      <button className="chatbot-button" aria-label="Open chatbot" onClick={onOpen}>
        <i className="fas fa-comments"></i>
      </button>
      <div className={`chatbot-window ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <h3>Chat with us</h3>
          <button className="chatbot-close" aria-label="Close chatbot" onClick={() => setOpen(false)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="chatbot-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`chatbot-message ${msg.type}`}>
              <div className="chatbot-avatar">
                <i className={`fas fa-${msg.type === 'user' ? 'user' : 'robot'}`}></i>
              </div>
              <div className="chatbot-text">
                <span dangerouslySetInnerHTML={{ __html: addStrong(msg.text) }}></span>
                {msg.quickReplies && msg.type === 'bot' && (
                  <div className="chatbot-quick-replies">
                    {msg.quickReplies.map((r, j) => (
                      <button key={j} className="chatbot-quick-reply" onClick={() => handleQuickReply(r)}>
                        {r}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chatbot-input-area">
          <input
            ref={inputRef}
            type="text"
            className="chatbot-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                onSend();
              }
            }}
          />
          <button className="chatbot-send" aria-label="Send message" onClick={onSend}>
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
