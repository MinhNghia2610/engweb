// app/page.tsx
'use client';
import Link from 'next/link';
import '../styles/globals.css';

export default function HomePage() {
  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <Link href="/">🌟 E-Learn</Link>
          </div>
          <nav className="nav-links">
            <Link href="/courses">Khóa học</Link>
            <Link href="/about">Giới thiệu</Link>
            <Link href="/register">Đăng ký</Link>
            <Link href="/login">Đăng nhập</Link>
          </nav>
        </div>
      </header>

      <main className="homepage">
        <section className="hero">
          <div className="hero-content">
            <h1>Mở cánh cửa tương lai với tiếng Anh 🚀</h1>
            <p>Tham gia các khóa học chất lượng cao, cá nhân hóa theo từng trình độ.</p>
            <div className="hero-buttons">
              <Link href="/register" className="btn">Đăng ký ngay</Link>
              <Link href="/courses" className="btn-outline">Xem khóa học</Link>
            </div>
          </div>
          <div className="hero-image">
            <img src="/english-learning.png" alt="Học tiếng Anh" />
          </div>
        </section>

        <section className="features">
          <h2>Tại sao chọn chúng tôi?</h2>
          <div className="feature-list">
            <div className="feature-item">
              <h3>Giảng viên chất lượng</h3>
              <p>100% giáo viên có chứng chỉ quốc tế như TESOL, IELTS 8.0+</p>
            </div>
            <div className="feature-item">
              <h3>Lộ trình thông minh</h3>
              <p>Cá nhân hóa theo từng cấp độ từ mất gốc đến nâng cao.</p>
            </div>
            <div className="feature-item">
              <h3>Học mọi lúc, mọi nơi</h3>
              <p>Truy cập khóa học 24/7 trên mọi thiết bị.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2025 E-Learn. All rights reserved.</p>
      </footer>
    </>
  );
}
