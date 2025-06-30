'use client';

import { useEffect, useState } from 'react';
import '../../../styles/admin-orders.css';

type Order = {
  _id: string;
  userId: string;
  courses: { courseId: string; title: string; price: number }[];
  total: number;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders/all');
      const data = await res.json();
      setOrders(data.orders);
    };
    fetchOrders();
  }, []);

  return (
    <main className="admin-orders">
      <h1>📦 Quản lý đơn hàng</h1>
      {orders.map(order => (
        <div key={order._id} className="order-card">
          <p><strong>Người dùng:</strong> {order.userId}</p>
          <p><strong>Tổng tiền:</strong> {order.total.toLocaleString()}đ</p>
          <p><strong>Ngày đặt:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.courses.map((c, i) => (
              <li key={i}>{c.title} - {c.price.toLocaleString()}đ</li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
