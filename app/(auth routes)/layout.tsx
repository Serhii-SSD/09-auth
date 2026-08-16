'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <main
      style={{
        maxWidth: '480px',
        margin: '60px auto',
        padding: '0 16px',
      }}
    >
      {children}
    </main>
  );
}
