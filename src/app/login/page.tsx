'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/auth.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();

    if (res.ok) {
      router.push('/');
    } else {
      setMessage(data.error);
    }
  };

  return (
    <main className="auth-page">
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Mật khẩu" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
