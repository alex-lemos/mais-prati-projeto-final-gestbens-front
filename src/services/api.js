// src/services/api.js
import axios from "axios";

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptador opcional para incluir token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptador de resposta para lidar com erros de autenticação
api.interceptors.response.use(
  (resposta) => resposta,
  (erro) => {
    if(erro.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('usuario')
      window.location.href = "/login"
    }
    return Promise.reject(erro)
  }
)

export default api;
