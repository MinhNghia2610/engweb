'use client';
import Link from 'next/link';
import '../../styles/admin.css';

export default function AdminHome() {
  return (
    <div className="admin-layout">
      {/* Sidebar bên trái */}
      <aside className="admin-sidebar">
        <h2>📊 Admin</h2>
        <nav>
          <Link href="/admin/courses">📚 Khóa học</Link>
          <Link href="/admin/users" className="disabled">👥 Người dùng</Link>
          <Link href="/admin/orders" className="disabled">🛒 Đơn hàng</Link>
        </nav>
      </aside>

      {/* Khu vực nội dung chính */}
      <main className="admin-main">
        <h1>🎛️ Trang quản trị</h1>
        <p>Chào mừng bạn đến với bảng điều khiển quản trị viên.</p>

        {/* Các thẻ thống kê nhanh */}
        <div className="admin-stats">
          <div className="stat-card">
            <h3>25</h3>
            <p>Khóa học đang bán</p>
          </div>
          <div className="stat-card">
            <h3>142</h3>
            <p>Người dùng đã đăng ký</p>
          </div>
          <div className="stat-card">
            <h3>58</h3>
            <p>Đơn hàng trong tháng</p>
          </div>
        </div>

        {/* Placeholder cho biểu đồ */}
        <div className="admin-chart">
          <h2>📈 Thống kê doanh thu</h2>
          <div className="chart-placeholder">[ Biểu đồ sẽ được hiển thị tại đây ]</div>
        </div>
      </main>
    </div>
  );
}
