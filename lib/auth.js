import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'BISHRONAZIMSAIFI';

export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export function getTokenFromRequest(req) {
  const authHeader = req.headers?.get?.('authorization') || req.headers?.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  // Next.js: cookies.get('token') returns { name, value }
  const tokenCookie = req.cookies?.get?.('token');
  if (tokenCookie?.value) return tokenCookie.value;
  // Fallback: parse Cookie header (e.g. for some API route contexts)
  const cookieHeader = req.headers?.get?.('cookie') || req.headers?.cookie;
  if (cookieHeader) {
    const match = cookieHeader.match(/token=([^;]+)/);
    return match ? match[1].trim() : null;
  }
  return null;
}
