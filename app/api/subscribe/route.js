import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Lead from '@/models/Lead';

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }
    const existing = await Lead.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ message: 'Already subscribed', success: true }, { status: 200 });
    }
    await Lead.create({ email: email.toLowerCase(), source: 'newsletter' });
    return NextResponse.json({ message: 'Subscribed successfully', success: true }, { status: 201 });
  } catch (error) {
    console.error('Subscribe error:', error);
    return NextResponse.json({ error: 'Subscription failed' }, { status: 500 });
  }
}
