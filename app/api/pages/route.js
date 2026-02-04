import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Page from '@/models/Page';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { extractImagePublicIdsFromSections } from '@/lib/pageImages';

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
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(decoded.userId);
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    const body = await request.json();
    const { slug, title, metaTitle, metaDescription, metaKeywords, metaImage, metaImagePublicId, sections, published, isHome } = body;

    if (!slug || !title) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const reserved = ['blog', 'admin', 'api', 'contact-us', 'about-us', 'plans', 'privacy-policy', 'refund-policy', 'shipping-policy', 'terms-conditions'];
    if (reserved.includes(cleanSlug)) {
      return NextResponse.json({ error: 'This slug is reserved' }, { status: 400 });
    }

    const existing = await Page.findOne({ slug: cleanSlug });
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    if (isHome) {
      await Page.updateMany({}, { $set: { isHome: false } });
    }

    const secs = sections || [];
    const imagePublicIds = extractImagePublicIdsFromSections(secs, metaImagePublicId);
    const page = await Page.create({
      slug: cleanSlug,
      title,
      metaTitle,
      metaDescription,
      metaKeywords,
      metaImage,
      metaImagePublicId,
      sections: secs,
      imagePublicIds,
      published: published !== false,
      isHome: isHome || false,
    });

    return NextResponse.json({ message: 'Page created', page }, { status: 201 });
  } catch (error) {
    console.error('Create page error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
