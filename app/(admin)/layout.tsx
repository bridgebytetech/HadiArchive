// app/(admin)/admin/layout.tsx
"use client";

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, checkAuth, token } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Login page বাদে অন্য সব page এ auth check করো
    if (!pathname.includes('/login')) {
      checkAuth();
      
      // Token না থাকলে login এ redirect
      if (!isAuthenticated && !token) {
        console.log('🚪 Not authenticated, redirecting to login');
        router.push('/admin/login');
      }
    }
  }, [pathname, isAuthenticated, token, checkAuth, router]);

  return <>{children}</>;
}
