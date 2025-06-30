'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import '../../styles/checkout.css';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          courses: cart.map(item => ({
            courseId: item._id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
        }),
      });

      if (res.ok) {
        alert('✅ Thanh toán thành công!');
        clearCart();
        router.push('/');
      } else {
        const error = await res.json();
        alert('❌ Lỗi khi thanh toán: ' + error.error);
      }
    } catch (err) {
      console.error('Lỗi thanh toán:', err);
      alert('❌ Có lỗi xảy ra khi kết nối máy chủ.');
    }
  };

  return (
    <main className="checkout-page">
      <h1>💳 Thanh toán</h1>
      <ul className="summary">
        {cart.map(item => (
          <li key={item._id}>
            {item.title} x {item.quantity} = {(item.price * item.quantity).toLocaleString()}đ
          </li>
        ))}
      </ul>
      <p className="checkout-total">
        Tổng: <strong>{total.toLocaleString()}đ</strong>
      </p>
      <button onClick={handleCheckout} className="btn">Xác nhận thanh toán</button>
    </main>
  );
}
