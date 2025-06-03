'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { loginUsuario } from '@/services/api';
import { ArrowLeft, ArrowRight } from 'lucide-react';


export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();


  async function handleLogin() {
    try {
      const data = await loginUsuario({ email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('loggedUser', JSON.stringify(data.user));
      router.push('/dashboard');
    } catch (err) {
      alert('Credenciais inválidas');
    }
  }


  return (
     
    <div className="flex h-screen bg-white">
      {/* Lado Esquerdo */}
      <div className="w-3/5 relative flex flex-col items-center justify-center text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: 'url("\pls.jpeg")' }}
        />
        <div className="absolute inset-0 bg-orange-500 opacity-40 z-10" />


        <div className="relative z-20 flex flex-col items-center justify-center px-6">
          <div className="flex items-center mb-6">
            <img src="\voltz-x-logo-dark.png" alt="Logo VoltzX" className="h-16 object-contain" />
          </div>


          <div className="relative bg-orange-400 rounded-md w-48 h-48 flex items-center justify-center shadow-lg">
            <button className="absolute left-[-2rem] bg-white text-orange-500 p-2 rounded-full shadow-md hover:bg-orange-100">
              <ArrowLeft />
            </button>
            <button className="absolute right-[-2rem] bg-white text-orange-500 p-2 rounded-full shadow-md hover:bg-orange-100">
              <ArrowRight />
            </button>
          </div>


          <p className="mt-6 text-center font-semibold text-white text-sm max-w-xs">
            A maneira mais fácil de gerenciar contratos e comprar energia.
          </p>
        </div>
      </div>


      {/* Lado Direito */}
      <div className="w-2/5 flex items-center justify-center p-10 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800">Bem-Vindo a VoltzX</h1>
            <div className="mt-4 h-1 w-24 bg-[#f79b1e] mx-auto"></div>
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
    </div>
  );
}
