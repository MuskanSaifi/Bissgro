'use client';

import { useState } from 'react';

const FAQS = [
  {
    q: 'Do you issue the DUNS number?',
    a: 'No. Dun & Bradstreet issues it. We coordinate documents and the application from Noida.',
  },
  {
    q: 'Is DUNS the same as GST?',
    a: 'No. GSTIN is from the GST portal. D-U-N-S is a Dun & Bradstreet identifier. Many firms hold both for different counterparties.',
  },
  {
    q: 'Is DUNS a government licence?',
    a: 'No. It is a private business identifier. Lack of DUNS is not the same as operating without GST when GST law requires registration.',
  },
  {
    q: 'Is a DUNS number mandatory in India?',
    a: 'No Indian company law or GST rule says every business must hold a DUNS number. It is mandatory only on the form that asks for it, such as Apple organization enrolment, a Google Play organization account, a vendor sheet or a foreign KYC pack.',
  },
  {
    q: 'Who needs a DUNS number?',
    a: 'A private limited company, LLP, partnership, proprietorship, startup, manufacturer, exporter, IT company or software company that a counterparty will not onboard without a Dun & Bradstreet record. An individual enrolling in Apple’s developer program as an individual does not need one.',
  },
  {
    q: 'Do I need a DUNS number for Apple Developer?',
    a: 'Yes, if you enrol a company as an organization in the Apple Developer Program or the Enterprise Program. No, if you enrol as an individual. In India, organization enrolment is through the Apple Developer app, and the legal entity name must match. Apple does not accept a trade name or a branch. A sole proprietorship is often told to enrol as an individual. Apple says the number is free in most places, and paying to expedite does not shorten Apple’s wait.',
  },
  {
    q: 'Do I need a DUNS number for Google Play?',
    a: 'An organization developer account needs a D-U-N-S number on the linked Google payments profile. Google says the Dun & Bradstreet request is free and can take up to 30 days. A personal developer account is a different path. If the name or address does not match, the correction is made with Dun & Bradstreet, not inside our office.',
  },
  {
    q: 'How long does DUNS number registration take and what is the fee?',
    a: 'Our coordination fee for a Private Limited that is 6 months old or newer is ₹5,000 and 7 working days. If the company is older than 6 months, the same ₹5,000 file takes 2 working days. LLP, proprietorship, partnership and other business types are ₹6,000 and 7 working days. That clock starts after the papers are complete. Dun & Bradstreet’s own standard request is free and can take up to about 30 business days. Dun & Bradstreet still issues the number.',
  },
  {
    q: 'Is the DUNS number application free?',
    a: 'Dun & Bradstreet’s own standard request is free. A fast-track option on their side may be chargeable. The ₹5,000 and ₹6,000 amounts on this page are Bissgro’s coordination fee. They are not a government fee and we do not collect them for Dun & Bradstreet. You can file the free request yourself on their site.',
  },
  {
    q: 'Which documents does a Private Limited Company send?',
    a: 'Certificate of Incorporation, company PAN, registered office proof not older than 3 months (electricity bill or bank statement), director PAN, director email and mobile, website if you have one, and GST certificate if you have one.',
  },
  {
    q: 'Which documents does a proprietorship send?',
    a: 'Owner PAN, one business proof (GST, Udyam, Shop Act or trade licence), business address proof not older than 3 months, owner email and mobile, and the website if you have one.',
  },
  {
    q: 'Can an LLP or a partnership firm get a DUNS number?',
    a: 'Yes. An LLP uses the incorporation certificate, LLP PAN, office proof and a partner’s PAN, email and mobile. A partnership firm uses the partnership deed, firm PAN, office proof not older than 3 months, and a partner’s PAN, email and mobile. Both are ₹6,000 and 7 working days.',
  },
  {
    q: 'How do I search or check a DUNS number?',
    a: 'Search the legal name on Dun & Bradstreet’s own lookup before you apply. We do not run a public DUNS search and we cannot open a private D&B login. If you want the legal name and address checked before a new application, send them on WhatsApp +91 96259 45041.',
  },
  {
    q: 'What if the DUNS number is not found or the application is rejected?',
    a: 'Not found usually means there is no record yet, or the legal name and PIN do not match what you typed. A rejection is usually a name, address, entity-type or document mismatch. Status and corrections stay with Dun & Bradstreet. We help you read the query and resend the right paper. We cannot force an approval or edit their database. We are not D&B customer support.',
  },
  {
    q: 'Is a DUNS number the same as an LEI or a UEI?',
    a: 'No. DUNS is a 9-digit Dun & Bradstreet identifier. An LEI is a 20-character financial-market code that is renewed. A UEI is the ID the US federal government uses on SAM.gov; it replaced DUNS for US federal contracts in 2022. None of them replaces the others. We coordinate DUNS filing only.',
  },
  {
    q: 'Can one number cover every branch?',
    a: 'That depends on how D&B and your buyer treat branches versus the parent. We file what you instruct. We do not redesign your group structure.',
  },
  {
    q: 'How do I start?',
    a: 'WhatsApp +91 96259 45041 with your business type first: Private Limited, LLP, partnership or proprietorship, plus the legal name and the incorporation date. We then ask only for that type’s papers.',
  },
];

export default function DunsFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="home-section home-section-alt" aria-labelledby="duns-faq-title">
      <div className="home-container home-center">
        <span className="home-tag">FAQ</span>
        <h2 id="duns-faq-title" className="home-heading">
          Frequently Asked <span className="highlight">Questions</span>
        </h2>
        <p className="home-subtitle">
          Everything you need to know about DUNS number registration in India.
        </p>
      </div>
      <div className="home-container">
        <div className="home-faq-list">
          {FAQS.map((faq, i) => (
            <div key={faq.q} className={`home-faq-item ${openIndex === i ? 'open' : ''}`}>
              <button
                type="button"
                className="home-faq-question"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                aria-expanded={openIndex === i}
              >
                {faq.q}
                <i className="fas fa-chevron-down" />
              </button>
              <div className="home-faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
