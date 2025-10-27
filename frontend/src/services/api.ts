import axios from 'axios';

// Detectar URL da API automaticamente
const getApiUrl = () => {
  // Em produção no Render, usar a mesma URL do host
  if (window.location.hostname.includes('onrender.com')) {
    return window.location.origin;
  }
  
  // Se REACT_APP_API_URL está definido, usar
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Default para desenvolvimento
  return 'http://localhost:3000';
};

const API_URL = getApiUrl();

console.log('🔗 API URL:', API_URL);

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
