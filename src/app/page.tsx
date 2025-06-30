// app/page.tsx
import Link from 'next/link';
import '../styles/globals.css';

export default function HomePage() {
  return (
    <main className="homepage">
      <section className="hero">
        <div className="hero-content">
          <h1>Học tiếng Anh để mở rộng tương lai 🌍</h1>
          <p>Khám phá các khóa học chất lượng, dành cho mọi trình độ.</p>
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
  );
}
