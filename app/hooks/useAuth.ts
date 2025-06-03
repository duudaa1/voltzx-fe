'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loginUsuario, registrarUsuario } from '@/services/api';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  async function login(email: string, password: string) {
    const data = await loginUsuario({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('loggedUser', JSON.stringify(data.user));
    setUser(data.user);
    router.push('/dashboard');
  }

  async function register({
    nome,
    email,
    password,
    role,
  }: {
    nome: string;
    email: string;
    password: string;
    role: 'proprietario' | 'empresa' | 'investidor';
  }) {
    const data = await registrarUsuario({ nome, email, password, role });
    localStorage.setItem('token', data.token);
    localStorage.setItem('loggedUser', JSON.stringify(data.user));
    setUser(data.user);
    router.push('/dashboard');
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    setUser(null);
    router.push('/login');
  }

  function getToken() {
    return localStorage.getItem('token');
  }

  return { user, login, register, logout, getToken };
}
