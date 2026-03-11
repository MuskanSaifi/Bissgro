import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';
import { deleteImage } from '@/lib/upload';

// GET single project (public)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error('Get project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// PUT - update (admin only)
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
    const { type, title, image, imagePublicId, link, order, deleteOldImage } = body;

    const project = await Project.findById(id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (deleteOldImage && project.imagePublicId) {
      try {
        await deleteImage(project.imagePublicId);
      } catch (err) {
        console.error('Error deleting old project image:', err);
      }
    }

    const update = {};
    if (type && ['app', 'web'].includes(type)) update.type = type;
    if (title !== undefined) update.title = title?.trim() || project.title;
    if (image !== undefined) update.image = image || '';
    if (imagePublicId !== undefined) update.imagePublicId = imagePublicId || '';
    if (link !== undefined) update.link = link?.trim() || '';
    if (typeof order === 'number') update.order = order;

    const updated = await Project.findByIdAndUpdate(id, update, { new: true }).lean();
    return NextResponse.json({ message: 'Project updated', project: updated }, { status: 200 });
  } catch (error) {
    console.error('Update project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE - delete (admin only), also deletes image
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
    const project = await Project.findById(id).lean();
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    if (project.imagePublicId) {
      try {
        await deleteImage(project.imagePublicId);
      } catch (err) {
        console.error('Error deleting project image:', err);
      }
    }

    await Project.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
