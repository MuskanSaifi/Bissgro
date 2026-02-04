import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Lead from '@/models/Lead';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';
import User from '@/models/User';

export async function GET(request) {
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
    const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ leads }, { status: 200 });
  } catch (error) {
    console.error('Leads error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
