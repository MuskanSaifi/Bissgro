import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Page from '@/models/Page';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { extractImagePublicIdsFromPage, extractImagePublicIdsFromSections, deleteOrphanedImages, deletePageImages } from '@/lib/pageImages';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const page = await Page.findById(id).lean();
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    return NextResponse.json({ page }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
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

    const { id } = params;
    const body = await request.json();
    const { slug, title, metaTitle, metaDescription, metaKeywords, metaImage, metaImagePublicId, sections, published, isHome } = body;

    const page = await Page.findById(id);
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });

    const oldIds = extractImagePublicIdsFromPage(page);
    const newIds = sections !== undefined
      ? extractImagePublicIdsFromSections(sections, metaImagePublicId ?? page.metaImagePublicId)
      : oldIds;
    if (sections !== undefined) await deleteOrphanedImages(oldIds, newIds);

    if (slug) {
      const cleanSlug = slug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const reserved = ['blog', 'admin', 'api', 'contact-us', 'about-us', 'plans', 'privacy-policy', 'refund-policy', 'shipping-policy', 'terms-conditions'];
      if (reserved.includes(cleanSlug)) {
        return NextResponse.json({ error: 'This slug is reserved' }, { status: 400 });
      }
      const existing = await Page.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existing) return NextResponse.json({ error: 'Slug already in use' }, { status: 400 });
      page.slug = cleanSlug;
    }

    if (title !== undefined) page.title = title;
    if (metaTitle !== undefined) page.metaTitle = metaTitle;
    if (metaDescription !== undefined) page.metaDescription = metaDescription;
    if (metaKeywords !== undefined) page.metaKeywords = metaKeywords;
    if (metaImage !== undefined) page.metaImage = metaImage;
    if (metaImagePublicId !== undefined) page.metaImagePublicId = metaImagePublicId;
    if (sections !== undefined) {
      page.sections = sections;
      page.imagePublicIds = newIds;
    }
    if (published !== undefined) page.published = published;
    if (isHome) {
      await Page.updateMany({ _id: { $ne: id } }, { $set: { isHome: false } });
      page.isHome = true;
    } else if (isHome === false) page.isHome = false;

    await page.save();
    return NextResponse.json({ message: 'Page updated', page }, { status: 200 });
  } catch (error) {
    console.error('Update page error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
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

    const { id } = params;
    const page = await Page.findById(id);
    if (!page) return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    if (page.isHome) {
      return NextResponse.json({ error: 'Cannot delete home page. Update another page as home first.' }, { status: 400 });
    }
    await deletePageImages(page);
    await Page.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Page deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
