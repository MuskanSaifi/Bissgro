import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Project from '@/models/Project';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';

// GET - public, returns all projects (optionally filtered by type)
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    const query = {};
    if (type && ['app', 'web'].includes(type)) query.type = type;

    const projects = await Project.find(query).sort({ order: 1, createdAt: -1 }).lean();

    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error('Get projects error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - create new project (admin only)
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
    const { type, title, image, imagePublicId, link, order } = body;

    if (!type || !['app', 'web'].includes(type) || !title?.trim()) {
      return NextResponse.json({ error: 'Type (app/web) and title are required' }, { status: 400 });
    }

    const project = await Project.create({
      type,
      title: title.trim(),
      image: image || '',
      imagePublicId: imagePublicId || '',
      link: link?.trim() || '',
      order: typeof order === 'number' ? order : 0,
    });

    return NextResponse.json({ message: 'Project created', project }, { status: 201 });
  } catch (error) {
    console.error('Create project error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
