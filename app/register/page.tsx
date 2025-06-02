'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registrarUsuario } from '@/services/api';

export default function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [role, setRole] = useState<'proprietario' | 'empresa' | 'investidor'>('proprietario');

  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirm) {
      alert('As senhas não coincidem.');
      return;
    }

    try {
      const res = await registrarUsuario({ nome, email, password, role });
      localStorage.setItem('token', res.token);
      localStorage.setItem('loggedUser', JSON.stringify(res.user));
      router.push('/dashboard');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      alert('Erro ao registrar.');
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Cadastro</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'proprietario' | 'empresa' | 'investidor')}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="proprietario">Proprietário</option>
          <option value="empresa">Empresa</option>
          <option value="investidor">Investidor</option>
        </select>


        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Cadastrar
        </button>
      </form>

      <p className="mt-4 text-sm text-center">
        Já tem conta?{' '}
        <Link href="/login" className="text-blue-500 underline">
          Faça login
        </Link>
      </p>
    </div>
  );
}
