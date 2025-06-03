'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  fetchTerrenos,
  criarProjeto,
  getPainelData,
  responderOferta,
} from '@/services/api';

interface Terreno {
  id: number;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  tamanho: number;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  terreno: Terreno;
  aprovado: boolean;
  rejeitado: boolean;
  ofertas: Oferta[];
}

interface Oferta {
  id: number;
  valor: number;
  descricao: string;
  aceitaEmpresa: boolean;
  aceitaProprietario: boolean;
  rejeitadaEmpresa: boolean;
  rejeitadaProprietario: boolean;
  investidor: {
    nome: string;
    email: string;
  };
}

export default function EmpresaDashboard() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [filtro, setFiltro] = useState({
    pais: '',
    estado: '',
    cidade: '',
    bairro: '',
    tamanhoMin: '',
  });
  const [resultados, setResultados] = useState<Terreno[]>([]);
  const [terrenoSelecionado, setTerrenoSelecionado] = useState<Terreno | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [projetoAtual, setProjetoAtual] = useState({ nome: '', descricao: '' });
  const [detalhesVisiveis, setDetalhesVisiveis] = useState<number | null>(null);
  const [painelAberto, setPainelAberto] = useState(false);
  const [projetosEnviados, setProjetosEnviados] = useState<Projeto[]>([]);

  useEffect(() => {
    carregarTerrenos();
  }, []);

  async function carregarTerrenos() {
    try {
      const token = localStorage.getItem('token') || '';
      const data = await fetchTerrenos(token);
      setTerrenos(data);
      setResultados(data);
    } catch (error) {
      alert('Erro ao carregar terrenos.');
      console.error(error);
    }
  }

  const buscarTerrenos = () => {
    const { pais, estado, cidade, bairro, tamanhoMin } = filtro;
    const tamanho = parseInt(tamanhoMin);
    const filtrados = terrenos.filter((t) => {
      return (
        (!pais || t.pais.toLowerCase().includes(pais.toLowerCase())) &&
        (!estado || t.estado.toLowerCase().includes(estado.toLowerCase())) &&
        (!cidade || t.cidade.toLowerCase().includes(cidade.toLowerCase())) &&
        (!bairro || t.bairro.toLowerCase().includes(bairro.toLowerCase())) &&
        (isNaN(tamanho) || t.tamanho >= tamanho)
      );
    });
    setResultados(filtrados);
  };

  const abrirModal = (terreno: Terreno) => {
    setTerrenoSelecionado(terreno);
    setModalAberto(true);
  };

  const enviarProposta = async () => {
    if (!terrenoSelecionado) return;

    try {
      const token = localStorage.getItem('token') || '';
      await criarProjeto(
        {
          nome: projetoAtual.nome,
          descricao: projetoAtual.descricao,
          terrenoId: terrenoSelecionado.id,
        },
        token
      );
      alert('Proposta enviada com sucesso!');
      setProjetoAtual({ nome: '', descricao: '' });
      setModalAberto(false);
      carregarTerrenos();
    } catch (error) {
      alert('Erro ao enviar proposta.');
      console.error(error);
    }
  };

  const abrirPainelMonitoramento = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await getPainelData(token);
      setProjetosEnviados(res.projetos || []);
      setPainelAberto(true);
    } catch (err) {
      console.error('Erro ao buscar painel:', err);
      alert('Erro ao carregar painel.');
    }
  };

  const responderOfertaClick = async (ofertaId: number, acao: 'aceitar' | 'rejeitar') => {
    try {
      const token = localStorage.getItem('token') || '';
      await responderOferta(ofertaId, acao, token, 'empresa');
      alert(`Oferta ${acao === 'aceitar' ? 'aceita' : 'rejeitada'} com sucesso!`);
      abrirPainelMonitoramento();
    } catch (err) {
      console.error('Erro ao responder oferta:', err);
      alert('Erro ao responder oferta.');
    }
  };

  return (
  <div className="flex flex-col min-h-screen bg-white text-black relative">
    {/* Topo */}
    <header className="bg-white border-b border-neutral-300 p-6">
                  <Image
                    src="/voltz-x-logo-dark.png"
                    alt="Logo VoltzX"
                    className="h-10 w-auto"
                    width={160}
                    height={40}
                  />
      <h1 className="text-2xl font-bold text-center text-[#F26A21]">
        Plataforma de Gestão de Terrenos - EMPRESA
      </h1>
    </header>

    {/* Conteúdo principal */}
    <main className="p-6 max-w-6xl mx-auto flex flex-col gap-8 pb-28">
      {/* Bloco de filtros */}
      <section className="bg-neutral-100 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-center">
          Buscar Terrenos
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['pais', 'estado', 'cidade', 'bairro'].map((campo) => (
            <input
              key={campo}
              placeholder={campo[0].toUpperCase() + campo.slice(1)}
              className="p-3 border border-neutral-300 rounded-lg bg-white"
              value={filtro[campo as keyof typeof filtro]}
              onChange={(e) =>
                setFiltro((prev) => ({ ...prev, [campo]: e.target.value }))
              }
            />
          ))}
          <input
            type="number"
            placeholder="Tamanho mínimo (m²)"
            className="p-3 border border-neutral-300 rounded-lg bg-white"
            value={filtro.tamanhoMin}
            onChange={(e) => setFiltro((prev) => ({ ...prev, tamanhoMin: e.target.value }))}
          />
          <button
            className="bg-[#F26A21] text-white px-4 py-3 rounded-lg hover:bg-[#d55b1d] transition"
            onClick={buscarTerrenos}
          >
            Buscar
          </button>
        </div>
      </section>

      {/* Lista de terrenos */}
      <section className="flex flex-col gap-4">
        {resultados.length > 0 ? (
          resultados.map((terreno) => (
            <div
              key={terreno.id}
              className="bg-neutral-100 border border-neutral-300 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
            >
              <div>
                <p className="font-semibold text-lg">
                  {`${terreno.cidade} - ${terreno.estado}`}
                </p>
                <p className="text-neutral-500">{terreno.tamanho} m²</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-4">
                <button
                  className="text-[#F26A21] underline hover:opacity-70"
                  onClick={() =>
                    setDetalhesVisiveis((d) => (d === terreno.id ? null : terreno.id))
                  }
                >
                  Ver detalhes
                </button>
              </div>

              {detalhesVisiveis === terreno.id && (
                <div className="absolute right-6 mt-16 bg-white border border-neutral-300 p-4 rounded-xl shadow-md z-10 w-72">
                  <p><strong>País:</strong> {terreno.pais}</p>
                  <p><strong>Estado:</strong> {terreno.estado}</p>
                  <p><strong>Cidade:</strong> {terreno.cidade}</p>
                  <p><strong>Bairro:</strong> {terreno.bairro}</p>
                  <p><strong>Área:</strong> {terreno.tamanho} m²</p>
                  <button
                    className="mt-3 underline text-[#F26A21]"
                    onClick={() => abrirModal(terreno)}
                  >
                    Criar projeto
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-neutral-500">
            Nenhum terreno encontrado.
          </p>
        )}
      </section>
    </main>

    {/* Modal */}
    {modalAberto && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-lg">
          <h3 className="text-xl font-semibold mb-4 text-center text-[#F26A21]">
            Criar Projeto
          </h3>
          <input
            className="w-full p-3 border border-neutral-300 rounded-lg bg-neutral-100 mb-3"
            placeholder="Nome do Projeto"
            value={projetoAtual.nome}
            onChange={(e) => setProjetoAtual({ ...projetoAtual, nome: e.target.value })}
          />
          <textarea
            className="w-full p-3 border border-neutral-300 rounded-lg bg-neutral-100 mb-3"
            placeholder="Descrição"
            value={projetoAtual.descricao}
            onChange={(e) => setProjetoAtual({ ...projetoAtual, descricao: e.target.value })}
          />
          <div className="flex justify-end gap-3">
            <button
              className="border border-[#F26A21] text-[#F26A21] px-4 py-2 rounded-lg hover:bg-[#F26A21] hover:text-white transition"
              onClick={() => setModalAberto(false)}
            >
              Cancelar
            </button>
            <button
              className="bg-[#F26A21] text-white px-4 py-2 rounded-lg hover:bg-[#d55b1d] transition"
              onClick={enviarProposta}
            >
              Enviar Proposta
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Botão fixo do Painel */}
    <div className="fixed bottom-6 right-6">
      <button
        className="bg-[#FFC107] text-black px-6 py-3 rounded-full shadow-lg hover:bg-[#e6ac00] transition"
        onClick={abrirPainelMonitoramento}
      >
        Painel de Monitoramento
      </button>
    </div>
  </div>
  );
}
