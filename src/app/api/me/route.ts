import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export async function GET() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string; email: string };
    return NextResponse.json({ user: decoded });
  } catch (err) {
    return NextResponse.json({ user: null });
  }
}
