'use client';
import Image from 'next/image';
import { useEffect, useState, FormEvent } from 'react';
import {
  cadastrarTerreno,
  listarTerrenos,
  getPainelData,
  responderProjeto
} from '@/services/api';

interface Terreno {
  id?: number;
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  tamanho: string;
}

interface Usuario {
  nome: string;
  email: string;
}

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  terreno: {
    cidade: string;
    estado: string;
    tamanho: number;
  };
  aprovado: boolean;
  rejeitado: boolean;
  ofertas: Oferta[];
}

interface Oferta {
  id: number;
  valor: number;
  descricao: string;
  investidor: {
    nome: string;
    email: string;
  };
  aceitaEmpresa: boolean;
  aceitaProprietario: boolean;
  rejeitadaEmpresa: boolean;
  rejeitadaProprietario: boolean;
}

export default function ProprietarioDashboard() {
  const [terrenos, setTerrenos] = useState<Terreno[]>([]);
  const [terreno, setTerreno] = useState<Terreno>({
    pais: '',
    estado: '',
    cidade: '',
    bairro: '',
    tamanho: '',
  });
  const [loading, setLoading] = useState(false);
  const [formAberto, setFormAberto] = useState(false);
  const [detalheVisivel, setDetalheVisivel] = useState(false);
  const [terrenoSelecionado, setTerrenoSelecionado] = useState<Terreno | null>(null);
  const [painelAberto, setPainelAberto] = useState(false);
  const [projetosRecebidos, setProjetosRecebidos] = useState<Projeto[]>([]);

  useEffect(() => {
    async function carregarTerrenos() {
      setLoading(true);
      try {
        const token = localStorage.getItem('token') || '';
        const data = await listarTerrenos(token);
        setTerrenos(data);
      } catch (error) {
        console.error('Erro ao carregar terrenos:', error);
      }
      setLoading(false);
    }
    carregarTerrenos();
  }, []);

  async function carregarProjetosRecebidos() {
    try {
      const token = localStorage.getItem('token') || '';
      const res = await getPainelData(token);
      setProjetosRecebidos(res.projetos || []);
    } catch (error) {
      console.error('Erro ao carregar propostas:', error);
    }
  }

  const responder = async (id: number, acao: 'aceitar' | 'rejeitar', tipo: 'projeto' | 'proprietario') => {
    try {
      const token = localStorage.getItem('token') || '';
      if (tipo === 'projeto') {
        await responderProjeto(id, acao, token);
        alert(`Projeto ${acao === 'aceitar' ? 'aceito' : 'rejeitado'} com sucesso!`);
      } else if (tipo === 'proprietario') {
        await fetch(`http://localhost:3000/api/projetos/ofertas/${id}/resposta`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ acao, origem: 'proprietario' }),
        });
        alert(`Oferta ${acao === 'aceitar' ? 'aceita' : 'rejeitada'} com sucesso!`);
      }

      carregarProjetosRecebidos();
    } catch (err) {
      console.error('Erro ao responder:', err);
      alert('Erro ao responder.');
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const novo = await cadastrarTerreno(terreno, token);
      setTerrenos([...terrenos, novo]);
      setTerreno({ pais: '', estado: '', cidade: '', bairro: '', tamanho: '' });
      setFormAberto(false);
      alert('Terreno cadastrado com sucesso!');
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar terreno');
    }
    setLoading(false);
  }

  function verDetalhes(terreno: Terreno) {
    setTerrenoSelecionado(terreno);
    setDetalheVisivel(true);
  }

  function abrirPainel() {
    carregarProjetosRecebidos();
    setPainelAberto(true);
  }

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
      Plataforma de Gestão de Terrenos - PROPRIETÁRIO
    </h1>
  </header>

  {/* Subtítulo */}
  <div className="text-center font-semibold text-lg p-4">
    Meus Terrenos
  </div>

  {/* Lista de terrenos */}
  <main className="flex-1 p-6 flex flex-col gap-4 max-w-4xl mx-auto">
    {terrenos.length > 0 ? (
      terrenos.map((t, index) => (
        <div
          key={index}
          className="bg-neutral-100 border border-neutral-300 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center"
        >
          <p className="font-semibold">
            Terreno {index + 1}
          </p>
          <button
            onClick={() => verDetalhes(t)}
            className="text-[#F26A21] underline hover:opacity-70 mt-2 md:mt-0"
          >
            Ver detalhes
          </button>
        </div>
      ))
    ) : (
      <p className="text-center text-neutral-500">
        Nenhum terreno cadastrado.
      </p>
    )}
  </main>

  {/* Modal de Detalhes do Terreno */}
  {detalheVisivel && terrenoSelecionado && (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4 text-center text-[#F26A21]">
          Detalhes do Terreno
        </h3>
        <div className="space-y-1">
          <p><strong>País:</strong> {terrenoSelecionado.pais}</p>
          <p><strong>Estado:</strong> {terrenoSelecionado.estado}</p>
          <p><strong>Cidade:</strong> {terrenoSelecionado.cidade}</p>
          <p><strong>Bairro:</strong> {terrenoSelecionado.bairro}</p>
          <p><strong>Tamanho:</strong> {terrenoSelecionado.tamanho} m²</p>
        </div>
        <div className="text-right mt-4">
          <button
            onClick={() => setDetalheVisivel(false)}
            className="border border-[#F26A21] text-[#F26A21] px-4 py-2 rounded-lg hover:bg-[#F26A21] hover:text-white transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Modal Painel de Monitoramento */}
  {painelAberto && (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-3xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center text-[#F26A21]">
          Propostas Recebidas
        </h2>

        {projetosRecebidos.length === 0 ? (
          <p className="text-center text-neutral-500">
            Nenhuma proposta recebida ainda.
          </p>
        ) : (
          projetosRecebidos.map((projeto) => (
            <div key={projeto.id} className="border-b pb-4 mb-4">
              <p><strong>Projeto:</strong> {projeto.nome}</p>
              <p><strong>Descrição:</strong> {projeto.descricao}</p>
              <p><strong>Terreno:</strong> {projeto.terreno.cidade} - {projeto.terreno.estado} ({projeto.terreno.tamanho} m²)</p>
              <p><strong>Status:</strong>{" "}
                {projeto.aprovado
                  ? 'Aprovado'
                  : projeto.rejeitado
                    ? 'Rejeitado'
                    : 'Pendente'}
              </p>

              {/* Ações sobre o projeto */}
              {!projeto.aprovado && !projeto.rejeitado && (
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => responder(projeto.id, 'aceitar', 'projeto')}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Aceitar
                  </button>
                  <button
                    onClick={() => responder(projeto.id, 'rejeitar', 'projeto')}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Rejeitar
                  </button>
                </div>
              )}

              {/* Ofertas de investimento */}
              {projeto.ofertas && projeto.ofertas.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold mb-1">Ofertas de Investimento:</p>
                  {projeto.ofertas.map((oferta) => (
                    <div
                      key={oferta.id}
                      className="border p-3 rounded-xl bg-neutral-100 mt-2"
                    >
                      <p><strong>Valor:</strong> R$ {oferta.valor.toFixed(2)}</p>
                      <p><strong>Descrição:</strong> {oferta.descricao}</p>
                      <p><strong>Investidor:</strong> {oferta.investidor.nome} ({oferta.investidor.email})</p>
                      <p><strong>Status:</strong> {
                        oferta.aceitaEmpresa && oferta.aceitaProprietario
                          ? 'Aceita por ambos'
                          : oferta.rejeitadaEmpresa || oferta.rejeitadaProprietario
                            ? 'Rejeitada'
                            : 'Pendente'
                      }</p>

                      {/* Ações sobre a oferta */}
                      {!oferta.aceitaProprietario && !oferta.rejeitadaProprietario && (
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => responder(oferta.id, 'aceitar', 'proprietario')}
                            className="bg-green-600 text-white px-3 py-1 rounded"
                          >
                            Aceitar
                          </button>
                          <button
                            onClick={() => responder(oferta.id, 'rejeitar', 'proprietario')}
                            className="bg-red-600 text-white px-3 py-1 rounded"
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}

        <div className="text-center mt-4">
          <button
            onClick={() => setPainelAberto(false)}
            className="border border-[#F26A21] text-[#F26A21] px-4 py-2 rounded-lg hover:bg-[#F26A21] hover:text-white transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )}

  {/* Footer fixo com botões */}
  <div className="fixed bottom-6 right-6 flex flex-col gap-3">
    <button
      className="bg-[#F26A21] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#d55b1d] transition"
      onClick={() => setFormAberto(!formAberto)}
    >
      {formAberto ? 'Cancelar' : 'Cadastrar novo terreno'}
    </button>

      <button
      className="bg-[#FFC107] text-black px-6 py-3 rounded-full shadow-lg hover:bg-[#e6ac00] transition"
      onClick={abrirPainel}
    >
      Painel de Monitoramento
    </button>
  </div>



  {/* Formulário de cadastro */}
  {formAberto && (
    <form
      onSubmit={handleSubmit}
      className="bg-neutral-100 border-t border-neutral-300 p-6 flex flex-col gap-3 max-w-xl w-full mx-auto mt-6 rounded-2xl shadow-sm"
    >
      {(['pais', 'estado', 'cidade', 'bairro', 'tamanho'] as const).map((campo) => (
        <input
          key={campo}
          className="p-3 border border-neutral-300 rounded-lg bg-white"
          placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
          value={terreno[campo]}
          onChange={(e) =>
            setTerreno({ ...terreno, [campo]: e.target.value })
          }
        />
      ))}
      <button
        className="bg-[#F26A21] text-white px-4 py-3 rounded-lg hover:bg-[#d55b1d] transition"
        type="submit"
        disabled={loading}
      >
        {loading ? 'Salvando...' : 'Salvar'}
      </button>
    </form>
  )}
</div>
  );
}
