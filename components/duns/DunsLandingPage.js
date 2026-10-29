import ContactForm from '@/components/ContactForm';
import DunsFaq from './DunsFaq';

const WA =
  'https://wa.me/919625945041?text=Hi%2C%20I%20want%20a%20DUNS%20Number.%20Business%20type%3A%20';
const MSME_WA =
  'https://wa.me/919625945041?text=Hi%2C%20I%20want%20MSME%20registration';

const JUMP_LINKS = [
  { href: '#who-needs', label: 'Who needs it' },
  { href: '#company-type', label: 'Company type' },
  { href: '#apple-google', label: 'Apple and Google' },
  { href: '#documents', label: 'Documents' },
  { href: '#fee', label: 'Fee and time' },
];

const HERO_STATS = [
  { value: '9-digit', label: 'D&B business ID' },
  { value: '₹5,000', label: 'Filing fee from' },
  { value: '2–7', label: 'Working days' },
  { value: 'All types', label: 'Pvt Ltd, LLP, firms' },
];

const USED_FOR = [
  'Buyer, OEM and supplier forms that list "DUNS / D-U-N-S" as required for vendor registration',
  'Apple Developer organization enrolment, and a Google Play organization account',
  'Export buyers and freight checks that store a Dun & Bradstreet record against your legal name',
  'Company verification and a business-credit file when a corporate client asks for one',
  'One identifier when the trade name and the legal name look different on invoices',
];

const PROBLEMS = [
  'The form can sit on "DUNS required" even when PAN, GST and cancelled cheque are ready.',
  "A foreign buyer's compliance team may refuse to start credit checks until a D-U-N-S exists.",
  'You are not automatically illegal for lacking DUNS. You can still miss tenders and rate contracts that insist on it.',
  'A number issued to the wrong entity (branch vs parent) can fail a later audit. Matching the legal name matters.',
];

const PAGE_FOR = [
  'Manufacturers and traders in Noida / Ghaziabad who were asked for DUNS on a vendor sheet',
  'Exporters whose CHA or buyer checklist includes Dun & Bradstreet',
  'Companies that already have GST and now need a D&B identifier for one large customer',
];

const SKIP_IF = [
  'You only need GST or a shop licence — start those filings instead of DUNS',
  'You want us to invent a number without Dun & Bradstreet — we will not',
];

const WHO_NEEDS = [
  'A company enrolling as an organization with Apple Developer, not an individual developer',
  'An organization creating a Google Play developer account, or adding a D-U-N-S number on a Google payments profile',
  'A manufacturer, exporter or trader whose international client asked for it on supplier registration',
  'An IT or software company whose corporate onboarding pack lists Dun & Bradstreet',
  'A firm that wants a business-credit or company-verification record a buyer can look up',
];

const COMPANY_TYPES = [
  {
    icon: 'fas fa-building',
    title: 'Private limited company',
    desc: 'Uses the Certificate of Incorporation and the company PAN. If the company is 6 months old or newer, our file is ₹5,000 and 7 working days. If it is older than 6 months, the same ₹5,000 file is 2 working days.',
  },
  {
    icon: 'fas fa-handshake',
    title: 'LLP',
    desc: "Uses the LLP incorporation certificate and the LLP PAN, plus one partner's PAN, email and mobile. This is ₹6,000 and 7 working days.",
  },
  {
    icon: 'fas fa-users',
    title: 'Partnership firm',
    desc: "Filed as an other business type: ₹6,000 and 7 working days. We ask for the partnership deed, firm PAN, office proof not older than 3 months, and a partner's PAN, email and mobile.",
  },
  {
    icon: 'fas fa-user',
    title: 'Proprietorship',
    desc: "Uses the owner's PAN and one business proof: GST, Udyam, Shop Act or a trade licence. Apple often tells a sole proprietorship to enrol as an individual, because it may not treat that firm as a legal entity for organization enrolment.",
  },
  {
    icon: 'fas fa-rocket',
    title: 'Startup or small business',
    desc: 'A startup in India uses the same DUNS path as its legal form: private limited, LLP or proprietorship. DPIIT recognition does not replace the Dun & Bradstreet record, and a DUNS number does not make a firm a recognised startup.',
  },
  {
    icon: 'fas fa-industry',
    title: 'Manufacturer, exporter or IT company',
    desc: 'These businesses are asked because a buyer or a store wants the record, not because that industry has its own DUNS class. Write the real activity on the form. An export filing still needs IEC separately when customs asks for it.',
  },
];

