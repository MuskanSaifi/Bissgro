
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define MONGODB_URI in .env');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

function getUsernameFromUri(uri) {
  try {
    const match = uri.match(/mongodb(\+srv)?:\/\/([^:]+):/);
    return match ? match[2] : '(unknown)';
  } catch {
    return '(unknown)';
  }
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    const username = getUsernameFromUri(MONGODB_URI);
    console.log('🔄 Connecting to MongoDB as user:', username);

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB connection error:', error.message);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection failed:', e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
