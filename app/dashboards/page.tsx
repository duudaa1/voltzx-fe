'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('loggedUser');
    const loggedUser = stored ? JSON.parse(stored) : null;

    if (!loggedUser) {
      router.push('/login');
      return;
    }

    const { role } = loggedUser;

    if (role === 'proprietario') {
      router.push('/dashboard/proprietario');
    } else if (role === 'empresa') {
      router.push('/dashboard/empresa');
    } else if (role === 'investidor') {
      router.push('/dashboard/investidor');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-600 text-lg">Redirecionando para seu painel...</p>
    </div>
  );
}
