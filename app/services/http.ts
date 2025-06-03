import axios from 'axios';
import { config } from '@/config/config';

export const httpClient = axios.create({
  baseURL: config.api.baseURL,
});

httpClient.interceptors.request.use((axiosConfig) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(config.storage.accessTokenKey);
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
  }
  return axiosConfig;
});
