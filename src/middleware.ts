import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const pathname = request.nextUrl.pathname;

  const adminPaths = ['/admin'];

  if (adminPaths.some(path => pathname.startsWith(path)) && pathname !== '/admin/login') {
    if (!token) {
      // Nếu truy cập admin mà chưa login => redirect về admin login riêng
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      const decoded = jwt.verify(token, SECRET) as jwt.JwtPayload;

      if (decoded.role !== 'admin') {
        // Có token nhưng không phải admin => về trang chủ
        return NextResponse.redirect(new URL('/', request.url));
      }

      // Là admin → tiếp tục
      return NextResponse.next();
    } catch (err) {
      // Token sai hoặc hết hạn => về admin login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Các route khác không bị middleware can thiệp
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
