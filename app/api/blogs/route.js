import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';

// GET - Get all blogs (public: only published, admin: all)
export async function GET(request) {
  try {
    await connectDB();
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    let query = {};
    if (!decoded) {
      // Public: only published blogs
      query = { published: true };
    }

    const blogs = await Blog.find(query)
      .populate('author', 'username')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ blogs }, { status: 200 });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - Create new blog (admin only)
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

    const { title, slug: customSlug, content, excerpt, image, imagePublicId, contentImagePublicIds, metaTitle, metaDescription, metaKeywords, metaImage, canonicalUrl, focusKeyword, robots, published } = await request.json();

    if (!title || !content || !image) {
      return NextResponse.json({ error: 'Title, content, and image are required' }, { status: 400 });
    }

    // Use the custom URL slug when provided; otherwise generate it from the title.
    const slug = (customSlug || title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    if (!slug) {
      return NextResponse.json({ error: 'Please enter a valid blog URL' }, { status: 400 });
    }

    // Check if slug exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json({ error: 'This blog URL is already in use. Choose another URL.' }, { status: 400 });
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt: excerpt || content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
      image,
      imagePublicId,
      contentImagePublicIds: contentImagePublicIds || [],
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      metaKeywords: metaKeywords || undefined,
      metaImage: metaImage || undefined,
      canonicalUrl: canonicalUrl || undefined,
      focusKeyword: focusKeyword || undefined,
      robots: robots || 'index,follow',
      author: user._id,
      published: published || false,
    });

    const populatedBlog = await Blog.findById(blog._id).populate('author', 'username');

    return NextResponse.json({ message: 'Blog created successfully', blog: populatedBlog }, { status: 201 });
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
