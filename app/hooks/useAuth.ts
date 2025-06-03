'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '@/services/authService';

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  // Carrega usuário salvo no localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Login
  async function login(email: string, password: string) {
    const data = await authService.login({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('loggedUser', JSON.stringify(data.user));
    setUser(data.user);
    router.push('/dashboard');
  }

  // Register
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
    const data = await authService.register({ nome, email, password, role });
    localStorage.setItem('token', data.token);
    localStorage.setItem('loggedUser', JSON.stringify(data.user));
    setUser(data.user);
    router.push('/dashboard');
  }

  // Logout
  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
    setUser(null);
    router.push('/login');
  }

  // Recupera token atual
  function getToken() {
    return localStorage.getItem('token');
  }

  return { user, login, register, logout, getToken };
}

