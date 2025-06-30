import { connectDB } from '../../lib/mongodb';
import { User } from '../../models/User';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export const runtime = 'nodejs'; 

export async function POST(req: Request) {
  const { email, password } = await req.json();
  await connectDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Sai email hoặc mật khẩu' }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, SECRET, { expiresIn: '7d' });

  const cookieStore = await cookies(); // ✅ thêm await ở đây
  cookieStore.set('token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  return NextResponse.json({ message: 'Đăng nhập thành công' });
}
