// src/services/usuarioService.js
import api from "./api";

export const usuarioService = {
  // Criar novo usuário
  create: async (dados) => {
    const response = await api.post("/usuarios", dados);
    return response.data;
  },

  // Buscar todos os usuários
  getAll: async () => {
    const response = await api.get("/usuarios");
    return response.data;
  },

  // Buscar usuário por ID
  getById: async (id) => {
    const response = await api.get(`/usuarios/${id}`);
    return response.data;
  },

  // Atualizar usuário
  update: async (id, dados) => {
    const response = await api.put(`/usuarios/${id}`, dados);
    return response.data;
  },

  // Remover usuário
  remove: async (id) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  }
};
