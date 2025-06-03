'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState<'proprietario' | 'empresa' | 'investidor'>('proprietario');

  const { register } = useAuth();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      await register({ nome, email, password, role });
    } catch (err) {
      console.error('Erro no cadastro:', err);
      alert('Erro ao registrar.');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/pls.jpeg')" }}
    >
      <div className="absolute inset-0 bg-[#f79b1e] opacity-50"></div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg border border-[#333333]">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-[#000000]">Crie sua conta</h2>
          <p className="mt-2 text-sm text-gray-700">
            Preencha os dados abaixo para se cadastrar
          </p>
        </div>

        <form onSubmit={handleRegister} className="mt-8 space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              className="input"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />

            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />

            <input
              type="password"
              placeholder="Confirmar Senha"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              className="input"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'proprietario' | 'empresa' | 'investidor')}
              className="input"
            >
              <option value="proprietario">Proprietário</option>
              <option value="empresa">Empresa</option>
              <option value="investidor">Investidor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 text-sm font-medium rounded-lg text-white bg-[#f79b1e] hover:bg-[#f9c623] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f9c623] transition-colors duration-200"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center text-sm">
          <p className="text-gray-700">
            Já tem uma conta?{' '}
            <Link href="/login" className="font-medium text-[#f79b1e] hover:text-[#000000]">
              Faça login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
