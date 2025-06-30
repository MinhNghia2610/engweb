'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import '../../styles/cart.css';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="cart-page">
      <h1>🛒 Giỏ hàng của bạn</h1>
      {cart.length === 0 ? (
        <p>Giỏ hàng đang trống. <Link href="/courses">Xem khóa học</Link></p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item._id}>
                <div>
                  <strong>{item.title}</strong> x {item.quantity}
                </div>
                <div>
                  {(item.price * item.quantity).toLocaleString()}đ
                  <button onClick={() => removeFromCart(item._id)}>Xóa</button>
                </div>
              </li>
            ))}
          </ul>
          <p className="cart-total">Tổng cộng: <strong>{total.toLocaleString()}đ</strong></p>
          <Link href="/checkout" className="btn">Tiến hành thanh toán</Link>
        </>
      )}
    </main>
  );
}