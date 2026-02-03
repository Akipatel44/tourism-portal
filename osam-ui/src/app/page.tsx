'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login on app load
    router.push('/login');
  }, [router]);

  // Return null while redirecting
  return null;
}
