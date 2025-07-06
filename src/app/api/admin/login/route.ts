import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../../lib/mongodb';
import Admin from '../../../models/Admin';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectDB();
  const admin = await Admin.findOne({ email });

  if (!admin) return NextResponse.json({ message: 'Admin không tồn tại' }, { status: 401 });

  console.log('📥 Email nhận được:', email);
  console.log('📥 Password nhận được:', password);
  console.log('🔐 Password DB:', admin.password);

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return NextResponse.json({ message: 'Sai mật khẩu' }, { status: 401 });

  const token = jwt.sign(
    { adminId: admin._id, role: 'admin' },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  const response = NextResponse.json({ success: true, role: 'admin' });

  response.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
