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
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: 'admin',
    });

    const token = generateToken(user._id);

    const response = NextResponse.json(
      { message: 'Admin registered successfully', user: { id: user._id, username: user.username, email: user.email } },
      { status: 201 }
    );

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Register error:', error);
    if (error.message?.includes('authentication failed') || error.message?.includes('bad auth')) {
      return NextResponse.json({ error: 'Database connection failed. Please check MongoDB credentials.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Server error: ' + error.message }, { status: 500 });
  }
}
