'use client';

import { useEffect, useState } from 'react';
import '../../styles/courses.css';
import { useCart } from '../context/CartContext';


type Course = {
  _id: string;
  title: string;
  description: string;
  image?: string;
  price: number;
};


export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/api/courses');
        const data = await res.json();
        setCourses(data);
      } catch (err) {
        console.error('Lỗi khi tải khóa học:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <main className="courses-page">
      <h1>🧠 Khóa học tiếng Anh</h1>
      {loading ? (
        <p>Đang tải danh sách khóa học...</p>
      ) : (
        <div className="courses-list">
          {courses.length > 0 ? (
            courses.map(course => (
              <div key={course._id} className="course-card">
                <img
                  src={course.image || 'https://source.unsplash.com/300x200/?english,learning'}
                  alt={course.title}
                />
                <h2>{course.title}</h2>
                <p>{course.description}</p>
                <div className="course-footer">
                  <span className="price">{course.price.toLocaleString()}đ</span>
                  <button onClick={() => addToCart(course)}>Thêm vào giỏ</button>
                </div>
              </div>
            ))
          ) : (
            <p>Hiện chưa có khóa học nào.</p>
          )}
        </div>
      )}
    </main>
  );
}
