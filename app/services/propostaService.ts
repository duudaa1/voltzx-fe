import { httpClient } from './http';

interface PropostaPayload {
  projetoId: number;
  valor: number;
  descricao: string;
}

export const propostaService = {
  async criar(proposta: PropostaPayload) {
    const response = await httpClient.post('/proposals', proposta);
    return response.data;
  },

  async listar() {
    const response = await httpClient.get('/proposals');
    return response.data;
  },
};
