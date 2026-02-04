import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { generateToken } from '@/lib/auth';

export async function POST(request) {
  try {
    try {
      await connectDB();
    } catch (dbError) {
      console.error('Database connection error:', dbError.message);
      if (dbError.message?.includes('authentication failed') || dbError.message?.includes('bad auth')) {
        return NextResponse.json(
          { 
            error: 'MongoDB authentication failed. Please check your credentials in .env file. See MONGODB_SETUP.md for help.',
            details: 'Verify username and password in MongoDB Atlas Dashboard'
          },
          { status: 500 }
        );
      }
      throw dbError;
    }
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = generateToken(user._id);

    const response = NextResponse.json(
      { message: 'Login successful', user: { id: user._id, username: user.username, email: user.email } },
      { status: 200 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    if (error.message?.includes('authentication failed') || error.message?.includes('bad auth')) {
      return NextResponse.json({ error: 'Database connection failed. Please check MongoDB credentials.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
