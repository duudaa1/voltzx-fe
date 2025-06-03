// const API_AUTH_URL = "http://localhost:3000/api/auth";
// const API_BASE_URL = "http://localhost:3000/api";

// interface UsuarioRegistro {
//   nome: string;
//   email: string;
//   password: string;
//   role: 'proprietario' | 'empresa' | 'investidor';
// }

// interface UsuarioLogin {
//   email: string;
//   password: string;
// }

// interface Terreno {
//   pais: string;
//   estado: string;
//   cidade: string;
//   bairro: string;
//   tamanho: string;
// }

// interface ProjetoPayload {
//   nome: string;
//   descricao: string;
//   terrenoId: number;
// }

// interface OfertaPayload {
//   projetoId: number;
//   valor: number;
//   descricao: string;
// }


// export async function registrarUsuario(data: UsuarioRegistro): Promise<any> {
//   const response = await fetch('http://localhost:3000/api/auth/register', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) {
//     const errorData = await response.json();
//     console.error('Erro no registro:', errorData);
//     throw new Error('Erro no registro');
//   }

//   return response.json();
// }

// export async function loginUsuario({ email, password }: UsuarioLogin): Promise<any> {
//   const response = await fetch(`${API_AUTH_URL}/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });

//   if (!response.ok) throw new Error("Erro no login");
//   return response.json();
// }

// export async function cadastrarTerreno(terreno: Terreno, token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/terrenos`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(terreno),
//   });

//   if (!response.ok) throw new Error("Erro ao cadastrar terreno");
//   return response.json();
// }

// export async function fetchTerrenos(token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/terrenos`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) throw new Error("Erro ao buscar terrenos");
//   return response.json();
// }

// export async function criarProjeto(data: ProjetoPayload, token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/projetos`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) throw new Error("Erro ao criar projeto");
//   return response.json();
// }

// export async function buscarTerrenos(): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/terrenos`);
//   if (!response.ok) throw new Error("Erro ao buscar terrenos");
//   return response.json();
// }

// export async function listarTerrenos(token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/terrenos`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) throw new Error("Erro ao buscar terrenos");
//   return response.json();
// }

// export async function getPainelData(token: string): Promise<any> {
//   const res = await fetch(`${API_BASE_URL}/projetos/monitoramento`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Erro ao carregar painel");
//   return await res.json();
// }

// export async function responderProjeto(id: number, acao: string, token: string): Promise<any> {
//   const res = await fetch(`${API_BASE_URL}/projetos/${id}/resposta`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ acao }),
//   });

//   if (!res.ok) throw new Error("Erro ao responder projeto");
//   return await res.json();
// }

// export async function getProjetosDisponiveis(token: string): Promise<any> {
//   const res = await fetch(`${API_BASE_URL}/projetos/disponiveis`, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!res.ok) throw new Error("Erro ao buscar projetos disponíveis");
//   return await res.json();
// }

// export async function criarOferta(data: OfertaPayload, token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/ofertas`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!response.ok) throw new Error("Erro ao enviar oferta");
//   return await response.json();
// }

// export async function getOfertasAceitas(token: string): Promise<any> {
//   const res = await fetch(`${API_BASE_URL}/projetos/ofertas-aceitas`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!res.ok) throw new Error("Erro ao buscar ofertas aceitas");
//   return await res.json();
// }

// export async function getMinhasOfertas(token: string): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}/ofertas/minhas`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) throw new Error("Erro ao buscar ofertas do investidor");
//   return response.json();
// }

// export async function responderOferta(
//   ofertaId: number,
//   acao: string,
//   token: string,
//   origem: string
// ): Promise<any> {
//   const res = await fetch(`${API_BASE_URL}/projetos/ofertas/${ofertaId}/resposta`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ acao, origem }),
//   });

//   if (!res.ok) throw new Error("Erro ao responder oferta");
//   return await res.json();
// }
