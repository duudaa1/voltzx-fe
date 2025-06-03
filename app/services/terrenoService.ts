import { httpClient } from './http';

interface Terreno {
  pais: string;
  estado: string;
  cidade: string;
  bairro: string;
  tamanho: string;
}

export const terrenoService = {
  async criar(terreno: Terreno) {
    const response = await httpClient.post('/terrenos', terreno);
    return response.data;
  },

  async listar() {
    const response = await httpClient.get('/terrenos');
    return response.data;
  },
};