const PLATFORMS = [
  {
    icon: 'fab fa-apple',
    title: 'Apple Developer',
    desc: 'Apple asks for a D-U-N-S number when a company enrols in the Apple Developer Program or the Enterprise Program as an organization. An individual developer does not need one. Enrolment in India is through the Apple Developer app. Use the legal entity name — Apple does not accept a trade name, a DBA or a branch. Apple says the number is free in most places, and paying to expedite does not shorten Apple’s own wait. After the number is issued, allow up to two business days before Apple’s system can see it.',
  },
  {
    icon: 'fab fa-google-play',
    title: 'Google developer account',
    desc: 'A Google Play organization account asks for a D-U-N-S number on the linked Google payments profile, with the organization name and address. Google says the request through Dun & Bradstreet is free and can take up to 30 days. A personal developer account is a different path. If the name or address does not match, Google sends you back to Dun & Bradstreet to correct it.',
  },
  {
    icon: 'fas fa-truck',
    title: 'Vendor and supplier registration',
    desc: 'International clients, OEM buyers and corporate onboarding desks use the number to match your firm to one Dun & Bradstreet record. Until that field is filled, the vendor registration can sit open even when PAN, GST and a cancelled cheque are attached. A parent company and a branch can have different numbers. We file the entity you name.',
  },
  {
    icon: 'fas fa-chart-line',
    title: 'Business credit and company verification',
    desc: 'The number is also the key to a Dun & Bradstreet business-credit file. Getting the number does not by itself give a credit limit, a bank facility or a "verified" badge from the Government of India. It lets a buyer look the legal entity up.',
  },
];

const PROCESS = [
  {
    num: '01',
    icon: 'fas fa-search',
    title: 'Search first',
    desc: "Search the legal name on Dun & Bradstreet's own lookup before you apply. Many Indian companies already have a number and do not know it.",
  },
  {
    num: '02',
    icon: 'fas fa-file-signature',
    title: 'Apply with matching papers',
    desc: 'If not found, apply with the legal name, address and PIN, year established, and nature of business. We check that the papers match that name.',
  },
  {
    num: '03',
    icon: 'fas fa-check-double',
    title: 'D&B reviews and issues',
    desc: 'You stay the applicant. Dun & Bradstreet reviews the record, issues the nine-digit number, or asks for a correction.',
  },
  {
    num: '04',
    icon: 'fas fa-comments',
    title: 'Status and queries',
    desc: 'Application status stays on Dun & Bradstreet’s side. We help you read a query. We cannot open their private login.',
  },
];

const ISSUES = [
  {
    title: 'Not found',
    desc: 'The legal name, spelling or PIN does not match a record yet, or no record exists. Do not invent a number to fill a form.',
  },
  {
    title: 'Rejected or sent back',
    desc: 'Usually a name, address, entity type or document mismatch. We resend the paper they named. We cannot force an approval.',
  },
  {
    title: 'Update or correction',
    desc: 'Changing the address, name or activity on an existing number is a Dun & Bradstreet correction, not a second number from us.',
  },
  {
    title: 'Processing time',
    desc: "The 2 and 7 working days in the fee table are our time after the papers are complete. Dun & Bradstreet's own review can still take longer. Apple says allow up to 5 business days; Google says plan for up to 30 days on the free request.",
  },
];

const ID_COMPARE = [
  {
    id: 'D-U-N-S',
    issuer: 'Dun & Bradstreet',
    answers: 'A 9-digit business record for suppliers, business credit, Apple organization enrolment and Google organization checks',
  },
  {
    id: 'LEI',
    issuer: 'A GLEIF-accredited issuer',
    answers: 'A 20-character code for financial-market reporting. It is renewed. It does not replace DUNS on an Apple form.',
  },
  {
    id: 'UEI',
    issuer: 'SAM.gov, for the US federal government',
    answers: 'The ID US federal awards have used since 2022, when that system stopped using DUNS. We do not file a UEI.',
  },
];

