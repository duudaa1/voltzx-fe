"use client"
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { loginUsuario } from "../services/api";

interface LoginProps {
  onLogin: (user: any) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const data = await loginUsuario({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("loggedUser", JSON.stringify(data.user));
      onLogin(data.user); // dispara o login global
      router.push("/dashboard"); // redireciona para dashboard
    } catch (err) {
      alert("Credenciais inválidas");
    }
  }

  return (
    <div className="p-4 max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="block w-full mb-2 p-2 border"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Entrar
      </button>
      <p className="mt-4 text-sm text-center">
        Não tem conta?{" "}
        <Link href="/register" className="text-blue-500 underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
