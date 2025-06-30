'use client'; // cần để dùng useState, useEffect trong Next.js App Router

import { useState } from 'react';
import '../../../styles/admin.css';

type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([
    {
      id: 1,
      title: 'Tiếng Anh Giao Tiếp Cơ Bản',
      description: 'Khóa học dành cho người mới bắt đầu.',
      price: 499000,
    },
  ]);

  const [newCourse, setNewCourse] = useState<Course>({
    id: 0,
    title: '',
    description: '',
    price: 0,
  });

  const handleAdd = () => {
    const id = Date.now();
    setCourses([...courses, { ...newCourse, id }]);
    setNewCourse({ id: 0, title: '', description: '', price: 0 });
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const handleChange = (field: keyof Course, value: any) => {
    setNewCourse(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="admin-container">
      <h1>Quản lý Khóa học</h1>

      <div className="admin-form">
        <input
          type="text"
          placeholder="Tên khóa học"
          value={newCourse.title}
          onChange={(e) => handleChange('title', e.target.value)}
        />
        <textarea
          placeholder="Mô tả"
          value={newCourse.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        <input
          type="number"
          placeholder="Giá (VND)"
          value={newCourse.price}
          onChange={(e) => handleChange('price', parseInt(e.target.value))}
        />
        <button onClick={handleAdd}>Thêm khóa học</button>
      </div>

      <ul className="course-list">
        {courses.map((course) => (
          <li key={course.id}>
            <div>
              <strong>{course.title}</strong> - {course.price.toLocaleString()}đ
              <p>{course.description}</p>
            </div>
            <button onClick={() => handleDelete(course.id)}>Xóa</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
