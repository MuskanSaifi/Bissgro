import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import connectDB from '@/lib/db';
import Page from '@/models/Page';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { extractImagePublicIdsFromSections } from '@/lib/pageImages';
import '@/lib/upload';

const RESERVED_SLUGS = [
  'blog',
  'admin',
  'api',
  'contact-us',
  'about-us',
  'plans',
  'portfolio',
  'privacy-policy',
  'refund-policy',
  'shipping-policy',
  'terms-conditions',
  'ads-lead',
  'duns-number',
];

function cleanPageSlug(slug) {
  return String(slug || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Sanitize SEO fields so long text never crashes page create/update */
function sanitizeSeoFields({ metaTitle, metaDescription, metaKeywords, metaImage, metaImagePublicId }) {
  const clean = (v, max) => {
    if (v == null || v === '') return '';
    const s = String(v).trim();
    return max ? s.slice(0, max) : s;
  };

  return {
    metaTitle: clean(metaTitle, 120),
    metaDescription: clean(metaDescription, 500),
    metaKeywords: clean(metaKeywords, 500),
    metaImage: clean(metaImage),
    metaImagePublicId: clean(metaImagePublicId),
  };
}

function formatCreateError(error) {
  if (!error) return 'Server error';

  // Duplicate slug
  if (error.code === 11000) {
    return 'A page with this URL slug already exists';
  }

  // Mongoose validation
  if (error.name === 'ValidationError' && error.errors) {
    const first = Object.values(error.errors)[0];
    return first?.message || 'Invalid page data';
  }

  return error.message || 'Server error';
}

export async function GET(request) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');
    const home = searchParams.get('home');

    if (slug) {
      const page = await Page.findOne({ slug }).lean();
      if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      if (!decoded && !page.published) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      return NextResponse.json({ page }, { status: 200 });
    }

    if (home === 'true') {
      let page = await Page.findOne({ isHome: true }).lean();
      if (!page) page = await Page.findOne({ slug: 'home' }).lean();
      if (page && !decoded && !page.published) page = null;
      return NextResponse.json({ page: page || null }, { status: 200 });
    }

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const pages = await Page.find({}).sort({ isHome: -1, slug: 1 }).lean();
    return NextResponse.json({ pages }, { status: 200 });
  } catch (error) {
    console.error('Pages error:', error);
    return NextResponse.json({ error: formatCreateError(error) }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized. Please login again.' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const {
      slug,
      title,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaImagePublicId,
      sections,
      published,
      isHome,
    } = body;

    if (!title || !String(title).trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const cleanSlug = cleanPageSlug(slug || title);
    if (!cleanSlug) {
      return NextResponse.json({ error: 'Please enter a valid URL slug' }, { status: 400 });
    }

    if (RESERVED_SLUGS.includes(cleanSlug)) {
      return NextResponse.json({ error: 'This slug is reserved. Choose another URL.' }, { status: 400 });
    }

    const existing = await Page.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    if (isHome) {
      await Page.updateMany({}, { $set: { isHome: false } });
    }

    const secs = Array.isArray(sections)
      ? sections.map((sec, i) => ({
          type: sec?.type,
          content: sec?.content && typeof sec.content === 'object' ? sec.content : {},
          order: typeof sec?.order === 'number' ? sec.order : i,
        }))
      : [];

    // Drop invalid section types before save to avoid ValidationError 500
    const allowedTypes = new Set([
      'hero',
      'services',
      'about',
      'tech',
      'testimonials',
      'cta',
      'contact',
      'html',
      'features',
      'newsletter',
    ]);
    const validSecs = secs.filter((s) => s.type && allowedTypes.has(s.type));

    const imagePublicIds = extractImagePublicIdsFromSections(validSecs, metaImagePublicId);
    const seo = sanitizeSeoFields({
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaImagePublicId,
    });

    const page = await Page.create({
      slug: cleanSlug,
      title: String(title).trim(),
      ...seo,
      sections: validSecs,
      imagePublicIds,
      published: published !== false,
      isHome: !!isHome,
    });

    if (isHome) {
      try {
        revalidatePath('/');
      } catch (revalErr) {
        console.warn('revalidatePath failed:', revalErr?.message);
      }
    }

    return NextResponse.json({ message: 'Page created', page }, { status: 201 });
  } catch (error) {
    console.error('Create page error:', error);
    const message = formatCreateError(error);
    const status = error.code === 11000 || error.name === 'ValidationError' ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
