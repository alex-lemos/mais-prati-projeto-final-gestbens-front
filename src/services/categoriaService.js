// src/services/categoriaService.js
import api from "./api";

export const categoriaService = {
  create: async (dados) => {
    const response = await api.post("/categorias", dados);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/categorias");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/categorias/${id}`);
    return response.data;
  },

  update: async (id, dados) => {
    const response = await api.put(`/categorias/${id}`, dados);
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/categorias/${id}`);
    return response.data;
  }
};
