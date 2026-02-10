import nodemailer from 'nodemailer';

const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
const SMTP_USER = process.env.SMTP_USER || 'bissgroitsolutions@gmail.com';
const SMTP_PASS = process.env.SMTP_PASS;
const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : SMTP_PORT === 465;
const SMTP_IGNORE_TLS = process.env.SMTP_IGNORE_TLS === 'true';

const EMAIL_FROM = process.env.EMAIL_FROM || 'bissgroitsolutions@gmail.com';
const EMAIL_TO = process.env.EMAIL_TO || 'bissgro@gmail.com';

let transporter;

function getTransporter() {
  if (transporter) return transporter;
  if (!SMTP_PASS) {
    console.warn('SMTP_PASS is not set. Email sending is disabled.');
    return null;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log('📧 SMTP config:', {
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      ignoreTls: SMTP_IGNORE_TLS,
      from: EMAIL_FROM,
      to: EMAIL_TO,
    });
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    ...(SMTP_IGNORE_TLS
      ? {
          // If your environment MITM's TLS (proxy/antivirus), you may see:
          // "self-signed certificate in certificate chain"
          // Set SMTP_IGNORE_TLS=true to bypass TLS verification (dev only).
          tls: { rejectUnauthorized: false },
        }
      : {}),
  });

  return transporter;
}

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function sendAdsLeadEmail(lead) {
  const t = getTransporter();
  if (!t || !lead) return;

  const c = lead.contact || {};
  const r = lead.requirement || {};
  const f = lead.filters || {};
  const b = lead.businessContext || {};
  const e = lead.extras || {};
  const m = lead.meta || {};

  const subject = `New Ads Lead - ${c.fullName || ''} (${c.mobile || ''})`;

  const lines = [];
  lines.push(`Name: ${c.fullName || ''}`);
  lines.push(`Mobile: ${c.mobile || ''}`);
  lines.push(`Email: ${c.email || ''}`);
  lines.push(`City: ${c.city || ''}`);
  lines.push(`State: ${c.state || ''}`);
  lines.push('');
  lines.push(`App goal: ${r.appGoal || ''}`);
  lines.push(`App type: ${r.appType || ''}`);
  lines.push(`Category: ${r.category || ''}`);
  lines.push(`Description: ${r.description || ''}`);
  lines.push('');
  lines.push(`Budget: ${f.budgetINR || ''}`);
  lines.push(`Timeline: ${f.timeline || ''}`);
  lines.push(`Ready to start: ${f.readyToStart ? 'Yes' : 'No'}`);
  lines.push('');
  lines.push(`Business type: ${b.businessType || ''}`);
  lines.push(`Has GST: ${b.hasGST ? 'Yes' : 'No'}`);
  lines.push(`Decision maker: ${b.decisionMaker ? 'Yes' : 'No'}`);
  lines.push('');
  lines.push(`Needs backend: ${e.needsBackend ? 'Yes' : 'No'}`);
  lines.push(`Needs design: ${e.needsDesign ? 'Yes' : 'No'}`);
  lines.push(`Publish to store: ${e.publishToStore ? 'Yes' : 'No'}`);
  lines.push('');
  lines.push(`Lead score: ${lead.leadScore ?? ''}`);
  lines.push(`Priority: ${lead.priority || ''}`);
  lines.push('');
  lines.push('UTM / Meta:');
  lines.push(`utm_source: ${m.utmSource || ''}`);
  lines.push(`utm_medium: ${m.utmMedium || ''}`);
  lines.push(`utm_campaign: ${m.utmCampaign || ''}`);
  lines.push(`utm_content: ${m.utmContent || ''}`);
  lines.push(`utm_term: ${m.utmTerm || ''}`);
  lines.push(`Referrer: ${m.referrer || ''}`);
  lines.push(`Landing page: ${m.landingPage || ''}`);
  lines.push(`User-Agent: ${m.userAgent || ''}`);

  const text = lines.join('\n');

  const dashboardUrl = 'https://bissgro.com/admin/dashboard/leads';

  const html = `
    <div style="background:#f3f4f6;padding:20px 0;">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#111827;">
        <div style="padding:18px 20px;border-bottom:1px solid #e5e7eb;background:#111827;color:#f9fafb;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-size:12px;opacity:0.8;text-transform:uppercase;letter-spacing:0.12em;">Bissgro</div>
            <div style="font-size:18px;font-weight:700;margin-top:4px;">New Ads Lead</div>
          </div>
          <a href="${dashboardUrl}" style="background:#10b981;color:#ffffff;text-decoration:none;font-size:13px;font-weight:600;padding:8px 14px;border-radius:999px;border:1px solid rgba(255,255,255,0.2);">
            Open in Admin
          </a>
        </div>

        <div style="padding:18px 20px;border-bottom:1px solid #e5e7eb;background:#f9fafb;">
          <div style="font-size:13px;color:#374151;margin-bottom:4px;">Lead summary</div>
          <div style="font-size:15px;font-weight:700;margin-bottom:2px;">${escapeHtml(c.fullName || '') || 'New lead'}</div>
          <div style="font-size:13px;color:#4b5563;">
            Score: <strong>${lead.leadScore ?? ''}</strong> • Priority: <strong>${escapeHtml(lead.priority || '') || '—'}</strong>
          </div>
        </div>

        <div style="padding:18px 20px;font-size:13px;line-height:1.55;">
          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280;margin:0 0 6px;">Contact</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
            <tbody>
              <tr>
                <td style="padding:4px 0;width:120px;color:#6b7280;">Name</td>
                <td style="padding:4px 0;font-weight:600;">${escapeHtml(c.fullName || '')}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Mobile</td>
                <td style="padding:4px 0;">
                  ${c.mobile ? `<a href="tel:${escapeHtml(c.mobile)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(c.mobile)}</a>` : '<span>—</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Email</td>
                <td style="padding:4px 0;">
                  ${c.email ? `<a href="mailto:${escapeHtml(c.email)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(c.email)}</a>` : '<span>—</span>'}
                </td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">City / State</td>
                <td style="padding:4px 0;">${escapeHtml([c.city, c.state].filter(Boolean).join(', ')) || '—'}</td>
              </tr>
            </tbody>
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280;margin:16px 0 6px;">Requirement</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
            <tbody>
              <tr>
                <td style="padding:4px 0;width:120px;color:#6b7280;">App goal</td>
                <td style="padding:4px 0;">${escapeHtml(r.appGoal || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">App type</td>
                <td style="padding:4px 0;">${escapeHtml(r.appType || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Category</td>
                <td style="padding:4px 0;">${escapeHtml(r.category || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;vertical-align:top;color:#6b7280;">Description</td>
                <td style="padding:4px 0;">${escapeHtml(r.description || '').replace(/\\n/g, '<br />') || '—'}</td>
              </tr>
            </tbody>
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280;margin:16px 0 6px;">Budget &amp; Timeline</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
            <tbody>
              <tr>
                <td style="padding:4px 0;width:120px;color:#6b7280;">Budget</td>
                <td style="padding:4px 0;">${escapeHtml(f.budgetINR || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Timeline</td>
                <td style="padding:4px 0;">${escapeHtml(f.timeline || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Ready to start</td>
                <td style="padding:4px 0;">${f.readyToStart ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280;margin:16px 0 6px;">Business &amp; Extras</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:14px;">
            <tbody>
              <tr>
                <td style="padding:4px 0;width:120px;color:#6b7280;">Business type</td>
                <td style="padding:4px 0;">${escapeHtml(b.businessType || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Has GST</td>
                <td style="padding:4px 0;">${b.hasGST ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Decision maker</td>
                <td style="padding:4px 0;">${b.decisionMaker ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Needs backend</td>
                <td style="padding:4px 0;">${e.needsBackend ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Needs design</td>
                <td style="padding:4px 0;">${e.needsDesign ? 'Yes' : 'No'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Publish to store</td>
                <td style="padding:4px 0;">${e.publishToStore ? 'Yes' : 'No'}</td>
              </tr>
            </tbody>
          </table>

          <h3 style="font-size:13px;text-transform:uppercase;letter-spacing:0.16em;color:#6b7280;margin:16px 0 6px;">UTM / Meta</h3>
          <table style="width:100%;border-collapse:collapse;margin-bottom:4px;">
            <tbody>
              <tr>
                <td style="padding:4px 0;width:120px;color:#6b7280;">utm_source</td>
                <td style="padding:4px 0;">${escapeHtml(m.utmSource || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">utm_medium</td>
                <td style="padding:4px 0;">${escapeHtml(m.utmMedium || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">utm_campaign</td>
                <td style="padding:4px 0;">${escapeHtml(m.utmCampaign || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">utm_content</td>
                <td style="padding:4px 0;">${escapeHtml(m.utmContent || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">utm_term</td>
                <td style="padding:4px 0;">${escapeHtml(m.utmTerm || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Referrer</td>
                <td style="padding:4px 0;">${escapeHtml(m.referrer || '') || '—'}</td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;">Landing page</td>
                <td style="padding:4px 0;">
                  ${m.landingPage ? `<a href="${escapeHtml(m.landingPage)}" style="color:#0ea5e9;text-decoration:none;">${escapeHtml(m.landingPage)}</a>` : '—'}
                </td>
              </tr>
              <tr>
                <td style="padding:4px 0;color:#6b7280;vertical-align:top;">User-Agent</td>
                <td style="padding:4px 0;">${escapeHtml(m.userAgent || '') || '—'}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style="padding:10px 20px;border-top:1px solid #e5e7eb;background:#f9fafb;font-size:11px;color:#9ca3af;text-align:right;">
          <a href="${dashboardUrl}" style="color:#0ea5e9;text-decoration:none;">Open in Admin dashboard</a>
        </div>
      </div>
    </div>
  `;

  try {
    await t.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject,
      text,
      html,
    });
  } catch (err) {
    console.error('Failed to send ads lead email:', err);
  }
}

