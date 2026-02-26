import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Plan from '@/models/Plan';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';

// GET single plan (admin or public)
export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const plan = await Plan.findById(id).lean();
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }
    return NextResponse.json({ plan }, { status: 200 });
  } catch (error) {
    console.error('Get plan error:', error);
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
    const { service, name, price, priceText, monthly, featured, order, features } = body;

    const update = {};
    if (service) update.service = service;
    if (name) update.name = name;
    if (typeof price === 'number') update.price = price;
    if (priceText !== undefined) update.priceText = priceText || undefined;
    if (typeof monthly === 'boolean') update.monthly = monthly;
    if (typeof featured === 'boolean') update.featured = featured;
    if (typeof order === 'number') update.order = order;
    if (Array.isArray(features)) update.features = features;

    const plan = await Plan.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan updated', plan }, { status: 200 });
  } catch (error) {
    console.error('Update plan error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// DELETE - delete (admin only)
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
    const plan = await Plan.findByIdAndDelete(id).lean();
    if (!plan) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Plan deleted' }, { status: 200 });
  } catch (error) {
    console.error('Delete plan error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

