import '../styles/globals.css'; 
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'English Courses',
  description: 'Learn English, unlock your future',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
