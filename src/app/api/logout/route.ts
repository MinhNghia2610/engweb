import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // dùng nếu cần cookie trong API

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', {
    httpOnly: true,
    maxAge: 0, // xóa cookie ngay lập tức
    path: '/',
  });

  return NextResponse.json({ message: 'Đăng xuất thành công' });
}
