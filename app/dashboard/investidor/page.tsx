'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  getProjetosDisponiveis,
  criarOferta,
  getMinhasOfertas
} from '@/services/api';

interface Terreno {
  cidade: string;
  estado: string;
  tamanho: number;
}

interface Empresa {
  nome: string;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  terreno: Terreno;
  empresa: Empresa;
}

interface Oferta {
  id: number;
  valor: number;
  descricao: string;
  projeto: { nome: string };
  aceitaEmpresa: boolean;
  aceitaProprietario: boolean;
  rejeitadaEmpresa: boolean;
  rejeitadaProprietario: boolean;
}


export default function InvestidorDashboard() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [erro, setErro] = useState('');
  const [modalAberto, setModalAberto] = useState(false);
  const [projetoSelecionado, setProjetoSelecionado] = useState<Projeto | null>(null);
  const [valorOferta, setValorOferta] = useState('');
  const [descricaoOferta, setDescricaoOferta] = useState('');
  const [minhasOfertas, setMinhasOfertas] = useState<Oferta[]>([]);

  useEffect(() => {
    carregarProjetos();
    carregarMinhasOfertas();
  }, []);

  async function carregarProjetos() {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await getProjetosDisponiveis(token);
      setProjetos(data);
    } catch {
      setErro('Erro ao buscar projetos disponíveis.');
    }
  }

  async function carregarMinhasOfertas() {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await getMinhasOfertas(token);
      setMinhasOfertas(data);
    } catch (err) {
      console.error('Erro ao buscar painel de investimentos:', err);
    }
  }

  const abrirModal = (projeto: Projeto) => {
    setProjetoSelecionado(projeto);
    setModalAberto(true);
  };

  const enviarOferta = async () => {
    if (!projetoSelecionado) return;

    try {
      const token = localStorage.getItem('token') || '';
      await criarOferta(
        {
          projetoId: projetoSelecionado.id,
          valor: parseFloat(valorOferta),
          descricao: descricaoOferta
        },
        token
      );
      alert('Oferta enviada com sucesso!');
      setModalAberto(false);
      setValorOferta('');
      setDescricaoOferta('');
      carregarMinhasOfertas();
    } catch (error) {
      console.error('Erro ao enviar oferta:', error);
      alert('Erro ao enviar oferta.');
    }
  };

  return (
<div className="flex flex-col min-h-screen bg-white text-black relative">
    {/* Cabeçalho */}
  <header className="bg-white border-b border-neutral-300 p-6">
                  <Image
                    src="/voltz-x-logo-dark.png"
                    alt="Logo VoltzX"
                    className="h-10 w-auto"
                    width={160}
                    height={40}
                  />        
    <h1 className="text-2xl font-bold text-center text-[#F26A21]">
      Plataforma de Gestão de Terrenos - INVESTIDOR
    </h1>
  </header>
  <h2 className="text-3xl font-bold mb-6 text-center">Projetos Disponíveis para Investimento</h2>

  {erro && <p className="text-red-600 text-center">{erro}</p>}

  {projetos.length === 0 ? (
    <p className="text-center text-neutral-500">Nenhum projeto disponível.</p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {projetos.map((projeto) => (
        <div key={projeto.id} className="bg-white rounded-2xl shadow-md p-6 border border-neutral-200">
          <h3 className="text-xl font-semibold mb-2">{projeto.nome}</h3>
          <p className="mb-1"><span className="font-medium">Descrição:</span> {projeto.descricao}</p>
          <p className="mb-1"><span className="font-medium">Localização:</span> {projeto.terreno.cidade} - {projeto.terreno.estado}</p>
          <p className="mb-1"><span className="font-medium">Tamanho:</span> {projeto.terreno.tamanho} m²</p>
          <p className="mb-4"><span className="font-medium">Empresa:</span> {projeto.empresa.nome}</p>
          <button
            onClick={() => abrirModal(projeto)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Enviar Proposta de Investimento
          </button>
        </div>
      ))}
    </div>
  )}

  {modalAberto && projetoSelecionado && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md border border-neutral-200">
        <h3 className="text-2xl font-bold mb-4">Nova Oferta</h3>
        <input
          type="number"
          placeholder="Valor da oferta"
          value={valorOferta}
          onChange={(e) => setValorOferta(e.target.value)}
          className="w-full p-3 border border-neutral-300 rounded-lg mb-3"
        />
        <textarea
          placeholder="Descrição da oferta"
          value={descricaoOferta}
          onChange={(e) => setDescricaoOferta(e.target.value)}
          className="w-full p-3 border border-neutral-300 rounded-lg mb-4"
          rows={4}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-neutral-400 hover:bg-neutral-500 px-4 py-2 text-white rounded-lg transition"
            onClick={() => setModalAberto(false)}
          >
            Cancelar
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 px-4 py-2 text-white rounded-lg transition"
            onClick={enviarOferta}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  )}

  <div className="mt-14">
    <h2 className="text-3xl font-bold mb-6 text-center">Painel de Investimentos</h2>

    {minhasOfertas.length === 0 ? (
      <p className="text-neutral-500 text-center">Nenhuma proposta enviada.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {minhasOfertas.map((oferta) => (
          <div key={oferta.id} className="bg-neutral-100 p-6 rounded-2xl shadow-md border border-neutral-200">
            <p className="mb-1"><span className="font-medium">Projeto:</span> {oferta.projeto.nome}</p>
            <p className="mb-1"><span className="font-medium">Descrição da Proposta:</span> {oferta.descricao}</p>
            <p className="mb-1"><span className="font-medium">Valor:</span> R$ {oferta.valor.toFixed(2)}</p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {oferta.aceitaEmpresa && oferta.aceitaProprietario
                ? 'Aprovada'
                : oferta.rejeitadaEmpresa || oferta.rejeitadaProprietario
                ? 'Rejeitada'
                : 'Pendente'}
            </p>
          </div>
        ))}
      </div>
    )}
    

  </div>
  </div>
  );
}
