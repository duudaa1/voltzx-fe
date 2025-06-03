'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import { loginUsuario } from '@/services/api';
import { authService } from '@/services/authService';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      // const data = await loginUsuario({ email, password });
      const data = await authService.login({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('loggedUser', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas');
    }
  }

  return (
    <div
      className="flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url("/pls.jpeg")' }}
    >
      <div className="absolute inset-0 bg-orange-500 opacity-40"></div>

      <div className="relative z-10 w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <img src="/voltz-x-logo-dark.png" alt="Logo VoltzX" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Bem-Vindo a VoltzX</h1>
          <div className="mt-2 h-1 w-24 bg-[#f79b1e] mx-auto rounded"></div>
        </div>

        <div className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9c623] focus:border-[#f9c623] sm:text-sm"
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f9c623] focus:border-[#f9c623] sm:text-sm"
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 px-4 text-lg font-medium rounded-lg text-white bg-[#f79b1e] hover:bg-[#f9c623] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f9c623] transition-colors duration-200"
          >
            Entrar
          </button>

          <div className="text-center pt-4">
            <p className="text-gray-700">
              Não tem conta?{' '}
              <Link
                href="/register"
                className="text-[#f79b1e] hover:text-black font-medium underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
