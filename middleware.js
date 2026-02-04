import { NextResponse } from 'next/server';

// Auth check moved to dashboard layout - middleware had cookie/timing issues with redirect
export function middleware(request) {
  return NextResponse.next();
}
