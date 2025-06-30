import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/app/models/Order';
import { connectDB } from '@/app/lib/mongodb';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req: NextRequest) {
  await connectDB();

  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Chưa đăng nhập' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, SECRET) as { id: string };

    const body = await req.json();
    const { courses, total } = body;

    const newOrder = new Order({
      userId: decoded.id,
      courses,
      total,
    });

    await newOrder.save();

    return NextResponse.json({ message: 'Đặt hàng thành công' });
  } catch (err) {
    return NextResponse.json({ error: 'Lỗi xác thực' }, { status: 403 });
  }
}
