import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Blog from '@/models/Blog';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { deleteImage, extractLocalPathsFromHtml } from '@/lib/upload';
import { extractPublicIdsFromHtml } from '@/lib/cloudinary';

// GET - Get single blog
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const token = getTokenFromRequest(request);
    const decoded = verifyToken(token);

    let query = { _id: id };
    if (!decoded) {
      query.published = true;
    }

    const blog = await Blog.findOne(query).populate('author', 'username').lean();

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Increment views for public access
    if (!decoded) {
      await Blog.findByIdAndUpdate(id, { $inc: { views: 1 } });
    }

    return NextResponse.json({ blog }, { status: 200 });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT - Update blog (admin only)
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
    const { title, content, excerpt, image, imagePublicId, contentImagePublicIds, metaTitle, metaDescription, metaKeywords, metaImage, canonicalUrl, focusKeyword, robots, published, deleteOldImage } = await request.json();

    const blog = await Blog.findById(id);
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete old image from Cloudinary if new image is provided
    if (deleteOldImage && blog.imagePublicId) {
      try {
        await deleteImage(blog.imagePublicId);
      } catch (err) {
        console.error('Error deleting old image:', err);
      }
    }

    // Update slug if title changed
    let slug = blog.slug;
    if (title && title !== blog.title) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      const existingBlog = await Blog.findOne({ slug, _id: { $ne: id } });
      if (existingBlog) {
        return NextResponse.json({ error: 'A blog with this title already exists' }, { status: 400 });
      }
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (slug) updateData.slug = slug;
    if (content) updateData.content = content;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (image) updateData.image = image;
    if (imagePublicId) updateData.imagePublicId = imagePublicId;
    if (contentImagePublicIds !== undefined) updateData.contentImagePublicIds = contentImagePublicIds;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle || undefined;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription || undefined;
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords || undefined;
    if (metaImage !== undefined) updateData.metaImage = metaImage || undefined;
    if (canonicalUrl !== undefined) updateData.canonicalUrl = canonicalUrl || undefined;
    if (focusKeyword !== undefined) updateData.focusKeyword = focusKeyword || undefined;
    if (robots !== undefined) updateData.robots = robots || 'index,follow';
    if (published !== undefined) updateData.published = published;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, { new: true }).populate('author', 'username');

    return NextResponse.json({ message: 'Blog updated successfully', blog: updatedBlog }, { status: 200 });
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE - Delete blog (admin only)
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
    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
    }

    // Delete featured image from Cloudinary
    if (blog.imagePublicId) {
      try {
        await deleteImage(blog.imagePublicId);
      } catch (err) {
        console.error('Error deleting featured image:', err);
      }
    }

    // Delete all content images (Cloudinary + local)
    let contentIds = blog.contentImagePublicIds?.length ? blog.contentImagePublicIds : [];
    if (!contentIds.length) {
      contentIds = [
        ...extractPublicIdsFromHtml(blog.content),
        ...extractLocalPathsFromHtml(blog.content),
      ];
    }
    for (const publicId of contentIds) {
      try {
        await deleteImage(publicId);
      } catch (err) {
        console.error('Error deleting content image:', publicId, err);
      }
    }

    await Blog.findByIdAndDelete(id);

    return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
