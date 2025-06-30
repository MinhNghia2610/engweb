import Link from 'next/link';
import '../../styles/admin.css';

export default function AdminHome() {
  return (
    <div className="admin-dashboard">
      <h1>🎛️ Trang quản trị</h1>
      <p>Chào mừng bạn đến với bảng điều khiển quản trị viên.</p>

      <div className="admin-menu">
        <Link href="/admin/courses" className="admin-card">
          <h2>📚 Quản lý Khóa học</h2>
          <p>Thêm, sửa, xóa các khóa học tiếng Anh.</p>
        </Link>

        <Link href="/admin/users" className="admin-card disabled">
          <h2>👥 Quản lý Người dùng</h2>
          <p>Quản lý tài khoản học viên và giáo viên. (chưa xây)</p>
        </Link>

        <Link href="/admin/orders" className="admin-card disabled">
          <h2>🛒 Quản lý Đơn hàng</h2>
          <p>Theo dõi và xử lý các đơn mua khóa học. (chưa xây)</p>
        </Link>
      </div>
    </div>
  );
}