const DOCUMENTS = [
  {
    title: 'Private Limited Company',
    items: [
      'Certificate of Incorporation (MCA)',
      'Company PAN card',
      'Registered office proof: electricity bill or bank statement, not older than 3 months',
      'Director PAN card',
      'Director email and mobile number',
      'Company website, if you have one',
      'GST certificate, if you have one',
    ],
  },
  {
    title: 'LLP',
    items: [
      'LLP incorporation certificate',
      'LLP PAN card',
      'Registered office proof: utility bill or bank statement',
      'Partner PAN card',
      'Partner email and mobile number',
      'Website, if you have one',
      'GST certificate, if you have one',
    ],
  },
  {
    title: 'Proprietorship',
    items: [
      'Owner PAN card',
      'One business proof: GST, Udyam, Shop Act licence, or trade licence',
      'Business address proof: electricity bill or bank statement, not older than 3 months',
      'Owner email and mobile number',
      'Business website, if you have one',
    ],
  },
  {
    title: 'Partnership firm',
    items: [
      'Partnership deed',
      'Firm PAN card',
      'Office proof: electricity bill or bank statement, not older than 3 months',
      'Partner PAN card',
      'Partner email and mobile number',
      'GST or Shop Act licence, if you have one',
    ],
  },
  {
    title: 'Needed for every business type',
    highlight: true,
    items: [
      'Legal business name',
      'Business address with PIN code',
      'Year the business was established',
      'Nature of business, for example app development or IT services',
    ],
  },
];

const FEES = [
  { type: 'Private Limited, 6 months old or newer', fee: '₹5,000', time: '7 working days' },
  { type: 'Private Limited, older than 6 months', fee: '₹5,000', time: '2 working days' },
  { type: 'LLP, proprietorship, partnership and other business types', fee: '₹6,000', time: '7 working days' },
];

const HELP_STEPS = [
  {
    num: '01',
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp your details',
    desc: 'Send the business type (Private Limited, LLP, partnership or proprietorship), the legal name and the incorporation date.',
  },
  {
    num: '02',
    icon: 'fas fa-clipboard-list',
    title: 'Get a checklist',
    desc: 'We send a checklist and help you complete the Dun & Bradstreet-side filing.',
  },
  {
    num: '03',
    icon: 'fas fa-user-check',
    title: 'You stay the applicant',
    desc: 'D&B reviews, matches and issues the number, or asks for a correction.',
  },
  {
    num: '04',
    icon: 'fas fa-life-ring',
    title: 'Query support',
    desc: 'If they query the record, we help you read what they asked. We do not override their database.',
  },
];

function SectionHead({ tag, title, highlight, subtitle, id, left }) {
  return (
    <div className={left ? '' : 'home-center'}>
      <span className="home-tag">{tag}</span>
      <h2 id={id} className="home-heading">
        {title} {highlight && <span className="highlight">{highlight}</span>}
      </h2>
      {subtitle && <p className={`home-subtitle ${left ? 'left' : ''}`}>{subtitle}</p>}
    </div>
  );
}

