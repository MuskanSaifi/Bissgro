import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import IndianLead from '@/models/IndianLead';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { sendAdsLeadEmail } from '@/lib/email';

function onlyDigits(v) {
  return String(v || '').replace(/\D/g, '');
}

function computeLeadScore(payload) {
  let score = 0;
  const c = payload?.contact || {};
  const r = payload?.requirement || {};
  const f = payload?.filters || {};
  const b = payload?.businessContext || {};
  const e = payload?.extras || {};

  if (c.fullName) score += 10;
  if (onlyDigits(c.mobile).length >= 10) score += 20;
  if (c.email) score += 10;
  if (c.city || c.state) score += 5;

  if (r.appGoal) score += 5;
  if (r.appType) score += 5;
  if (r.category) score += 5;
  if ((r.description || '').trim().length >= 30) score += 15;

  const budget = (f.budgetINR || '').toLowerCase();
  if (budget.includes('5l')) score += 20;
  else if (budget.includes('2l-5l')) score += 15;
  else if (budget.includes('75k-2l')) score += 10;
  else if (budget.includes('25k-75k')) score += 6;
  else if (budget.includes('<25k')) score += 2;

  const timeline = (f.timeline || '').toLowerCase();
  if (timeline === 'asap') score += 15;
  else if (timeline === '1month') score += 10;
  else if (timeline === '2-3months') score += 6;
  else if (timeline === 'flexible') score += 3;

  if (f.readyToStart) score += 10;
  if (b.decisionMaker) score += 10;
  if (b.hasGST) score += 3;
  if (b.businessType) score += 3;

  if (e.needsBackend) score += 5;
  if (e.needsDesign) score += 5;
  if (e.publishToStore) score += 5;

  if (score > 100) score = 100;
  return score;
}

function priorityFromScore(score) {
  if (score >= 70) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const fullName = String(body?.contact?.fullName || '').trim();
    const mobileDigits = onlyDigits(body?.contact?.mobile);

    if (!fullName) return NextResponse.json({ error: 'Full name is required' }, { status: 400 });
    if (mobileDigits.length < 10) return NextResponse.json({ error: 'Valid mobile number is required' }, { status: 400 });

    const payload = {
      source: body?.source || 'ads',
      contact: {
        fullName,
        mobile: mobileDigits,
        whatsappSame: body?.contact?.whatsappSame !== false,
        email: String(body?.contact?.email || '').trim() || undefined,
        city: String(body?.contact?.city || '').trim() || undefined,
        state: String(body?.contact?.state || '').trim() || undefined,
      },
      requirement: {
        appGoal: String(body?.requirement?.appGoal || '').trim() || undefined,
        appType: String(body?.requirement?.appType || '').trim() || undefined,
        category: String(body?.requirement?.category || '').trim() || undefined,
        description: String(body?.requirement?.description || '').trim() || undefined,
      },
      filters: {
        budgetINR: String(body?.filters?.budgetINR || '').trim() || undefined,
        timeline: String(body?.filters?.timeline || '').trim() || undefined,
        readyToStart: !!body?.filters?.readyToStart,
      },
      businessContext: {
        businessType: String(body?.businessContext?.businessType || '').trim() || undefined,
        hasGST: !!body?.businessContext?.hasGST,
        decisionMaker: body?.businessContext?.decisionMaker !== false,
      },
      extras: {
        needsBackend: !!body?.extras?.needsBackend,
        needsDesign: !!body?.extras?.needsDesign,
        publishToStore: body?.extras?.publishToStore !== false,
      },
      meta: {
        utmSource: String(body?.meta?.utmSource || '').trim() || undefined,
        utmMedium: String(body?.meta?.utmMedium || '').trim() || undefined,
        utmCampaign: String(body?.meta?.utmCampaign || '').trim() || undefined,
        utmContent: String(body?.meta?.utmContent || '').trim() || undefined,
        utmTerm: String(body?.meta?.utmTerm || '').trim() || undefined,
        referrer: request.headers.get('referer') || undefined,
        landingPage: body?.meta?.landingPage || undefined,
        userAgent: request.headers.get('user-agent') || undefined,
      },
    };

    const score = computeLeadScore(payload);
    payload.leadScore = score;
    payload.priority = priorityFromScore(score);

    const lead = await IndianLead.create(payload);
    await sendAdsLeadEmail(lead);
    return NextResponse.json({ message: 'Lead submitted', leadId: lead._id }, { status: 201 });
  } catch (error) {
    console.error('Ads leads POST error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);
    if (!decoded) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(Number(searchParams.get('limit') || 200), 500);

    const leads = await IndianLead.find({}).sort({ createdAt: -1 }).limit(limit).lean();
    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error('Ads leads GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

