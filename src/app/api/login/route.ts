import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongodb';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  await connectDB();
  const user = await User.findOne({ email });

  if (!user) {
    return NextResponse.json({ message: 'Email không tồn tại' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Sai mật khẩu' }, { status: 401 });
  }

  // ✅ Tạo JWT token chứa role
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role, // admin hoặc user
    },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  );

  // ✅ Trả về token qua cookie và role
  const response = NextResponse.json({ success: true, role: user.role });

  response.cookies.set('token', token, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