function CheckList({ items, icon = 'fas fa-check-circle', tone }) {
  return (
    <ul className={`duns-list ${tone ? `duns-list-${tone}` : ''}`}>
      {items.map((item) => (
        <li key={item}>
          <i className={icon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function DunsLandingPage() {
  return (
    <div className="home-page duns-page">
      {/* Hero */}
      <section className="home-hero" aria-label="DUNS Number hero">
        <div className="home-container">
          <div className="home-hero-grid">
            <div>
              <span className="home-tag">DUNS Number · Filing Support</span>
              <h1 className="home-hero-title">
                DUNS Number Registration <span className="highlight">in India</span>
              </h1>
              <p className="home-hero-desc">
                Apply for a D-U-N-S number when a buyer, Apple, Google or a vendor portal asks for
                it. Dun &amp; Bradstreet issues the number — we coordinate your papers and filing
                from Noida.
              </p>
              <div className="home-hero-actions">
                <a href={WA} className="btn-home-primary" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-whatsapp" /> WhatsApp Your Business Type
                </a>
                <a href="tel:+919625945041" className="btn-home-outline">
                  <i className="fas fa-phone-alt" /> +91 96259 45041
                </a>
              </div>
              <nav className="duns-jump" aria-label="On this page">
                {JUMP_LINKS.map((l) => (
                  <a key={l.href} href={l.href}>{l.label}</a>
                ))}
              </nav>
              <div className="home-hero-stats">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="home-hero-stat">
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-hero-visual">
              <div className="home-hero-visual-main">
                <img src="/assets/banner/banner.png" alt="DUNS number registration with Bissgro" />
                <div className="home-hero-badge b1">
                  <i className="fab fa-apple" /> Apple Developer
                </div>
                <div className="home-hero-badge b2">
                  <i className="fab fa-google-play" /> Google Play
                </div>
                <div className="home-hero-badge b3">
                  <i className="fas fa-truck" /> Vendor Registration
                </div>
                <div className="home-hero-badge b4">
                  <i className="fas fa-globe" /> Export Buyers
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What it is + why */}
      <section className="home-section" aria-labelledby="duns-what-title">
        <div className="home-container">
          <div className="duns-two-col">
            <div className="duns-prose">
              <SectionHead tag="What It Is" title="What a" highlight="DUNS number is" id="duns-what-title" left />
              <p>
                A DUNS number, also written D-U-N-S, is a nine-digit business identifier in Dun
                &amp; Bradstreet’s database. It tells a counterparty which legal entity they are
                dealing with when several firms share a similar name. It is not a GSTIN, not an MCA
                incorporation number, and not a licence from any authority.
              </p>
              <p>
                Indian law does not make a DUNS number mandatory for every shop. You can trade
                without one. A vendor form, an export buyer, Apple’s organization enrolment or a
                Google Play organization account can still refuse to move until the field is
                filled. That is the usual reason a company applies.
              </p>
              <p>
                The application itself is online. We prepare it with you from 44, Block-H,
                Sector-63, Noida. Manufacturers, exporters, IT companies and software firms in
                Noida, Ghaziabad and Greater Noida use the same WhatsApp: +91 96259 45041.
              </p>
            </div>
            <div className="duns-prose duns-panel">
              <SectionHead tag="Why It Matters" title="Why a business" highlight="needs a DUNS number" left />
              <p>
                Dun &amp; Bradstreet built D-U-N-S so counterparties can tell one legal entity from
                another with a similar name. Export teams and large procurement desks already live
                in that database. They ask you to join it rather than invent a new ID.
              </p>
              <p>
                On many vendor portals the field is mandatory. Until it is filled, purchase,
                onboarding or a foreign KYC pack stays open. That delay is operational, not a court
                order.
              </p>
              <p className="duns-note">
                DUNS does not replace GSTIN, Udyam, IEC or incorporation. Those answer tax, MSME
                class, customs and company law. DUNS answers “which D&amp;B record is this firm?”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Used for + problems */}
      <section className="home-section home-section-alt" aria-labelledby="duns-used-title">
        <div className="home-container">
          <div className="duns-two-col">
            <div className="duns-card">
              <SectionHead tag="Where It Is Used" title="What it is" highlight="used for" id="duns-used-title" left />
              <CheckList items={USED_FOR} />
            </div>
            <div className="duns-card">
              <SectionHead tag="If You Do Not Have It" title="Problems that" highlight="can come up" left />
              <CheckList items={PROBLEMS} icon="fas fa-exclamation-triangle" tone="warn" />
            </div>
          </div>
        </div>
      </section>

      {/* Fit */}
      <section className="home-section" aria-labelledby="duns-fit-title">
        <div className="home-container">
          <SectionHead tag="Fit" title="Who this" highlight="page is for" id="duns-fit-title" />
          <div className="duns-two-col">
            <div className="duns-card">
              <h3 className="duns-card-title">This page is for</h3>
              <CheckList items={PAGE_FOR} />
            </div>
            <div className="duns-card">
              <h3 className="duns-card-title">Skip this page if</h3>
              <CheckList items={SKIP_IF} icon="fas fa-times-circle" tone="warn" />
            </div>
          </div>
        </div>
      </section>

      {/* Who needs */}
      <section id="who-needs" className="home-section home-section-alt" aria-labelledby="duns-who-title">
        <div className="home-container">
          <div className="duns-two-col">
            <div className="duns-prose">
              <SectionHead tag="Requirement" title="Who needs a" highlight="DUNS number" id="duns-who-title" left />
              <p>
                You need a DUNS number when someone else’s form will not accept the file without it.
                A private limited company, LLP, partnership, proprietorship, startup or small
                business can all be filed. There is no separate Indian government class called
                “DUNS for startups” or “DUNS for IT companies”. The nature of business on the form
                should say what you actually do.
              </p>
              <p>
                Eligibility is practical, not a licence test. Dun &amp; Bradstreet needs a legal
                name, an address with a PIN code, the year the business started, and papers that
                match that name. A trade name, a branch, or a brand that does not match the legal
                entity is the usual reason a search says the number is not found.
              </p>
              <p className="duns-note">
                If you only need GST, IEC or DPIIT startup recognition, those are different filings.
              </p>
            </div>
            <div className="duns-card">
              <h3 className="duns-card-title">Common reasons you are asked</h3>
              <CheckList items={WHO_NEEDS} />
            </div>
          </div>
        </div>
      </section>

      {/* Company type */}
      <section id="company-type" className="home-section" aria-labelledby="duns-type-title">
        <div className="home-container">
          <SectionHead
            tag="Entity"
            title="DUNS number by"
            highlight="company type"
            id="duns-type-title"
            subtitle="The number is for the legal entity. Send the incorporation date with a private limited company so the 7-day file and the 2-day file are not mixed."
          />
          <div className="duns-grid-3">
            {COMPANY_TYPES.map((t) => (
              <div key={t.title} className="home-service-card">
                <div className="home-service-icon"><i className={t.icon} /></div>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Apple / Google / vendors */}
      <section id="apple-google" className="home-section home-section-alt" aria-labelledby="duns-platform-title">
        <div className="home-container">
          <SectionHead
            tag="Where the Form Asks"
            title="Apple, Google, vendors and"
            highlight="business credit"
            id="duns-platform-title"
            subtitle="These are the requests we see most. We are not Apple, Google or Dun & Bradstreet."
          />
          <div className="duns-grid-2">
            {PLATFORMS.map((p) => (
              <div key={p.title} className="home-service-card">
                <div className="home-service-icon"><i className={p.icon} /></div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="home-section" aria-labelledby="duns-process-title">
        <div className="home-container home-center">
          <SectionHead
            tag="Process"
            title="How to get a DUNS number,"
            highlight="search one, and fix a problem"
            id="duns-process-title"
          />
          <div className="home-process-steps duns-steps-4">
            {PROCESS.map((step) => (
              <div key={step.num} className="home-process-step">
                <div className="home-process-num">{step.num}</div>
                <div className="home-process-icon"><i className={step.icon} /></div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-container">
          <h3 className="duns-sub-title">When something goes wrong</h3>
          <div className="duns-grid-2">
            {ISSUES.map((i) => (
              <div key={i.title} className="duns-issue">
                <h4><i className="fas fa-info-circle" /> {i.title}</h4>
                <p>{i.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DUNS vs LEI vs UEI */}
      <section className="home-section home-section-alt" aria-labelledby="duns-compare-title">
        <div className="home-container">
          <SectionHead
            tag="Not the Same ID"
            title="DUNS number,"
            highlight="LEI and UEI"
            id="duns-compare-title"
            subtitle="There is no general DUNS alternative when Apple, Google or a private buyer has asked an Indian company for DUNS. LEI and UEI are different identifiers, not substitutes."
          />
          <div className="duns-table-wrap">
            <table className="duns-table">
              <caption>Which identifier the form is asking for</caption>
              <thead>
                <tr>
                  <th>Identifier</th>
                  <th>Who issues it</th>
                  <th>What it answers</th>
                </tr>
              </thead>
              <tbody>
                {ID_COMPARE.map((r) => (
                  <tr key={r.id}>
                    <td><strong>{r.id}</strong></td>
                    <td>{r.issuer}</td>
                    <td>{r.answers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="duns-note duns-center-note">
            We coordinate DUNS filing only. We do not issue an LEI, a UEI, a GSTIN or the D-U-N-S
            number itself.
          </p>
        </div>
      </section>

      {/* Documents */}
      <section id="documents" className="home-section" aria-labelledby="duns-docs-title">
        <div className="home-container">
          <SectionHead
            tag="Papers"
            title="Documents required for a"
            highlight="DUNS number"
            id="duns-docs-title"
            subtitle="Send the set that matches your entity. Address proof should not be older than 3 months. Do not send passwords or full card numbers on WhatsApp."
          />
          <div className="duns-grid-3">
            {DOCUMENTS.map((d) => (
              <div key={d.title} className={`duns-card ${d.highlight ? 'duns-card-highlight' : ''}`}>
                <h3 className="duns-card-title">{d.title}</h3>
                <CheckList items={d.items} icon="fas fa-file-alt" />
              </div>
            ))}
          </div>
          <p className="duns-note duns-center-note">
            Once these papers are in, we verify them and start the D-U-N-S registration. Dun &amp;
            Bradstreet still issues the number. We do not assign it ourselves.
          </p>
        </div>
      </section>

      {/* Fee */}
      <section id="fee" className="home-section home-section-alt" aria-labelledby="duns-fee-title">
        <div className="home-container">
          <SectionHead
            tag="Fee and Time"
            title="DUNS number registration fee and"
            highlight="processing time"
            id="duns-fee-title"
            subtitle="Dun & Bradstreet's own standard request is free and can take longer. The table below is our coordination fee, after your papers are complete."
          />
          <div className="duns-table-wrap">
            <table className="duns-table duns-fee-table">
              <caption>D-U-N-S filing fee at Bissgro</caption>
              <thead>
                <tr>
                  <th>Business type</th>
                  <th>Fee</th>
                  <th>Processing time</th>
                </tr>
              </thead>
              <tbody>
                {FEES.map((f) => (
                  <tr key={f.type}>
                    <td>{f.type}</td>
                    <td><strong className="duns-fee">{f.fee}</strong></td>
                    <td>{f.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="duns-prose duns-fee-notes">
            <p>
              Send the incorporation date with the business type. A Private Limited that is 6 months
              old or newer takes 7 working days. A company older than 6 months takes 2 working days.
              The fee stays ₹5,000 either way. An LLP, a proprietorship or a partnership firm is
              ₹6,000 and 7 working days.
            </p>
            <p>
              There is a free application on Dun &amp; Bradstreet’s own site. Their India page says
              registration may take up to 30 business days, and a fast-track service may be
              chargeable. The ₹5,000 and ₹6,000 figures are Bissgro’s fee for checking papers and
              filing with you. They are not a government charge, and we do not collect them for Dun
              &amp; Bradstreet. If you only want the free self-serve request, use their site.
              WhatsApp us when you want the file checked first.
            </p>
          </div>
        </div>
      </section>

      {/* How Bissgro helps */}
      <section className="home-section" aria-labelledby="duns-help-title">
        <div className="home-container home-center">
          <SectionHead tag="Our Help" title="How" highlight="Bissgro helps" id="duns-help-title" />
          <div className="home-process-steps duns-steps-4">
            {HELP_STEPS.map((step) => (
              <div key={step.num} className="home-process-step">
                <div className="home-process-num">{step.num}</div>
                <div className="home-process-icon"><i className={step.icon} /></div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-container">
          <div className="duns-card duns-dont">
            <h3 className="duns-card-title">What we do not do</h3>
            <CheckList
              items={[
                'We do not issue, sell or "reserve" a D-U-N-S number in-house.',
                'A Private Limited that is 6 months old or newer takes 7 working days. If the company is older than 6 months, that file takes 2 working days. Dun & Bradstreet still issues the number.',
              ]}
              icon="fas fa-times-circle"
              tone="warn"
            />
          </div>
          <div className="duns-related">
            <span>Also available:</span>
            <a href={MSME_WA} target="_blank" rel="noopener noreferrer">Udyam / MSME registration →</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <DunsFaq />

      {/* CTA */}
      <section className="home-cta-banner" aria-label="Call to action">
        <div className="home-container">
          <div className="home-cta-inner">
            <div>
              <h2>Asked for a DUNS number?</h2>
              <p>WhatsApp your business type, legal name and incorporation date to start.</p>
            </div>
            <div className="home-cta-actions">
              <a href={WA} className="btn-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp" /> WhatsApp Us
              </a>
              <a href="tel:+919625945041" className="btn-outline-white">
                <i className="fas fa-phone-alt" /> Call Us Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="contact-section">
        <div className="contact-container">
          <div className="contact-form-box">
            <h2>Start Your DUNS Filing</h2>
            <p>Tell us your business type first. We then ask only for that type’s papers.</p>
            <ContactForm />
          </div>
          <div className="contact-info-box">
            <div className="contact-illustration">
              <img src="/assets/contact.png" className="img-fluid px-5" alt="Contact Bissgro" />
            </div>
            <ul className="info-list">
              <li>
                <i className="fas fa-map-marker-alt" /> 44, Block-H, Sector-63, Noida, Uttar Pradesh,
                India, 201301
              </li>
              <li>
                <i className="fas fa-phone" /> <a href="tel:+919625945041">+91 96259 45041</a>
              </li>
              <li>
                <i className="fas fa-envelope" /> <a href="mailto:info@bissgro.com">info@bissgro.com</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
