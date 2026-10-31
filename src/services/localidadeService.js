// src/services/localidadeService.js
import api from "./api";

export const localidadeService = {
  create: async (dados) => {
    const response = await api.post("/localidades", dados);
    return response.data;
  },

  getAll: async () => {
    const response = await api.get("/localidades");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/localidades/${id}`);
    return response.data;
  },

  update: async (id, dados) => {
    const response = await api.put(`/localidades/${id}`, dados);
    return response.data;
  },

  remove: async (id) => {
    const response = await api.delete(`/localidades/${id}`);
    return response.data;
  }
  
};
