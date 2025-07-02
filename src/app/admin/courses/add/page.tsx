'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddCoursePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/courses/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
        }),
      });

      if (res.ok) {
        setMessage('🎉 Thêm khóa học thành công!');
        setForm({ title: '', description: '', price: '', image: '' });
        setTimeout(() => router.push('/admin/courses'), 1500);
      } else {
        const err = await res.json();
        setMessage('❌ Lỗi: ' + (err.error || 'Không xác định'));
      }
    } catch (err) {
      setMessage('❌ Lỗi kết nối server');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-600 to-purple-700 p-6 flex items-center justify-center text-white">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">🧠 Thêm Khóa Học Mới</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="title"
            placeholder="Tiêu đề khóa học"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={form.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Mô tả khóa học"
            className="w-full p-3 border border-gray-300 rounded-xl"
            rows={4}
            value={form.description}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Giá (VNĐ)"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={form.price}
            onChange={handleChange}
            required
          />

          <input
            name="image"
            placeholder="URL hình ảnh"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={form.image}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Đang thêm...' : 'Thêm Khóa Học'}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm font-medium">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
