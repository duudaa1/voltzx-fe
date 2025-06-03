import { httpClient } from './http';

interface UsuarioRegistro {
  nome: string;
  email: string;
  password: string;
  role: 'proprietario' | 'empresa' | 'investidor';
}

interface UsuarioLogin {
  email: string;
  password: string;
}

export const authService = {
  async register(data: UsuarioRegistro) {
    const response = await httpClient.post('/auth/register', data);
    return response.data;
  },

  async login(data: UsuarioLogin) {
    const response = await httpClient.post('/auth/login', data);
    return response.data;
  },
};
