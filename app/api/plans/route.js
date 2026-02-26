import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Plan from '@/models/Plan';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';

// GET - public (no auth needed) - returns all plans, optionally filtered by service
export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service');

    const query = {};
    if (service) query.service = service;

    const plans = await Plan.find(query).sort({ service: 1, order: 1, price: 1 }).lean();

    return NextResponse.json({ plans }, { status: 200 });
  } catch (error) {
    console.error('Get plans error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST - create new plan (admin only)
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
    const { service, name, price, priceText, monthly, featured, order, features } = body;

    if (!service || !name || typeof price !== 'number') {
      return NextResponse.json({ error: 'Service, name and price are required' }, { status: 400 });
    }

    const plan = await Plan.create({
      service,
      name,
      price,
      priceText: priceText || undefined,
      monthly: !!monthly,
      featured: !!featured,
      order: typeof order === 'number' ? order : 0,
      features: Array.isArray(features) ? features : [],
    });

    return NextResponse.json({ message: 'Plan created', plan }, { status: 201 });
  } catch (error) {
    console.error('Create plan error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

