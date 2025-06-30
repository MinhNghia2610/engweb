'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch('/api/logout', {
        method: 'POST',
      });
      router.push('/'); // quay về trang chủ sau khi logout
    };

    logout();
  }, [router]);

  return <p>Đang đăng xuất...</p>;
}
