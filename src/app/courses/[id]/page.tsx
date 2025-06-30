// src/app/courses/[id]/page.tsx
import { notFound } from 'next/navigation';
import '../../styles/course-detail.css'; // nếu bạn có CSS riêng

type Course = {
  _id: string;
  title: string;
  description: string;
  price: number;
  image?: string;
};

async function getCourse(id: string): Promise<Course | null> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.course;
}

export default async function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = await getCourse(params.id);

  if (!course) return notFound();

  return (
    <main className="course-detail">
      <h1>{course.title}</h1>
      <div className="course-content">
        <img
          src={course.image || 'https://source.unsplash.com/600x400/?english,learning'}
          alt={course.title}
        />
        <div className="info">
          <p>{course.description}</p>
          <p className="price">{course.price.toLocaleString()}đ</p>
          {/* Nếu bạn muốn thêm vào giỏ ở server, có thể chuyển sang form hoặc truyền lên client */}
        </div>
      </div>
    </main>
  );
}
