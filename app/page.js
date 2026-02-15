'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/seniors');
  }, [router]);

  return (
    <meta httpEquiv="refresh" content="0;url=/seniors" />
  );
}
