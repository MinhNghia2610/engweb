'use client';

import { useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <main className="auth-page">
      <h1>Đăng ký tài khoản</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Họ tên" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Mật khẩu" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Đăng ký</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
}
